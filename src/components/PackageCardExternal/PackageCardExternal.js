import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import {
  Card,
  Col,
  KeyValue,
  NoValue,
  Row,
} from '@folio/stripes/components';

import { AppIcon } from '@folio/stripes/core';
import EResourceLink from '../EResourceLink';
import EResourceCount from '../EResourceCount';

const propTypes = {
  headerEnd: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  packageData: PropTypes.shape({
    accessStatusType: PropTypes.string,
    authority: PropTypes.string,
    contentType: PropTypes.string,
    isSelected: PropTypes.bool,
    name: PropTypes.string,
    reference: PropTypes.string,
    providerName: PropTypes.string,
    selectedCount: PropTypes.number,
    titleCount: PropTypes.number,
  }),
  pkg: PropTypes.shape({
    reference_object: PropTypes.shape({
      accessStatusType: PropTypes.string,
      contentType: PropTypes.string,
      isSelected: PropTypes.bool,
      providerName: PropTypes.string,
      selectedCount: PropTypes.number,
      titleCount: PropTypes.number,
    }),
  }),
  searchString: PropTypes.string,
};

const PackageCardExternal = ({
  headerEnd,
  pkg = {},
  searchString = '',
  packageData = {},
}) => {
  let eresource;
  let pkgObject;
  if (pkg.reference_object) {
    eresource = pkg;
    pkgObject = pkg.reference_object;
  } else if (packageData) {
    eresource = packageData;
    pkgObject = packageData.reference_object ?? packageData;
  }
  return (
    <Card
      cardStyle="positive"
      data-test-package-card
      headerEnd={headerEnd}
      headerStart={(
        <AppIcon app="eholdings" size="small">
          <strong data-test-package-link>
            <EResourceLink eresource={eresource} searchString={searchString} />
          </strong>
        </AppIcon>
        )}
      roundedBorder
    >
      <Row>
        <Col xs={3}>
          <KeyValue label={<FormattedMessage id="ui-agreements.eresources.contentType" />}>
            <div data-test-package-content-type>
              {pkgObject?.contentType ?? <NoValue />}
            </div>
          </KeyValue>
        </Col>
        <Col xs={3}>
          <KeyValue label={<FormattedMessage id="ui-agreements.eresources.holdingStatus" />}>
            <div data-test-package-holding-status>
              {pkgObject?.isSelected ? <FormattedMessage id="ui-agreements.eresources.selected" />
                : <FormattedMessage id="ui-agreements.eresources.notSelected" />
    }
            </div>
          </KeyValue>
        </Col>
        <Col xs={3}>
          <KeyValue label={<FormattedMessage id="ui-agreements.eresources.accessStatusType" />}>
            <div data-test-package-access-status-type>
              {pkgObject?.accessStatusType ?? <NoValue />}
            </div>
          </KeyValue>
        </Col>
        <Col xs={3}>
          <KeyValue label={<FormattedMessage id="ui-agreements.eresources.provider" />}>
            <div data-test-package-vendor-name>
              {pkgObject?.providerName ?? <NoValue />}
            </div>
          </KeyValue>
        </Col>
      </Row>
      <Row>
        <Col xs={3}>
          <KeyValue label={<FormattedMessage id="ui-agreements.eresources.count" />}>
            <div data-test-package-resource-count>
              <EResourceCount resource={eresource} />
            </div>
          </KeyValue>
        </Col>
      </Row>
    </Card>);
};

PackageCardExternal.propTypes = propTypes;
export default PackageCardExternal;
