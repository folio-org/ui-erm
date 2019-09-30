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
    onToggle: PropTypes.func,
    open: PropTypes.bool,
  };

  renderLicense = (linkedLicense, i) => {
    return (
      <LinkedLicenseCard
        id={`agreement-future-license-${i}`}
        key={linkedLicense.id}
        license={linkedLicense}
      />
    );
  }

  renderEmpty = () => (
    <Layout className="padding-bottom-gutter">
      <FormattedMessage id="ui-agreements.license.noFutureLicenses" />
    </Layout>
  )

  render() {
    const { id, onToggle, open } = this.props;

    const licenses = get(this.props, 'agreement.linkedLicenses', [])
      .filter(l => get(l, 'status.value') === statuses.FUTURE);

    return (
      <Accordion
        displayWhenClosed={<Badge>{licenses.length}</Badge>}
        displayWhenOpen={<Badge>{licenses.length}</Badge>}
        id={id}
        label={<FormattedMessage id="ui-agreements.license.futureLicenses" />}
        open={open}
        onToggle={onToggle}
      >
        { licenses.length ? licenses.map(this.renderLicense) : this.renderEmpty() }
      </Accordion>
    );
  }
}