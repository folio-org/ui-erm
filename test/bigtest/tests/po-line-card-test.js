import React from 'react';
import { describe, beforeEach, it } from '@bigtest/mocha';
import chai from 'chai';
import spies from 'chai-spies';
import { StaticRouter as Router } from 'react-router-dom';
import { mountWithContext } from '../helpers/mountWithContext';
import POLineCard from '../../../src/components/POLineCard';

import POLineCardInteractor from '../interactors/po-line-card';

chai.use(spies);
const { expect } = chai;

const poLine = {
  acquisitionMethod: 'book store',
  id: '12345',
  poLineNumber: '67-890',
  titleOrPackage: 'How to write tests',
};

const poLineWithInstanceId = { ...poLine };
poLineWithInstanceId.instanceId = 'abcde';

describe('POLineCard', () => {
  const interactor = new POLineCardInteractor();

  describe('when rendered with limited data', () => {
    beforeEach(async () => {
      await mountWithContext(
        <Router context={{}}>
          <POLineCard id="no-data" poLine={{}} />
        </Router>
      );
    });

    it('should render', () => {
      expect(interactor.id).to.equal('no-data');
    });
  });

  describe('when rendered with full data but no instanceId', () => {
    beforeEach(async () => {
      await mountWithContext(
        <Router context={{}}>
          <POLineCard poLine={poLine} />
        </Router>
      );
    });

    it('should render title', () => {
      expect(interactor.title).to.equal(poLine.titleOrPackage);
    });

    it('should render PO Line number', () => {
      expect(interactor.poLineNumber).to.contain(poLine.poLineNumber);
    });

    it('should render acquisition method', () => {
      expect(interactor.acqMethod).to.equal(poLine.acquisitionMethod);
    });

    it('should not render inventory link', () => {
      expect(interactor.inventoryLinkIsPresent).to.be.false;
    });
  });

  describe('when rendered with full data and instanceId', () => {
    beforeEach(async () => {
      await mountWithContext(
        <Router context={{}}>
          <POLineCard poLine={poLineWithInstanceId} />
        </Router>
      );
    });

    it('should render inventory link', () => {
      expect(interactor.inventoryLinkIsPresent).to.be.true;
    });
  });

  describe('when rendered with headerEnd', () => {
    beforeEach(async () => {
      await mountWithContext(
        <Router context={{}}>
          <POLineCard
            headerEnd={<span>Sample headerEnd</span>}
            poLine={poLine}
          />
        </Router>
      );
    });

    it('should render headerEnd', () => {
      expect(interactor.textContent).to.contain('Sample headerEnd');
    });
  });

  describe('when rendered with children', () => {
    beforeEach(async () => {
      await mountWithContext(
        <Router context={{}}>
          <POLineCard poLine={poLine}>
            <div>Sample children</div>
          </POLineCard>
        </Router>
      );
    });

    it('should render children', () => {
      expect(interactor.textContent).to.contain('Sample children');
    });
  });
});
