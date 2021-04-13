import React from 'react';
import { get } from 'lodash';
import { FormattedMessage } from 'react-intl';

const requiredStartDate = (value, allValues, meta) => {
  if (!value && meta) {
    if (get(allValues, meta.name.replace('startDate', '_delete'), false) !== true) {
      return <FormattedMessage id="stripes-core.label.missingRequiredField" />;
    }
  }
  return undefined;
};

const dateOrder = (value, allValues, meta) => {
  if (value && meta) {
    let startDate;
    let endDate;

    if (meta.name.indexOf('startDate') >= 0) {
      startDate = new Date(value);
      endDate = new Date(get(allValues, meta.name.replace('startDate', 'endDate')));
    } else if (meta.name.indexOf('endDate') >= 0) {
      startDate = new Date(get(allValues, meta.name.replace('endDate', 'startDate')));
      endDate = new Date(value);
    } else {
      return undefined;
    }

    if (startDate >= endDate) {
      return (
        <div data-test-error-end-date-too-early>
          <FormattedMessage id="ui-agreements.errors.endDateGreaterThanStartDate" />
        </div>
      );
    }
  }

  return undefined;
};

const multipleOpenEnded = (_value, allValues, meta, errorMessageKey) => {
  if (meta) {
    // Name is something like "items[3].date[2].endDate" and we want the "items[3].date" array
    const dates = get(allValues, meta.name.substring(0, meta.name.lastIndexOf('[')), []);
    let openEndedDates = 0;
    dates.forEach(c => {
      if (c.startDate && !c.endDate) openEndedDates += 1;
    });

    if (openEndedDates > 1) {
      return (
        <div data-test-error-multiple-open-ended>
          <FormattedMessage id={errorMessageKey} />
        </div>
      );
    }
  }

  return undefined;
};

const overlappingDates = (value, allValues, meta, errorMessageKey) => {
  if (meta) {
    // Name is something like "items[3].date[2].endDate" and we want the "items[3].date" array
    const dates = get(allValues, meta.name.substring(0, meta.name.lastIndexOf('[')), []);
    const ranges = dates
      .map((c, i) => ({
        dateIndex: i,
        startDate: new Date(c.startDate),
        endDate: c.endDate ? new Date(c.endDate) : new Date('4000-01-01'),
      }))
      .sort((a, b) => (a.startDate.getTime() < b.startDate.getTime() ? -1 : 1));

    const result = ranges.reduce(
      (accumulator, current, i, a) => {
        if (i === 0) return accumulator;

        const previous = a[i - 1];

        const overlap = previous.endDate.getTime() >= current.startDate.getTime();

        if (overlap) {
          accumulator.overlap = true;
          accumulator.ranges.push([current.dateIndex, previous.dateIndex]);
        }

        return accumulator;
      },
      { overlap: false, ranges: [] }
    );

    if (result.overlap) {
      return (
        <div data-test-error-overlapping-dates>
          <FormattedMessage
            id={errorMessageKey}
            values={{ fields: result.ranges.map(r => `${r[0] + 1} & ${r[1] + 1}`).join(', ') }}
          />
        </div>
      );
    }
  }

  return undefined;
};

export default {
  dateOrder,
  multipleOpenEnded,
  overlappingDates,
  requiredStartDate,
};
