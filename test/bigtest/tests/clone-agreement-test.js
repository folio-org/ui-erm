import { beforeEach, describe, it } from '@bigtest/mocha';

import { expect } from 'chai';

import setupApplication from '../helpers/setup-application';
import AgreementFormInteractor from '../interactors/agreement-form';
import AgreementViewInteractor from '../interactors/agreement-view';

const number = Math.round(Math.random() * 100000);

const agreementData = {
  id: '1234',
  name: `agreement clone #${number}`,
  agreementStatus: { value: 'active' },
  periods: [{
    startDate: '11/13/2019'
  }],
};

const internalContactData = {
  user: '333',
  personal: {
    firstName: 'John',
    middleName: 'paul',
    lastName: 'parker'
  },
  role: { label: 'Agreement owner', value: 'agreement_owner' },
};

describe('Clone Agreement test', () => {
  setupApplication();
  const agreementView = new AgreementViewInteractor();
  const agreementEdit = new AgreementFormInteractor();
  let agreement;

  beforeEach(async function () {
    agreementData.internalContactData = internalContactData;
    agreement = this.server.create('agreement', 'withContacts', agreementData);
  });

  describe('click duplicate agreement button', () => {
    const { firstName = '', lastName = '-', middleName = '' } = internalContactData.personal;
    const name = `${lastName}${firstName ? ', ' : ' '}${firstName} ${middleName}`;

    beforeEach(async function () {
      await this.visit(`erm/agreements/${agreement.id}`);
      await agreementView.whenLoaded();
      await agreementView.whenActionsDropDownButtonLoaded();
    });

    describe('select only the agreementInfo checkbox to duplicate', () => {
      beforeEach(async function () {
        await agreementView.clickActionsDropdownButton();
        await agreementView.headerDropdownMenu.clickDuplicate();
        await agreementView.duplicateAgreementModal.checkBoxList(1).click();
        await agreementView.duplicateAgreementModal.clickSaveAndClose();
        await agreementEdit.whenLoaded();
      });

      it('should render the expected name on the edit page', () => {
        expect(agreementEdit.name).to.equal(agreementData.name);
      });

      it('should not render an internalContact card', () => {
        expect(agreementEdit.internalContacts(0).isCardPresent).to.be.false;
      });
    });

    describe('select all properties to duplicate', () => {
      beforeEach(async function () {
        await agreementView.clickActionsDropdownButton();
        await agreementView.headerDropdownMenu.clickDuplicate();
        await agreementView.duplicateAgreementModal.checkBoxList(0).click();
        await agreementView.duplicateAgreementModal.clickSaveAndClose();
        await agreementEdit.whenLoaded();
      });

      it('should render the expected name on the edit page', () => {
        expect(agreementEdit.name).to.equal(agreementData.name);
      });

      it('should render an internalContact card', () => {
        expect(agreementEdit.internalContacts(0)).is.not.undefined;
      });

      it('should render the expected users name on the internalContact card', () => {
        expect(agreementEdit.internalContacts(0).userName).to.equal(name);
      });
    });
  });
});
