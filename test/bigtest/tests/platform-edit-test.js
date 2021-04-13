import React from 'react';
import { describe, beforeEach, it } from '@bigtest/mocha';
import chai from 'chai';
import spies from 'chai-spies';
import { mountWithContext } from '../helpers/mountWithContext';

import PlatformFormInfo from '../../../src/components/views/PlatformFormInfo';
import TestForm from './TestForm';

import { platform } from './resources';
import PlatformEditInteractor from '../interactors/platform-edit';

chai.use(spies);
const { expect, spy } = chai;

const onSubmit = spy();

describe('Platform form', () => {
  const platformEditInteractor = new PlatformEditInteractor();

  describe('Platform information', () => {
    beforeEach(async () => {
      await mountWithContext(
        <TestForm initialValues={platform} onSubmit={onSubmit}>
          <PlatformFormInfo name={platform.name} />
        </TestForm>
      );
    });

    it('renders the platform code', () => {
      expect(platformEditInteractor.platformCode).to.equal(platform.localCode);
    });
  });
});
