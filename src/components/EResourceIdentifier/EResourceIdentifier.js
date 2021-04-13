import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import {
  Col,
  KeyValue,
} from '@folio/stripes/components';

import {
  getResourceIdentifier,
} from '@folio/stripes-erm-components';

const EResourceIdentifier = (
  { type, titleInstance, width = 3 }
) => {
  const identifier = getResourceIdentifier(titleInstance, type);

  if (!identifier) return null;

  return (
    <Col xs={width}>
      <KeyValue
        label={<FormattedMessage id={`ui-agreements.identifier.${type}`} />}
      >
        <div {...{ [`data-test-${type}`]: true }} data-testid="eresourceIdentifier">{identifier}</div>
      </KeyValue>
    </Col>
  );
};

EResourceIdentifier.propTypes = {
  titleInstance: PropTypes.object,
  type: PropTypes.string,
  width: PropTypes.number
};

export default EResourceIdentifier;
