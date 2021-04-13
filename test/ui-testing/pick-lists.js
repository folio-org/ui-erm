/* global before, after, Nightmare */

module.exports.test = (uiTestCtx) => {
  const number = Math.round(Math.random() * 100000);
  const editText = '-edited';
  const pickList = `pickList${number}`;
  const pickListValue = `pickListValue${number}`;
  const editedPickListValue = `${pickListValue}${editText}`;

  describe('Pick list crud', function test() {
    const { config, helpers } = uiTestCtx;
    const nightmare = new Nightmare(config.nightmare);
    nightmare.options.width = 1300; // added this temporarily as MultiSelect doesnt work well with narrow screen sizes

    this.timeout(Number(config.test_timeout));

    describe('Login > Open settings > Create and edit pick list > Create and edit pick list value > Delete value and pick list > Logout\n', () => {
      before((done) => {
        helpers.login(nightmare, config, done);
      });

      after((done) => {
        helpers.logout(nightmare, config, done);
      });

      it('should open Settings', done => {
        helpers.clickSettings(nightmare, done);
      });

      it(`should create pick list ${pickList} in settings`, done => {
        nightmare
          .wait('a[href="/settings/erm"]')
          .click('a[href="/settings/erm"]')
          .wait('a[href="/settings/erm/pick-lists"]')
          .click('a[href="/settings/erm/pick-lists"]')
          .waitUntilNetworkIdle(2000)
          .wait('#clickable-add-pick-lists')
          .click('#clickable-add-pick-lists')
          .wait('input[name="items[0].desc"]')
          .type('input[name="items[0].desc"]', pickList)
          .wait('#clickable-save-pick-lists-0')
          .click('#clickable-save-pick-lists-0')
          .waitUntilNetworkIdle(2000)
          .then(done)
          .catch(done);
      });

      it(`should find pick list ${pickList}`, done => {
        nightmare
          .wait('a[href="/settings/erm"]')
          .click('a[href="/settings/erm"]')
          .wait('a[href="/settings/erm/pick-lists"]')
          .click('a[href="/settings/erm/pick-lists"]')
          .wait('#editList-pick-lists')
          .evaluate(list => {
            const listRows = [...document.querySelectorAll('#editList-pick-lists [role="row"]')].map(e => e.textContent);
            const listElement = listRows.find(r => r.indexOf(list) >= 0);
            if (!listElement) {
              throw Error(`Could not find row with the list ${list}`);
            }
          }, pickList)
          .then(done)
          .catch(done);
      });

      it(`should create pick list value ${pickListValue} in settings`, done => {
        nightmare
          .wait('a[href="/settings/erm"]')
          .click('a[href="/settings/erm"]')
          .wait('a[href="/settings/erm/pick-list-values"]')
          .click('a[href="/settings/erm/pick-list-values"]')
          .waitUntilNetworkIdle(2000)
          .wait('#categorySelect')
          .type('#categorySelect', pickList)
          .wait('#clickable-add-pick-list-values')
          .click('#clickable-add-pick-list-values')
          .wait('input[name="items[0].label"]')
          .type('input[name="items[0].label"]', pickListValue)
          .wait('#clickable-save-pick-list-values-0')
          .click('#clickable-save-pick-list-values-0')
          .waitUntilNetworkIdle(2000)
          .then(done)
          .catch(done);
      });

      it(`should find pick list value ${pickListValue} in list`, done => {
        nightmare
          .wait('#editList-pick-list-values')
          .evaluate(value => {
            const valueRows = [...document.querySelectorAll('#editList-pick-list-values [role="row"]')].map(e => e.textContent);
            const valueElement = valueRows.find(r => r.indexOf(value) >= 0);
            if (!valueElement) {
              throw Error(`Could not find row with the edited value ${value}`);
            }
          }, pickListValue)
          .then(done)
          .catch(done);
      });

      it(`should edit pick list value ${pickListValue} in settings`, done => {
        nightmare
          .wait('a[href="/settings/erm"]')
          .click('a[href="/settings/erm"]')
          .wait('a[href="/settings/erm/pick-list-values"]')
          .click('a[href="/settings/erm/pick-list-values"]')
          .waitUntilNetworkIdle(2000)
          .wait('#categorySelect')
          .type('#categorySelect', pickList)
          .wait('#clickable-edit-pick-list-values-0')
          .click('#clickable-edit-pick-list-values-0')
          .wait('input[name="items[0].label"]')
          .type('input[name="items[0].label"]', editText)
          .wait('#clickable-save-pick-list-values-0')
          .click('#clickable-save-pick-list-values-0')
          .waitUntilNetworkIdle(2000)
          .then(done)
          .catch(done);
      });

      it(`should find edited pick list value ${editedPickListValue} in list`, done => {
        nightmare
          .wait('#editList-pick-list-values')
          .evaluate(value => {
            const valueRows = [...document.querySelectorAll('#editList-pick-list-values [role="row"]')].map(e => e.textContent);
            const valueElement = valueRows.find(r => r.indexOf(value) >= 0);
            if (!valueElement) {
              throw Error(`Could not find row with the edited value ${value}`);
            }
          }, editedPickListValue)
          .then(done)
          .catch(done);
      });

      it(`should not find pick list value ${pickListValue} in list`, done => {
        nightmare
          .wait('#editList-pick-list-values')
          .evaluate(value => {
            const row = document.evaluate(
              `//*[@id="editList-pick-list-values"]//div[.="${value}"]`,
              document,
              null,
              XPathResult.FIRST_ORDERED_NODE_TYPE
            ).singleNodeValue;
            if (row != null) {
              throw Error(`Should not find row with value ${value}`);
            }
          }, pickListValue)
          .then(done)
          .catch(done);
      });

      it(`should delete pick list value ${editedPickListValue}`, done => {
        nightmare
          .waitUntilNetworkIdle(2000)
          .wait('#editList-pick-list-values')
          .wait('#clickable-delete-pick-list-values-0')
          .click('#clickable-delete-pick-list-values-0')
          .waitUntilNetworkIdle(2000)
          .wait('#clickable-delete-controlled-vocab-entry-confirmation-confirm')
          .click('#clickable-delete-controlled-vocab-entry-confirmation-confirm')
          .waitUntilNetworkIdle(2000)
          .evaluate(value => {
            const row = document.evaluate(
              `//*[@id="editList-pick-list-values"]//div[.="${value}"]`,
              document,
              null,
              XPathResult.FIRST_ORDERED_NODE_TYPE
            ).singleNodeValue;
            if (row != null) {
              throw Error(`Should not find row with value ${value}`);
            }
          }, editedPickListValue)
          .then(done)
          .catch(done);
      });

      it(`should delete the pick list ${pickList}`, done => {
        nightmare
          .wait('a[href="/settings/erm"]')
          .click('a[href="/settings/erm"]')
          .wait('a[href="/settings/erm/pick-lists"]')
          .click('a[href="/settings/erm/pick-lists"]')
          .waitUntilNetworkIdle(2000)
          .evaluate(_pickList => {
            const rowNumber = [...document.querySelectorAll('#editList-pick-lists [role="row"]')]
              .map(e => e.textContent)
              .findIndex(i => i.indexOf(_pickList) >= 0) - 1;   // to account for the row header
            return rowNumber;
          }, pickList)
          .then(rowNumber => {
            nightmare
              .wait(`#clickable-delete-pick-lists-${rowNumber}`)
              .click(`#clickable-delete-pick-lists-${rowNumber}`)
              .waitUntilNetworkIdle(2000)
              .wait('#clickable-delete-controlled-vocab-entry-confirmation-confirm')
              .click('#clickable-delete-controlled-vocab-entry-confirmation-confirm')
              .waitUntilNetworkIdle(2000)
              .evaluate(list => {
                const row = document.evaluate(
                  `//*[@id="editList-pick-lists"]//div[.="${list}"]`,
                  document,
                  null,
                  XPathResult.FIRST_ORDERED_NODE_TYPE
                ).singleNodeValue;
                if (row != null) {
                  throw Error(`Should not find row with list ${list}`);
                }
              }, pickList)
              .then(done)
              .catch(done);
          })
          .catch(done);
      });
    });
  });
};
