/* global before, after, Nightmare */

const generateNumber = () => Math.round(Math.random() * 100000);
const agreementName = `Orgs Agreement #${generateNumber()}`;
const ORGS = [{
  code: `code-${generateNumber()}`,
  name: `Content Provider ${generateNumber()}`,
  role: 'Content Provider',
  status: 'Active',
  toDelete: true,
}, {
  code: `code-${generateNumber()}`,
  name: `Vendor ${generateNumber()}`,
  role: 'Vendor',
  editedName: ` turned into Subscription Agent ${generateNumber()}`,
  editedRole: 'Subscription Agent',
  status: 'Active',
}];

module.exports.test = (uiTestCtx) => {
  const orgs = ORGS;

  describe(`ui-agreements: set orgs: "${orgs.map(o => o.name).join(', ')}"`, function test() {
    const { config, helpers } = uiTestCtx;
    const nightmare = new Nightmare(config.nightmare);

    this.timeout(Number(config.test_timeout));

    const orgToEdit = orgs.find(o => o.editedName);
    const orgToDelete = orgs.find(o => o.toDelete);

    describe('open agreements > create agreements > edit orgs', () => {
      before((done) => {
        helpers.login(nightmare, config, done);
      });

      after((done) => {
        helpers.logout(nightmare, config, done);
      });

      it('should open organizations app', done => {
        helpers.clickApp(nightmare, done, 'organizations');
      });

      orgs.forEach((org) => {
        it(`should create org ${org.name}`, done => {
          nightmare
            .wait('#organizations-module-display')
            .wait('#clickable-neworganization')
            .click('#clickable-neworganization')
            .waitUntilNetworkIdle(2000)
            .wait('input[name="name"]')
            .wait('input[name="name"]')
            .insert('input[name="name"]', org.name)
            .wait('input[name="code"]')
            .insert('input[name="code"]', org.code)
            .wait('select[name="status"]')
            .type('select[name="status"]', org.status)
            .waitUntilNetworkIdle(2000)
            .click('#organization-form-save')
            .wait(2000)
            .then(done)
            .catch(done);
        });
      });

      it('should open agreements app', done => {
        helpers.clickApp(nightmare, done, 'agreements');
      });

      it(`should navigate to create agreements page and create agreement ${agreementName}`, done => {
        console.log(`\tCreating ${agreementName}`);

        nightmare
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

      orgs.forEach((org, row) => {
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
            .wait(`#orgs-${row}-link-button`)
            .click(`#orgs-${row}-link-button`)
            .wait('[data-test-single-search-form] input[type="search"]')
            .type('[data-test-single-search-form] input[type="search"]', org.name)
            .waitUntilNetworkIdle(2000)
            .click('[data-test-single-search-form-submit]')
            .waitUntilNetworkIdle(2000)
            .evaluate((name) => {
              const nameElements = [...document.querySelectorAll('div[role="gridcell"]')];
              const organization = nameElements.find(e => e.textContent === name);
              if (!organization) throw new Error(`Could not find the organization ${name}`);
              organization.click();
            }, org.name)
            .waitUntilNetworkIdle(2000)
            .then(done)
            .catch(done);
        });

        it(`should assign role: ${org.role}`, done => {
          nightmare
            .wait(`#orgs-${row}-role`)
            .click(`#orgs-${row}-role`)
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
      });

      it('should create Agreement', done => {
        nightmare
          .click('#clickable-create-agreement')
          .wait('[data-test-agreement-info]')
          .waitUntilNetworkIdle(2000) // Wait for record to be fetched
          .click('#clickable-expand-all')
          .then(done)
          .catch(done);
      });

      orgs.forEach(org => {
        it(`should find "${org.name}" in Organizations list with role ${org.role}`, done => {
          nightmare
            .wait('[data-test-organization-card]')
            .evaluate(o => {
              const rows = [...document.querySelectorAll('[data-test-organization-card]')].map(e => e.textContent);
              const row = rows.find(r => r.indexOf(o.name) >= 0);
              if (!row) {
                throw Error(`Could not find row with an org named ${o.name}`);
              }
              if (row.indexOf(o.role) < 0) {
                throw Error(`Expected row for "${o.name}" to contain role ${o.role}.`);
              }
            }, org)
            .then(done)
            .catch(done);
        });
      });

      if (orgToEdit) {
        it('should open organizations app', done => {
          helpers.clickApp(nightmare, done, 'organizations');
        });

        it(`should edit org ${orgToEdit.name}`, done => {
          nightmare
            .wait('[data-test-single-search-form] input[type="search"]')
            .type('[data-test-single-search-form] input[type="search"]', orgToEdit.name)
            .click('[data-test-single-search-form-submit]')
            .waitUntilNetworkIdle(2000)
            .wait('[data-test-button-edit-organization]')
            .click('[data-test-button-edit-organization]')
            .waitUntilNetworkIdle(2000)
            .wait('input[name="name"]')
            .wait('input[name="name"]')
            .insert('input[name="name"]', orgToEdit.editedName)
            .wait('input[name="code"]')
            .waitUntilNetworkIdle(2000)
            .click('#organization-form-save')
            .waitUntilNetworkIdle(2000)
            .then(done)
            .catch(done);
        });

        it('should open agreements app', done => {
          helpers.clickApp(nightmare, done, 'agreements');
        });

        it('should open edit Agreement', done => {
          nightmare
            .wait('#clickable-edit-agreement') // edit button removed, ERM-693
            .click('#clickable-edit-agreement') // edit button removed, ERM-693
            .waitUntilNetworkIdle(2000)
            .then(done)
            .catch(done);
        });

        it('should edit agreement', done => {
          nightmare
            .evaluate(o => {
              const nameElements = [...document.querySelectorAll('[data-test-org-name]')];
              const index = nameElements.findIndex(e => e.textContent === o.name);
              if (index === -1) {
                throw Error(`Failed to find org value of ${o.name}`);
              }
              return index;
            }, orgToEdit)
            .then(row => {
              return nightmare
                .wait(`#orgs-${row}-link-button`)
                .click(`#orgs-${row}-link-button`)
                .wait('[data-test-single-search-form] input[type="search"]')
                .type('[data-test-single-search-form] input[type="search"]', orgToEdit.name + orgToEdit.editedName)
                .waitUntilNetworkIdle(2000)
                .click('[data-test-single-search-form-submit]')
                .waitUntilNetworkIdle(2000)
                .evaluate((name, editedName) => {
                  const nameElements = [...document.querySelectorAll('div[role="gridcell"]')];
                  const organization = nameElements.find(e => e.textContent === name + editedName);
                  if (!organization) throw new Error(`Could not find the organization ${name}${editedName}`);
                  organization.click();
                }, orgToEdit.name, orgToEdit.editedName)
                .waitUntilNetworkIdle(2000)
                .wait(`#orgs-${row}-role`)
                .click(`#orgs-${row}-role`)
                .type(`#orgs-${row}-role`, orgToEdit.editedRole)
                .evaluate((r, _orgs) => {
                  const orgElement = document.querySelector(`#orgs-${r}-name`);
                  const name = orgElement.textContent;
                  if (!name) {
                    throw Error('Org name field has no value!');
                  }
                  return name;
                }, row, orgs)
                .then(name => {
                  orgToEdit.editedName = name;
                });
            })
            .then(done)
            .catch(done);
        });
      }

      if (orgToDelete) {
        it('should delete org', done => {
          nightmare
            .evaluate(o => {
              const nameElements = [...document.querySelectorAll('[data-test-org-name]')];
              const index = nameElements.findIndex(e => e.textContent === o.name);
              if (index === -1) {
                throw Error(`Failed to find org with name ${o.name}`);
              }

              return index;
            }, orgToDelete)
            .then(row => nightmare.click(`#orgs-${row}-delete-btn`))
            .then(done)
            .catch(done);
        });
      }

      it('should save updated Agreement', done => {
        nightmare
          .click('#clickable-update-agreement')
          .waitUntilNetworkIdle(2000) // Wait for record to be fetched
          .then(done)
          .catch(done);
      });

      if (orgToEdit) {
        it(`should find org in Organizations list with role ${orgToEdit.editedRole}`, done => {
          nightmare
            .evaluate(o => {
              const rows = [...document.querySelectorAll('[data-test-organization-card]')].map(e => e.textContent);
              const row = rows.find(r => r.indexOf(o.editedName) >= 0);
              if (!row) {
                throw Error(`Could not find row with an org named ${o.editedName}`);
              }
              if (row.indexOf(o.editedRole) < 0) {
                throw Error(`Expected row for "${o.editedName}" to contain role ${o.editedRole}.`);
              }
            }, orgToEdit)
            .then(done)
            .catch(done);
        });
      }

      if (orgToDelete) {
        it(`should NOT find org in organizations list with role ${orgToDelete.role}`, done => {
          nightmare
            .evaluate(o => {
              const rows = [...document.querySelectorAll('[data-test-organization-card]')].map(e => e.textContent);
              const row = rows.find(r => r.indexOf(o.name) >= 0 && r.indexOf(o.role) >= 0);
              if (row) {
                throw Error(`Found a row with a org named ${o.name} when it should have been deleted.`);
              }
            }, orgToDelete)
            .then(done)
            .catch(done);
        });
      }
    });
  });
};
