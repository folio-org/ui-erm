import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Field } from 'react-final-form';

import {
  Checkbox,
  Col,
  Datepicker,
  Row,
  TextField,
} from '@folio/stripes/components';
import { parseDateOnlyString } from '../utilities';

export default class PCIFormInfo extends React.Component {
  render() {
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
          <Col xs={4}>
            <Field
              backendDateStandard="YYYY-MM-DD"
              component={Datepicker}
              disabled
              id="pci-access-from"
              label={<FormattedMessage id="ui-agreements.eresources.accessibleFrom" />}
              name="accessStart"
              parser={parseDateOnlyString}
            />
          </Col>
          <Col xs={4}>
            <Field
              backendDateStandard="YYYY-MM-DD"
              component={Datepicker}
              disabled
              id="pci-access-end"
              label={<FormattedMessage id="ui-agreements.eresources.accessibleUntil" />}
              name="accessEnd"
              parser={parseDateOnlyString}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <Field
              name="suppressFromDiscovery"
              type="checkbox"
            >
              {({ input }) => (
                <Checkbox
                  checked={input.checked}
                  id="pci-suppress-from-discovery"
                  inline
                  label={<FormattedMessage id="ui-agreements.eresources.suppressFromDiscovery" />}
                  onChange={e => input.onChange(e)}
                  type="checkbox"
                />
              )}
            </Field>
          </Col>
        </Row>
      </div>
    );
  }
}
