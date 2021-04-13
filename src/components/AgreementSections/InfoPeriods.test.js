import React from 'react';
import '@folio/stripes-erm-components/test/jest/__mock__';
import { renderWithIntl } from '@folio/stripes-erm-components/test/jest/helpers';
import { Button, KeyValue } from '@folio/stripes-testing';
import { MemoryRouter } from 'react-router-dom';
import translationsProperties from '../../../test/helpers';
import InfoPeriods from './InfoPeriods';

const onlyPastPeriods = [
  {
    endDate: '1970-03-19',
    startDate: '1968-07-24',
    cancellationDeadline: '1969-09-04',
    note: 'Past period note 1',
    periodStatus: null
  },
  {
    endDate: '2007-10-05',
    startDate: '2001-12-06',
    cancellationDeadline: '2003-01-16',
    note: 'Past period note 2',
    periodStatus: 'previous'
  }
];

const onlyFuturePeriods = [
  {
    endDate: '2051-01-01',
    startDate: '2050-01-01',
    cancellationDeadline: '2050-11-30',
    note: 'Future period note 1',
    periodStatus: 'next'
  },
  {
    endDate: '2060-01-01',
    startDate: '2059-01-01',
    cancellationDeadline: '2059-11-30',
    note: 'Future period note 2',
    periodStatus: null
  }
];

const onlyCurrentPeriod = [
  {
    endDate: '2049-01-01',
    startDate: '2008-01-01',
    cancellationDeadline: '2047/11/30',
    note: 'Current period note',
    periodStatus: 'current'
  }
];

const noCurrentPeriod = [
  {
    endDate: '1970-03-19',
    startDate: '1968-07-24',
    cancellationDeadline: '1969-09-04',
    note: 'Past period note 1',
    periodStatus: null
  },
  {
    endDate: '2007-10-05',
    startDate: '2001-12-06',
    cancellationDeadline: '2003-01-16',
    note: 'Past period note 2',
    periodStatus: 'previous'
  },
  {
    endDate: '2051-01-01',
    startDate: '2050-01-01',
    cancellationDeadline: '2050-11-30',
    note: 'Future period note 1',
    periodStatus: 'next'
  },
  {
    endDate: '2060-01-01',
    startDate: '2059-01-01',
    cancellationDeadline: '2059-11-30',
    note: 'Future period note 2',
    periodStatus: null
  }
];

const allPeriods = [
  {
    endDate: '1970-03-19',
    startDate: '1968-07-24',
    cancellationDeadline: '1969-09-04',
    note: 'Past period note 1',
    periodStatus: null
  },
  {
    endDate: '2007-10-05',
    startDate: '2001-12-06',
    cancellationDeadline: '2003-01-16',
    note: 'Past period note 2',
    periodStatus: 'previous'
  },
  {
    endDate: '2049-01-01',
    startDate: '2008-01-01',
    cancellationDeadline: '2047/11/30',
    note: 'Current period note',
    periodStatus: 'current'
  },
  {
    endDate: '2051-01-01',
    startDate: '2050-01-01',
    cancellationDeadline: '2050-11-30',
    note: 'Future period note 1',
    periodStatus: 'next'
  },
  {
    endDate: '2060-01-01',
    startDate: '2059-01-01',
    cancellationDeadline: '2059-11-30',
    note: 'Future period note 2',
    periodStatus: null
  }
];

let renderComponent;

const prevPeriodTests = () => describe('previous period renders as expected', () => {
  test('displays correct period start information', async () => {
    await KeyValue('Period start').has({ value: '12/6/2001' });
  });

  test('displays correct period end information', async () => {
    await KeyValue('Period end').has({ value: '10/5/2007' });
  });

  test('displays correct cancellation deadline information', async () => {
    await KeyValue('Cancellation deadline').has({ value: '1/16/2003' });
  });

  test('displays correct period note information', async () => {
    await KeyValue('Period note').has({ value: 'Past period note 2' });
  });
});

const currentPeriodTests = () => describe('current period renders as expected', () => {
  test('displays correct period start information', async () => {
    await KeyValue('Period start').has({ value: '1/1/2008' });
  });

  test('displays correct period end information', async () => {
    await KeyValue('Period end').has({ value: '1/1/2049' });
  });

  test('displays correct cancellation deadline information', async () => {
    await KeyValue('Cancellation deadline').has({ value: '11/30/2047' });
  });

  test('displays correct period note information', async () => {
    await KeyValue('Period note').has({ value: 'Current period note' });
  });
});

const nextPeriodTests = () => describe('next period renders as expected', () => {
  test('displays correct period start information', async () => {
    await KeyValue('Period start').has({ value: '1/1/2050' });
  });

  test('displays correct period end information', async () => {
    await KeyValue('Period end').has({ value: '1/1/2051' });
  });

  test('displays correct cancellation deadline information', async () => {
    await KeyValue('Cancellation deadline').has({ value: '11/30/2050' });
  });

  test('displays correct period note information', async () => {
    await KeyValue('Period note').has({ value: 'Future period note 1' });
  });
});

const checkButtonDisabled = (buttonLabel, shouldBeDisabled) => {
  test(`${buttonLabel} button is ${shouldBeDisabled ? '' : 'not '}disabled`, async () => {
    const { getByRole } = renderComponent;
    const re = new RegExp(buttonLabel, 'i');
    if (shouldBeDisabled) {
      expect(getByRole('button', { name: re })).toBeDisabled();
    } else {
      expect(getByRole('button', { name: re })).not.toBeDisabled();
    }
  });
};

describe('InfoPeriods', () => {
  describe('agreement with only past periods', () => {
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <MemoryRouter>
          <InfoPeriods
            periods={onlyPastPeriods}
          />
        </MemoryRouter>,
        translationsProperties
      );
    });

    test('renders a previous button', async () => {
      await Button('Previous').exists();
    });

    test('renders a current button', async () => {
      await Button('Current').exists();
    });

    test('renders a next button', async () => {
      await Button('Next').exists();
    });

    checkButtonDisabled('previous', false);
    checkButtonDisabled('current', true);
    checkButtonDisabled('next', true);

    prevPeriodTests();
  });

  describe('agreement with only future periods', () => {
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <MemoryRouter>
          <InfoPeriods
            periods={onlyFuturePeriods}
          />
        </MemoryRouter>,
        translationsProperties
      );
    });

    test('renders a previous button', async () => {
      await Button('Previous').exists();
    });

    test('renders a current button', async () => {
      await Button('Current').exists();
    });

    test('renders a next button', async () => {
      await Button('Next').exists();
    });

    checkButtonDisabled('previous', true);
    checkButtonDisabled('current', true);
    checkButtonDisabled('next', false);

    nextPeriodTests();
  });

  describe('agreement with only current period', () => {
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <MemoryRouter>
          <InfoPeriods
            periods={onlyCurrentPeriod}
          />
        </MemoryRouter>,
        translationsProperties
      );
    });

    test('renders a previous button', async () => {
      await Button('Previous').exists();
    });


    test('renders a current button', async () => {
      await Button('Current').exists();
    });


    test('renders a next button', async () => {
      await Button('Next').exists();
    });

    checkButtonDisabled('previous', true);
    checkButtonDisabled('current', false);
    checkButtonDisabled('next', true);

    currentPeriodTests();
  });

  describe('agreement with no current period', () => {
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <MemoryRouter>
          <InfoPeriods
            periods={noCurrentPeriod}
          />
        </MemoryRouter>,
        translationsProperties
      );
    });

    test('renders a previous button', async () => {
      await Button('Previous').exists();
    });

    test('renders a current button', async () => {
      await Button('Current').exists();
    });
    test('renders a next button', async () => {
      await Button('Next').exists();
    });

    checkButtonDisabled('previous', false);
    checkButtonDisabled('current', true);
    checkButtonDisabled('next', false);

    // Should display next by default
    nextPeriodTests();

    describe('clicking on previous period tab', () => {
      beforeEach(async () => { await Button('Previous').click(); });
      // Should now pass previous period tests
      prevPeriodTests();
    });
  });

  describe('agreement with all periods', () => {
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <MemoryRouter>
          <InfoPeriods
            periods={allPeriods}
          />
        </MemoryRouter>,
        translationsProperties
      );
    });

    test('renders a previous button', async () => {
      await Button('Previous').exists();
    });

    test('renders a current button', async () => {
      await Button('Current').exists();
    });

    test('renders a next button', async () => {
      await Button('Next').exists();
    });

    checkButtonDisabled('previous', false);
    checkButtonDisabled('current', false);
    checkButtonDisabled('next', false);

    // Should display current by default
    currentPeriodTests();

    describe('clicking on previous period tab', () => {
      beforeEach(async () => { await Button('Previous').click(); });
      // Should now pass previous period tests
      prevPeriodTests();
    });

    describe('clicking on next period tab', () => {
      beforeEach(async () => { await Button('Next').click(); });
      // Should now pass previous period tests
      nextPeriodTests();
    });
  });
});
