import React from 'react';
import { describe, beforeEach, it } from '@bigtest/mocha';
import chai from 'chai';
import spies from 'chai-spies';
import { StaticRouter as Router } from 'react-router-dom';
import { mountWithContext } from '../helpers/mountWithContext';
import PackageCard from '../../../src/components/PackageCard';

import { pci } from './resources';
import PackageCardInteractor from '../interactors/package-card';

chai.use(spies);
const { expect } = chai;

describe('PackageCard', () => {
  const interactor = new PackageCardInteractor();

  describe('pci package', () => {
    beforeEach(async () => {
      await mountWithContext(
        <Router context={{}}>
          <PackageCard pkg={pci.pkg} />
        </Router>
      );
    });

    it('should render expected package name', () => {
      expect(interactor.packageName).to.equal(pci.pkg.name);
    });

    it('should render expected resource count', () => {
      expect(interactor.resourceCount).to.have.string(pci.pkg.resourceCount);
    });

    it('should render expected vendor name', () => {
      expect(interactor.vendorName).to.equal(pci.pkg.vendor.name);
    });

    it('should render expected package source', () => {
      expect(interactor.packageSource).to.equal(pci.pkg.source);
    });

    it('should render expected package reference', () => {
      expect(interactor.packageReference).to.equal(pci.pkg.reference);
    });
  });

  describe('eHoldings Package', () => {
    const pkg = {
      id: 'f5d265ac-bc9c-4e39-a6bd-381a9c709a5b',
      type: 'external',
      authority: 'EKB-PACKAGE',
      reference: '19-3629',
      explanation: null,
      contentUpdated: null,
      haveAccess: true,
      owner: {
        id: '9b710a4b-1f7e-4e7f-9757-17bb07f9fe91'
      },
      poLines: [],
      customCoverage: false,
      reference_object: {
        label: 'Book Collection Nonfiction: Elementary School Edition',
        type: 'Package',
        provider: 'EBSCO',
        titleCount: 1273,
        selectedCount: 1200,
        contentType: 'E-Book',
        providerName: 'EBSCO',
        isSelected: true
      }
    };

    beforeEach(async () => {
      await mountWithContext(
        <Router context={{}}>
          <PackageCard pkg={pkg} />
        </Router>
      );
    });

    it('should render expected count', () => {
      expect(interactor.resourceCount).to.have.string('1200 / 1273');
    });

    it('should render expected provider', () => {
      expect(interactor.vendorName).to.equal(pkg.reference_object.provider);
    });

    it('should render expected package source', () => {
      expect(interactor.packageSource).to.equal(pkg.authority);
    });

    it('should render expected package reference', () => {
      expect(interactor.packageReference).to.equal(pkg.reference);
    });
  });
});
