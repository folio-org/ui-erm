import React from 'react';
import { beforeEach, describe, it } from '@bigtest/mocha';
import { expect } from 'chai';

import { Form } from 'react-final-form';

import { mountWithContext } from '../helpers/mountWithContext';

import { SuppressFromDiscoveryFields } from '../../../src/settings/components';
import SuppressFromDiscoveryInteractor from '../interactors/suppress-from-discovery';

const interactor = new SuppressFromDiscoveryInteractor();

describe('Suppress from discovery tests', () => {
  describe('Rendering the "Suppress from discovery" settings component', () => {
    beforeEach(async function () {
      await mountWithContext(
        <Form
          onSubmit={() => {}}
          render={({ handleSubmit }) => {
            return (
              <form onSubmit={handleSubmit}>
                <SuppressFromDiscoveryFields name="test" />
              </form>
            );
          }}
        />
      );
    });

    it('renders the description', () => {
      expect(interactor.isDescription).to.be.true;
    });

    describe('agreement line checkbox tests', () => {
      it('renders the agreement line checkbox', () => {
        expect(interactor.isAgreementLineCheckboxPresent).to.be.true;
      });

      it('agreement line checkbox has the correct name prop', () => {
        expect(interactor.agreementLineFieldName).to.equal('test.agreementLine');
      });

      it('agreementLine checkbox is false', () => {
        expect(interactor.agreementLineFieldChecked).to.equal(false);
      });

      describe('Clicking the agreement line checkbox', () => {
        beforeEach(async function () {
          await interactor.clickAgreementLine();
        });

        it('agreementLine checkbox is set to true', () => {
          expect(interactor.agreementLineFieldChecked).to.equal(true);
        });
      });
    });

    describe('pci checkbox tests', () => {
      it('renders the pci checkbox', () => {
        expect(interactor.isPCICheckboxPresent).to.be.true;
      });

      it('pci checkbox has the correct name prop', () => {
        expect(interactor.pciFieldName).to.equal('test.pci');
      });

      it('pci checkbox is false', () => {
        expect(interactor.pciFieldChecked).to.equal(false);
      });

      describe('Clicking the pci checkbox', () => {
        beforeEach(async function () {
          await interactor.clickPCI();
        });

        it('pci checkbox is set to true', () => {
          expect(interactor.pciFieldChecked).to.equal(true);
        });
      });
    });

    describe('title instance checkbox tests', () => {
      it('renders the title instance checkbox', () => {
        expect(interactor.isTitleInstanceCheckboxPresent).to.be.true;
      });

      it('title instance checkbox has the correct name prop', () => {
        expect(interactor.titleInstanceFieldName).to.equal('test.title');
      });

      it('title instance checkbox is false', () => {
        expect(interactor.titleInstanceFieldChecked).to.equal(false);
      });

      describe('Clicking the title instance checkbox', () => {
        beforeEach(async function () {
          await interactor.clickTitleInstance();
        });

        it('title instance checkbox is set to true', () => {
          expect(interactor.titleInstanceFieldChecked).to.equal(true);
        });
      });
    });
  });
});
