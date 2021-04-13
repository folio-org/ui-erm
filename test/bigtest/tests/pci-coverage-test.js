import React from 'react';
import { describe, beforeEach, it } from '@bigtest/mocha';
import chai from 'chai';
import spies from 'chai-spies';
import { StaticRouter as Router } from 'react-router-dom';
import { mountWithContext } from '../helpers/mountWithContext';

import PCICoverage from '../../../src/components/EResourceSections/PCICoverage';

import { serialResource } from './resources';
import EmbargoInteractor from '../interactors/embargo';
import PCICoverageDetailsInteractor from '../interactors/pci-coverage';

chai.use(spies);
const { expect } = chai;

describe('PCI coverage information', () => {
  const embargoInteractor = new EmbargoInteractor();
  const pciCoverageInteractor = new PCICoverageDetailsInteractor();

  beforeEach(async () => {
    await mountWithContext(
      <Router context={{}}>
        <PCICoverage
          data={{ eresource : serialResource }}
        />
      </Router>
    );
  });

  it('renders the embargo', () => {
    expect(embargoInteractor.exists).to.be.true;
  });

  it('renders the embargo moving wall start', () => {
    expect(embargoInteractor.movingWallStartExists).to.be.true;
  });

  it('correctly renders the embargo start length', () => {
    expect(embargoInteractor.startLength).to.have.string(serialResource.embargo.movingWallStart.length);
  });

  it('correctly renders the embargo start unit', () => {
    expect(embargoInteractor.startUnit).to.have.string(serialResource.embargo.movingWallStart.unit);
  });

  it('renders the embargo moving wall end', () => {
    expect(embargoInteractor.movingWallEndExists).to.be.true;
  });

  it('correctly renders the embargo end length', () => {
    expect(embargoInteractor.endLength).to.have.string(serialResource.embargo.movingWallEnd.length);
  });

  it('correctly renders the embargo end unit', () => {
    expect(embargoInteractor.endUnit).to.have.string(serialResource.embargo.movingWallEnd.unit);
  });

  it('renders the expected start date', () => {
    expect(pciCoverageInteractor.startDate).to.equal('1/1/2002');
  });

  it('renders the expected start volume', () => {
    expect(pciCoverageInteractor.startVolume).to.equal(serialResource.coverage[0].startVolume);
  });

  it('renders the expected start issue', () => {
    expect(pciCoverageInteractor.startIssue).to.equal(serialResource.coverage[0].startIssue);
  });

  it('renders the expected end date', () => {
    expect(pciCoverageInteractor.endDate).to.equal('1/1/2010');
  });

  it('renders the expected end volume', () => {
    expect(pciCoverageInteractor.endVolume).to.equal(serialResource.coverage[0].endVolume);
  });

  it('renders the expected end issue', () => {
    expect(pciCoverageInteractor.endIssue).to.equal(serialResource.coverage[0].endIssue);
  });
});
