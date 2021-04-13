import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import {
  Card,
  Col,
  KeyValue,
  NoValue,
  Row,
} from '@folio/stripes/components';
import { AppIcon } from '@folio/stripes/core';

import { urls } from '../utilities';

const propTypes = {
  children: PropTypes.node,
  headerEnd: PropTypes.node,
  id: PropTypes.string,
  poLine: PropTypes.shape({
    acquisitionMethod: PropTypes.string,
    id: PropTypes.string,
    instanceId: PropTypes.any.string,
    poLineNumber: PropTypes.string,
    titleOrPackage: PropTypes.string,
  }).isRequired,
};

const POLineCard = ({
  children,
  headerEnd,
  id,
  poLine,
}) => (
  <Card
    cardStyle="positive"
    data-test-po-line-card
    headerEnd={headerEnd}
    headerStart={(
      <Link to={urls.poLineView(poLine.id)}>
        <AppIcon app="orders" size="small">
          <strong data-test-po-line-number>
            <FormattedMessage id="ui-agreements.poLines.poLineWithNumber" values={{ poLineNumber: poLine.poLineNumber }} />
          </strong>
        </AppIcon>
      </Link>
    )}
    id={id}
    roundedBorder
  >
    <div>
      <Row>
        <Col xs={3}>
          <KeyValue label={<FormattedMessage id="ui-agreements.poLines.acqMethod" />}>
            <div data-test-po-line-acq-method>
              {poLine.acquisitionMethod ?? <NoValue />}
            </div>
          </KeyValue>
        </Col>
        <Col xs={9}>
          <KeyValue label={<FormattedMessage id="ui-agreements.poLines.title" />}>
            <div data-test-po-line-title>
              {poLine.titleOrPackage ?? <NoValue />}
            </div>
          </KeyValue>
          {poLine?.instanceId &&
            <AppIcon app="inventory" iconKey="instance" size="small">
              <Link
                data-test-po-line-view-in-inventory
                to={urls.viewInstance(poLine.instanceId)}
              >
                <FormattedMessage id="ui-agreements.poLines.viewInInventory" />
              </Link>
            </AppIcon>
          }
        </Col>
      </Row>
    </div>
    {children}
  </Card>
);

POLineCard.propTypes = propTypes;
export default POLineCard;
