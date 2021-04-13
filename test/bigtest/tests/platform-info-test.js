import React from 'react';
import { describe, beforeEach, it } from '@bigtest/mocha';
import chai from 'chai';
import spies from 'chai-spies';
import { StaticRouter as Router } from 'react-router-dom';
import { mountWithContext } from '../helpers/mountWithContext';

import { platform } from './resources';
import PlatformViewInteractor from '../interactors/platform-view';

import { PlatformInfo } from '../../../src/components/PlatformSections';

chai.use(spies);
const { expect } = chai;

describe('Platform info', () => {
  const platformViewInteractor = new PlatformViewInteractor();

  beforeEach(async () => {
    await mountWithContext(
      <Router context={{}}>
        <PlatformInfo
          platform={platform}
        />
      </Router>
    );
  });

  it('should render the platform name', () => {
    expect(platformViewInteractor.isPlatformNamePresent).to.be.true;
  });

  it('should render the local code', () => {
    expect(platformViewInteractor.isLocalCodePresent).to.be.true;
  });

  it('should render the locators', () => {
    expect(platformViewInteractor.isLocatorsPresent).to.be.true;
  });

  it('should render the expected platform name', () => {
    expect(platformViewInteractor.platformName).to.equal(platform.name);
  });

  it('should render the expected local code', () => {
    expect(platformViewInteractor.localCode).to.equal(platform.localCode);
  });

  it('should render the expected locators', () => {
    expect(platformViewInteractor.locators).to.equal(platform.locators[0].domainName);
  });
});
