import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import {
  Col,
  Headline,
  KeyValue,
  Row,
  NoValue,
} from '@folio/stripes/components';

const PlatformInfo = ({ platform }) => {
  return (
    <div id="platform-info">
      <Row>
        <Col xs={12}>
          <div data-test-platform-name>
            <Headline
              size="xx-large"
              tag="h2"
            >
              {platform?.name}
            </Headline>
          </div>
        </Col>
      </Row>
      <Row>
        <Col xs={3}>
          <KeyValue label={<FormattedMessage id="ui-agreements.platform.localPlatformCode" />}>
            <div data-test-local-platform-code>
              {platform?.localCode ?? <NoValue />}
            </div>
          </KeyValue>
        </Col>
        <Col xs={3}>
          <KeyValue label={<FormattedMessage id="ui-agreements.platform.locators" />}>
            <div data-test-platform-locators>
              {platform?.locators?.length ?
                platform?.locators.map(locator => <div>{locator?.domainName}</div>)
                :
                <NoValue />
                    }
            </div>
          </KeyValue>
        </Col>
      </Row>
    </div>
  );
};

PlatformInfo.propTypes = {
  platform: PropTypes.shape({
    localCode: PropTypes.string,
    locators: PropTypes.arrayOf(PropTypes.object),
    name: PropTypes.string
  }).isRequired,
};

export default PlatformInfo;
