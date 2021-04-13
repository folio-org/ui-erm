/* global before, after, Nightmare */

const AgreementCRUD = require('./agreement-crud');
const Basket = require('./basket');
const Utils = require('./utils');

const checkTableForCustomCoverageIcon = (nightmare, done, tableId) => {
  nightmare
    .evaluate(_tableId => {
      if (!document.querySelector(`#${_tableId}`)) {
        throw Error(`Failed to find "${_tableId}" table.`);
      }

      if (!document.querySelector(`#${_tableId} [data-test-custom-coverage]`)) {
        throw Error(`Failed to find custom coverage icon in "${_tableId}" table.`);
      }
    }, tableId)
    .then(done)
    .catch(done);
};

const checkTableForCustomCoverageData = (nightmare, done, tableId, values) => {
  nightmare
    .evaluate((expectedValues, id) => {
      const startDates = [...document.querySelectorAll(`#${id} [data-test-serial-coverage] [data-test-start] [data-test-date]`)];
      const startVolumes = [...document.querySelectorAll(`#${id} [data-test-serial-coverage] [data-test-start] [data-test-volume]`)];
      const startIssues = [...document.querySelectorAll(`#${id} [data-test-serial-coverage] [data-test-start] [data-test-issue]`)];
      const endDates = [...document.querySelectorAll(`#${id} [data-test-serial-coverage] [data-test-end] [data-test-date]`)];
      const endVolumes = [...document.querySelectorAll(`#${id} [data-test-serial-coverage] [data-test-end] [data-test-volume]`)];
      const endIssues = [...document.querySelectorAll(`#${id} [data-test-serial-coverage] [data-test-end] [data-test-issue]`)];

      expectedValues.coverage.forEach(ec => {
        if (!ec.startDate) return;

        if (ec.startDate && !startDates.find(e => e.textContent === ec.startDateFormatted)) {
          throw Error(`Expected to find start date of ${ec.startDateFormatted} in #${id}`);
        }
        if (ec.startVolume && !startVolumes.find(e => e.textContent.indexOf(ec.startVolumeFormatted) !== -1)) {
          throw Error(`Expected to find start volume of ${ec.startVolumeFormatted} in #${id}`);
        }
        if (ec.startIssue && !startIssues.find(e => e.textContent.indexOf(ec.startIssueFormatted) !== -1)) {
          throw Error(`Expected to find start issue of ${ec.startIssueFormatted} in #${id}`);
        }

        if (ec.endDate && !endDates.find(e => e.textContent === ec.endDateFormatted)) {
          throw Error(`Expected to find end date of ${ec.endDateFormatted} in #${id}`);
        }
        if (ec.endVolume && !endVolumes.find(e => e.textContent.indexOf(ec.endVolumeFormatted) !== -1)) {
          throw Error(`Expected to find end volume of ${ec.endVolumeFormatted} in #${id}`);
        }
        if (ec.endIssue && !endIssues.find(e => e.textContent.indexOf(ec.endIssueFormatted) !== -1)) {
          throw Error(`Expected to find end issue of ${ec.endIssueFormatted} in #${id}`);
        }
      });
    }, values, tableId)
    .then(done)
    .catch(done);
};

module.exports.test = (uiTestCtx) => {
  describe('ui-agreements: custom coverages', function test() {
    const { config, helpers } = uiTestCtx;
    const nightmare = new Nightmare(config.nightmare);
    const values = {
      name: `Custom Coverage Agreement #${Math.round(Math.random() * 100000)}`,
      coverage: [
        {
          startDate: '01/01/2001',
          startVolume: '1',
          startIssue: '11',
          endDate: '12/31/2010',
          endVolume: '10',
          endIssue: '12',
        },
        {
          startDate: '01/01/2021',
          startVolume: 'A',
          startIssue: 'AA',
          endDate: '12/31/2030',
          endVolume: 'B',
          endIssue: 'Z',
        }
      ]
    };

    values.coverage.forEach(c => {
      c.startDateFormatted = Utils.formattedDate(c.startDate);
      c.endDateFormatted = Utils.formattedDate(c.endDate);
      c.startVolumeFormatted = `Vol:${c.startVolume}`;
      c.endVolumeFormatted = `Vol:${c.endVolume}`;
      c.startIssueFormatted = `Iss:${c.startIssue}`;
      c.endIssueFormatted = `Iss:${c.endIssue}`;
    });

    const basket = [];

    this.timeout(Number(config.test_timeout));

    describe('fill basket > create agreement > set custom coverage', () => {
      before((done) => {
        helpers.login(nightmare, config, done);
      });

      after((done) => {
        helpers.logout(nightmare, config, done);
      });

      it('should open Agreements app', done => {
        helpers.clickApp(nightmare, done, 'agreements');
      });

      it('should open eresources', done => {
        nightmare
          .waitUntilNetworkIdle(1000)
          .click('#clickable-nav-eresources')
          .waitUntilNetworkIdle(1000)
          .then(done)
          .catch(done);
      });

      Basket.shouldAddTitleToBasket(nightmare, 1, basket);

      it(`should create agreement: ${values.name}`, function _(done) {
        AgreementCRUD.createAgreement(nightmare, done, values, basket[0].id);
      });

      // Eresources accordion should expand as part of this call.
      Basket.shouldHaveCorrectAgreementLines(nightmare, [0], basket);

      // Eresources accordion should now be expanded.
      it('should not have any custom coverage indicators', done => {
        nightmare
          .evaluate(() => {
            let element;

            element = document.querySelector('#agreement-lines [data-test-custom-coverage');
            if (element) throw Error('Found an unexpected custom coverage icon in "agreement lines" table.');

            element = document.querySelector('#eresources-covered [data-test-custom-coverage');
            if (element) throw Error('Found an unexpected custom coverage icon in "eresources covered" table.');
          }, values)
          .then(done)
          .catch(done);
      });

      it('should edit agreement', done => {
        basket[0].coverage.forEach(c => {
          c.startDateFormatted = Utils.formattedDate(c.startDate);
          c.endDateFormatted = Utils.formattedDate(c.endDate);
          c.startVolumeFormatted = `Vol:${c.startVolume}`;
          c.endVolumeFormatted = `Vol:${c.endVolume}`;
          c.startIssueFormatted = `Iss:${c.startIssue}`;
          c.endIssueFormatted = `Iss:${c.endIssue}`;
        });

        nightmare
          .wait('#clickable-edit-agreement') // edit button removed, ERM-693
          .click('#clickable-edit-agreement') // edit button removed, ERM-693
          .wait('[data-test-edit-agreement-info]')
          .waitUntilNetworkIdle(2000)
          .then(done)
          .catch(done);
      });

      it('should check if default coverage is present', done => {
        checkTableForCustomCoverageData(nightmare, done, 'agreement-form-lines', basket[0]);
      });

      it('should add custom coverage', done => {
        let chain = nightmare;
        values.coverage.forEach((coverage, i) => {
          chain = chain
            .click('#agreement-form-lines [data-test-ag-line-number="0"] #add-agreement-custom-coverage-button')
            .insert(`#cc-start-date-${i}`, coverage.startDate)
            .insert(`#cc-start-volume-${i}`, coverage.startVolume)
            .insert(`#cc-start-issue-${i}`, coverage.startIssue)
            .insert(`#cc-end-date-${i}`, coverage.endDate)
            .insert(`#cc-end-volume-${i}`, coverage.endVolume)
            .insert(`#cc-end-issue-${i}`, coverage.endIssue);
        });

        chain
          .click('#clickable-update-agreement')
          .wait('[data-test-agreement-info]')
          .waitUntilNetworkIdle(2000)
          .wait('#accordion-toggle-button-lines')
          .evaluate(() => {
            const header = document.querySelector('#accordion-toggle-button-lines');
            if (!header) throw Error('Could not find Agreement Lines accordion header');

            return header.getAttribute('aria-expanded');
          })
          .then(expanded => (expanded === 'true' ? nightmare : nightmare.click('#accordion-toggle-button-lines')))
          .then(done)
          .catch(done);
      });

      it('should have custom coverage indicator in agreement lines table', done => {
        checkTableForCustomCoverageIcon(nightmare, done, 'agreement-lines');
      });

      it('should have custom coverages listed in agreement lines table', done => {
        checkTableForCustomCoverageData(nightmare, done, 'agreement-lines', values);
      });

      it('should have custom coverage indicator in eresources covered table', done => {
        checkTableForCustomCoverageIcon(nightmare, done, 'eresources-covered');
      });

      it('should have custom coverages listed in eresources covered table', done => {
        checkTableForCustomCoverageData(nightmare, done, 'eresources-covered', values);
      });

      it('should edit agreement', done => {
        nightmare
          .wait('#clickable-edit-agreement') // edit button removed, ERM-693
          .click('#clickable-edit-agreement') // edit button removed, ERM-693
          .wait('[data-test-ag-line-number]')
          .waitUntilNetworkIdle(2000)
          .then(done)
          .catch(done);
      });

      it('should verify default coverage is same as previous', done => {
        checkTableForCustomCoverageData(nightmare, done, 'agreement-form-lines', basket[0]);
      });

      it('should see previously-set custom coverages', done => {
        nightmare
          .evaluate((expectedValues) => {
            const checkInput = (id, value) => {
              const loadedValue = document.getElementById(id).value;
              if (loadedValue !== value) {
                throw Error(`Incorrect loaded value of "${loadedValue}" for #${id}. Expected ${value}`);
              }
            };

            for (let i = 0; i < expectedValues.coverage.length; i++) {
              const startDate = document.getElementById(`cc-start-date-${i}`).value;
              const ec = expectedValues.coverage.find(c => c.startDate === startDate);
              if (!ec) throw Error(`Incorrectly set coverage. No start date of ${startDate} is expected.`);

              checkInput(`cc-start-date-${i}`, ec.startDate);
              checkInput(`cc-start-volume-${i}`, ec.startVolume);
              checkInput(`cc-start-issue-${i}`, ec.startIssue);
              checkInput(`cc-end-date-${i}`, ec.endDate);
              checkInput(`cc-end-volume-${i}`, ec.endVolume);
              checkInput(`cc-end-issue-${i}`, ec.endIssue);
            }
          }, values)
          .then(done)
          .catch(done);
      });

      it('should follow agreement line\'s link to eresource', done => {
        nightmare
          .click('#agreement-form-lines [data-test-ag-line-name] a')
          .wait('#pci-agreements [data-row-index]')
          .then(done)
          .catch(done);
      });

      it('should find custom coverage info in "agreements for this eresource" list', done => {
        nightmare
          .evaluate((expectedValues) => {
            const rows = [...document.querySelectorAll('#pci-agreements [data-row-index]')];
            const row = rows.find(r => r.textContent.indexOf(expectedValues.name) > -1);
            if (!row) throw Error(`Failed to find agreement ${expectedValues.name} in list`);

            const customCoverageIndicator = row.querySelector('[data-test-custom-coverage]');
            if (!customCoverageIndicator) throw Error('Failed to find custom coverage indicator');

            const rowContains = (substring) => row.textContent.indexOf(substring) > -1;

            expectedValues.coverage.forEach(ec => {
              if (!rowContains(ec.startDateFormatted)) throw Error(`Expected to find start date of ${ec.startDateFormatted}`);
              if (!rowContains(ec.startVolumeFormatted)) throw Error(`Expected to find start volume of ${ec.startVolumeFormatted}`);
              if (!rowContains(ec.startIssueFormatted)) throw Error(`Expected to find start issue of ${ec.startIssueFormatted}`);
              if (!rowContains(ec.endDateFormatted)) throw Error(`Expected to find end date of ${ec.endDateFormatted}`);
              if (!rowContains(ec.endVolumeFormatted)) throw Error(`Expected to find end volume of ${ec.endVolumeFormatted}`);
              if (!rowContains(ec.endIssueFormatted)) throw Error(`Expected to find end issue of ${ec.endIssueFormatted}`);
            });
          }, values)
          .then(done)
          .catch(done);
      });
    });
  });
};
