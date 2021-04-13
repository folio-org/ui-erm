/* global before, after, Nightmare */
const AgreementCRUD = require('./agreement-crud');

module.exports.test = (uiTestCtx) => {
  const number = Math.round(Math.random() * 100000);
  const licenses = [{
    name: `Controlling License #${number}`,
    note: `This controlling license was automatically created and linked for run ${number}`,
    status: 'Controlling',
    startDate: '07/01/2018',
  }, {
    name: `Future License #${number}`,
    note: `This future license was automatically created and linked for run ${number}`,
    status: 'Future',
    startDate: '07/01/2028',
  }, {
    name: `Historical License #${number}`,
    note: `This historical license was automatically created and linked for run ${number}`,
    status: 'Historical',
    startDate: '07/01/2008',
  }];

  const agreement = {
    name: `Linked License Agreement #${number}`,
  };

  describe('ui-agreements: linked licenses', function test() {
    const { config, helpers } = uiTestCtx;
    const nightmare = new Nightmare(config.nightmare);

    this.timeout(Number(config.test_timeout));

    describe('create agreement > link licenses', () => {
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

            .click('#clickable-create-license')

            .waitUntilNetworkIdle(2000)
            .wait('#clickable-expand-all')
            .click('#clickable-expand-all')
            .click('#add-amendment-button')
            .wait('#edit-amendment-name')
            .insert('#edit-amendment-name', 'Current Amendment')
            .click('#clickable-create-amendment')
            .waitUntilNetworkIdle(2000)
            .click('#pane-view-amendment [icon="times"]')
            .wait('#licenseAmendments')

            .wait('#clickable-expand-all')
            .click('#clickable-expand-all')
            .click('#add-amendment-button')
            .wait('#edit-amendment-name')
            .insert('#edit-amendment-name', 'Future Amendment')
            .click('#clickable-create-amendment')
            .waitUntilNetworkIdle(2000)
            .click('#pane-view-amendment [icon="times"]')
            .wait('#licenseAmendments')

            .wait('#clickable-expand-all')
            .click('#clickable-expand-all')
            .click('#add-amendment-button')
            .wait('#edit-amendment-name')
            .insert('#edit-amendment-name', 'Historical Amendment')
            .click('#clickable-create-amendment')
            .waitUntilNetworkIdle(2000)
            .click('#pane-view-amendment [icon="times"]')
            .wait('#licenseAmendments')

            .then(() => nightmare.click('#pane-view-license button[icon=times]'))
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

      it('should open edit agreement page and open licenses accordion', done => {
        nightmare
          .wait('#clickable-edit-agreement') // edit button removed, ERM-693
          .click('#clickable-edit-agreement') // edit button removed, ERM-693
          .wait('#formLicenses')
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

      it('should fail to save due to multiple controlling licenses', done => {
        licenses.reduce((nightmare2, l, i) => (
          nightmare2.type(`#linkedLicenses-status-${i}`, 'Controlling')
        ), nightmare)
          .evaluate(() => {
            if (!document.querySelector('label[for*="linkedLicenses-status-"] ~ div[role="alert"] [class*="feedbackError"]')) {
              throw Error('Expected to find a license link status error message because of multiple controlling licenses and did not');
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

      it('should fail due to unset amendment statuses', done => {
        nightmare
          .click('#clickable-update-agreement')
          .evaluate(() => {
            if (!document.querySelector('[data-test-amendment] [class*="feedbackError"]')) {
              throw Error('Expected to find an amendment status error message because it is undefined and did not');
            }
          })
          .then(done)
          .catch(done);
      });

      licenses.forEach((l, i) => {
        it(`should set amendment statuses for ${l.name}`, done => {
          nightmare
            .type(`#linkedLicenses-remoteId-${i}-license-card [data-test-amendment="Current Amendment"] select`, 'Current')
            .type(`#linkedLicenses-remoteId-${i}-license-card [data-test-amendment="Historical Amendment"] select`, 'Historical')
            .type(`#linkedLicenses-remoteId-${i}-license-card [data-test-amendment="Future Amendment"] select`, 'Future')
            .then(done)
            .catch(done);
        });
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

        it('should find controlling license\'s Current Amendment', done => {
          nightmare
            .evaluate(() => {
              const a = document.querySelector('#controlling-license-current-amendments [data-row-index="row-0"] a');
              if (!a) throw Error('Failed to find link to current amendment');
              if (a.textContent !== 'Current Amendment') throw Error('Link to current amendment is labelled incorrectly.');
            })
            .then(done)
            .catch(done);
        });

        it('should find controlling license\'s Future Amendment', done => {
          nightmare
            .evaluate(() => {
              const a = document.querySelector('#controlling-license-future-amendments [data-row-index="row-0"] a');
              if (!a) throw Error('Failed to find link to future amendment');
              if (a.textContent !== 'Future Amendment') throw Error('Link to future amendment is labelled incorrectly.');
            })
            .then(done)
            .catch(done);
        });

        it('should find controlling license\'s Historical Amendment', done => {
          nightmare
            .evaluate(() => {
              const a = document.querySelector('#controlling-license-historical-amendments [data-row-index="row-0"] a');
              if (!a) throw Error('Failed to find link to historical amendment');
              if (a.textContent !== 'Historical Amendment') throw Error('Link to current amendment is labelled incorrectly.');
            })
            .then(done)
            .catch(done);
        });
      }

      const historicalLicenses = licenses.filter(l => l.status === 'Historical');
      if (historicalLicenses) {
        it('should find historical licenses', done => {
          nightmare
            .evaluate(expected => {
              const cards = [...document.querySelectorAll('#historicalLicenses [data-test-linked-license-card]')];

              expected.forEach(l => {
                const card = cards.find(c => c.querySelector(`[data-test-license-name="${l.name}"]`));
                if (!card) throw Error(`Failed to find historical license card for "${l.name}"`);

                const name = card.querySelector(`[data-test-license-name="${l.name}"]`).innerText;
                if (name !== l.name) throw Error(`Expected license name to be "${l.name}"`);
              });
            }, historicalLicenses)
            .then(done)
            .catch(done);
        });

        it('should find historical license\'s three amendments', done => {
          nightmare
            .evaluate(() => {
              if (document.querySelectorAll('#agreement-historical-license-0-amendments [data-row-index]').length !== 3) {
                throw Error('Expected to find a list of three amendments');
              }
            })
            .then(done)
            .catch(done);
        });
      }

      const futureLicenses = licenses.filter(l => l.status === 'Future');
      if (futureLicenses) {
        it('should find future licenses', done => {
          nightmare
            .evaluate(expected => {
              const cards = [...document.querySelectorAll('#futureLicenses [data-test-linked-license-card]')];

              expected.forEach(l => {
                const card = cards.find(c => c.querySelector(`[data-test-license-name="${l.name}"]`));
                if (!card) throw Error(`Failed to find future license card for "${l.name}"`);

                const name = card.querySelector(`[data-test-license-name="${l.name}"]`).innerText;
                if (name !== l.name) throw Error(`Expected license name to be "${l.name}"`);
              });
            }, futureLicenses)
            .then(done)
            .catch(done);
        });

        it('should find future license\'s three amendments', done => {
          nightmare
            .evaluate(() => {
              if (document.querySelectorAll('#agreement-future-license-0-amendments [data-row-index]').length !== 3) {
                throw Error('Expected to find a list of three amendments');
              }
            })
            .then(done)
            .catch(done);
        });
      }

      it('should open Licenses app', done => {
        helpers.clickApp(nightmare, done, 'licenses');
      });

      it(`should find and open ${licenses[0].name}`, done => {
        nightmare
          .wait('#input-license-search')
          .insert('#input-license-search', licenses[0].name)
          .click('#clickable-search-licenses')
          .waitUntilNetworkIdle(2000)
          .click('#list-licenses a[aria-rowindex="2"]')
          .wait(licenseName => {
            const nameElement = document.querySelector('[data-test-license-name]');
            if (!nameElement) return false;

            return nameElement.innerText.trim() === licenseName;
          }, licenses[0].name)
          .then(done)
          .catch(done);
      });

      it(`should find ${agreement.name} in Linked Agreements section`, done => {
        nightmare
          .wait('#linked-agreements-table')
          .evaluate(agreementName => {
            const nameElement = document.evaluate(
              `//*[@id="linked-agreements-table"]//div[.="${agreementName}"]`,
              document,
              null,
              XPathResult.FIRST_ORDERED_NODE_TYPE
            ).singleNodeValue;

            if (!nameElement) throw Error(`Expected linked agreement node for name ${agreementName}`);
          }, agreement.name)
          .then(done)
          .catch(done);
      });
    });
  });
};
