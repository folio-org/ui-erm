/* global before, after, Nightmare */
const AgreementCRUD = require('./agreement-crud');

module.exports.test = (uiTestCtx) => {
  const number = Math.round(Math.random() * 100000);
  const licenses = [{
    name: `Controlling License #${number}`,
    note: `This controlling license was automatically created and linked for run ${number}`,
    status: 'Controlling',
    startDate: '07/01/2018',
  }];

  const term = {
    name: 'otherRestrictions',
    label: 'Other restrictions',
    value: 'A Few',
  };

  const agreement = {
    name: `Linked License Agreement #${number}`,
  };

  describe('ui-agreements: license terms', function test() {
    const { config, helpers } = uiTestCtx;
    const nightmare = new Nightmare(config.nightmare);

    this.timeout(Number(config.test_timeout));

    describe('create license > edit terms > create agreement > link license > check term', () => {
      before((done) => {
        helpers.login(nightmare, config, done);
      });

      after((done) => {
        helpers.logout(nightmare, config, done);
      });

      it('should open Licenses app', done => {
        helpers.clickApp(nightmare, done, 'licenses');
      });

      licenses.forEach(l => {
        it(`should create new license: ${l.name}`, done => {
          nightmare
            .wait('#clickable-new-license')
            .click('#clickable-new-license')

            .waitUntilNetworkIdle(2000) // Wait for the default values to be fetched and set.

            .wait('#edit-license-name')
            .insert('#edit-license-name', l.name)
            .insert('#edit-license-start-date', l.startDate)

            .then(done)
            .catch(done);
        });

        it(`should add term ${term.name} w/ value ${term.value}`, done => {
          nightmare
            .click('#add-customproperty-btn')
            .type('[data-test-customproperty=optional] [data-test-customproperty-name]', 'o')
            .type('[data-test-customproperty=optional] [data-test-customproperty-value]', term.value)
            .then(done)
            .catch(done);
        });

        it('should create license', done => {
          nightmare
            .click('#clickable-create-license')
            .wait('#list-licenses')
            .waitUntilNetworkIdle(1000)
            .then(done)
            .catch(done);
        });

        it('should find new term in terms list', done => {
          nightmare
            .evaluate((expectedTerm) => {
              const nameElement = document.querySelector(`[data-test-customproperty-label=${expectedTerm.name}]`);
              const valueElement = document.querySelector(`[data-test-customproperty-value=${expectedTerm.name}]`);

              if (!nameElement) {
                throw Error(`Expected to find ${expectedTerm.name} label`);
              }

              if (nameElement.textContent !== expectedTerm.label) {
                throw Error(`Expected to find ${expectedTerm.label}`);
              }

              if (!valueElement) {
                throw Error(`Expected to find ${expectedTerm.name} value`);
              }

              if (valueElement.textContent !== expectedTerm.value) {
                throw Error(`Expected to find ${expectedTerm.value}`);
              }
            }, term)
            .then(done)
            .catch(done);
        });
      });

      it('should open Agreements app', done => {
        helpers.clickApp(nightmare, done, 'agreements');
      });

      it(`should create agreement: ${agreement.name}`, done => {
        AgreementCRUD.createAgreement(nightmare, done, agreement);
      });

      it('should open edit agreement page', done => {
        nightmare
          .wait('#clickable-edit-agreement') // edit button removed, ERM-693
          .click('#clickable-edit-agreement') // edit button removed, ERM-693
          .wait('#formLicenses')
          .waitUntilNetworkIdle(1000)
          .then(done)
          .catch(done);
      });

      licenses.forEach((l, i) => {
        it(`should link license: ${l.name}`, done => {
          nightmare
            .click('#add-license-btn')
            .wait(`#linkedLicenses-remoteId-${i}-find-license-btn`)
            .click(`#linkedLicenses-remoteId-${i}-find-license-btn`)
            .wait('#plugin-find-license-modal')
            .waitUntilNetworkIdle(1000)
            .wait('#plugin-find-license-modal #input-license-search')
            .insert('#plugin-find-license-modal #input-license-search', l.name)
            .wait('#plugin-find-license-modal #clickable-search-licenses')
            .click('#plugin-find-license-modal #clickable-search-licenses')
            .wait('#list-licenses[data-total-count="1"]')
            .wait(`#plugin-find-license-modal [role="row"][data-label*="${l.name}"]`)
            .click(`#plugin-find-license-modal [role="row"][data-label*="${l.name}"]`)
            .wait(`#linkedLicenses-remoteId-${i}-license-card`)
            .waitUntilNetworkIdle(2000)
            .insert(`#linkedLicenses-note-${i}`, l.note)
            .then(done)
            .catch(done);
        });
      });

      it('should fail to save due to license link status being unselected', done => {
        nightmare
          .click('#clickable-update-agreement')
          .evaluate(() => {
            if (!document.querySelector('label[for*="linkedLicenses-status-"] ~ div[role="alert"] [class*="feedbackError"]')) {
              throw Error('Expected to find a license link status error messages because it is undefined and did not');
            }
          })
          .then(done)
          .catch(done);
      });

      it('should set license link statuses', done => {
        licenses.reduce((nightmare2, l, i) => (
          nightmare2.type(`#linkedLicenses-status-${i}`, l.status)
        ), nightmare)
          .evaluate(() => {
            const error = document.querySelector('label[for*="linkedLicenses-status-"] ~ div[role="alert"] [class*="feedbackError"]');
            if (error) {
              throw Error(`Found license link status error message: ${error}`);
            }
          })
          .then(done)
          .catch(done);
      });

      it('should save updated agreement', done => {
        nightmare
          .click('#clickable-update-agreement')
          .wait('[data-test-agreement-info]')
          .waitUntilNetworkIdle(2000)
          .wait('#clickable-expand-all')
          .click('#clickable-expand-all')
          .then(done)
          .catch(done);
      });

      const controllingLicense = licenses.find(l => l.status === 'Controlling');
      if (controllingLicense) {
        it('should find controlling license', done => {
          nightmare
            .wait('#agreement-controlling-license')
            .evaluate(expected => {
              const controllingLicenseElement = document.querySelector('#agreement-controlling-license');
              if (!controllingLicenseElement) throw Error('Failed to find controlling license element');

              const name = controllingLicenseElement.querySelector('[data-test-license-name]').innerText;
              if (name !== expected.name) throw Error(`Expected controlling license name "${expected.name}" and found "${name}".`);
            }, controllingLicense)
            .then(done)
            .catch(done);
        });
      }

      it(`should find term ${term.name} in terms list`, done => {
        nightmare
          .evaluate((expectedTerm) => {
            const nameElement = document.querySelector(`[data-test-customproperty-label=${expectedTerm.name}]`);
            const valueElement = document.querySelector(`[data-test-customproperty-value=${expectedTerm.name}]`);

            if (!nameElement) {
              throw Error(`Expected to find ${expectedTerm.name} label`);
            }

            if (nameElement.textContent !== expectedTerm.label) {
              throw Error(`Expected to find term name ${expectedTerm.label}`);
            }

            if (!valueElement) {
              throw Error(`Expected to find ${expectedTerm.name} value`);
            }

            if (valueElement.textContent !== expectedTerm.value) {
              throw Error(`Expected to find term value ${expectedTerm.value}`);
            }
          }, term)
          .then(done)
          .catch(done);
      });
    });
  });
};
