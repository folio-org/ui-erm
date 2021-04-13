import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Field } from 'react-final-form';
import PropTypes from 'prop-types';

import {
  Col,
  KeyValue,
  Row,
  TextField,
} from '@folio/stripes/components';

const PlatformFormInfo = ({ name }) => (
  <div data-test-platform-form-info>
    <Row>
      <Col xs={3}>
        <KeyValue label={<FormattedMessage id="ui-agreements.platform.name" />}>
          <div data-test-platform-name>
            {name}
          </div>
        </KeyValue>
      </Col>
      <Col xs={3}>
        <Field
          autoFocus
          component={TextField}
          id="edit-local-platform-code"
          label={<FormattedMessage id="ui-agreements.platform.localPlatformCode" />}
          maxLength={255}
          name="localCode"
          parse={v => v}
        />
      </Col>
    </Row>
  </div>
);


PlatformFormInfo.propTypes = {
  name: PropTypes.string,
};

export default PlatformFormInfo;
