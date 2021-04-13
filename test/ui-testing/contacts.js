/* global before, after, Nightmare */

const generateNumber = () => Math.round(Math.random() * 100000);

const CONTACTS = [{
  role: 'ERM librarian',
  editedRole: 'Agreement owner',
}, {
  role: 'Subject specialist',
  delete: true,
}, {
  role: 'ERM librarian',
}];

const EDIT_CONTACT = CONTACTS.find(c => c.editedRole);
const DELETE_CONTACT = CONTACTS.find(c => c.delete);
const FILTERABLE_CONTACT = CONTACTS.find(c => !c.delete && !c.editedRole);

module.exports.test = (uiTestCtx) => {
  describe('ui-agreements: set contacts', function test() {
    const { config, helpers } = uiTestCtx;
    const nightmare = new Nightmare(config.nightmare);
    const agreementName = `Contacts Agreement #${generateNumber()}`;

    this.timeout(Number(config.test_timeout));

    describe('login > open agreements > create agreement > edit contacts > logout', () => {
      before((done) => {
        helpers.login(nightmare, config, done);
      });

      after((done) => {
        helpers.logout(nightmare, config, done);
      });

      it('should open Agreements app', done => {
        helpers.clickApp(nightmare, done, 'agreements');
      });

      it('should navigate to create agreement page', done => {
        console.log(`\tCreating ${agreementName}`);

        nightmare
          .wait('#list-agreements')
          .wait('#clickable-new-agreement')
          .click('#clickable-new-agreement')

          .waitUntilNetworkIdle(1000)
          .insert('#edit-agreement-name', agreementName)
          .click('#period-start-date-0')
          .type('#period-start-date-0', '\u000d') // "Enter" selects current date
          .type('#edit-agreement-status', 'draft')

          .then(done)
          .catch(done);
      });

      CONTACTS.forEach((contact, row) => {
        it('should add contact', done => {
          nightmare
            .click('#add-contacts-btn')
            .evaluate((r) => {
              if (!document.querySelector(`#contacts-user-${r}-search-button`)) {
                throw Error('Expected user picker button to exist.');
              }

              if (!document.querySelector(`#contacts-role-${r}`)) {
                throw Error('Expected role dropdown to exist.');
              }
            }, row)
            .then(done)
            .catch(done);
        });

        it('should select user', done => {
          nightmare
            .click(`#contacts-user-${row}-search-button`)
            .wait('#clickable-filter-active-active')
            .click('#clickable-filter-active-active')
            .wait(`#list-plugin-find-user [aria-rowindex="${row + 6}"]`)
            .click(`#list-plugin-find-user [aria-rowindex="${row + 6}"]`)
            .wait('[data-test-user-name]')
            .wait(1000)
            .evaluate(_row => {
              const card = document.querySelector(`#edit-ic-card-${_row}`);
              const name = card.querySelector('[data-test-user-name]').innerText;
              if (!name) {
                throw Error('User name is undefined!');
              }

              return name;
            }, row)
            .then(name => {
              CONTACTS[row].name = name;
            })
            .then(done)
            .catch(done);
        });

        it(`should assign role: ${contact.role}`, done => {
          nightmare
            .type(`#contacts-role-${row}`, contact.role)
            .evaluate((r, c) => {
              const roleElement = document.querySelector(`#contacts-role-${r}`);
              const role = roleElement.selectedOptions[0].textContent;
              if (role !== c.role) {
                throw Error(`Expected role to be ${c.role} and is ${role}`);
              }
            }, row, contact)
            .then(done)
            .catch(done);
        });
      });

      it('should create agreement', done => {
        nightmare
          .click('#clickable-create-agreement')
          .wait('[data-test-agreement-info]')
          .waitUntilNetworkIdle(2000) // Wait for record to be fetched
          .click('#clickable-expand-all')
          .then(done)
          .catch(done);
      });

      CONTACTS.forEach(contact => {
        it(`should find contact in Internal Contacts list with role ${contact.role}`, done => {
          nightmare
            .evaluate(c => {
              const rows = [...document.querySelectorAll('[data-test-contact-card]')].map(e => e.textContent);
              const row = rows.find(r => r.indexOf(c.name) >= 0);
              if (!row) {
                throw Error(`Could not find row with a contact named ${c.name}`);
              }
              if (row.indexOf(c.role) < 0) {
                throw Error(`Expected row for "${c.name}" to contain role ${c.role}.`);
              }
            }, contact)
            .then(done)
            .catch(done);
        });
      });

      it('should open edit agreement', done => {
        nightmare
          .wait('#clickable-edit-agreement') // edit button removed, ERM-693
          .click('#clickable-edit-agreement') // edit button removed, ERM-693
          .waitUntilNetworkIdle(1000)
          .then(done)
          .catch(done);
      });

      CONTACTS.forEach((contact, i) => {
        it(`should find correctly loaded values for contact ${i}`, done => {
          nightmare
            .evaluate(_contact => {
              const cards = [...document.querySelectorAll('[data-test-internal-contact]')];
              const card = cards.find(c => c.innerText.indexOf(_contact.name) >= 0);
              if (!card) {
                throw Error(`Failed to find card with loaded user of ${_contact.name}`);
              }

              const roleElementId = card.id.replace('edit-ic-card', 'contacts-role');
              const roleElement = document.getElementById(roleElementId);
              const roleValue = roleElement.selectedOptions[0].textContent;
              if (roleValue !== _contact.role) {
                throw Error(`Expected ${_contact.name}'s role to be ${_contact.role}. It is ${roleValue}.`);
              }
            }, contact)
            .then(done)
            .catch(done);
        });
      });

      if (EDIT_CONTACT) {
        it('should edit contact', done => {
          nightmare
            .evaluate(_contact => {
              const cards = [...document.querySelectorAll('[data-test-internal-contact]')];
              const index = cards.findIndex(c => c.innerText.indexOf(_contact.name) >= 0);
              if (index === -1) {
                throw Error(`Failed to find user picker with loaded user of ${_contact.name}`);
              }

              return index;
            }, EDIT_CONTACT)
            .then(row => {
              return nightmare
                .wait(`#contacts-user-${row}-search-button`)
                .click(`#contacts-user-${row}-search-button`)
                .wait('#clickable-filter-active-active')
                .click('#clickable-filter-active-active')
                .wait('#list-plugin-find-user [aria-rowindex="10"]')
                .click('#list-plugin-find-user [aria-rowindex="10"]')
                .wait(1000)
                .type(`#contacts-role-${row}`, EDIT_CONTACT.editedRole)
                .evaluate(_row => {
                  const card = document.querySelector(`#edit-ic-card-${_row}`);
                  const name = card.querySelector('[data-test-user-name]').innerText;
                  if (!name) {
                    throw Error('User name is undefined!');
                  }

                  return name;
                }, row)
                .then(name => {
                  EDIT_CONTACT.editedName = name;
                });
            })
            .then(done)
            .catch(done);
        });
      }

      if (DELETE_CONTACT) {
        it('should delete contact', done => {
          nightmare
            .evaluate(_contact => {
              const cards = [...document.querySelectorAll('[data-test-internal-contact]')];
              const index = cards.findIndex(c => c.innerText.indexOf(_contact.name) >= 0);
              if (index === -1) {
                throw Error(`Failed to find user picker with loaded user of ${_contact.name}`);
              }

              return index;
            }, DELETE_CONTACT)
            .then(row => nightmare.click(`#contacts-delete-${row}`))
            .then(done)
            .catch(done);
        });
      }

      it('should save updated agreement', done => {
        nightmare
          .click('#clickable-update-agreement')
          .waitUntilNetworkIdle(2000) // Wait for record to be fetched
          .click('#clickable-expand-all')
          .then(done)
          .catch(done);
      });

      if (EDIT_CONTACT) {
        it(`should find contact in Internal Contacts list with role ${EDIT_CONTACT.editedRole}`, done => {
          nightmare
            .evaluate(c => {
              const rows = [...document.querySelectorAll('[data-test-contact-card]')].map(e => e.textContent);
              const row = rows.find(r => r.indexOf(c.editedName) >= 0);
              if (!row) {
                throw Error(`Could not find row with a contact named ${c.editedName}`);
              }
              if (row.indexOf(c.editedRole) < 0) {
                throw Error(`Expected row for "${c.editedName}" to contain role ${c.editedRole}.`);
              }
            }, EDIT_CONTACT)
            .then(done)
            .catch(done);
        });
      }

      if (DELETE_CONTACT) {
        it(`should NOT find contact in Internal Contacts list with role ${DELETE_CONTACT.role}`, done => {
          nightmare
            .evaluate(c => {
              const rows = [...document.querySelectorAll('[data-test-contact-card]')].map(e => e.textContent);
              const row = rows.find(r => r.indexOf(c.name) >= 0);
              if (row) {
                throw Error(`Found a row with a contact named ${c.name} when it should have been deleted.`);
              }
            }, DELETE_CONTACT)
            .then(done)
            .catch(done);
        });
      }

      if (FILTERABLE_CONTACT) {
        it('should filter agreements by the internal contact name', done => {
          let totalAgreements;
          nightmare
            .evaluate(() => {
              const list = document.querySelector('#list-agreements');
              return parseInt(list.getAttribute('aria-rowcount'), 10);
            })
            .then(ariaRowCount => {
              totalAgreements = ariaRowCount;

              nightmare
                .wait('#accordion-toggle-button-internal-contacts-filter')
                .click('#accordion-toggle-button-internal-contacts-filter')
                .wait('#agreement-internal-contacts-filter')
                .click('#agreement-internal-contacts-filter')
                .type('#sl-container-agreement-internal-contacts-filter input', FILTERABLE_CONTACT.name)
                .click('#sl-container-agreement-internal-contacts-filter li')
                .wait('#list-agreements')
                .waitUntilNetworkIdle(2000)
                .evaluate(_totalAgreements => {
                  const list = document.querySelector('#list-agreements');
                  const count = parseInt(list.getAttribute('aria-rowcount'), 10);

                  if (count < 1 || count >= _totalAgreements) {
                    throw Error(`Fetched ${count} agreements which is not greater than zero and less than ${_totalAgreements}.`);
                  }
                }, totalAgreements)
                .then(() => {
                  nightmare
                    .click('#internal-contacts-filter button[icon="times-circle-solid"]')
                    .then(done);
                })
                .catch(done);
            })
            .catch(done);
        });
      }

      if (FILTERABLE_CONTACT) {
        it('should filter agreements by the internal contact role', done => {
          let totalAgreements;
          nightmare
            .wait('#clickable-reset-all')
            .click('#clickable-reset-all')
            .waitUntilNetworkIdle(2000)
            .evaluate(() => {
              const list = document.querySelector('#list-agreements');
              return parseInt(list.getAttribute('aria-rowcount'), 10);
            })
            .then(ariaRowCount => {
              totalAgreements = ariaRowCount;

              nightmare
                .wait('#accordion-toggle-button-internal-contacts-role-filter')
                .click('#accordion-toggle-button-internal-contacts-role-filter')
                .wait('#agreement-internal-contacts-role-filter')
                .click('#agreement-internal-contacts-role-filter')
                .type('#sl-container-agreement-internal-contacts-role-filter input', FILTERABLE_CONTACT.role)
                .click('#sl-container-agreement-internal-contacts-role-filter li')
                .wait('#list-agreements')
                .waitUntilNetworkIdle(2000)
                .evaluate(_totalAgreements => {
                  const list = document.querySelector('#list-agreements');
                  const count = parseInt(list.getAttribute('aria-rowcount'), 10);

                  if (count < 1 || count >= _totalAgreements) {
                    throw Error(`Fetched ${count} agreements which is not greater than zero and less than ${_totalAgreements}.`);
                  }
                }, totalAgreements)
                .then(() => {
                  nightmare
                    .click('#internal-contacts-role-filter button[icon="times-circle-solid"]')
                    .then(done);
                })
                .catch(done);
            })
            .catch(done);
        });
      }
    });
  });
};
