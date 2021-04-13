import React from 'react';
import { describe, beforeEach, it } from '@bigtest/mocha';
import chai from 'chai';
import spies from 'chai-spies';
import { mountWithContext } from '../helpers/mountWithContext';

import TitleFormInfo from '../../../src/components/views/TitleFormInfo';
import TestForm from './TestForm';

import { titleInstance } from './resources';
import TitleInstanceEditPaneInteractor from '../interactors/title-instance-edit';

chai.use(spies);
const { expect, spy } = chai;

const onSubmit = spy();
const isSuppressFromDiscoveryEnabled = spy(resource => resource === 'title');

describe('Title form', () => {
  const interactor = new TitleInstanceEditPaneInteractor();

  describe('Title information', () => {
    beforeEach(async () => {
      await mountWithContext(
        <TestForm initialValues={titleInstance} onSubmit={onSubmit}>
          <TitleFormInfo isSuppressFromDiscoveryEnabled={isSuppressFromDiscoveryEnabled} name={titleInstance.name} />
        </TestForm>
      );
    });

    it('should have called isSuppressFromDiscoveryEnabled with string "title"', () => {
      expect(isSuppressFromDiscoveryEnabled).to.have.been.called.with('title');
    });

    it('renders the expected suppress from discovery status', () => {
      expect(interactor.suppressFromDiscoveryCheckboxChecked).to.equal(titleInstance.suppressFromDiscovery);
    });

    describe('clicking the suppress from discovery checkbox', () => {
      beforeEach(async () => {
        await interactor.clickSuppressFromDiscoveryCheckbox();
      });

      it('renders the expected suppress from discovery status', () => {
        expect(interactor.suppressFromDiscoveryCheckboxChecked).to.not.equal(titleInstance.suppressFromDiscovery);
      });
    });
  });
});
