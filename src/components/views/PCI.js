import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import {
  AccordionSet,
  AccordionStatus,
  Col,
  ExpandAllButton,
  HasCommand,
  Headline,
  Row,
  checkScope,
  collapseAllSections,
  expandAllSections
} from '@folio/stripes/components';
import DiscoverySettings from '../DiscoverySettings';

import {
  Agreements,
  PCICoverage,
  PCIInfo,
} from '../EResourceSections';

import PackageCard from '../PackageCard';
import TitleCard from '../TitleCard';

export default class PCI extends React.Component {
  static propTypes = {
    data: PropTypes.shape({
      entitlements: PropTypes.arrayOf(PropTypes.object),
      eresource: PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        pkg: PropTypes.object,
        status: PropTypes.shape({
          label: PropTypes.string,
        }),
      }).isRequired,
      relatedEntitlements: PropTypes.arrayOf(PropTypes.object),
      searchString: PropTypes.string,
      settings: PropTypes.object,
    }),
    handlers: PropTypes.shape({
      isSuppressFromDiscoveryEnabled: PropTypes.func.isRequired,
      onEdit: PropTypes.func.isRequired,
      onNeedMoreEntitlements: PropTypes.func.isRequired,
    }),
  }

  constructor(props) {
    super(props);
    this.accordionStatusRef = React.createRef();
  }

  getInitialAccordionsState = () => {
    return {
      'pci-coverage': false,
      'eresourceAgreements': false,
      'discoverySettings': false
    };
  }

  render() {
    const { data, handlers } = this.props;
    const { eresource, searchString } = data;

    const shortcuts = [
      {
        name: 'edit',
        handler: handlers.onEdit,
      },
      {
        name: 'expandAllSections',
        handler: (e) => expandAllSections(e, this.accordionStatusRef),
      },
      {
        name: 'collapseAllSections',
        handler: (e) => collapseAllSections(e, this.accordionStatusRef)
      }
    ];

    return (
      <HasCommand
        commands={shortcuts}
        isWithinScope={checkScope}
        scope={document.body}
      >
        <div id="eresource-pci">
          <PCIInfo pci={eresource} />
          <div data-test-parent-package-details>
            <Headline margin="small" size="large" tag="h3">
              <FormattedMessage id="ui-agreements.eresources.parentPackageDetails" />
            </Headline>
            <PackageCard pkg={eresource?.pkg ?? {}} searchString={searchString} />
          </div>
          <div id="title-info">
            <Headline margin="small" size="large" tag="h3">
              <FormattedMessage id="ui-agreements.eresources.titleDetails" />
            </Headline>
            <TitleCard searchString={searchString} title={data.eresource} />
          </div>
          <AccordionStatus ref={this.accordionStatusRef}>
            <Row end="xs">
              <Col xs>
                <ExpandAllButton />
              </Col>
            </Row>
            <AccordionSet initialStatus={this.getInitialAccordionsState()}>
              <PCICoverage data={data} />
              <Agreements
                data={data}
                handlers={handlers}
                headline={eresource.name}
                id="eresourceAgreements"
                renderRelatedEntitlements
                visibleColumns={['name', 'type', 'startDate', 'endDate']}
              />
              {
                (handlers.isSuppressFromDiscoveryEnabled('pci') ||
                handlers.isSuppressFromDiscoveryEnabled('title'))
                && <DiscoverySettings handlers={handlers} id="discoverySettings" pci={eresource} />
              }
            </AccordionSet>
          </AccordionStatus>
        </div>
      </HasCommand>
    );
  }
}
