import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Field } from 'react-final-form';
import PropTypes from 'prop-types';

import {
  Checkbox,
  Col,
  Datepicker,
  Row,
  TextField,
} from '@folio/stripes/components';

export default class PCIFormInfo extends React.Component {
  static propTypes = {
    isSuppressFromDiscoveryEnabled: PropTypes.func.isRequired,
  }

  render() {
    const { isSuppressFromDiscoveryEnabled } = this.props;
    return (
      <div data-test-edit-pci-info>
        <Field
          autoFocus
          component={TextField}
          data-test-pci-name
          disabled
          id="edit-pci-name"
          label={<FormattedMessage id="ui-agreements.eresources.name" />}
          maxLength={255}
          name="name"
          required
        />
        <Row>
          <Col xs={3}>
            <Field
              backendDateStandard="YYYY-MM-DD"
              component={Datepicker}
              disabled
              id="pci-access-from"
              label={<FormattedMessage id="ui-agreements.eresources.accessibleFrom" />}
              name="accessStart"
              timeZone="UTC"
            />
          </Col>
          <Col xs={3}>
            <Field
              backendDateStandard="YYYY-MM-DD"
              component={Datepicker}
              disabled
              id="pci-access-end"
              label={<FormattedMessage id="ui-agreements.eresources.accessibleUntil" />}
              name="accessEnd"
              timeZone="UTC"
            />
          </Col>
          { isSuppressFromDiscoveryEnabled('pci') ?
            <Col xs={3}>
              <Field
                component={Checkbox}
                id="pci-suppress-from-discovery"
                label={<FormattedMessage id="ui-agreements.eresources.suppressFromDiscovery" />}
                name="suppressFromDiscovery"
                type="checkbox"
                vertical
              />
            </Col> : null
          }
        </Row>
      </div>
    );
  }
}
