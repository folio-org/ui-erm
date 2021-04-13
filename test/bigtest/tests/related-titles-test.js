import React from 'react';
import { describe, beforeEach, it } from '@bigtest/mocha';
import chai from 'chai';
import spies from 'chai-spies';
import { StaticRouter as Router } from 'react-router-dom';
import { mountWithContext } from '../helpers/mountWithContext';

import TitleCardInfo from '../../../src/components/TitleCard';

import { relatedTitlesMonograph, relatedTitlesSerial } from './resources';
import RelatedTitlesInteractor from '../interactors/related-titles';

chai.use(spies);
const { expect } = chai;

describe('RelatedTitleInfo', () => {
  const interactor = new RelatedTitlesInteractor();

  describe('related monograph titles', () => {
    beforeEach(async () => {
      await mountWithContext(
        <Router context={{}}>
          <TitleCardInfo title={relatedTitlesMonograph} />
        </Router>
      );
    });

    relatedTitlesMonograph.relatedTitles.forEach((monographResource, i) => {
      const doiValue = monographResource.identifiers.find(element => element.identifier.ns.value === 'doi')?.identifier.value;
      const isbnValue = monographResource.identifiers.find(element => element.identifier.ns.value === 'isbn')?.identifier.value;

      it(`should render expected title with index ${i}`, () => {
        expect(interactor.relatedTitles(i).titleInstanceName).to.equal('Related title "' + monographResource.name + '"');
      });

      it('should render expected subType', () => {
        expect(interactor.relatedTitles(i).titleInstanceSubType).to.equal(monographResource.subType.label);
      });

      if (isbnValue) {
        it('should render expected ISBN', () => {
          expect(interactor.relatedTitles(i).titleInstanceISBN).to.have.string(isbnValue);
        });
      }

      if (doiValue) {
        it('should render expected DOI', () => {
          expect(interactor.relatedTitles(i).titleInstanceDOI).to.have.string(doiValue);
        });
      }
    });
  });

  describe('related serial titles', () => {
    beforeEach(async () => {
      await mountWithContext(
        <Router context={{}}>
          <TitleCardInfo title={relatedTitlesSerial} />
        </Router>
      );
    });

    relatedTitlesSerial.relatedTitles.forEach((serialResource, i) => {
      const eissnValue = serialResource.identifiers.find(element => element.identifier.ns.value === 'eissn')?.identifier.value;
      const ezbValue = serialResource.identifiers.find(element => element.identifier.ns.value === 'ezb')?.identifier.value;
      const issnValue = serialResource.identifiers.find(element => element.identifier.ns.value === 'issn')?.identifier.value;
      const zdbValue = serialResource.identifiers.find(element => element.identifier.ns.value === 'zdb')?.identifier.value;

      it(`should render expected title with index ${i}`, () => {
        expect(interactor.relatedTitles(i).titleInstanceName).to.equal('Related title "' + serialResource.name + '"');
      });

      it('should render expected subType', () => {
        expect(interactor.relatedTitles(i).titleInstanceSubType).to.equal(serialResource.subType.label);
      });

      if (ezbValue) {
        it('should render expected EZB', () => {
          expect(interactor.relatedTitles(i).titleInstanceEZB).to.have.string(ezbValue);
        });
      }

      if (zdbValue) {
        it('should render expected ZDB', () => {
          expect(interactor.relatedTitles(i).titleInstanceZDB).to.have.string(zdbValue);
        });
      }

      if (eissnValue) {
        it('should render expected ISSN (Online)', () => {
          expect(interactor.relatedTitles(i).titleInstanceEISSN).to.have.string(eissnValue);
        });
      }

      if (issnValue) {
        it('should render expected ISSN (Print)', () => {
          expect(interactor.relatedTitles(i).titleInstanceISSN).to.have.string(issnValue);
        });
      }
    });
  });
});
