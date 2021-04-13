/* global before, after, Nightmare */
const AgreementCRUD = require('./agreement-crud');

module.exports.test = (uiTestCtx) => {
  describe('ui-agreements: E-Resources functionality visibility', function test() {
    const { config, helpers } = uiTestCtx;
    const nightmare = new Nightmare(config.nightmare);
    const agreement = AgreementCRUD.generateAgreementValues();

    this.timeout(Number(config.test_timeout));

    describe('see E-Resources functionality > hide it > show it', () => {
      before(done => {
        helpers.login(nightmare, config, done);
      });

      after(done => {
        helpers.logout(nightmare, config, done);
      });

      it('should open Settings', done => {
        helpers.clickSettings(nightmare, done);
      });

      it('should open Agreements Settings and ensure E-Resources functionality is visible', done => {
        nightmare
          .wait('a[href="/settings/erm"]')
          .click('a[href="/settings/erm"]')
          .wait('a[href="/settings/erm/general"]')
          .click('a[href="/settings/erm/general"]')
          .wait('#hideEResourcesFunctionality')
          .evaluate(() => document.getElementById('hideEResourcesFunctionality').checked)
          .then(hideEResources => {
            let chain = nightmare;

            if (hideEResources) {
              chain = nightmare
                .click('#hideEResourcesFunctionality')
                .click('#clickable-save-agreements-general-settings')
                .waitUntilNetworkIdle(1000)
                .evaluate(() => {
                  if (document.getElementById('hideEResourcesFunctionality').checked) {
                    throw Error('Failed to unset "hideEResourcesFunctionality"');
                  }
                });
            }

            chain
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

      it('should confirm visibility of E-Resources page elements', done => {
        nightmare
          .wait('#accordion-toggle-button-lines')
          .click('#accordion-toggle-button-lines')
          .evaluate(() => {
            if (!document.getElementById('clickable-nav-eresources')) throw Error('Failed to find "E-Resources" nav button.');
            if (!document.getElementById('open-basket-button')) throw Error('Failed to find "Open Basket" button.');
          })
          .then(done)
          .catch(done);
      });

      it('should confirm ability to add agreement lines', done => {
        nightmare
          .wait('#clickable-edit-agreement') // edit button removed, ERM-693
          .click('#clickable-edit-agreement') // edit button removed, ERM-693
          .wait('#add-agreement-line-button')
          .then(done)
          .catch(done);
      });

      it('should open Settings and hide E-Resources functionality', done => {
        nightmare
          .wait('#app-list-item-clickable-settings')
          .click('#app-list-item-clickable-settings')
          .wait('a[href="/settings/erm"]')
          .click('a[href="/settings/erm"]')
          .wait('a[href="/settings/erm/general"]')
          .click('a[href="/settings/erm/general"]')
          .click('#hideEResourcesFunctionality')
          .click('#clickable-save-agreements-general-settings')
          .waitUntilNetworkIdle(1000)
          .evaluate(() => {
            if (!document.getElementById('hideEResourcesFunctionality').checked) {
              throw Error('Failed to set "hideEResourcesFunctionality"');
            }
          })
          .then(done)
          .catch(done);
      });

      it('should open Agreements app', done => {
        helpers.clickApp(nightmare, done, 'agreements');
      });

      it('should not see "Add Agreement Line" button', done => {
        nightmare
          .wait('#formLines')
          .waitUntilNetworkIdle(1000)
          .evaluate(() => {
            if (document.getElementById('add-agreement-line-button')) throw Error('Found unexpected "Add Agreement Line" button');
          })
          .then(done)
          .catch(done);
      });

      it('should close Edit and not find E-Resources page elements', done => {
        nightmare
          .click('#close-agreement-form-button')
          .wait('#accordion-toggle-button-lines')
          .click('#accordion-toggle-button-lines')
          .evaluate(() => {
            if (document.getElementById('clickable-nav-eresources')) throw Error('Found unexpected "E-Resources" nav button.');
            if (document.getElementById('open-basket-button')) throw Error('Found unexpected "Open Basket" button.');
            if (document.getElementById('eresources-covered')) throw Error('Found unexpected "E-Resources Covered" accordion.');
          })
          .then(done)
          .catch(done);
      });

      it('should open Settings and show E-Resources functionality', done => {
        nightmare
          .wait('#app-list-item-clickable-settings')
          .click('#app-list-item-clickable-settings')
          .wait('a[href="/settings/erm"]')
          .click('a[href="/settings/erm"]')
          .wait('a[href="/settings/erm/general"]')
          .click('a[href="/settings/erm/general"]')
          .click('#hideEResourcesFunctionality')
          .click('#clickable-save-agreements-general-settings')
          .waitUntilNetworkIdle(1000)
          .evaluate(() => {
            if (document.getElementById('hideEResourcesFunctionality').checked) {
              throw Error('Failed to unset "hideEResourcesFunctionality"');
            }
          })
          .then(done)
          .catch(done);
      });
    });
  });
};
