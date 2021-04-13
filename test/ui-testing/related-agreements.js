/* global before, after, Nightmare */
const AgreementCRUD = require('./agreement-crud');

// Ideally, we'd import these from constants/agreementRelationshipTypes.js but the mismatch
// of import/require precludes us from doing that.
const RelationshipTypes = [
  {
    type: 'supersedes',
    outward: {
      value: 'supersedes',
      label: 'Supersedes',
    },
    inward: {
      value: 'is-superseded-by',
      label: 'Is superseded by',
    },
  },
  {
    type: 'provides_post-cancellation_access_for',
    outward: {
      value: 'provides_post-cancellation_access_for',
      label: 'Provides post-cancellation access for'
    },
    inward: {
      value: 'has-post-cancellation-access-in',
      label: 'Has post-cancellation access in',
    },
  },
  {
    type: 'tracks_demand-driven_acquisitions_for',
    outward: {
      value: 'tracks_demand-driven_acquisitions_for',
      label: 'Tracks demand-driven acquisitions for',
    },
    inward: {
      value: 'has-demand-driven-acquisitions-in',
      label: 'Has demand-driven acquisitions in',
    },
  },
];

const evaluateRelationship = (nightmare, done, agreement) => {
  nightmare
    .evaluate(_agreement => {
      const cards = [...document.querySelectorAll('[id*="ra-card-"]')];
      const relatedAgreementCard = cards.find(card => card.innerText.includes(_agreement.name));

      if (!relatedAgreementCard) {
        throw Error('Failed to find card for the agreement');
      }

      if (!relatedAgreementCard.innerText.includes(_agreement.relationship)) {
        throw Error(`Failed to find relationship of "${_agreement.relationship}" in card`);
      }

      if (!relatedAgreementCard.innerText.includes(_agreement.note)) {
        throw Error('Failed to find configured note in card');
      }
    }, agreement)
    .then(done)
    .catch(done);
};

module.exports.test = (uiTestCtx) => {
  const number = Math.round(Math.random() * 100000);
  const agreements = [{
    name: `Related Agreement #${number} - Inward 1`,
    note: `This agreement's relationship will be defined by its Outward counterpart. When viewing this agreement, the defined relationship should be ${RelationshipTypes[0].inward.label}`,
    relationship: RelationshipTypes[0],
  }, {
    name: `Related Agreement #${number} - Inward 2`,
    note: `This agreement's relationship will be defined by its Outward counterpart. When viewing this agreement, the defined relationship should be ${RelationshipTypes[1].inward.label}`,
    relationship: RelationshipTypes[1],
  }, {
    name: `Related Agreement #${number} - Outward`,
    note: `This historical license was automatically created and linked for run ${number}`,
  }];

  const relatedAgreements = agreements.filter(a => a.relationship);
  const mainAgreement = agreements.find(a => !a.relationship);

  describe('ui-agreements: related agreements', function test() {
    const { config, helpers } = uiTestCtx;
    const nightmare = new Nightmare(config.nightmare);

    this.timeout(Number(config.test_timeout));

    describe('create agreement > link related agreements', () => {
      before((done) => {
        helpers.login(nightmare, config, done);
      });

      after((done) => {
        helpers.logout(nightmare, config, done);
      });

      it('should open Agreements app', done => {
        helpers.clickApp(nightmare, done, 'agreements');
      });

      agreements.forEach(agreement => {
        it(`should create "${agreement.name}"`, done => {
          AgreementCRUD.createAgreement(nightmare, done, agreement);
        });
      });

      it(`should begin editing "${mainAgreement.name}"`, done => {
        nightmare
          .wait('#clickable-edit-agreement') // edit button removed, ERM-693
          .click('#clickable-edit-agreement') // edit button removed, ERM-693
          .wait('#form-loaded')
          .then(done)
          .catch(done);
      });

      relatedAgreements.forEach((agreement, index) => {
        it(`should link "${agreement.name}"`, done => {
          nightmare
            .click('#add-ra-btn')
            .wait(`#ra-agreement-${index}-find-agreement-btn`)
            .click(`#ra-agreement-${index}-find-agreement-btn`)
            .wait('#input-agreement-search')
            .insert('#input-agreement-search', agreement.name)
            .click('#clickable-search-agreements')
            .wait('#list-agreements[aria-rowcount="2"]')
            .click('[aria-rowindex="2"]')
            .wait(`#ra-agreement-${index} [data-test-agreement-card-name]`)
            .type(`#ra-type-${index}`, agreement.relationship.outward.label)
            .insert(`#ra-note-${index}`, agreement.note)
            .then(done)
            .catch(done);
        });
      });

      it('should disallow linking an agreement to itself', done => {
        done();
      });

      it('should save agreement', done => {
        nightmare
          .click('#clickable-update-agreement')
          .waitUntilNetworkIdle(2000)
          .click('#clickable-expand-all')
          .then(done)
          .catch(done);
      });

      relatedAgreements.forEach(agreement => {
        it(`should find "${agreement.name}" in Related Agreements section`, done => {
          evaluateRelationship(nightmare, done, {
            ...agreement,
            relationship: agreement.relationship.outward.label,
          });
        });
      });

      relatedAgreements.forEach(agreement => {
        it(`should find and view "${agreement.name}"`, done => {
          nightmare
            .click('#clickable-reset-all')
            .insert('#input-agreement-search', agreement.name)
            .click('#clickable-search-agreements')
            .waitUntilNetworkIdle(2000)
            .click('#clickable-expand-all')
            .then(done)
            .catch(done);
        });

        it(`should find ${mainAgreement.name} in "Related Agreements" section`, done => {
          evaluateRelationship(nightmare, done, {
            name: mainAgreement.name,
            note: agreement.note,
            relationship: agreement.relationship.inward.label,
          });
        });
      });
    });
  });
};
