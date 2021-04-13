import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

import {
  Icon,
  FormattedUTCDate,
  MultiColumnList,
  NoValue,
  Tooltip
} from '@folio/stripes/components';
import { LicenseEndDate } from '@folio/stripes-erm-components';

import { urls, getConflictWarnings } from '../utilities';
import css from './LicenseAmendmentList.css';

export default class LicenseAmendmentList extends React.Component {
  static propTypes = {
    amendments: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      note: PropTypes.string,
      startDate: PropTypes.string,
      status: PropTypes.shape({
        label: PropTypes.string,
      }),
    })),
    id: PropTypes.string,
    license: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
    renderNotes: PropTypes.bool,
    renderStatuses: PropTypes.bool,
    renderWarnings: PropTypes.bool,
  }

  renderStatusMismatchWarnings(amendment) {
    return getConflictWarnings.amendmentWarning(amendment);
  }

  render() {
    const {
      amendments,
      id,
      license,
      renderStatuses,
      renderWarnings,
      renderNotes,
    } = this.props;

    let columns = ['warning', 'name', 'status', 'startDate', 'endDate', 'note'];
    columns = renderStatuses ? columns : columns.filter(column => column !== 'status');
    columns = renderWarnings ? columns : columns.filter(column => column !== 'warning');
    columns = renderNotes ? columns : columns.filter(column => column !== 'note');

    return (
      <MultiColumnList
        columnMapping={{
          warning: '',
          note: <FormattedMessage id="ui-agreements.note" />,
          name: <FormattedMessage id="ui-agreements.license.amendment" />,
          status: <FormattedMessage id="ui-agreements.status" />,
          startDate: <FormattedMessage id="ui-agreements.license.prop.startDate" />,
          endDate: <FormattedMessage id="ui-agreements.license.prop.endDate" />,
        }}
        columnWidths={{
          note: '350px'
        }}
        contentData={amendments}
        formatter={{
          warning: a => (
            this.renderStatusMismatchWarnings(a) ?
              <Tooltip
                id={`warning-tooltip-${a.id}`}
                placement="left"
                text={this.renderStatusMismatchWarnings(a)}
              >
                {({ ref, ariaIds }) => (
                  <Icon
                    ref={ref}
                    aria-labelledby={ariaIds.text}
                    icon="exclamation-circle"
                    iconClassName={css.tooltipIcon}
                    tabIndex="0"
                  />
                )}
              </Tooltip> : ''
          ),
          note: a => (a.note ? a.note : ''),
          name: a => <Link to={urls.amendmentView(license.id, a.id)}>{a.name}</Link>,
          status: a => (a.status?.label ?? <NoValue />),
          startDate: a => (a.startDate ? <FormattedUTCDate value={a.startDate} /> : <NoValue />),
          endDate: a => <LicenseEndDate license={a} />,
        }}
        id={id}
        interactive={false}
        visibleColumns={columns}
      />
    );
  }
}
