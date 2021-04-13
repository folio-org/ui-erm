import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import {
  Col,
  KeyValue,
  NoValue,
  Row,
} from '@folio/stripes/components';

import { EResourceType } from '@folio/stripes-erm-components';
import EResourceIdentifier from '../EResourceIdentifier';

const propTypes = {
  titleInstance: PropTypes.shape({
    subType: PropTypes.shape({
      label: PropTypes.string,
    }),
  }).isRequired,
};

const SerialResourceInfo = ({
  titleInstance
}) => (
  <>
    <Row>
      <Col xs={3}>
        <KeyValue label={<FormattedMessage id="ui-agreements.eresources.publicationType" />}>
          <div data-test-title-instance-publication-type>
            <EResourceType resource={titleInstance} />
          </div>
        </KeyValue>
      </Col>
      <Col xs={3}>
        <KeyValue label={<FormattedMessage id="ui-agreements.eresources.materialType" />}>
          <div data-test-title-instance-sub-type>{titleInstance.subType?.label ?? <NoValue />}</div>
        </KeyValue>
      </Col>
    </Row>
    <Row>
      <EResourceIdentifier titleInstance={titleInstance} type="ezb" />
      <EResourceIdentifier titleInstance={titleInstance} type="zdb" />
      <EResourceIdentifier titleInstance={titleInstance} type="eissn" />
      <EResourceIdentifier titleInstance={titleInstance} type="pissn" />
    </Row>
  </>
);

SerialResourceInfo.propTypes = propTypes;
export default SerialResourceInfo;
