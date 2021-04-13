import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import {
  Card,
  KeyValue,
} from '@folio/stripes/components';
import { AppIcon } from '@folio/stripes/core';
import { LicenseCard } from '@folio/stripes-erm-components';

import LicenseAmendmentList from '../LicenseAmendmentList';
import { getLicenseAmendments, urls } from '../utilities';

export default class LinkedLicenseCard extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    license: PropTypes.shape({
      amendments: PropTypes.arrayOf(PropTypes.shape({
        amendmentId: PropTypes.string.isRequired,
        note: PropTypes.string,
        status: PropTypes.shape({
          value: PropTypes.string,
        }),
      })),
      endDate: PropTypes.string,
      id: PropTypes.string,
      name: PropTypes.string,
      note: PropTypes.string,
      remoteId_object: PropTypes.shape({
        amendments: PropTypes.arrayOf(PropTypes.shape({
          id: PropTypes.string.isRequired
        }))
      }),
      startDate: PropTypes.string,
      status: PropTypes.shape({
        value: PropTypes.string,
      }),
    }),
  };

  render() {
    const { id, license } = this.props;

    const amendments = getLicenseAmendments(license);
    const licenseRecord = license.remoteId_object || {};

    return (
      <Card
        key={license.id}
        cardStyle="positive"
        data-test-linked-license-card
        headerStart={(
          <AppIcon app="licenses" size="small">
            <Link to={urls.licenseView(licenseRecord.id)}>
              <strong data-test-license-name={licenseRecord.name}>{licenseRecord.name}</strong>
            </Link>
          </AppIcon>
        )}
        id={id}
        roundedBorder
      >
        <LicenseCard
          license={licenseRecord}
          renderName={false}
        />
        { license.note &&
          <KeyValue label={<FormattedMessage id="ui-agreements.license.prop.note" />}>
            {license.note}
          </KeyValue>
        }
        { amendments.length ?
          <LicenseAmendmentList
            amendments={amendments}
            id={id ? `${id}-amendments` : undefined}
            license={licenseRecord}
            renderNotes
          />
          : null
        }
      </Card>
    );
  }
}
