import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { FormattedMessage } from 'react-intl';
import { Accordion, Badge, Layout } from '@folio/stripes/components';

import LinkedLicenseCard from '../LinkedLicenseCard';
import { statuses } from '../../constants';

export default class FutureLicenses extends React.Component {
  static propTypes = {
    agreement: PropTypes.shape({
      linkedLicenses: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string,
          status: PropTypes.shape({
            value: PropTypes.string,
          }),
        }),
      ),
    }).isRequired,
    id: PropTypes.string,
  };

  renderLicense = (linkedLicense, i) => {
    return (
      <LinkedLicenseCard
        key={linkedLicense.id}
        id={`agreement-future-license-${i}`}
        license={linkedLicense}
      />
    );
  }

  renderEmpty = () => (
    <Layout className="padding-bottom-gutter">
      <FormattedMessage id="ui-agreements.emptyAccordion.futureLicenses" />
    </Layout>
  )

  render() {
    const { id } = this.props;

    const licenses = get(this.props, 'agreement.linkedLicenses', [])
      .filter(l => get(l, 'status.value') === statuses.FUTURE);

    return (
      <Accordion
        displayWhenClosed={<Badge>{licenses.length}</Badge>}
        displayWhenOpen={<Badge>{licenses.length}</Badge>}
        id={id}
        label={<FormattedMessage id="ui-agreements.license.futureLicenses" />}
      >
        { licenses.length ? licenses.map(this.renderLicense) : this.renderEmpty() }
      </Accordion>
    );
  }
}
