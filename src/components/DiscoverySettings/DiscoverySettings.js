import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import {
  Accordion,
  Col,
  KeyValue,
  Row,
} from '@folio/stripes/components';

const DiscoverySettings = ({
  handlers: { isSuppressFromDiscoveryEnabled },
  id,
  line,
  pci,
  title
}) => {
  const agLineSuppressFromDiscoveryEnabled = isSuppressFromDiscoveryEnabled('agreementLine');
  const pciSuppressFromDiscoveryEnabled = isSuppressFromDiscoveryEnabled('pci');
  const titleSuppressFromDiscoveryEnabled = isSuppressFromDiscoveryEnabled('title');

  const renderAgreementLineDiscoverySettings = () => (
    <Row>
      {agLineSuppressFromDiscoveryEnabled &&
        <Col xs={3}>
          <KeyValue label={<FormattedMessage id="ui-agreements.eresources.discoverySettings.suppressFromDiscoveryAgreementLine" values={{ breakingLine: <br /> }} />}>
            <div data-testid="suppressFromDiscoveryAgreementLine">
              <FormattedMessage id={`ui-agreements.${line?.suppressFromDiscovery ? 'yes' : 'no'}`} />
            </div>
          </KeyValue>
        </Col>
      }
      {pciSuppressFromDiscoveryEnabled &&
        <Col xs={3}>
          <KeyValue label={<FormattedMessage id="ui-agreements.eresources.discoverySettings.suppressFromDiscoveryTitleInPackage" values={{ breakingLine: <br /> }} />}>
            <div data-testid="suppressFromDiscoveryTitleInPackage">
              <FormattedMessage id={`ui-agreements.${line?.resource?.suppressFromDiscovery ? 'yes' : 'no'}`} />
            </div>
          </KeyValue>
        </Col>
          }
      {titleSuppressFromDiscoveryEnabled &&
        <Col xs={3}>
          <KeyValue label={<FormattedMessage id="ui-agreements.eresources.discoverySettings.suppressFromDiscoveryTitle" values={{ breakingLine: <br /> }} />}>
            <div data-testid="suppressFromDiscoveryTitle">
              <FormattedMessage id={`ui-agreements.${line?.resource?._object?.pti?.titleInstance?.suppressFromDiscovery ? 'yes' : 'no'}`} />
            </div>
          </KeyValue>
        </Col>
      }
    </Row>
  );

  const renderPCIDiscoverySettings = () => (
    <Row>
      {pciSuppressFromDiscoveryEnabled &&
        <Col xs={3}>
          <KeyValue label={<FormattedMessage id="ui-agreements.eresources.discoverySettings.suppressFromDiscoveryTitleInPackage" values={{ breakingLine: <br /> }} />}>
            <div data-testid="suppressFromDiscoveryTitleInPackage">
              <FormattedMessage id={`ui-agreements.${pci?.suppressFromDiscovery ? 'yes' : 'no'}`} />
            </div>
          </KeyValue>
        </Col>
      }
      {titleSuppressFromDiscoveryEnabled &&
        <Col xs={3}>
          <KeyValue label={<FormattedMessage id="ui-agreements.eresources.discoverySettings.suppressFromDiscoveryTitle" values={{ breakingLine: <br /> }} />}>
            <div data-testid="suppressFromDiscoveryTitle">
              <FormattedMessage id={`ui-agreements.${pci?.pti?.titleInstance?.suppressFromDiscovery ? 'yes' : 'no'}`} />
            </div>
          </KeyValue>
        </Col>
      }
    </Row>
  );

  const renderTitleDiscoverySettings = () => (
    <KeyValue data-testid="suppressFromDiscoveryTitle" label={<FormattedMessage id="ui-agreements.eresources.discoverySettings.suppressFromDiscoveryTitle" values={{ breakingLine: <br /> }} />}>
      <FormattedMessage id={`ui-agreements.${title?.eresource?.suppressFromDiscovery ? 'yes' : 'no'}`} />
    </KeyValue>
  );

  let renderDiscoverySettings;
  if (line) {
    renderDiscoverySettings = renderAgreementLineDiscoverySettings;
  } else if (pci) {
    renderDiscoverySettings = renderPCIDiscoverySettings;
  } else if (title) {
    renderDiscoverySettings = renderTitleDiscoverySettings;
  }

  return renderDiscoverySettings ? (
    <Accordion
      id={id}
      label={<FormattedMessage id="ui-agreements.eresources.discoverySettings" />}
    >
      {renderDiscoverySettings()}
    </Accordion>
  ) : null;
};

DiscoverySettings.propTypes = {
  handlers: PropTypes.shape({
    isSuppressFromDiscoveryEnabled: PropTypes.func.isRequired
  }),
  id: PropTypes.string,
  line: PropTypes.object,
  pci: PropTypes.object,
  title: PropTypes.object,
};

export default DiscoverySettings;
