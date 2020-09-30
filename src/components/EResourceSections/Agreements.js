import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import {
  Accordion,
  Badge,
  Spinner
} from '@folio/stripes/components';

import { resourceClasses } from '../../constants';
import EntitlementAgreementsList from '../EntitlementsAgreementsList';

export default class Agreements extends React.Component {
  static propTypes = {
    data: PropTypes.shape({
      entitlements: PropTypes.arrayOf(PropTypes.object),
      eresource: PropTypes.shape({
        class: PropTypes.string,
        pti: PropTypes.shape({
          titleInstance: PropTypes.shape({
            name: PropTypes.string,
          })
        }),
        type: PropTypes.object,
      }),
      relatedEntitlements: PropTypes.arrayOf(PropTypes.object),
    }),
    headline: PropTypes.node,
    isEmptyMessage: PropTypes.node,
    renderRelatedEntitlements: PropTypes.bool,
    visibleColumns: PropTypes.arrayOf(PropTypes.string),
  };

  state = {
    sortOrder: ['name', 'type'],
    sortDirection: ['asc', 'desc'],
  };

  onSort = (_, meta) => {
    if (!this.sortMap[meta.name]) return;

    let {
      sortOrder,
      sortDirection,
    } = this.state;

    if (sortOrder[0] !== meta.name) {
      sortOrder = [meta.name, sortOrder[0]];
      sortDirection = ['asc', sortDirection[0]];
    } else {
      const direction = (sortDirection[0] === 'desc') ? 'asc' : 'desc';
      sortDirection = [direction, sortDirection[1]];
    }

    this.setState({ sortOrder, sortDirection });
  }

  sortMap = {
    name: e => e?.owner?.name,
    type: e => e?.owner?.agreementStatus?.label,
  };

  renderEntitlementAgreements = () => {
    const {
      data: { entitlements = [] },
      headline,
      isEmptyMessage,
      visibleColumns
    } = this.props;

    const {
      sortOrder,
      sortDirection
    } = this.state;

    // eslint-disable-next-line no-undef
    const contentData = _.orderBy(entitlements,
      [this.sortMap[sortOrder[0]], this.sortMap[sortOrder[1]]], sortDirection);

    return (
      <EntitlementAgreementsList
        contentData={contentData}
        headline={headline}
        id="pci-agreements-list"
        isEmptyMessage={isEmptyMessage}
        onSort={this.onSort}
        sortDirection={`${sortDirection[0]}ending`}
        sortOrder={sortOrder[0]}
        visibleColumns={visibleColumns}
      />
    );
  }

  renderRelatedEntitlementAgreements = () => {
    const { eresource, relatedEntitlements = [] } = this.props.data;

    return (
      <EntitlementAgreementsList
        entitlements={relatedEntitlements}
        headline={<FormattedMessage
          id="ui-agreements.eresources.otherPlatformPackages"
          values={{ name: eresource?.pti?.titleInstance?.name }}
        />}
        id="related-agreements-list"
        isEmptyMessage={<FormattedMessage id="ui-agreements.emptyAccordion.noAgreementsOtherPackages" />}
        visibleColumns={['name', 'type', 'package', 'startDate', 'endDate']}
      />
    );
  }

  renderBadge = () => {
    const { entitlements, relatedEntitlements } = this.props.data;

    return (entitlements && relatedEntitlements) ?
      <Badge>{entitlements?.length + relatedEntitlements?.length}</Badge>
      :
      <Spinner />;
  }

  render() {
    const {
      data: { entitlements, eresource, relatedEntitlements },
      renderRelatedEntitlements,
    } = this.props;

    const label = (eresource.class === resourceClasses.PACKAGE) ?
      <FormattedMessage id="ui-agreements.eresources.packageAgreements" /> :
      <FormattedMessage id="ui-agreements.eresources.erAgreements" />;

    return (
      <Accordion
        displayWhenClosed={this.renderBadge()}
        displayWhenOpen={this.renderBadge()}
        id="pci-agreements"
        label={label}
      >
        {entitlements ? this.renderEntitlementAgreements(entitlements) : <Spinner />}
        {renderRelatedEntitlements ? (
          relatedEntitlements ?
            this.renderRelatedEntitlementAgreements() :
            <Spinner />) : null}
      </Accordion>
    );
  }
}
