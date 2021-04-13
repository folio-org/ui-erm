import React from 'react';
import { beforeEach, describe, it } from '@bigtest/mocha';
import { expect } from 'chai';

import { mountWithContext } from '../helpers/mountWithContext';

import Coverage from '../../../src/components/Coverage';
import MonographCoverageInteractor from '../interactors/monograph-coverage';
import SerialCoverageInteractor from '../interactors/serial-coverage';
import EmbargoInteractor from '../interactors/embargo';

const embargoInteractor = new EmbargoInteractor();

const monographInteractor = new MonographCoverageInteractor();

const serialInteractor = new SerialCoverageInteractor();
const serialInteractorStart = new SerialCoverageInteractor('[data-test-start]');
const serialInteractorEnd = new SerialCoverageInteractor('[data-test-end]');

const monograph = {
  pti: {
    titleInstance: {
      id: '1501',
      name: 'This is a monograph',
      dateMonographPublished: '1996',
      monographVolume: '5',
      monographEdition: '2nd',
      type: {
        value: 'monograph',
        label: 'Monograph'
      },
      subType: {
        value: 'electronic',
        label: 'Electronic'
      }
    }
  },
  embargo: {
    movingWallStart: { length: 3, unit: 'months' },
    movingWallEnd: { length: 90, unit: 'days' },
  },
};

const serial = {
  pti: {
    titleInstance: {
      id: '2612',
      name: 'This is a serial',
      type: { value: 'serial', label: 'Serial' },
      subType: {
        value: 'electronic',
        label: 'Electronic'
      }
    }
  },
  coverage: [{
    startDate: '2001-06-12',
    endDate: '2007-05-10',
    startVolume: '76',
    startIssue: '1',
    endVolume: '79',
    endIssue: '2'
  }],
  embargo: {
    movingWallStart: { length: 730, unit: 'days' },
    movingWallEnd: { length: 2, unit: 'years' },
  },
};

// We also want to test the other possible shapes for passing this data through to Coverage and Embargo

const monographEResource = {
  _object: monograph,
};

const serialEResource = {
  _object: serial,
  coverage: serial.coverage,
};

const monographLine = {
  resource: monographEResource,
};

const serialLine = {
  resource: serialEResource,
  coverage: serial.coverage,
};

describe('Coverage tests', () => {
  describe('Rendering coverage component for a monograph pci', () => {
    beforeEach(async function () {
      await mountWithContext(
        <Coverage pci={monograph} />
      );
    });

    it('renders the monograph coverage', () => {
      expect(monographInteractor.exists).to.be.true;
    });

    it('correctly renders the date', () => {
      expect(monographInteractor.date).to.have.string(monograph.pti.titleInstance.dateMonographPublished);
    });

    it('correctly renders the edition', () => {
      expect(monographInteractor.edition).to.have.string(monograph.pti.titleInstance.monographEdition);
    });

    it('correctly renders the volume', () => {
      expect(monographInteractor.volume).to.have.string(monograph.pti.titleInstance.monographVolume);
    });

    it('renders the embargo moving wall start', () => {
      expect(embargoInteractor.movingWallStartExists).to.be.true;
    });

    it('correctly renders the embargo start length', () => {
      expect(embargoInteractor.startLength).to.have.string(monograph.embargo.movingWallStart.length);
    });

    it('correctly renders the embargo start unit', () => {
      expect(embargoInteractor.startUnit).to.have.string(monograph.embargo.movingWallStart.unit);
    });

    it('renders the embargo moving wall end', () => {
      expect(embargoInteractor.movingWallEndExists).to.be.true;
    });

    it('correctly renders the embargo end length', () => {
      expect(embargoInteractor.endLength).to.have.string(monograph.embargo.movingWallEnd.length);
    });

    it('correctly renders the embargo end unit', () => {
      expect(embargoInteractor.endUnit).to.have.string(monograph.embargo.movingWallEnd.unit);
    });
  });

  describe('Rendering coverage component for a monograph eresource', () => {
    beforeEach(async function () {
      await mountWithContext(
        <Coverage eResource={monographEResource} />
      );
    });

    it('renders the monograph coverage', () => {
      expect(monographInteractor.exists).to.be.true;
    });

    it('correctly renders the date', () => {
      expect(monographInteractor.date).to.have.string(monographEResource._object.pti.titleInstance.dateMonographPublished);
    });

    it('correctly renders the edition', () => {
      expect(monographInteractor.edition).to.have.string(monographEResource._object.pti.titleInstance.monographEdition);
    });

    it('correctly renders the volume', () => {
      expect(monographInteractor.volume).to.have.string(monographEResource._object.pti.titleInstance.monographVolume);
    });

    it('renders the embargo moving wall start', () => {
      expect(embargoInteractor.movingWallStartExists).to.be.true;
    });

    it('correctly renders the embargo start length', () => {
      expect(embargoInteractor.startLength).to.have.string(monographEResource._object.embargo.movingWallStart.length);
    });

    it('correctly renders the embargo start unit', () => {
      expect(embargoInteractor.startUnit).to.have.string(monographEResource._object.embargo.movingWallStart.unit);
    });

    it('renders the embargo moving wall end', () => {
      expect(embargoInteractor.movingWallEndExists).to.be.true;
    });

    it('correctly renders the embargo end length', () => {
      expect(embargoInteractor.endLength).to.have.string(monographEResource._object.embargo.movingWallEnd.length);
    });

    it('correctly renders the embargo end unit', () => {
      expect(embargoInteractor.endUnit).to.have.string(monographEResource._object.embargo.movingWallEnd.unit);
    });
  });

  describe('Rendering coverage component for a monograph line', () => {
    beforeEach(async function () {
      await mountWithContext(
        <Coverage line={monographLine} />
      );
    });

    it('renders the monograph coverage', () => {
      expect(monographInteractor.exists).to.be.true;
    });

    it('correctly renders the date', () => {
      expect(monographInteractor.date).to.have.string(monographLine.resource._object.pti.titleInstance.dateMonographPublished);
    });

    it('correctly renders the edition', () => {
      expect(monographInteractor.edition).to.have.string(monographLine.resource._object.pti.titleInstance.monographEdition);
    });

    it('correctly renders the volume', () => {
      expect(monographInteractor.volume).to.have.string(monographLine.resource._object.pti.titleInstance.monographVolume);
    });

    it('renders the embargo moving wall start', () => {
      expect(embargoInteractor.movingWallStartExists).to.be.true;
    });

    it('correctly renders the embargo start length', () => {
      expect(embargoInteractor.startLength).to.have.string(monographLine.resource._object.embargo.movingWallStart.length);
    });

    it('correctly renders the embargo start unit', () => {
      expect(embargoInteractor.startUnit).to.have.string(monographLine.resource._object.embargo.movingWallStart.unit);
    });

    it('renders the embargo moving wall end', () => {
      expect(embargoInteractor.movingWallEndExists).to.be.true;
    });

    it('correctly renders the embargo end length', () => {
      expect(embargoInteractor.endLength).to.have.string(monographLine.resource._object.embargo.movingWallEnd.length);
    });

    it('correctly renders the embargo end unit', () => {
      expect(embargoInteractor.endUnit).to.have.string(monographLine.resource._object.embargo.movingWallEnd.unit);
    });
  });

  describe('Rendering coverage component for a serial pci', () => {
    beforeEach(async function () {
      await mountWithContext(
        <Coverage pci={serial} />
      );
    });

    it('renders the serial coverage', () => {
      expect(serialInteractor.exists).to.be.true;
    });
    it('renders the first set of data', () => {
      expect(serialInteractor.first).to.be.true;
    });
    it('renders the last set of data', () => {
      expect(serialInteractor.end).to.be.true;
    });
    it('renders the arrow icon', () => {
      expect(serialInteractor.icon).to.be.true;
    });
    it('renders the correct start date', () => {
      expect(serialInteractorStart.startDate).to.have.string('6/12/2001');
    });
    it('renders the correct end date', () => {
      expect(serialInteractorEnd.endDate).to.have.string('5/10/2007');
    });
    it('renders the correct start issue', () => {
      expect(serialInteractorStart.startIssue).to.have.string(serial.coverage[0].startIssue);
    });
    it('renders the correct end issue', () => {
      expect(serialInteractorEnd.endIssue).to.have.string(serial.coverage[0].endIssue);
    });
    it('renders the correct start volume', () => {
      expect(serialInteractorStart.startVolume).to.have.string(serial.coverage[0].startVolume);
    });
    it('renders the correct end volume', () => {
      expect(serialInteractorEnd.endVolume).to.have.string(serial.coverage[0].endVolume);
    });
    it('renders the embargo moving wall start', () => {
      expect(embargoInteractor.movingWallStartExists).to.be.true;
    });

    it('correctly renders the embargo start length', () => {
      expect(embargoInteractor.startLength).to.have.string(serial.embargo.movingWallStart.length);
    });

    it('correctly renders the embargo start unit', () => {
      expect(embargoInteractor.startUnit).to.have.string(serial.embargo.movingWallStart.unit);
    });

    it('renders the embargo moving wall end', () => {
      expect(embargoInteractor.movingWallEndExists).to.be.true;
    });

    it('correctly renders the embargo end length', () => {
      expect(embargoInteractor.endLength).to.have.string(serial.embargo.movingWallEnd.length);
    });

    it('correctly renders the embargo end unit', () => {
      expect(embargoInteractor.endUnit).to.have.string(serial.embargo.movingWallEnd.unit);
    });
  });

  describe('Rendering coverage component for a serial eResource', () => {
    beforeEach(async function () {
      await mountWithContext(
        <Coverage eResource={serialEResource} />
      );
    });

    it('renders the serial coverage', () => {
      expect(serialInteractor.exists).to.be.true;
    });
    it('renders the first set of data', () => {
      expect(serialInteractor.first).to.be.true;
    });
    it('renders the last set of data', () => {
      expect(serialInteractor.end).to.be.true;
    });
    it('renders the arrow icon', () => {
      expect(serialInteractor.icon).to.be.true;
    });
    it('renders the correct start date', () => {
      expect(serialInteractorStart.startDate).to.have.string('6/12/2001');
    });
    it('renders the correct end date', () => {
      expect(serialInteractorEnd.endDate).to.have.string('5/10/2007');
    });
    it('renders the correct start issue', () => {
      expect(serialInteractorStart.startIssue).to.have.string(serialEResource.coverage[0].startIssue);
    });
    it('renders the correct end issue', () => {
      expect(serialInteractorEnd.endIssue).to.have.string(serialEResource.coverage[0].endIssue);
    });
    it('renders the correct start volume', () => {
      expect(serialInteractorStart.startVolume).to.have.string(serialEResource.coverage[0].startVolume);
    });
    it('renders the correct end volume', () => {
      expect(serialInteractorEnd.endVolume).to.have.string(serialEResource.coverage[0].endVolume);
    });

    it('renders the embargo moving wall start', () => {
      expect(embargoInteractor.movingWallStartExists).to.be.true;
    });

    it('correctly renders the embargo start length', () => {
      expect(embargoInteractor.startLength).to.have.string(serialEResource._object.embargo.movingWallStart.length);
    });

    it('correctly renders the embargo start unit', () => {
      expect(embargoInteractor.startUnit).to.have.string(serialEResource._object.embargo.movingWallStart.unit);
    });

    it('renders the embargo moving wall end', () => {
      expect(embargoInteractor.movingWallEndExists).to.be.true;
    });

    it('correctly renders the embargo end length', () => {
      expect(embargoInteractor.endLength).to.have.string(serialEResource._object.embargo.movingWallEnd.length);
    });

    it('correctly renders the embargo end unit', () => {
      expect(embargoInteractor.endUnit).to.have.string(serialEResource._object.embargo.movingWallEnd.unit);
    });
  });

  describe('Rendering coverage component for a serial line', () => {
    beforeEach(async function () {
      await mountWithContext(
        <Coverage line={serialLine} />
      );
    });

    it('renders the serial coverage', () => {
      expect(serialInteractor.exists).to.be.true;
    });
    it('renders the first set of data', () => {
      expect(serialInteractor.first).to.be.true;
    });
    it('renders the last set of data', () => {
      expect(serialInteractor.end).to.be.true;
    });
    it('renders the arrow icon', () => {
      expect(serialInteractor.icon).to.be.true;
    });
    it('renders the correct start date', () => {
      expect(serialInteractorStart.startDate).to.have.string('6/12/2001');
    });
    it('renders the correct end date', () => {
      expect(serialInteractorEnd.endDate).to.have.string('5/10/2007');
    });
    it('renders the correct start issue', () => {
      expect(serialInteractorStart.startIssue).to.have.string(serialLine.coverage[0].startIssue);
    });
    it('renders the correct end issue', () => {
      expect(serialInteractorEnd.endIssue).to.have.string(serialLine.coverage[0].endIssue);
    });
    it('renders the correct start volume', () => {
      expect(serialInteractorStart.startVolume).to.have.string(serialLine.coverage[0].startVolume);
    });
    it('renders the correct end volume', () => {
      expect(serialInteractorEnd.endVolume).to.have.string(serialLine.coverage[0].endVolume);
    });

    it('renders the embargo moving wall start', () => {
      expect(embargoInteractor.movingWallStartExists).to.be.true;
    });

    it('correctly renders the embargo start length', () => {
      expect(embargoInteractor.startLength).to.have.string(serialLine.resource._object.embargo.movingWallStart.length);
    });

    it('correctly renders the embargo start unit', () => {
      expect(embargoInteractor.startUnit).to.have.string(serialLine.resource._object.embargo.movingWallStart.unit);
    });

    it('renders the embargo moving wall end', () => {
      expect(embargoInteractor.movingWallEndExists).to.be.true;
    });

    it('correctly renders the embargo end length', () => {
      expect(embargoInteractor.endLength).to.have.string(serialLine.resource._object.embargo.movingWallEnd.length);
    });

    it('correctly renders the embargo end unit', () => {
      expect(embargoInteractor.endUnit).to.have.string(serialLine.resource._object.embargo.movingWallEnd.unit);
    });
  });
});
