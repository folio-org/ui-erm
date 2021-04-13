/* global before, after, Nightmare */

const number = Math.round(Math.random() * 100000);

const PKG = {
  name: 'access_start_access_end_tests Package',
  filters: {
    all: {
      name: 'all',
      expectedContent: [
        { name: 'Afghanistan' },
        { name: 'Archaeological and Environmental Forensic Science' },
        { name: 'Archives of Natural History' },
        { name: 'Bethlehem University Journal' },
      ]
    },
    current: {
      name: 'current',
      expectedContent: [
        { name: 'Archaeological and Environmental Forensic Science' },
      ]
    },
    dropped: {
      name: 'dropped',
      expectedContent: [
        { name: 'Afghanistan' },
        { name: 'Archives of Natural History' },
      ]
    },
    future: {
      name: 'future',
      expectedContent: [
        { name: 'Bethlehem University Journal' },
      ]
    },
  },
};

const AGREEMENT = {
  name: `Pkg Filter Agreement #${number}`,
  startDate: '01/31/2019',
  renewalPriority: 'Definitely renew',
  status: 'In negotiation',
};

const shouldFindContent = (nightmare, content, index, count, listId) => {
  it(`should find element ${index + 1} of ${count} elements in filtered output of package`, done => {
    nightmare
      .wait(`#${listId}`)
      .waitUntilNetworkIdle(2000)
      .evaluate((name, i, list) => {
        const nameRows = [...document.querySelectorAll(`#${list} [class*=mclScrollable] [aria-rowindex]`)];
        const nameElement = nameRows.map(node => ({
          name: node.children[0].textContent,
        }))[i].name;
        if (nameElement !== name) throw Error(`Expected Line #${i + 1} "${nameElement}" to be "${name}"`);
      }, content.name, index, listId)
      .then(done)
      .catch(done);
  });
};
module.exports.shouldFindContent = shouldFindContent;

const shouldFilterContent = (nightmare, filter, listId) => {
  it(`should filter ${filter.name} contents`, done => {
    nightmare
      .wait(`#clickable-pci-${filter.name}`)
      .click(`#clickable-pci-${filter.name}`)
      .waitUntilNetworkIdle(2000)
      .then(done)
      .catch(done);
  });
  filter.expectedContent.forEach(e => {
    shouldFindContent(nightmare, e, filter.expectedContent.indexOf(e), filter.expectedContent.length, listId);
  });
};
module.exports.shouldFilterContent = shouldFilterContent;

module.exports.test = (uiTestCtx) => {
  describe('package content filter crud', function test() {
    const { config, helpers } = uiTestCtx;
    const nightmare = new Nightmare(config.nightmare);

    console.log(`\n These tests require you to upload the package ${PKG.name}.`);

    this.timeout(Number(config.test_timeout));

    describe('Login > Find eresource > Filter contents > Logout\n', () => {
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

      it('should confirm correct URL', done => {
        nightmare
          .evaluate(() => document.location.pathname)
          .then(pathName => {
            if (!pathName.includes('/erm/eresources')) throw Error('URL is incorrect');
            done();
          })
          .catch(done);
      });

      it('should use "Is package" filter', done => {
        nightmare
          .wait('#clickable-reset-all')
          .click('#clickable-reset-all')
          .waitUntilNetworkIdle(2000)
          .click('#clickable-filter-class-package')
          .waitUntilNetworkIdle(2000)
          .then(done)
          .catch(done);
      });

      it(`should search for and find package: ${PKG.name}`, done => {
        nightmare
          .wait('#input-eresource-search')
          .insert('#input-eresource-search', PKG.name)
          .click('#clickable-search-eresources')
          .waitUntilNetworkIdle(2000)
          .evaluate(expectedValues => {
            const title = document.querySelectorAll('div#paneHeaderpane-view-eresource-pane-title')[0];
            if (!title || !title.innerText) throw Error('No eresource title node found.'); // todo: load package

            const name = title.innerText.trim();
            if (name !== expectedValues.name) {
              throw Error(`Name of found eresource is incorrect. Expected "${expectedValues.name}" and got "${name}" `);
            }
          }, PKG)

          .then(done)
          .catch(done);
      });

      PKG.filters.current.expectedContent.forEach(content => {
        shouldFindContent(nightmare, content, PKG.filters.current.expectedContent.indexOf(content), PKG.filters.current.expectedContent.length, 'package-contents-list');
      });

      shouldFilterContent(nightmare, PKG.filters.all, 'package-contents-list');
      shouldFilterContent(nightmare, PKG.filters.dropped, 'package-contents-list');
      shouldFilterContent(nightmare, PKG.filters.future, 'package-contents-list');
      shouldFilterContent(nightmare, PKG.filters.current, 'package-contents-list');

      // add pkg to basket and create an agreement

      it(`should add package ${PKG.name} to basket`, done => {
        nightmare
          .wait('[data-test-basket-add-button]')
          .click('[data-test-basket-add-button]')
          .waitUntilNetworkIdle(2000)
          .then(done)
          .catch(done);
      });

      it(`should open basket, create agreement "${AGREEMENT.name}" and add package "${PKG.name}"`, done => {
        nightmare
          .wait('#open-basket-button')
          .click('#open-basket-button')
          .wait('#basket-contents')
          .wait('[data-test-basket-create-agreement]')
          .click('[data-test-basket-create-agreement]')
          // Ensure agreement line 0 has been auto-added for the basket item
          .wait('#agreement-form-lines [data-test-ag-line-number="0"]')
          .insert('#edit-agreement-name', AGREEMENT.name)
          .insert('#edit-agreement-start-date', AGREEMENT.startDate)
          .type('#edit-agreement-status', AGREEMENT.status)
          .click('#clickable-create-agreement')
          .wait('[data-test-agreement-info]')
          .waitUntilNetworkIdle(2000)
          .then(done)
          .catch(done);
      });

      it('should see correct agreement fields', done => {
        nightmare
          .wait('[data-test-agreement-info]')
          .evaluate(expectedValues => {
            const foundName = document.querySelector('[data-test-agreement-name]').innerText.trim();
            if (foundName !== expectedValues.name) {
              throw Error(`Name of agreement is incorrect. Expected "${expectedValues.name}" and got "${foundName}" `);
            }

            const foundStatus = document.querySelector('[data-test-agreement-status]').innerText;
            if (foundStatus !== expectedValues.status) {
              throw Error(`Status of agreement is incorrect. Expected "${expectedValues.status}" and got "${foundStatus}" `);
            }
          }, AGREEMENT)
          .then(done)
          .catch(done);
      });

      it('should see agreement line with correct package', done => {
        nightmare
          .wait('#accordion-toggle-button-lines')
          .click('#accordion-toggle-button-lines')
          .wait('#agreement-lines [class*=mclScrollable] [aria-rowindex]')
          .waitUntilNetworkIdle(2000)
          .evaluate((pkg) => {
            const lines = [...document.querySelectorAll('#agreement-lines [class*=mclScrollable] [aria-rowindex]')];
            if (lines.length !== 1) throw Error(`Expected to find 1 agreement line and found ${lines.length}`);
            const element = lines.map(node => ({
              name: node.children[0].textContent,
            }));
            if (!element) throw Error(`Could not find agreement line for ${pkg.name}`);
            if (element[0].name !== pkg.name) throw Error(`Expected Line Name (${element[0].name}) to be ${pkg.name}`);
          }, PKG)
          .then(done)
          .catch(done);
      });

      PKG.filters.current.expectedContent.forEach(content => {
        shouldFindContent(nightmare, content, PKG.filters.current.expectedContent.indexOf(content), PKG.filters.current.expectedContent.length, 'eresources-covered');
      });

      shouldFilterContent(nightmare, PKG.filters.all, 'eresources-covered');
      // 2019-10-07:
      // 'dropped' and 'future' filter for covered eresources fails because endpoint doesn't return correct data
      // shouldFilterContent(nightmare, PKG.filters.dropped, 'eresources-covered');
      // shouldFilterContent(nightmare, PKG.filters.future, 'eresources-covered');
      shouldFilterContent(nightmare, PKG.filters.current, 'eresources-covered');
    });
  });
};
