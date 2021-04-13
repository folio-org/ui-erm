import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Field } from 'react-final-form';
import { isEmpty } from 'lodash';
import {
  Checkbox,
  Col,
  Datepicker,
  Row,
  TextArea,
} from '@folio/stripes/components';

import { isDetached } from '../utilities';

const propTypes = {
  isSuppressFromDiscoveryEnabled: PropTypes.func.isRequired,
};

const required = (value, allValues) => {
  const blankString = /^\s+$/;
  const { linkedResource } = allValues;
  const isResourceLinked = !isEmpty(linkedResource) && !isDetached(linkedResource);

  if (isResourceLinked || (value && !blankString.test(value)) || value === false || value === 0) {
    return undefined;
  }
  return <FormattedMessage id="ui-agreements.agreementLine.provideEresource" />;
};

const validateDateOrder = (value, allValues, meta) => {
  let activeFrom;
  let activeTo;

  if (!value) return undefined;

  if (meta.name === 'activeFrom') {
    activeFrom = value;
    activeTo = allValues.activeTo;
  } else if (meta.name === 'activeTo') {
    activeFrom = allValues.activeFrom;
    activeTo = value;
  } else {
    return undefined;
  }

  if (activeFrom && activeTo && new Date(activeFrom) >= new Date(activeTo)) {
    return (
      <div data-test-error-end-date-too-early>
        <FormattedMessage id="ui-agreements.errors.endDateGreaterThanStartDate" />
      </div>
    );
  }

  return undefined;
};

const FormInfo = ({
  isSuppressFromDiscoveryEnabled,
}) => (
  <>
    <Row>
      <Col md={6} xs={12}>
        <Field
          component={TextArea}
          id="agreement-line-description"
          label={<FormattedMessage id="ui-agreements.eresources.description" />}
          maxLength={255}
          name="description"
          parse={v => v} // Lets us send an empty string instead of `undefined`
          validate={required}
        />
      </Col>
      <Col md={6} xs={12}>
        <Field
          component={TextArea}
          id="agreement-line-note"
          label={<FormattedMessage id="ui-agreements.note" />}
          name="note"
          parse={v => v} // Lets us send an empty string instead of `undefined`
        />
      </Col>
    </Row>
    <Row>
      <Col md={3} xs={6}>
        <Field
          backendDateStandard="YYYY-MM-DD"
          component={Datepicker}
          id="agreement-line-active-from"
          label={<FormattedMessage id="ui-agreements.eresources.activeFrom" />}
          name="activeFrom"
          parse={v => v} // Lets us send an empty string instead of `undefined`
          timeZone="UTC"
          validate={validateDateOrder}
        />
      </Col>
      <Col md={3} xs={6}>
        <Field
          backendDateStandard="YYYY-MM-DD"
          component={Datepicker}
          id="agreement-line-active-to"
          label={<FormattedMessage id="ui-agreements.eresources.activeTo" />}
          name="activeTo"
          parse={v => v} // Lets us send an empty string instead of `undefined`
          timeZone="UTC"
          validate={validateDateOrder}
        />
      </Col>
      {isSuppressFromDiscoveryEnabled('agreementLine') ?
        <Col md={3} xs={12}>
          <Field
            component={Checkbox}
            id="agreement-line-suppress-from-discovery"
            label={<FormattedMessage id="ui-agreements.agreementLines.suppressFromDiscovery" />}
            name="suppressFromDiscovery"
            type="checkbox"
            vertical
          />
        </Col> : null
      }
    </Row>
  </>
);

FormInfo.propTypes = propTypes;
export default FormInfo;
