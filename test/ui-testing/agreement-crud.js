/* global before, after, Nightmare */
const Utils = require('./utils');

const generateAgreementValues = () => {
  const number = Math.round(Math.random() * 100000);
  return {
    name: `Fledgling Agreement #${number}`,
    description: `This agreement of count #${number} is still in its initial stages.`,
    renewalPriority: 'For review',
    isPerpetual: 'Yes',
    editedName: ' v2',
    editedRenewalPriority: 'Definitely renew',
    editedStatus: 'In negotiation',
  };
};

const agreementLines = () => {
  const activeFrom = '10/13/2019';
  const activeTo = '10/31/2020';
  return {
    activeFrom,
    activeTo,
    formattedActiveFrom: Utils.formattedDate(activeFrom),
    formattedActiveTo: Utils.formattedDate(activeTo),
  };
};

const createAgreement = (nightmare, done, defaultValues, resourceId) => {
  const values = defaultValues || generateAgreementValues();
  const lines = agreementLines();

  let chain = nightmare
    .wait('#agreements-module-display')
    .click('#clickable-nav-agreements')
    .wait('#clickable-new-agreement')
    .click('#clickable-new-agreement')
    .wait('#form-loaded')

    .insert('#edit-agreement-name', values.name)
    .insert('#edit-agreement-description', values.description)

    .click('#period-start-date-0')
    .type('#period-start-date-0', '\u000d') // "Enter" selects current date

    .insert('#period-end-date-0', '01/31/2088')
    .insert('#period-cancellation-deadline-0', '01/15/2088')

    .type('#edit-agreement-status', 'draft')
    .type('#edit-agreement-renewal-priority', 'for')
    .type('#edit-agreement-is-perpetual', 'yes');

  if (resourceId) {
    chain = chain
      .click('#add-agreement-line-button')
      .click('[id*="-basket-selector"]')
      .click(`[id*="${resourceId}"]`)
      .click('[id*="basket-selector-add-button"]')
      .wait('#agreement-line-0-active-from')
      .insert('#agreement-line-0-active-from', lines.activeFrom)
      .insert('#agreement-line-0-active-to', lines.activeTo)
      .wait(1000);
  }

  chain
    .click('#clickable-create-agreement')
    .wait('[data-test-agreement-info]')
    .wait(agreementName => {
      const nameElement = document.querySelector('[data-test-agreement-name]');
      if (!nameElement) return false;

      return nameElement.innerText.trim() === agreementName;
    }, values.name)
    .evaluate((expectedValues, _resourceId, _lines) => {
      const foundName = document.querySelector('[data-test-agreement-name]').innerText.trim();
      if (foundName !== expectedValues.name) {
        throw Error(`Name of agreement is incorrect. Expected "${expectedValues.name}" and got "${foundName}" `);
      }

      const foundDescription = document.querySelector('[data-test-agreement-description]').innerText;
      if (expectedValues.description && (foundDescription !== expectedValues.description)) {
        throw Error(`Description of agreement is incorrect. Expected "${expectedValues.description}" and got "${foundDescription}" `);
      }

      const foundRenewalPriority = document.querySelector('[data-test-agreement-renewal-priority]').innerText;
      if (expectedValues.renewalPriority && (foundRenewalPriority !== expectedValues.renewalPriority)) {
        throw Error(`RenewalPriority of agreement is incorrect. Expected "${expectedValues.renewalPriority}" and got "${foundRenewalPriority}" `);
      }

      const foundIsPerpetual = document.querySelector('[data-test-agreement-is-perpetual]').innerText;
      if (expectedValues.isPerpetual && (foundIsPerpetual !== expectedValues.isPerpetual)) {
        throw Error(`IsPerpetual of agreement is incorrect. Expected "${expectedValues.isPerpetual}" and got "${foundIsPerpetual}" `);
      }

      if (_resourceId) {
        const activeFrom = document.querySelector('[data-test-active-from]').textContent;
        if (_lines.activeFrom && (activeFrom !== _lines.formattedActiveFrom)) {
          throw Error(`Active from date of agreement line is incorrect. Expected "${_lines.formattedActiveFrom}" and got "${activeFrom}"`);
        }

        const activeTo = document.querySelector('[data-test-active-to]').textContent;
        if (_lines.activeTo && (activeTo !== _lines.formattedActiveTo)) {
          throw Error(`Active to date of agreement line is incorrect. Expected "${_lines.formattedActiveTo}" and got "${activeTo}"`);
        }
      }
    }, values, resourceId, lines)
    .then(done)
    .catch(done);

  return values;
};

module.exports.generateAgreementValues = generateAgreementValues;
module.exports.createAgreement = createAgreement;

module.exports.test = (uiTestCtx) => {
  describe('ui-agreements: basic agreement crud', function test() {
    const { config, helpers } = uiTestCtx;
    const nightmare = new Nightmare(config.nightmare);
    const values = generateAgreementValues();

    this.timeout(Number(config.test_timeout));

    describe('open agreements > create, view, edit agreement', () => {
      before((done) => {
        helpers.login(nightmare, config, done);
      });

      after((done) => {
        helpers.logout(nightmare, config, done);
      });

      it('should open Agreements app', done => {
        helpers.clickApp(nightmare, done, 'agreements');
      });

      it('should confirm correct URL', done => {
        nightmare
          .evaluate(() => document.location.pathname)
          .then(pathName => {
            if (!pathName.includes('/erm/agreements')) throw Error('URL is incorrect');
            done();
          })
          .catch(done);
      });

      it('should create agreement', done => {
        createAgreement(nightmare, done, values);
      });

      it(`should search for and find agreement: ${values.name}`, done => {
        nightmare
          .wait('#input-agreement-search')
          .insert('#input-agreement-search', values.name)
          .click('#clickable-search-agreements')
          .wait(1000) // If another agreement was open wait for the new one to be open before the next operation.
          .wait('[data-test-agreement-info]')
          .evaluate(expectedValues => {
            const node = document.querySelector('[data-test-agreement-name]');
            if (!node || !node.innerText) throw Error('No agreement name node found.');

            const name = node.innerText.trim();
            if (name !== expectedValues.name) {
              throw Error(`Name of found agreement is incorrect. Expected "${expectedValues.name}" and got "${name}" `);
            }
          }, values)
          .then(done)
          .catch(done);
      });

      it(`should edit agreement to: ${values.name}${values.editedName}`, done => {
        nightmare
          .wait('#clickable-edit-agreement') // edit button removed, ERM-693
          .click('#clickable-edit-agreement') // edit button removed, ERM-693
          .wait('#form-loaded')

          .insert('#edit-agreement-name', values.editedName)

          .click('#datepicker-clear-button-period-start-date-0')
          .insert('#period-start-date-0', '10/31/2019')
          .click('#datepicker-clear-button-period-end-date-0')
          .insert('#period-end-date-0', '10/31/2020')
          .click('#datepicker-clear-button-period-cancellation-deadline-0')
          .insert('#period-cancellation-deadline-0', '10/15/2020')

          .type('#edit-agreement-status', values.editedStatus)
          .type('#edit-agreement-renewal-priority', values.editedRenewalPriority)
          .click('#clickable-update-agreement')
          .wait('[data-test-agreement-info]')
          .waitUntilNetworkIdle(2000)
          .evaluate(expectedValues => {
            const name = document.querySelector('[data-test-agreement-name]').innerText.trim();
            const expectedName = (expectedValues.name + expectedValues.editedName);
            if (name !== expectedName) {
              throw Error(`Name of found agreement is incorrect. Expected "${expectedName}" and got "${name}" `);
            }

            const status = document.querySelector('[data-test-agreement-status]').innerText;
            if (status !== expectedValues.editedStatus) {
              throw Error(`Status of agreement is incorrect. Expected "${expectedValues.editedStatus}" and got "${status}" `);
            }

            const renewalPriority = document.querySelector('[data-test-agreement-renewal-priority]').innerText;
            if (renewalPriority !== expectedValues.editedRenewalPriority) {
              throw Error(`Renewal Priority of agreement is incorrect. Expected "${expectedValues.editedRenewalPriority}" and got "${renewalPriority}" `);
            }
          }, values)
          .then(done)
          .catch(done);
      });
    });
  });
};
