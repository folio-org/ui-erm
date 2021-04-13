import React from 'react';
import '@folio/stripes-erm-components/test/jest/__mock__';
import { renderWithIntl } from '@folio/stripes-erm-components/test/jest/helpers';
import { Accordion, MultiColumnList, MultiColumnListCell } from '@folio/stripes-testing';
import { MemoryRouter } from 'react-router-dom';
import translationsProperties from '../../../test/helpers';
import AllPeriods from './AllPeriods';

const agreementWith1Period = {
  periods: [
    {
      endDate: '2007-10-05',
      startDate: '2001-12-06',
      cancellationDeadline: '2003-01-16',
      note: 'This is a note'
    }
  ]
};

const agreementWith2Periods = {
  periods: [
    {
      endDate: '1970-03-19',
      startDate: '1968-07-24',
      cancellationDeadline: '1969-09-04',
      note: 'Period note 1'
    },
    {
      endDate: '2007-10-05',
      startDate: '2001-12-06',
      cancellationDeadline: '2003-01-16',
      note: 'Period note 2'
    }
  ]
};

describe('AllPeriods', () => {
  describe('Agreement with 2 periods', () => {
    beforeEach(() => {
      renderWithIntl(
        <MemoryRouter>
          <AllPeriods
            agreement={agreementWith2Periods}
          />
        </MemoryRouter>,
        translationsProperties
      );
    });

    test('renders an Accordion', async () => {
      await Accordion('All periods').exists();
    });

    test('renders the MCL', async () => {
      await MultiColumnList('agreement-periods-list').exists();
    });

    test('renders expected column count', async () => {
      await MultiColumnList({ columnCount: 4 }).exists();
    });

    test('renders expected columns', async () => {
      await MultiColumnList({ columns: ['Period start', 'Period end', 'Cancellation deadline', 'Period note'] }).exists();
    });

    test('renders expected row count', async () => {
      await MultiColumnList({ rowCount: agreementWith2Periods.periods.length }).exists();
    });

    test('renders expected period start date in each row', async () => {
      Promise.all([
        await MultiColumnListCell({ row: 0, columnIndex: 0 }).has({ content: '7/24/1968' }),
        await MultiColumnListCell({ row: 1, columnIndex: 0 }).has({ content: '12/6/2001' })
      ]);
    });

    test('renders expected period end date in each row', async () => {
      Promise.all([
        await MultiColumnListCell({ row: 0, columnIndex: 1 }).has({ content: '3/19/1970' }),
        await MultiColumnListCell({ row: 1, columnIndex: 1 }).has({ content: '10/5/2007' })
      ]);
    });

    test('renders expected cancellation deadline date in each row', async () => {
      Promise.all([
        await MultiColumnListCell({ row: 0, columnIndex: 2 }).has({ content: '9/4/1969' }),
        await MultiColumnListCell({ row: 1, columnIndex: 2 }).has({ content: '1/16/2003' })
      ]);
    });

    test('renders expected period note in each row', async () => {
      Promise.all([
        await MultiColumnListCell({ row: 0, columnIndex: 3 }).has({ content: 'Period note 1' }),
        await MultiColumnListCell({ row: 1, columnIndex: 3 }).has({ content: 'Period note 2' })
      ]);
    });
  });

  describe('Agreement with a single period', () => {
    beforeEach(() => {
      renderWithIntl(
        <MemoryRouter>
          <AllPeriods
            agreement={agreementWith1Period}
          />
        </MemoryRouter>,
        translationsProperties
      );
    });

    test('does not render an Accordion', async () => {
      await Accordion('All periods').absent();
    });
  });
});
