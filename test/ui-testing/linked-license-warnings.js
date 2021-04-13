/* global before, after, Nightmare */
const AgreementCRUD = require('./agreement-crud');

module.exports.test = (uiTestCtx) => {
  const number = Math.round(Math.random() * 100000);
  const licenses = [{
    name: `Controlling Warnings License #${number}`,
    note: `This controlling license was automatically created and linked for run ${number}`,
    status: 'Controlling',
    startDate: '07/01/2018',
  }, {
    name: `Future Warnings License #${number}`,
    note: `This future license was automatically created and linked for run ${number}`,
    status: 'Future',
    startDate: '07/01/2028',
  }, {
    name: `Historical Warnings License #${number}`,
    note: `This historical license was automatically created and linked for run ${number}`,
    status: 'Historical',
    startDate: '07/01/2008',
  }];

  const amendments = [{
    name: 'Current Amendment',
    note: 'This is a current amendment',
  }, {
    name: 'Expired Amendment',
    status: 'expired',
    note: 'This is an expired amendment',
  }, {
    name: 'Rejected Amendment',
    status: 'rejected',
    note: 'This is a rejected amendment',
  }, {
    name: 'Start Date Amendment',
    startDate: '11/26/2019',
    note: 'This is an amendment with start date in the future',
  }, {
    name: 'End Date Amendment',
    endDate: '11/26/1919',
    note: 'This is an amendment with end date in the past',
  }, {
    name: 'Future Amendment',
    statusInAgreement: 'Future',
    note: 'This is a future amendment',
  }, {
    name: 'Historical Amendment',
    statusInAgreement: 'Historical',
    note: 'This is a historical amendment',
  }];

  const agreement = {
    name: `Linked License Warnings Agreement #${number}`,
  };

  const indices = {
    WARNING_INDEX: 0,
    AMENDMENT_NAME_INDEX: 1,
    NOTE_INDEX: 5
  };

  const checkWarningColumn = (nightmare, table, shouldExist, done) => {
    nightmare
      .wait('#clickable-expand-all')
      .click('#clickable-expand-all')
      .wait(`${table}`)
      .evaluate((_table, _shouldExist) => {
        const columnheaders = [...document.querySelectorAll(`${_table} [class*=mclHeaderRow] [role=columnheader]`)].map(r => r.id.replace('list-column-', ''));
        if (_shouldExist === true) {
          if (!columnheaders.find(h => h === 'warning')) {
            throw Error(`Failed to find warning column in table: ${_table}`);
          }
        } else if (columnheaders.find(h => h === 'warning')) {
          throw Error(`Warning column unexpectedly found in table: ${_table}`);
        }
      }, table, shouldExist)
      .then(done)
      .catch(done);
  };

  describe('ui-agreements: linked license warnings', function test() {
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

      // Create licenses and add amendments
      licenses.forEach(l => {
        it(`should create new license: ${l.name}`, done => {
          let chain = nightmare
            .wait('#clickable-new-license')
            .click('#clickable-new-license')

            .waitUntilNetworkIdle(2000) // Wait for the default values to be fetched and set.

            .wait('#edit-license-name')
            .insert('#edit-license-name', l.name)
            .insert('#edit-license-start-date', l.startDate)

            .click('#clickable-create-license')

            .waitUntilNetworkIdle(2000);

          amendments.forEach(a => {
            chain = chain
              .wait('#clickable-expand-all')
              .click('#clickable-expand-all')
              .click('#add-amendment-button')
              .wait('#edit-amendment-name')
              .insert('#edit-amendment-name', a.name);
            if (a.status) {
              chain = chain
                .wait('#edit-amendment-status')
                .type('#edit-amendment-status', a.status);
            }
            if (a.startDate) {
              chain = chain
                .wait('#edit-amendment-start-date')
                .insert('#edit-amendment-start-date', a.startDate);
            }
            if (a.endDate) {
              chain = chain
                .wait('#edit-amendment-end-date')
                .insert('#edit-amendment-end-date', a.endDate);
            }
            chain = chain
              .click('#clickable-create-amendment')
              .waitUntilNetworkIdle(2000)
              .click('#pane-view-amendment [icon="times"]')
              .wait('#licenseAmendments');
          });
          chain = chain
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

      licenses.forEach((l, i) => {
        it(`should set amendment statuses and notes for ${l.name}`, done => {
          let chain = nightmare;
          amendments.forEach(a => {
            if (a.statusInAgreement) {
              chain = chain.type(`#linkedLicenses-remoteId-${i}-license-card [data-test-amendment="${a.name}"] select`, a.statusInAgreement);
            } else {
              chain = chain.type(`#linkedLicenses-remoteId-${i}-license-card [data-test-amendment="${a.name}"] select`, 'Current');
            }
            chain = chain.type(`#linkedLicenses-remoteId-${i}-license-card [data-test-amendment="${a.name}"] textArea`, a.note);
          });
          chain = chain

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

      it('should check warnings column exists inside Controlling License: current amendment table', done => {
        checkWarningColumn(nightmare, '#controlling-license-current-amendments', true, done);
      });

      it('should check warnings column doesnt exist inside Controlling License: future amendment table', done => {
        checkWarningColumn(nightmare, '#controlling-license-future-amendments', false, done);
      });

      it('should check warnings column doesnt exist inside Controlling License: historical amendment table', done => {
        checkWarningColumn(nightmare, '#controlling-license-historical-amendments', false, done);
      });

      it('should check warnings column doesnt exist inside Future License Accordion', done => {
        checkWarningColumn(nightmare, '#agreement-future-license-0-amendments', false, done);
      });

      it('should check warnings column doesnt exist inside Historical License Accordion', done => {
        checkWarningColumn(nightmare, '#agreement-historical-license-0-amendments', false, done);
      });

      it('should check warnings exist for conflicting status amendments in controlling licenses, and not for non-conflicting ones', done => {
        nightmare
          .evaluate((_indices) => {
          // Bit of code to allow the choosing of certain indices in an array
            const arrayPicker = (array, listOfIndices) => {
              const pickedArray = [];
              listOfIndices.forEach(i => pickedArray.push(array[i]));
              return (pickedArray);
            };

            // The below line returns an array containing, for each row, the contents of the first index (warning) and the contents of the second index (amendment name)
            const rows = [...document.querySelectorAll('#controlling-license-current-amendments [class*=mclRowContainer] [role=row]')].map(row => arrayPicker([...row.childNodes], [_indices.WARNING_INDEX, _indices.AMENDMENT_NAME_INDEX]).map(r => r.textContent));
            rows.forEach(row => {
              if (row[1].includes('Current')) {
                if (row[0]) {
                  throw Error('Warning found in amendment with non conflicting status');
                }
              } else if (!row[0]) {
                throw Error(`Warning expected and not found for amendment ${row[1]} in Controlling License`);
              }
            });
          }, indices)
          .then(done)
          .catch(done);
      });

      it('should check notes are showing up in the table', done => {
        nightmare
          .evaluate((_indices) => {
          // Bit of code to allow the choosing of certain indices in an array
            const arrayPicker = (array, listOfIndices) => {
              const pickedArray = [];
              listOfIndices.forEach(i => pickedArray.push(array[i]));
              return (pickedArray);
            };

            // The below line returns an array containing, for each row, the amendment note
            const notes = [...document.querySelectorAll('#controlling-license-current-amendments [class*=mclRowContainer] [role=row]')].map(row => arrayPicker([...row.childNodes], [_indices.NOTE_INDEX, _indices.AMENDMENT_NAME_INDEX]).map(r => r.textContent));
            notes.forEach(row => {
              if (!row[0]) {
                throw Error(`Note not found for ${row[1]}`);
              }
            });
          }, indices)
          .then(done)
          .catch(done);
      });

      it('should open Licenses App, find and open the relevant Controlling License', done => {
        helpers.clickApp(nightmare, done, 'licenses');
        nightmare
          .wait('#list-licenses')
          .click(`#list-licenses [class*=mclRowContainer] [data-label*='#${number}']`);
      });

      it('should add a new amendment to the Controlling License', done => {
        nightmare
          .wait('#clickable-expand-all')
          .click('#clickable-expand-all')
          .click('#add-amendment-button')
          .wait('#edit-amendment-name')
          .insert('#edit-amendment-name', 'Unassigned Amendment')
          .click('#clickable-create-amendment')
          .waitUntilNetworkIdle(2000)
          .click('#pane-view-amendment [icon="times"]')
          .wait('#licenseAmendments')
          .then(() => nightmare.click('#pane-view-license button[icon=times]'))
          .then(done)
          .catch(done);
      });

      it('should open Agreements App, find and open the relevant Agreement', done => {
        helpers.clickApp(nightmare, done, 'agreements');
        nightmare
          .wait('#list-agreements')
          .click(`#list-agreements [class*=mclRowContainer] [data-label*='#${number}']`)
          .wait('#clickable-expand-all')
          .click('#clickable-expand-all');
      });

      it('should check that a banner has appeared to warn the user about unassigned amendments', done => {
        nightmare
          .wait('#agreement-controlling-license')
          .evaluate(() => {
            const alert = [...document.querySelectorAll('#agreement-controlling-license [class*=body] [role=alert]')].map(r => r.textContent);
            if (!alert) {
              throw Error('Warning banner not found for unassigned amendments in Controlling license');
            }
          })
          .then(done)
          .catch(done);
      });

      it('should check that a table containing the unassigned amendments has appeared', done => {
        nightmare
          .wait('#agreement-controlling-license')
          .evaluate(() => {
            const unassignedAmendments = [...document.querySelectorAll('#agreement-controlling-license [class*=body] [id=controlling-license-unset-amendments]')].map(r => r.textContent);
            if (!unassignedAmendments) {
              throw Error('Unassigned amendment table not found in Controlling license');
            }
          })
          .then(done)
          .catch(done);
      });
    });
  });
};
