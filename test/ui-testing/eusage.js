/* global before, after, Nightmare */

const AgreementCRUD = require('./agreement-crud');

const udps = [];
const updatedUdps = [];

const itShouldLinkUDP = (nightmare, index) => {
  it('should link an ERM Usage Data Provider', done => {
    nightmare
      .wait('#add-udp-btn')
      .click('#add-udp-btn')
      .wait(`#udp-${index}-search-button`)
      .click(`#udp-${index}-search-button`)
      .waitUntilNetworkIdle(2000)
      .wait('#clickable-filter-harvesting-status-active')
      .evaluate(() => document.querySelector('#clickable-filter-harvesting-status-active').checked)
      .then(filterChecked => {
        (filterChecked ? nightmare : nightmare.click('#clickable-filter-harvesting-status-active'))
          .waitUntilNetworkIdle(2000)
          .wait(`#list-erm-usage [aria-rowindex="${index + 2}"] a`)
          .evaluate(_index => {
            const row = document.querySelector(`#list-erm-usage [aria-rowindex="${_index + 2}"] a`);
            return row.children[0].textContent.trim();
          }, index)
          .then(udpName => {
            udps.push(udpName);

            nightmare
              .click(`#list-erm-usage [aria-rowindex="${index + 2}"] a`)
              .waitUntilNetworkIdle(2000)
              .insert(`#udp-note-${index}`, `Note for UDP ${udpName} at index ${index}`)
              .evaluate((_index, _udpName) => {
                const name = document.querySelector(`#edit-udp-card-${_index} [data-test-udp-card-name]`).innerText.trim();

                if (name.indexOf(_udpName) < 0) {
                  throw Error(`Expected to find UDP Name of ${_udpName} and found "${name}".`);
                }
              }, index, udpName)
              .then(done)
              .catch(done);
          })
          .catch(done);
      })
      .catch(done);
  });
};

const itShouldSeeLinkedUDP = (nightmare, index) => {
  it('should find linked ERM Usage Data Provider', done => {
    const udpName = udps[index];

    nightmare
      .wait('[data-test-udp-link]')
      .evaluate(_udpName => {
        const links = [...document.querySelectorAll('[data-test-udp-link]')];
        const link = links.find(l => l.innerText === _udpName);

        if (!link) throw Error(`Expected to find link for UDP "${udpName}"`);
        if (!link.href) throw Error(`Expected to find link with href for UDP "${udpName}"`);
      }, udpName)
      .then(done)
      .catch(done);
  });
};

module.exports.test = (uiTestCtx) => {
  describe('ui-agreements: ERM Usage Data Provider integration', function test() {
    const { config, helpers } = uiTestCtx;
    const nightmare = new Nightmare(config.nightmare);

    console.log('\n    These tests require the ERM Usage modules installed and containing sample data.');
    console.log('    Ensure it is installed, running, and functional before expecting these tests to pass.');

    const values = {
      name: `ERM Usage Agreement #${Math.round(Math.random() * 100000)}`,
    };

    this.timeout(Number(config.test_timeout));

    describe('create agreement > link UDPs > replace with other UDP', () => {
      before((done) => {
        helpers.login(nightmare, config, done);
      });

      after((done) => {
        helpers.logout(nightmare, config, done);
      });

      it('should open Agreements app', done => {
        helpers.clickApp(nightmare, done, 'agreements');
      });

      it(`should create agreement: ${values.name}`, function _(done) {
        AgreementCRUD.createAgreement(nightmare, done, values);
      });

      it('should edit agreement', done => {
        nightmare
          .wait('#clickable-edit-agreement') // edit button removed, ERM-693
          .click('#clickable-edit-agreement') // edit button removed, ERM-693
          .wait('#clickable-expand-all')
          .click('#clickable-expand-all')
          .then(done)
          .catch(done);
      });

      itShouldLinkUDP(nightmare, 0);
      itShouldLinkUDP(nightmare, 1);
      itShouldLinkUDP(nightmare, 2);

      it('should save agreement', done => {
        nightmare
          .click('#clickable-update-agreement')
          .waitUntilNetworkIdle(2000)
          .click('#clickable-expand-all')
          .then(done)
          .catch(done);
      });

      itShouldSeeLinkedUDP(nightmare, 0);
      itShouldSeeLinkedUDP(nightmare, 1);
      itShouldSeeLinkedUDP(nightmare, 2);

      it('should edit agreement', done => {
        nightmare
          .wait('#clickable-edit-agreement') // edit button removed, ERM-693
          .click('#clickable-edit-agreement') // edit button removed, ERM-693
          .wait('#clickable-expand-all')
          .click('#clickable-expand-all')
          .then(done)
          .catch(done);
      });

      it('should change linked UDP to another', done => {
        nightmare
          .wait('#udp-0-search-button')
          .click('#udp-0-search-button')
          .waitUntilNetworkIdle(2000)
          .wait('#clickable-filter-harvesting-status-active')
          .evaluate(() => document.querySelector('#clickable-filter-harvesting-status-active').checked)
          .then(filterChecked => {
            (filterChecked ? nightmare : nightmare.click('#clickable-filter-harvesting-status-active'))
              .waitUntilNetworkIdle(2000)
              .wait('#list-erm-usage [aria-rowindex="5"] a')
              .evaluate(() => {
                const row = document.querySelector('#list-erm-usage [aria-rowindex="5"] a');
                return row.children[0].textContent.trim();
              })
              .then(udpName => {
                updatedUdps.push(udpName);

                nightmare
                  .click('#list-erm-usage [aria-rowindex="5"] a')
                  .waitUntilNetworkIdle(2000)
                  .insert('#udp-note-0', `Note for UDP ${udpName} at index 0`)
                  .evaluate(_udpName => {
                    const name = document.querySelector('#edit-udp-card-0 [data-test-udp-card-name]').innerText.trim();

                    if (name.indexOf(_udpName) < 0) {
                      throw Error(`Expected to find UDP Name of ${_udpName} and found "${name}".`);
                    }
                  }, udpName)
                  .then(done)
                  .catch(done);
              })
              .catch(done);
          })
          .catch(done);
      });

      it('should delete a UDP', done => {
        nightmare
          .wait('#udp-delete-1')
          .click('#udp-delete-1')
          .then(done)
          .catch(done);
      });

      it('should save agreement', done => {
        nightmare
          .click('#clickable-update-agreement')
          .waitUntilNetworkIdle(2000)
          .click('#clickable-expand-all')
          .then(done)
          .catch(done);
      });

      it('should find updated linked ERM Usage Data Provider', done => {
        const udpName = updatedUdps[0];

        nightmare
          .wait('[data-test-udp-link]')
          .evaluate(_udpName => {
            const links = [...document.querySelectorAll('[data-test-udp-link]')];
            const link = links.find(l => l.innerText === _udpName);

            if (!link) throw Error(`Expected to find link for UDP "${_udpName}"`);
            if (!link.href) throw Error(`Expected to find link with href for UDP "${_udpName}"`);
          }, udpName)
          .then(done)
          .catch(done);
      });

      it('should find two linked ERM Usage Data Providers', done => {
        nightmare
          .wait('[data-test-udp-link]')
          .evaluate(() => {
            const links = [...document.querySelectorAll('[data-test-udp-link]')];
            if (links.length !== 2) throw Error(`Expected to find two links and found ${links.length}`);
          })
          .then(done)
          .catch(done);
      });
    });
  });
};
