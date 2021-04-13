import { beforeEach, describe, it } from '@bigtest/mocha';
import { expect } from 'chai';
import { sortBy } from 'lodash';

import setupApplication from '../helpers/setup-application';
import PickListInteractor from '../interactors/pick-list';

describe('Pick list', () => {
  let refDataCategories = [
    {
      'id': 'd91793df38e17007a6a50dd41be595c3',
      'desc': 'SubscriptionAgreement.AgreementStatus',
      'internal': true,
      'values': [
        {
          'id': '188389637112201d01711221a9fa0038',
          'value': 'requested',
          'label': 'Requested'
        },
        {
          'id': '188389637112201d01711221a9f10037',
          'value': 'draft',
          'label': 'Draft'
        },
        {
          'id': '188389637112201d01711221aa13003a',
          'value': 'active',
          'label': 'Active'
        },
        {
          'id': '11d6fb8199d91721152c65cefb5efe9c',
          'value': 'closed',
          'label': 'Closed'
        },
        {
          'id': '188389637112201d01711221aa070039',
          'value': 'in_negotiation',
          'label': 'In negotiation'
        }
      ]
    },
    {
      'id': '188389637112201d01711221a89a0019',
      'desc': 'TitleInstance.Type',
      'internal': true,
      'values': [
        {
          'id': '188389637112201d01711221a8ac001b',
          'value': 'book',
          'label': 'Book'
        },
        {
          'id': '188389637112201d01711221a8a3001a',
          'value': 'journal',
          'label': 'Journal'
        }
      ]
    },
    {
      'id': '188389637112201d01711221a978002d',
      'desc': 'SubscriptionAgreement.RenewalPriority',
      'internal': false,
      'values': [
        {
          'id': '188389637112201d01711221a986002f',
          'value': 'for_review',
          'label': 'For review'
        },
        {
          'id': '188389637112201d01711221a97e002e',
          'value': 'definitely_renew',
          'label': 'Definitely renew'
        },
        {
          'id': '188389637112201d01711221a9900030',
          'value': 'definitely_cancel',
          'label': 'Definitely cancel'
        }
      ]
    },
    {
      'id': '12345',
      'desc': 'userCreated',
      'internal': false,
      'values': []
    }
  ];

  refDataCategories = sortBy(refDataCategories, [(item) => item.desc]);

  function mockData() {
    this.server.create('pickList', refDataCategories[0]);
    this.server.create('pickList', refDataCategories[1]);
    this.server.create('pickList', refDataCategories[2]);
    this.server.create('pickList', refDataCategories[3]);
  }

  describe('Pick lists', () => {
    setupApplication();
    const interactor = new PickListInteractor();

    beforeEach(mockData);

    describe('Refdata category', () => {
      beforeEach(async function () {
        await this.visit('settings/erm/pick-lists');
      });

      it(`list has ${refDataCategories.length} items`, () => {
        expect(interactor.pickList.rowCount).to.equal(refDataCategories.length);
      });

      refDataCategories.forEach((refDataCategory, index) => {
        describe(`${refDataCategory.desc} of type ${refDataCategory.internal ? 'Internal' : 'User'}`, () => {
          it('should not have an edit action button', () => {
            expect(interactor.pickList.rows(index).isEditPickListButtonPresent).to.equal(false);
          });

          it(`should ${(refDataCategory.internal || refDataCategory.values.length) ? 'not have' : 'have'} a delete action button`, () => {
            expect(interactor.pickList.rows(index).isDeletePickListButtonPresent).to.equal(!(refDataCategory.internal || refDataCategory.values.length));
          });
        });
      });
    });

    describe('Pick list values', () => {
      beforeEach(async function () {
        await this.visit('settings/erm/pick-list-values');
      });

      refDataCategories.forEach(refDataCategory => {
        describe(`Selecting ${refDataCategory.desc} refData category`, () => {
          beforeEach(async function () {
            await interactor.pickListDropdown.selectOption(refDataCategory.desc);
          });

          it(`should ${refDataCategory.internal ? 'not have' : 'have'} the new button enabled`, () => {
            expect(!!interactor.isNewButtonDisabled).to.equal(refDataCategory.internal);
          });

          refDataCategory.values.forEach((item, index) => {
            describe(`with value = ${item.value} `, () => {
              it(`should ${refDataCategory.internal ? 'not have' : 'have'} an edit action button`, () => {
                expect(!!interactor.valuesList.rows(index).isEditPickListValuesButtonPresent).to.be.true;
              });

              it(`should ${refDataCategory.internal ? 'have' : 'not have'} a delete action button`, () => {
                expect(interactor.valuesList.rows(index).isDeletePickListValuesButtonPresent).to.equal(!refDataCategory.internal);
              });
            });
          });
        });
      });

      describe('Selecting a User type refDataCategory', () => {
        const internalRefData = refDataCategories.find(category => !category.internal);
        beforeEach(async function () {
          await interactor.pickListDropdown.selectOption(internalRefData.desc);
        });

        describe('Clicking new button', () => {
          beforeEach(async function () {
            await interactor.clickableNewButton();
          });

          it('Should add a new row', () => {
            expect(interactor.valuesList.rowCount).to.equal(internalRefData?.values?.length + 1);
          });
        });
      });
    });
  });
});
