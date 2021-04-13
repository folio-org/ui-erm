/* global before, after, Nightmare */

const AgreementCRUD = require('./agreement-crud');
const Basket = require('./basket');
const Utils = require('./utils');

module.exports.test = (uiTestCtx) => {
  describe('ui-agreements: PO Lines / Orders integration', function test() {
    const { config, helpers } = uiTestCtx;
    const nightmare = new Nightmare(config.nightmare);
    const values = {
      name: `PO Lines Agreement #${Math.round(Math.random() * 100000)}`,
    };

    let poLine = {};
    const basket = [];

    this.timeout(Number(config.test_timeout));

    describe('create agreement w/ agreement lines > link PO line > unlink PO line > link other PO line', () => {
      before((done) => {
        helpers.login(nightmare, config, done);
      });

      after((done) => {
        helpers.logout(nightmare, config, done);
      });

      it('should open Agreements app', done => {
        helpers.clickApp(nightmare, done, 'agreements');
      });

      Utils.shouldNavToEResources(nightmare);
      Basket.shouldAddTitleToBasket(nightmare, 1, basket);

      it(`should create agreement: ${values.name}`, function _(done) {
        AgreementCRUD.createAgreement(nightmare, done, values, basket[0].id);
      });

      Basket.shouldHaveCorrectAgreementLines(nightmare, [0], basket);

      it('should link a PO line', done => {
        nightmare
          .click('#clickable-edit-agreement') // edit button removed, ERM-693
          .waitUntilNetworkIdle(2000)
          .wait('#agreement-form-lines [data-test-ag-line-number="0"] #add-poline-btn-0')
          .click('#agreement-form-lines [data-test-ag-line-number="0"] #add-poline-btn-0')
          .waitUntilNetworkIdle(2000)
          .wait('#edit-poline-0-0-find-poline-btn')
          .click('#edit-poline-0-0-find-poline-btn')
          .wait('#clickable-filter-receiptStatus-pending')
          .click('#clickable-filter-receiptStatus-pending')
          .waitUntilNetworkIdle(2000)
          .evaluate(() => {
            const row = document.querySelector('#list-plugin-find-records [class*=mclScrollable] [aria-rowindex="2"]');
            return {
              poLineNumber: row.children[0].textContent,
              title: row.children[1].textContent,
            };
          })
          .waitUntilNetworkIdle(2000)
          .then(selectedPOLine => {
            poLine = { ...selectedPOLine };

            nightmare
              .click('#list-plugin-find-records [class*=mclScrollable] [aria-rowindex="2"]')
              //  .wait('#clickable-unlink-poline-0')
              //  .wait('#poline-delete-0-0')
              .wait(5000)
              .evaluate(_selectedPOLine => {
                const header = document.querySelector('[data-test-po-line-number]').innerText;
                const title = document.querySelector('[data-test-po-line-title]').innerText;

                if (header.indexOf(_selectedPOLine.poLineNumber) < 0) {
                  throw Error(`Expected to find PO Line Number of ${_selectedPOLine.poLineNumber} in card header.`);
                }

                if (title !== _selectedPOLine.title) {
                  throw Error(`Expected to find PO Line Title of "${_selectedPOLine.title}"`);
                }
              }, selectedPOLine)
              .then(done)
              .catch(done);
          })
          .catch(done);
      });

      it('should save agreement', done => {
        nightmare
          .click('#clickable-update-agreement')
          .waitUntilNetworkIdle(2000)
          .then(done)
          .catch(done);
      });

      it('should see PO Line in agreement lines table', done => {
        nightmare
          .wait('#accordion-toggle-button-lines')
          .click('#accordion-toggle-button-lines')
          .wait('#agreement-lines a[data-test-po-line]')
          .waitUntilNetworkIdle(2000)
          .evaluate(_poLine => {
            const poLineLink = document.querySelector('#agreement-lines a[data-test-po-line]');
            if (!poLineLink) {
              throw Error('Expected to find <a data-test-po-line> tag.');
            }

            if (poLineLink.textContent !== _poLine.poLineNumber) {
              throw Error(`Expected link to show PO Line Number of "${_poLine.poLineNumber}" and found "${poLineLink.textContent}".`);
            }
          }, poLine)
          .then(done)
          .catch(done);
      });
    });
  });
};
