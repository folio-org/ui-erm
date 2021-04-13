import React from 'react';
import { describe, beforeEach, it } from '@bigtest/mocha';
import chai from 'chai';
import spies from 'chai-spies';
import { mountWithContext } from '../helpers/mountWithContext';

import { PCIFormInfo, PCIFormCoverage } from '../../../src/components/EResourceSections';
import TestForm from './TestForm';

import { pci } from './resources';
import PCIEditPaneInteractor from '../interactors/pci-edit';
import EmbargoInteractor from '../interactors/embargo';

chai.use(spies);
const { expect, spy } = chai;

const onSubmit = spy();

const isSuppressFromDiscoveryEnabled = spy(resource => resource === 'pci');

const isSuppressFromDiscoveryEnabledFalse = spy(resource => resource !== 'pci');

describe('PCI edit form', () => {
  const embargoInteractor = new EmbargoInteractor();
  const pciEditPaneInteractor = new PCIEditPaneInteractor();

  let submissions = 0;

  const testSubmit = (values) => (
    describe('submitting the form', () => {
      beforeEach(async () => {
        await pciEditPaneInteractor.submit();
        submissions += 1;
      });

      it('should have correct form values', () => {
        expect(onSubmit).on.nth(submissions).be.called.with(values);
      });
    })
  );

  describe('PCI information', () => {
    beforeEach(async () => {
      await mountWithContext(
        <TestForm initialValues={pci} onSubmit={onSubmit}>
          <PCIFormInfo isSuppressFromDiscoveryEnabled={isSuppressFromDiscoveryEnabled} />
        </TestForm>
      );
    });

    it('renders the pci name', () => {
      expect(pciEditPaneInteractor.pciName).to.equal(pci.name);
    });

    it('renders the expected access from date', () => {
      expect(pciEditPaneInteractor.accessFrom).to.equal('01/01/2014');
    });

    it('renders the expected access until date', () => {
      expect(pciEditPaneInteractor.accessUntil).to.equal('01/01/2015');
    });

    it('should have called isSuppressFromDiscoveryEnabled with string "pci"', () => {
      expect(isSuppressFromDiscoveryEnabled).to.have.been.called.with('pci');
    });

    it('renders the expected suppress from discovery status', () => {
      expect(pciEditPaneInteractor.suppressFromDiscoveryCheckboxChecked).to.equal(pci.suppressFromDiscovery);
    });

    describe('clicking the suppress from discovery checkbox', () => {
      beforeEach(async () => {
        await pciEditPaneInteractor.clickSuppressFromDiscoveryCheckbox();
      });

      testSubmit({
        ...pci,
        'suppressFromDiscovery': !pci.suppressFromDiscovery
      });
    });
  });

  describe('PCI information (SuppressFromDisplay setting OFF)', () => {
    beforeEach(async () => {
      await mountWithContext(
        <TestForm initialValues={pci} onSubmit={onSubmit}>
          <PCIFormInfo isSuppressFromDiscoveryEnabled={isSuppressFromDiscoveryEnabledFalse} />
        </TestForm>
      );
    });

    it('should have called isSuppressFromDiscoveryEnabled with string "pci"', () => {
      expect(isSuppressFromDiscoveryEnabled).to.have.been.called.with('pci');
    });

    it('does not render the expected suppress from discovery status', () => {
      expect(pciEditPaneInteractor.isSuppressFromDiscoveryCheckboxPresent).to.be.false;
    });
  });

  describe('PCI information', () => {
    beforeEach(async () => {
      await mountWithContext(
        <TestForm initialValues={pci} onSubmit={onSubmit}>
          <PCIFormCoverage
            id="pciFormCoverage"
            values={pci}
          />
        </TestForm>
      );
    });

    it('renders the coverage accordion', () => {
      expect(pciEditPaneInteractor.isCoverageAccordionPresent).to.be.true;
    });

    it('renders the embargo', () => {
      expect(embargoInteractor.exists).to.be.true;
    });

    it('renders the embargo moving wall start', () => {
      expect(embargoInteractor.movingWallStartExists).to.be.true;
    });

    it('correctly renders the embargo start length', () => {
      expect(embargoInteractor.startLength).to.have.string(pci.embargo.movingWallStart.length);
    });

    it('correctly renders the embargo start unit', () => {
      expect(embargoInteractor.startUnit).to.have.string(pci.embargo.movingWallStart.unit);
    });

    it('renders the embargo moving wall end', () => {
      expect(embargoInteractor.movingWallEndExists).to.be.true;
    });

    it('correctly renders the embargo end length', () => {
      expect(embargoInteractor.endLength).to.have.string(pci.embargo.movingWallEnd.length);
    });

    it('correctly renders the embargo end unit', () => {
      expect(embargoInteractor.endUnit).to.have.string(pci.embargo.movingWallEnd.unit);
    });

    it('correctly renders the first coverage start date', () => {
      expect(pciEditPaneInteractor.coverageCards(0).startDate).to.equal('01/01/1963');
    });

    it('correctly renders the first coverage end date', () => {
      expect(pciEditPaneInteractor.coverageCards(0).endDate).to.equal('01/01/1965');
    });

    it('correctly renders the first coverage start volume', () => {
      expect(pciEditPaneInteractor.coverageCards(0).startVolume).to.equal(pci.coverage[0].startVolume);
    });

    it('correctly renders the first coverage end volume', () => {
      expect(pciEditPaneInteractor.coverageCards(0).endVolume).to.equal(pci.coverage[0].endVolume);
    });

    it('correctly renders the first coverage start issue', () => {
      expect(pciEditPaneInteractor.coverageCards(0).startIssue).to.equal(pci.coverage[0].startIssue);
    });

    it('correctly renders the first coverage end issue', () => {
      expect(pciEditPaneInteractor.coverageCards(0).endIssue).to.equal(pci.coverage[0].endIssue);
    });

    it('correctly renders the second coverage start date', () => {
      expect(pciEditPaneInteractor.coverageCards(1).startDate).to.equal('01/01/1967');
    });

    it('correctly renders the second coverage end date', () => {
      expect(pciEditPaneInteractor.coverageCards(1).endDate).to.equal('01/01/1969');
    });

    it('correctly renders the second coverage start volume', () => {
      expect(pciEditPaneInteractor.coverageCards(1).startVolume).to.equal(pci.coverage[1].startVolume);
    });

    it('correctly renders the second coverage end volume', () => {
      expect(pciEditPaneInteractor.coverageCards(1).endVolume).to.equal(pci.coverage[1].endVolume);
    });

    it('correctly renders the second coverage start issue', () => {
      expect(pciEditPaneInteractor.coverageCards(1).startIssue).to.equal(pci.coverage[1].startIssue);
    });

    it('correctly renders the second coverage end issue', () => {
      expect(pciEditPaneInteractor.coverageCards(1).endIssue).to.equal(pci.coverage[1].endIssue);
    });

    it('correctly renders the add coverage button', () => {
      expect(pciEditPaneInteractor.isAddButtonPresent).to.be.true;
    });

    describe('Clicking the add coverage button', () => {
      beforeEach(async () => {
        await pciEditPaneInteractor.clickAddButton();
      });

      it('renders a new coverage card', () => {
        expect(pciEditPaneInteractor.coverageCount).to.equal(3);
      });
    });

    describe('Deleting a coverage card', () => {
      beforeEach(async () => {
        await pciEditPaneInteractor.coverageCards(1).clickDeleteButton();
      });

      it('should reduce the card count by 1', () => {
        expect(pciEditPaneInteractor.coverageCount).to.equal(1);
      });
    });

    describe.skip('Adding new coverage', () => {
      beforeEach(async () => {
        await pciEditPaneInteractor.clickAddButton();
        await new Promise(resolve => { setTimeout(resolve, 500); }); // Should be removed as a part of ERM-825
      });

      describe('Entering empty start date with an empty date', () => {
        beforeEach(async () => {
          await pciEditPaneInteractor.coverageCards(2).fillAndBlurStartDate('');
        });

        it('should render an error message', () => {
          expect(pciEditPaneInteractor.coverageCards(2).hasError).to.be.true;
        });
      });

      describe('Entering start date greater than end date', () => {
        beforeEach(async () => {
          await pciEditPaneInteractor.coverageCards(2).fillAndBlurStartDate('02/02/2012');
          await pciEditPaneInteractor.coverageCards(2).fillAndBlurEndDate('02/02/2010');
        });

        it('should render start date greater than end date error message', () => {
          expect(pciEditPaneInteractor.coverageCards(2).isTooEarlyErrorPresent).to.be.true;
        });
      });

      describe('Entering overlapping dates', () => {
        beforeEach(async () => {
          await pciEditPaneInteractor.coverageCards(2).fillAndBlurStartDate('02/02/2010');
          await pciEditPaneInteractor.coverageCards(2).fillAndBlurEndDate('02/02/2012');
          await pciEditPaneInteractor.clickAddButton();
          await new Promise(resolve => { setTimeout(resolve, 500); }); // Should be removed as a part of ERM-825
          await pciEditPaneInteractor.coverageCards(3).fillAndBlurStartDate('02/02/2009');
        });

        it('should render overlapping dates error message', () => {
          expect(pciEditPaneInteractor.coverageCards(3).isOverlappingErrorPresent).to.be.true;
        });
      });
    });

    describe('Adding new coverage and submitting the form', () => {
      const newCoverage = {
        '_delete': false,
        'endDate': '2022-01-01',
        'endIssue': '16',
        'endVolume': '225',
        'startDate': '2021-01-01',
        'startIssue': '36',
        'startVolume': '25',
      };

      beforeEach(async () => {
        await pciEditPaneInteractor.clickAddButton();
        await new Promise(resolve => { setTimeout(resolve, 500); }); // Should be removed as a part of ERM-825
        await pciEditPaneInteractor.coverageCards(2).fillStartDate('01/01/2021');
        await pciEditPaneInteractor.coverageCards(2).fillEndDate('01/01/2022');
        await pciEditPaneInteractor.coverageCards(2).fillStartVolume(newCoverage.startVolume);
        await pciEditPaneInteractor.coverageCards(2).fillStartIssue(newCoverage.startIssue);
        await pciEditPaneInteractor.coverageCards(2).fillEndIssue(newCoverage.endIssue);
        await pciEditPaneInteractor.coverageCards(2).fillEndVolume(newCoverage.endVolume);
      });

      testSubmit({
        ...pci,
        'coverage': [...pci.coverage, newCoverage]
      });
    });
  });
});
