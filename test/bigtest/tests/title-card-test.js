import React from 'react';
import { describe, beforeEach, it } from '@bigtest/mocha';
import chai from 'chai';
import spies from 'chai-spies';
import { StaticRouter as Router } from 'react-router-dom';
import { mountWithContext } from '../helpers/mountWithContext';

import TitleCard from '../../../src/components/TitleCard';

import { monographResource, serialResource } from './resources';
import TitleCardInteractor from '../interactors/title-card';

chai.use(spies);
const { expect } = chai;

describe('TitleCard', () => {
  const interactor = new TitleCardInteractor();

  describe('monograph resource', () => {
    beforeEach(async () => {
      await mountWithContext(
        <Router context={{}}>
          <TitleCard title={monographResource} />
        </Router>
      );
    });

    it('should render expected title', () => {
      expect(interactor.titleInstanceName).to.equal(monographResource.pti.titleInstance.name);
    });

    it('should render expected title instance type', () => {
      expect(interactor.titleInstanceType).to.equal(monographResource.pti.titleInstance.publicationType.label);
    });

    it('should render expected subType', () => {
      expect(interactor.titleInstanceSubType).to.equal(monographResource.pti.titleInstance.subType.label);
    });

    it('should render expected first author', () => {
      expect(interactor.titleInstanceFirstAuthor).to.equal(monographResource.pti.titleInstance.firstAuthor);
    });

    it('should render expected first editor', () => {
      expect(interactor.titleInstanceFirstEditor).to.equal(monographResource.pti.titleInstance.firstEditor);
    });

    it('should render expected publication date', () => {
      expect(interactor.titleInstancePublicationDate).to.have.string('1/1/1850'); // handle this if you alter the date in the pci resource
    });

    it('should render expected monograph edition', () => {
      expect(interactor.titleInstanceMonographEdition).to.equal(monographResource.pti.titleInstance.monographEdition);
    });

    it('should render expected monograph volume', () => {
      expect(interactor.titleInstanceMonographVolume).to.equal(monographResource.pti.titleInstance.monographVolume);
    });

    it('should render expected ISBN', () => {
      expect(interactor.titleInstanceISBN).to.have.string('9780141974330'); // handle this if you alter the ISBN in the pci resource
    });

    it('should render expected DOI', () => {
      expect(interactor.titleInstanceDOI).to.have.string('1234567'); // handle this if you alter the doi in the pci resource
    });
  });

  describe('serial resource', () => {
    beforeEach(async () => {
      await mountWithContext(
        <Router context={{}}>
          <TitleCard title={serialResource} />
        </Router>
      );
    });

    it('should render expected title', () => {
      expect(interactor.titleInstanceName).to.equal(serialResource.pti.titleInstance.name);
    });

    it('should render expected title instance type', () => {
      expect(interactor.titleInstanceType).to.equal(serialResource.pti.titleInstance.publicationType.label);
    });

    it('should render expected subType', () => {
      expect(interactor.titleInstanceSubType).to.equal(serialResource.pti.titleInstance.subType.label);
    });

    it('should render expected EZB', () => {
      expect(interactor.titleInstanceEZB).to.have.string('2094800-2'); // handle this if you alter the ISBN in the pci resource
    });

    it('should render expected ZDB', () => {
      expect(interactor.titleInstanceZDB).to.have.string('2094800-1'); // handle this if you alter the doi in the pci resource
    });

    it('should render expected ISSN (online)', () => {
      expect(interactor.titleInstanceEISSN).to.have.string('1944-9585'); // handle this if you alter the doi in the pci resource
    });

    it('should render expected ISSN (Print)', () => {
      expect(interactor.titleInstancePISSN).to.have.string('1943-9585'); // handle this if you alter the doi in the pci resource
    });
  });
});
