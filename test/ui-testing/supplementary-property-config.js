/* global before, after, Nightmare */

const randomNumber = Math.round(Math.random() * 1000);
const BASE_SUPPLEMENTARY_PROPERTY = {
  label: `SupplementaryProperty ${randomNumber}: `,
  name: `sample${randomNumber}`,
  description: 'A sample supplementary property for testing: ',
  weight: '2',
  primary: 'Yes',
  defaultInternal: 'Public',
};

const editableSupplementaryProperty = {
  ...BASE_SUPPLEMENTARY_PROPERTY,
  label: `${BASE_SUPPLEMENTARY_PROPERTY.label}Editable`,
  name: `${BASE_SUPPLEMENTARY_PROPERTY.name}Editable`,
  description: `${BASE_SUPPLEMENTARY_PROPERTY.description}Editable`,
  type: 'Text',
};

const TYPES = ['Decimal', 'Integer', 'Text'];

module.exports.test = (uiTestCtx) => {
  describe('ui-agreements: configure supplementary properties', function test() {
    const { config, helpers } = uiTestCtx;
    const nightmare = new Nightmare(config.nightmare);

    this.timeout(Number(config.test_timeout));

    describe('open settings > create properties > edit properties > delete properties', () => {
      before((done) => {
        helpers.login(nightmare, config, done);
      });

      after((done) => {
        helpers.logout(nightmare, config, done);
      });

      it('should open Settings', done => {
        helpers.clickSettings(nightmare, done);
      });

      it('should open supplementary property settings', done => {
        nightmare
          .wait('a[href="/settings/erm"]')
          .click('a[href="/settings/erm"]')
          .wait('a[href="/settings/erm/supplementaryProperties"]')
          .click('a[href="/settings/erm/supplementaryProperties"]')
          .waitUntilNetworkIdle(2000)
          .then(done)
          .catch(done);
      });

      TYPES.forEach(type => {
        it(`should create and delete ${type} supplementary property`, done => {
          const supplementaryProperty = {
            ...BASE_SUPPLEMENTARY_PROPERTY,
            label: `${BASE_SUPPLEMENTARY_PROPERTY.label}${type}`,
            name: `${BASE_SUPPLEMENTARY_PROPERTY.name}${type.substring(0, 3)}`,
            description: `${BASE_SUPPLEMENTARY_PROPERTY.description} ${type}`,
            type,
          };

          let chain = nightmare // eslint-disable-line no-unused-vars
            .click('#clickable-new-customproperty')
            .wait('input[name="customProperties[0].label"]');

          Object.entries(supplementaryProperty).forEach(([key, value]) => {
            chain = chain.type(`[name="customProperties[0].${key}"]`, value);
          });

          chain = chain
            .click('[data-test-customproperty-save-btn]')
            .waitUntilNetworkIdle(2000)
            .evaluate(_supplementaryProperty => {
              const card = document.querySelector(`[data-test-customproperty=${_supplementaryProperty.name}]`);
              Object.entries(_supplementaryProperty).forEach(([key, expectedValue]) => {
                const foundValue = card.querySelector(`[data-test-customproperty-${key.toLowerCase()}] > [data-test-kv-value]`).textContent;
                if (foundValue !== expectedValue) {
                  throw Error(`Expected ${key} with value ${expectedValue}. Found ${foundValue}`);
                }
              });
            }, supplementaryProperty)
            .then(() => {
              nightmare
                .click(`[data-test-customproperty=${supplementaryProperty.name}] [data-test-customproperty-delete-btn]`)
                .wait('[data-test-confirmation-modal-confirm-button]')
                .click('[data-test-confirmation-modal-confirm-button]')
                .waitUntilNetworkIdle(2000)
                .then(done)
                .catch(done);
            })
            .catch(done);
        });
      });

      it('should create, edit and delete supplementary property', done => {
        let chain = nightmare // eslint-disable-line no-unused-vars
          .click('#clickable-new-customproperty')
          .wait('input[name="customProperties[0].label"]');

        // Fill out the supplementary properties values for the first time.
        Object.entries(editableSupplementaryProperty).forEach(([key, value]) => {
          chain = chain.type(`[name="customProperties[0].${key}"]`, value);
        });

        // Save the supplementary property.
        chain = chain
          .click('[data-test-customproperty-save-btn]')
          .waitUntilNetworkIdle(2000);

        chain = chain
          .wait(`[data-test-customproperty=${editableSupplementaryProperty.name}] [data-test-customproperty-edit-btn]`)
          .click(`[data-test-customproperty=${editableSupplementaryProperty.name}] [data-test-customproperty-edit-btn]`)
          .wait(`[data-test-customproperty=${editableSupplementaryProperty.name}] input[name*=label]`);

        // Make some changes and cancel out of them.
        const garbageText = 'This data should never be saved or shown in a view field.';
        chain = chain
          .insert(`[data-test-customproperty=${editableSupplementaryProperty.name}] input[name*=label]`, garbageText)
          .click('[data-test-customproperty-cancel-btn]')
          .evaluate((_supplementaryProperty, _garbageText) => {
            const label = document.querySelector(`[data-test-customproperty=${_supplementaryProperty.name}] [data-test-customproperty-label] > [data-test-kv-value]`);
            if (label.textContent.indexOf(_garbageText) >= 0) {
              throw Error('Found garbage text that should not be visible when cancelling edits.');
            }
          }, editableSupplementaryProperty, garbageText);

        // Start editing the supplementary property again.
        chain = chain
          .click(`[data-test-customproperty=${editableSupplementaryProperty.name}] [data-test-customproperty-edit-btn]`)
          .wait(`[data-test-customproperty=${editableSupplementaryProperty.name}] input[name*=label]`);

        const newValues = {
          primary: 'No',
          defaultInternal: 'Internal',
        };

        // Edit the supplementary property with the new values.
        Object.entries(newValues).forEach(([key, value]) => {
          chain = chain.type(`[data-test-customproperty=${editableSupplementaryProperty.name}] [name*=${key}]`, value);
        });

        // Save the changes and confirm they were persisted.
        chain
          .click('[data-test-customproperty-save-btn]')
          .waitUntilNetworkIdle(2000)
          .evaluate((_supplementaryProperty, _name) => {
            const card = document.querySelector(`[data-test-customproperty=${_name}]`);
            Object.entries(_supplementaryProperty).forEach(([key, expectedValue]) => {
              const foundValue = card.querySelector(`[data-test-customproperty-${key.toLowerCase()}] > [data-test-kv-value]`).textContent;
              if (foundValue !== expectedValue) {
                throw Error(`Expected ${key} with value ${expectedValue}. Found ${foundValue}`);
              }
            });
          }, newValues, editableSupplementaryProperty.name)
          // Delete the supplementary property.
          .click(`[data-test-customproperty=${editableSupplementaryProperty.name}] [data-test-customproperty-delete-btn]`)
          .waitUntilNetworkIdle(2000)
          .then(done)
          .catch(done);
      });

      it('should not have any sample supplementary properties', done => {
        nightmare
          .refresh()
          .wait('[data-test-customproperty]')
          .evaluate(_baseSupplementaryPropertyName => {
            const supplementaryPropertyNames = [...document.querySelectorAll('[data-test-customproperty] > [data-test-kv-value]')];
            const sampleSupplementaryPropertyName = supplementaryPropertyNames.find(l => l.textContent.indexOf(_baseSupplementaryPropertyName) >= 0);

            if (sampleSupplementaryPropertyName) {
              throw Error(`Found sample supplementary property with name of ${sampleSupplementaryPropertyName.textContent} when all should be deleted.`);
            }
          }, BASE_SUPPLEMENTARY_PROPERTY.name)
          .then(done)
          .catch(done);
      });
    });
  });
};
