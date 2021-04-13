/* global before, after, Nightmare */

const generateNumber = () => Math.round(Math.random() * 100000);

const interfaceName = `Interface ${generateNumber()}`;
const agreementName = `Interface Agreement #${generateNumber()}`;
const org = {
  name: `Org #${generateNumber()}`,
  role: 'Content Provider',
  code: `code-${generateNumber()}`,
  status: 'Active'
};
const row = 0;
const uri = `http://qwerty${generateNumber()}.com`;
const username = `username #${generateNumber()}`;
const password = `password #${generateNumber()}`;
const notes = `Hello world ${generateNumber()}`;

const shouldFindValueInInterfaceList = (nightmare, type, value) => {
  it(`should find "${value}" in interface list`, done => {
    nightmare
      .evaluate(_value => {
        const elements = [...document.querySelectorAll('#organizations div[role="gridcell"]')];
        if (!elements.find(e => e.textContent === _value)) {
          throw Error(`Could not find row with ${type} named ${_value}`);
        }
      }, value)
      .then(done)
      .catch(done);
  });
};

module.exports.test = (uiTestCtx) => {
  const orgName = org.name;
  const orgCode = org.code;
  const orgStatus = org.status;

  describe(`ui-agreements: set orgs with interfaces: "${orgName}`, function test() {
    const { config, helpers } = uiTestCtx;
    const nightmare = new Nightmare(config.nightmare);
    nightmare.options.width = 1300;

    this.timeout(Number(config.test_timeout));

    describe('open Orgs > create orgs > create interfaces > create agreement', () => {
      before((done) => {
        helpers.login(nightmare, config, done);
      });

      after((done) => {
        helpers.logout(nightmare, config, done);
      });

      it('should open organizations app', done => {
        helpers.clickApp(nightmare, done, 'organizations');
      });

      it('should add interface', done => {
        console.log(`\tCreating ${interfaceName}`);

        nightmare
          .wait('#organizations-module-display')
          .wait('#clickable-neworganization')
          .click('#clickable-neworganization')
          .waitUntilNetworkIdle(1000)
          .wait('#accordion-toggle-button-interfacesSection')
          .click('#accordion-toggle-button-interfacesSection')
          .wait('[data-test-plugin-find-record-button]')
          .click('[data-test-plugin-find-record-button]')
          .wait('[data-test-find-records-modal]')
          .wait('a[href="/organizations/interface/add"]')
          .click('a[href="/organizations/interface/add"]')
          .wait('input[name="name"]')
          .insert('input[name="name"]', interfaceName)
          .wait('input[name="uri"]')
          .insert('input[name="uri"]', uri)
          .wait('input[name="username"]')
          .insert('input[name="username"]', username)
          .wait('input[name="password"]')
          .insert('input[name="password"]', password)
          .wait('textarea[name="notes"]')
          .insert('textarea[name="notes"]', notes)
          .wait('button[type="submit"]')
          .click('button[type="submit"]')
          .wait(2000)
          .wait('[class*=paneHeader] button')
          .click('[class*=paneHeader] button')
          .then(done)
          .catch(done);
      });

      it('should create Org', done => {
        console.log(`\tCreating ${orgName}`);
        nightmare
          .wait('input[name="name"]')
          .insert('input[name="name"]', orgName)
          .wait('input[name="code"]')
          .insert('input[name="code"]', orgCode)
          .wait('select[name="status"]')
          .type('select[name="status"]', orgStatus)
          .wait('#accordion-toggle-button-interfacesSection')
          .click('#accordion-toggle-button-interfacesSection')
          .wait('[data-test-plugin-find-record-button]')
          .click('[data-test-plugin-find-record-button]')
          .waitUntilNetworkIdle(2000)
          .wait('[data-test-find-records-modal] input[type="search"]')
          .type('[data-test-find-records-modal] input[type="search"]', interfaceName)
          .wait('[data-test-find-records-modal] button[type="submit"]')
          .click('[data-test-find-records-modal] button[type="submit"]')
          .waitUntilNetworkIdle(2000)
          .wait('[aria-rowindex="2"] input[type="checkbox"]')
          .click('[aria-rowindex="2"] input[type="checkbox"]')
          .click('[data-test-find-records-modal-save]')
          .wait('#interface-list[aria-rowcount="2"]')
          .click('#organization-form-save')
          .wait(2000)
          .then(done)
          .catch(done);
      });

      it('should open agreements app', done => {
        helpers.clickApp(nightmare, done, 'agreements');
      });

      it('should navigate to create agreements page', done => {
        console.log(`\tCreating ${agreementName}`);

        nightmare
          .wait(5000)
          .wait('#agreements-module-display')
          .click('#clickable-nav-agreements')
          .wait('#clickable-new-agreement')
          .click('#clickable-new-agreement')
          .waitUntilNetworkIdle(2000)
          .wait('#edit-agreement-name')
          .insert('#edit-agreement-name', agreementName)
          .click('#period-start-date-0')
          .type('#period-start-date-0', '\u000d') // "Enter" selects current date
          .type('#edit-agreement-status', 'draft')
          .then(done)
          .catch(done);
      });

      it('should add org', done => {
        nightmare
          .click('#add-org-btn')
          .evaluate((r) => {
            if (!document.querySelector(`#orgs-${r}-link-button`)) {
              throw Error('Expected organization picker button to exist.');
            }

            if (!document.querySelector(`#orgs-${r}-role`)) {
              throw Error('Expected role dropdown to exist.');
            }
          }, row)
          .then(done)
          .catch(done);
      });

      it('should select org', done => {
        nightmare
          .click(`#orgs-${row}-link-button`)
          .wait('[data-test-single-search-form] input[type="search"]')
          .type('[data-test-single-search-form] input[type="search"]', org.name)
          .click('[data-test-single-search-form-submit]')
          .waitUntilNetworkIdle(1000)
          .evaluate((name) => {
            const nameElements = [...document.querySelectorAll('div[role="gridcell"]')];
            const organization = nameElements.find(e => e.textContent === name);
            if (!organization) throw new Error(`Could not find the organization ${name}`);
            organization.click();
          }, orgName)
          .waitUntilNetworkIdle(1000)
          .then(done)
          .catch(done);
      });

      it(`should assign role: ${org.role}`, done => {
        nightmare
          .wait(`#orgs-${row}-role`)
          .type(`#orgs-${row}-role`, org.role)
          .evaluate((r, o) => {
            const roleElement = document.querySelector(`#orgs-${r}-role`);
            const role = roleElement.selectedOptions[0].textContent;
            if (role !== o.role) {
              throw Error(`Expected role to be ${o.role} but is ${role}`);
            }
          }, row, org)
          .then(done)
          .catch(done);
      });

      it('should create Agreement', done => {
        nightmare
          .click('#clickable-create-agreement')
          .wait('[data-test-agreement-info]')
          .waitUntilNetworkIdle(2000)
          .click('#clickable-expand-all')
          .then(done)
          .catch(done);
      });

      it(`should find "${org.name}" in Organizations list with role ${org.role}`, done => {
        nightmare
          .evaluate((_org, name) => {
            const rows = [...document.querySelectorAll('[data-test-organization-card]')].map(e => e.textContent);
            const _row = rows.find(r => r.indexOf(name) >= 0);
            if (!_row) {
              throw Error(`Could not find row with an org named ${name}`);
            }
            if (_row.indexOf(_org.role) < 0) {
              throw Error(`Expected row for "${name}" to contain role ${_org.role}.`);
            }
          }, org, orgName)
          .then(done)
          .catch(done);
      });

      it('should fetch interfaces', done => {
        nightmare
          .click('[data-test-show-credentials]')
          .waitUntilNetworkIdle(2000)
          .then(done)
          .catch(done);
      });

      shouldFindValueInInterfaceList(nightmare, 'interface', interfaceName);
      shouldFindValueInInterfaceList(nightmare, 'username', username);
      shouldFindValueInInterfaceList(nightmare, 'password', password);
      shouldFindValueInInterfaceList(nightmare, 'notes', notes);

      it(`should find uri "${uri}"`, done => {
        nightmare
          .evaluate(_uri => {
            const uriElements = [...document.querySelectorAll('#organizations [data-test-interfaces] a')];
            const uriFound = uriElements.find(e => e.attributes.href.nodeValue === _uri);
            if (!uriFound) {
              throw Error(`Could not find row with uri ${_uri}`);
            }
          }, uri)
          .then(done)
          .catch(done);
      });

      it('should navigate to Edit Agreement page', done => {
        nightmare
          .wait('#clickable-edit-agreement') // edit button removed, ERM-693
          .click('#clickable-edit-agreement') // edit button removed, ERM-693
          .waitUntilNetworkIdle(2000)
          .then(done)
          .catch(done);
      });

      it(`should find "${org.name}" in Organizations list with role ${org.role}`, done => {
        nightmare
          .evaluate((_org, _orgName) => {
            const rows = [...document.querySelectorAll('[data-test-organizations-org]')].map(e => e.textContent);
            const _row = rows.find(r => r.indexOf(_orgName) >= 0);
            if (!_row) {
              throw Error(`Could not find row with an org named ${_orgName}`);
            }
            if (_row.indexOf(_org.role) < 0) {
              throw Error(`Expected row for "${_orgName}" to contain role ${_org.role}.`);
            }
          }, org, orgName)
          .then(done)
          .catch(done);
      });
    });
  });
};
