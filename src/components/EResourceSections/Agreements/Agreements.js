import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import {
  Accordion,
  Badge,
  Spinner
} from '@folio/stripes/components';

import { resourceClasses } from '../../../constants';
import EntitlementAgreementsList from '../../EntitlementsAgreementsList';

export default class Agreements extends React.Component {
  static propTypes = {
    data: PropTypes.shape({
      entitlements: PropTypes.arrayOf(PropTypes.object),
      entitlementsCount: PropTypes.number,
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
    handlers: PropTypes.shape({
      onNeedMoreEntitlements: PropTypes.func,
    }),
    headline: PropTypes.node,
    id: PropTypes.string,
    isEmptyMessage: PropTypes.node,
    renderRelatedEntitlements: PropTypes.bool,
    visibleColumns: PropTypes.arrayOf(PropTypes.string),
  };

  renderEntitlementAgreements = () => {
    const { entitlements = [], entitlementsCount } = this.props.data;
    const { handlers: { onNeedMoreEntitlements }, headline, isEmptyMessage, visibleColumns } = this.props;

    return (
      <EntitlementAgreementsList
        entitlements={entitlements}
        headline={headline}
        id="pci-agreements-list"
        isEmptyMessage={isEmptyMessage}
        onNeedMoreEntitlements={onNeedMoreEntitlements}
        totalCount={entitlementsCount}
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
    const { entitlements, entitlementsCount, relatedEntitlements } = this.props.data;

    return (entitlements && relatedEntitlements) ?
      <Badge>{entitlementsCount + relatedEntitlements?.length}</Badge>
      :
      <Spinner />;
  }

  render() {
    const {
      data: { entitlements, eresource, relatedEntitlements },
      id,
      renderRelatedEntitlements,
    } = this.props;

    const label = (eresource.class === resourceClasses.PACKAGE) ?
      <FormattedMessage id="ui-agreements.eresources.packageAgreements" /> :
      <FormattedMessage id="ui-agreements.eresources.erAgreements" />;

    return (
      <Accordion
        displayWhenClosed={this.renderBadge()}
        displayWhenOpen={this.renderBadge()}
        id={id}
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
