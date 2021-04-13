import React from 'react';
import { describe, beforeEach, it } from '@bigtest/mocha';
import chai from 'chai';
import spies from 'chai-spies';
import { StaticRouter as Router } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { mountWithContext } from '../helpers/mountWithContext';

import Agreements from '../../../src/components/EResourceSections/Agreements';
import EntitlementAgreementsList from '../../../src/components/EntitlementsAgreementsList';

import { pci as eresource, entitlements, relatedEntitlements } from './resources';
import PCIAgreementsInteractor from '../interactors/pci-agreements';

chai.use(spies);
const { expect, spy } = chai;

const handleNeedMoreEntitlements = spy();

describe('PCI agreements information', () => {
  const data = { eresource, entitlements, relatedEntitlements };

  const pciAgreementsInteractor = new PCIAgreementsInteractor();

  describe('in current package', () => {
    beforeEach(async () => {
      await mountWithContext(
        <Router context={{}}>
          <Agreements
            data={data}
            handlers={{
              onNeedMoreEntitlements: handleNeedMoreEntitlements
            }}
            headline={data.eresource.name}
            visibleColumns={['name', 'type', 'startDate', 'endDate']}
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
          <EntitlementAgreementsList
            entitlements={relatedEntitlements}
            id="related-agreements-list"
            isEmptyMessage={<FormattedMessage id="ui-agreements.emptyAccordion.noAgreementsOtherPackages" />}
            isRelatedEntitlement
            visibleColumns={['name', 'type', 'package', 'startDate', 'endDate']}
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
