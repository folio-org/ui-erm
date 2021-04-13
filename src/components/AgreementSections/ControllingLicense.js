import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import {
  Accordion,
  Card,
  Badge,
  KeyValue,
  Layout,
  MessageBanner,
} from '@folio/stripes/components';
import { AppIcon } from '@folio/stripes/core';
import { LicenseCard } from '@folio/stripes-erm-components';

import LicenseAmendmentList from '../LicenseAmendmentList';
import { getLicenseAmendments, urls } from '../utilities';
import { statuses } from '../../constants';

export default class ControllingLicense extends React.Component {
  static propTypes = {
    agreement: PropTypes.shape({
      linkedLicenses: PropTypes.arrayOf(
        PropTypes.shape({
          amendments: PropTypes.arrayOf(PropTypes.shape({
            amendmentId: PropTypes.string.isRequired,
            note: PropTypes.string,
            status: PropTypes.shape({
              value: PropTypes.string,
            }),
          })),
          endDate: PropTypes.string,
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
      ),
    }).isRequired,
    id: PropTypes.string,
  };

  renderLicense = linkedLicense => {
    const unsetAmendments = getLicenseAmendments(linkedLicense, statuses.UNSET);
    const licenseRecord = linkedLicense.remoteId_object || {};

    return (
      <Card
        cardStyle="positive"
        headerStart={(
          <AppIcon app="licenses" size="small">
            <Link to={urls.licenseView(licenseRecord.id)}>
              <strong data-test-license-name={licenseRecord.name}>{licenseRecord.name}</strong>
            </Link>
          </AppIcon>
        )}
        id="agreement-controlling-license"
        roundedBorder
      >
        { unsetAmendments.length ?
          <MessageBanner type="warning">
            <FormattedMessage id="ui-agreements.license.warn.unassignedAmendments" />
          </MessageBanner>
          : null
        }
        <LicenseCard
          license={licenseRecord}
          renderName={false}
        />
        { linkedLicense.note &&
          <KeyValue label={<FormattedMessage id="ui-agreements.license.prop.note" />}>
            {linkedLicense.note}
          </KeyValue>
        }
        {this.renderAmendments(linkedLicense, statuses.CURRENT)}
        { unsetAmendments.length ?
          this.renderAmendments(linkedLicense, statuses.UNSET)
          : null
        }
      </Card>
    );
  }

  renderAmendments = (linkedLicense, status) => {
    const amendments = getLicenseAmendments(linkedLicense, status);

    if (!amendments.length) return null;

    return (
      <KeyValue label={<FormattedMessage id={`ui-agreements.license.${status}Amendments`} />}>
        <LicenseAmendmentList
          amendments={amendments}
          id={`controlling-license-${status}-amendments`}
          license={linkedLicense.remoteId_object}
          renderNotes={status !== statuses.UNSET}
          renderStatuses={status !== statuses.HISTORICAL}
          renderWarnings={status === statuses.CURRENT}
        />
      </KeyValue>
    );
  }

  render() {
    const { id } = this.props;

    const license = get(this.props, 'agreement.linkedLicenses', [])
      .find(l => l.status.value === statuses.CONTROLLING);

    return (
      <Accordion
        displayWhenClosed={<Badge>{license ? 1 : 0}</Badge>}
        displayWhenOpen={<Badge>{license ? 1 : 0}</Badge>}
        id={id}
        label={<FormattedMessage id="ui-agreements.license.controllingLicense" />}
      >
        { license ?
          <div>
            {this.renderLicense(license)}
            {this.renderAmendments(license, statuses.FUTURE)}
            {this.renderAmendments(license, statuses.HISTORICAL)}
          </div>
          :
          <Layout className="padding-bottom-gutter">
            <FormattedMessage id="ui-agreements.emptyAccordion.controllingLicense" />
          </Layout>
        }
      </Accordion>
    );
  }
}
