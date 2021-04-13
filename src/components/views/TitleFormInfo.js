import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Field } from 'react-final-form';
import PropTypes from 'prop-types';

import {
  Checkbox,
  Col,
  Row,
} from '@folio/stripes/components';

const TitleFormInfo = ({
  isSuppressFromDiscoveryEnabled,
}) => (
  <div data-test-title-instance-name>
    <Row>
      { isSuppressFromDiscoveryEnabled('title') ?
        <Col xs={3}>
          <Field
            component={Checkbox}
            id="title-suppress-from-discovery"
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

TitleFormInfo.propTypes = {
  isSuppressFromDiscoveryEnabled: PropTypes.func.isRequired,
};

export default TitleFormInfo;
