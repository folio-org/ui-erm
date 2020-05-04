import React from 'react';
import { describe, beforeEach, it } from '@bigtest/mocha';
import chai from 'chai';
import spies from 'chai-spies';
import { StaticRouter as Router } from 'react-router-dom';
import { mountWithContext } from '../helpers/mountWithContext';

import Agreements from '../../../src/components/EResourceSections/Agreements';
import AgreementsList from '../../../src/components/EResourceSections/AgreementsList';

import { pci as eresource, entitlements, relatedEntitlements } from './resources';
import PCIAgreementsInteractor from '../interactors/pci-agreements';

chai.use(spies);
const { expect } = chai;

describe('PCI agreements information', () => {
  const data = { eresource, entitlements, relatedEntitlements };

  const pciAgreementsInteractor = new PCIAgreementsInteractor();

  describe('in current package', () => {
    beforeEach(async () => {
      await mountWithContext(
        <Router context={{}}>
          <Agreements
            data={data}
            id="pciagreements"
          />
        </Router>
      );
    });

    it('renders the agreement name', () => {
      expect(pciAgreementsInteractor.agreementName(0)).to.equal(entitlements?.[0]?.owner?.name);
    });

    it('renders the agreement status', () => {
      expect(pciAgreementsInteractor.agreementStatus(0)).to.equal(entitlements?.[0]?.owner?.agreementStatus?.label);
    });

    it('renders the agreement start date', () => {
      expect(pciAgreementsInteractor.startDate(0)).to.equal('5/7/2020');
    });

    it('renders the agreement end date', () => {
      expect(pciAgreementsInteractor.endDate(0)).to.equal('5/8/2020');
    });
  });

  describe('in other platform packages', () => {
    beforeEach(async () => {
      await mountWithContext(
        <Router context={{}}>
          <AgreementsList
            eresource={eresource}
            id="pcirelatedagreements"
            isRelatedEntitlement
            resources={relatedEntitlements}
          />
        </Router>
      );
    });

    it('renders the related agreement name', () => {
      expect(pciAgreementsInteractor.relatedAgreementName(0)).to.equal(relatedEntitlements?.[0]?.owner?.name);
    });

    it('renders the related agreement status', () => {
      expect(pciAgreementsInteractor.relatedAgreementStatus(0)).to.equal(relatedEntitlements?.[0]?.owner?.agreementStatus?.label);
    });

    it('renders the related package name', () => {
      expect(pciAgreementsInteractor.relatedAgreementPackage(0)).to.equal(relatedEntitlements?.[0]?.resource?._object?.pkg?.name);
    });

    it('renders the related agreement start date', () => {
      expect(pciAgreementsInteractor.relatedAgreementStartDate(0)).to.equal('5/22/2020');
    });

    it('renders the related agreement end date', () => {
      expect(pciAgreementsInteractor.relatedAgreementEndDate(0)).to.equal('5/22/2021');
    });
  });
});
