import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import Link from 'react-router-dom/Link';
import { get } from 'lodash';

import { Icon, MultiColumnList, Tooltip } from '@folio/stripes/components';
import { LicenseEndDate } from '@folio/stripes-erm-components';

import { statuses } from '../../constants';
import { validators } from '../utilities';
import FormattedUTCDate from '../FormattedUTCDate';
import { urls } from '../utilities';
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
    renderStatuses: PropTypes.bool,
    renderWarnings: PropTypes.bool,
    renderNotes: PropTypes.bool,
  }

  renderStatusMismatchWarnings(amendment) {
    const statusInLicense = get(amendment, 'status.value');
    const statusInLicenseLabel = get(amendment, 'status.label');
    const statusInAgreement = get(amendment, 'statusForThisAgreement.value');
    const startDate = get(amendment, 'startDate')
    const endDate = get(amendment, 'endDate')

    return validators.amendmentWarning(statusInAgreement, statusInLicense, statusInLicenseLabel, startDate, endDate);
    /* if (statusInAgreement === statuses.CURRENT) {
      if (statusInLicense === statuses.EXPIRED || statusInLicense === statuses.REJECTED) {
        return <FormattedMessage id="ui-agreements.license.warn.amendmentStatus" values={{ status: statusInLicenseLabel }} />;
      } else if (startDate && new Date(startDate).getTime() > new Date().getTime()) {
        return <FormattedMessage id="ui-agreements.license.warn.amendmentFuture" />;
      } else if (endDate && new Date(endDate).getTime() < new Date().getTime()) {
        return <FormattedMessage id="ui-agreements.license.warn.amendmentPast" />;
      }
    }
    return null; */
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
                text={this.renderStatusMismatchWarnings(a)}
                placement="left"
              >
                {({ ref, ariaIds }) => (
                  // For the time being I'm using the workaround of a <span> while we wait to see what can/should be added to the 'Icon' component
                  <span ref={ref} aria-label={ariaIds.text}>
                    <Icon
                      icon="exclamation-circle"
                      iconClassName={css.tooltipIcon}
                    />
                  </span>
                )}
              </Tooltip> : ''
          ),
          note: a => (a.note ? a.note : ''),
          name: a => <Link to={urls.amendmentView(license.id, a.id)}>{a.name}</Link>,
          status: a => (a.status ? a.status.label : '-'),
          startDate: a => (a.startDate ? <FormattedUTCDate value={a.startDate} /> : '-'),
          endDate: a => <LicenseEndDate license={a} />,
        }}
        id={id}
        interactive={false}
        visibleColumns={columns}
      />
    );
  }
}
