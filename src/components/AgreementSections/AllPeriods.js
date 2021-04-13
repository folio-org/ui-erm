import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import {
  Accordion,
  Badge,
  FormattedUTCDate,
  MultiColumnList,
  NoValue,
} from '@folio/stripes/components';

const AllPeriods = ({ agreement: { periods = [] }, id }) => {
  const columnMapping = {
    startDate: <FormattedMessage id="ui-agreements.agreementPeriods.periodStart" />,
    endDate: <FormattedMessage id="ui-agreements.agreementPeriods.periodEnd" />,
    cancellationDeadline: <FormattedMessage id="ui-agreements.agreements.cancellationDeadline" />,
    note: <FormattedMessage id="ui-agreements.agreementPeriods.periodNote" />,
  };

  const formatter = {
    startDate: p => (p.startDate ? <FormattedUTCDate value={p.startDate} /> : <NoValue />),
    endDate: p => (p.endDate ? <FormattedUTCDate value={p.endDate} /> : <NoValue />),
    cancellationDeadline: p => (p.cancellationDeadline ? <FormattedUTCDate value={p.cancellationDeadline} /> : <NoValue />),
    note: p => p.note || '',
  };

  const visibleColumns = [
    'startDate',
    'endDate',
    'cancellationDeadline',
    'note',
  ];


  return (
    (periods.length > 1) ?
      <Accordion
        displayWhenClosed={<Badge>{periods.length}</Badge>}
        displayWhenOpen={<Badge>{periods.length}</Badge>}
        id={id}
        label={<FormattedMessage id="ui-agreements.agreementPeriods.allPeriods" />}
      >
        <MultiColumnList
          columnMapping={columnMapping}
          contentData={periods}
          formatter={formatter}
          id="agreement-periods-list"
          interactive={false}
          visibleColumns={visibleColumns}
        />
      </Accordion> :
      null
  );
};

export default AllPeriods;

AllPeriods.propTypes = {
  agreement: PropTypes.shape({
    periods: PropTypes.arrayOf(PropTypes.shape({
      cancellationDeadline: PropTypes.string,
      endDate: PropTypes.string,
      note: PropTypes.string,
      startDate: PropTypes.string,
    })),
    currentPeriod: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  id: PropTypes.string,
};
