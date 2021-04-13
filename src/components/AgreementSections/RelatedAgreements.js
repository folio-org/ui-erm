import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

import {
  Accordion,
  Badge,
  Card,
  KeyValue,
  NoValue,
} from '@folio/stripes/components';
import { AppIcon } from '@folio/stripes/core';

import { urls } from '../utilities';

export default class RelatedAgreements extends React.Component {
  static propTypes = {
    agreement: PropTypes.shape({
      name: PropTypes.string,
      relatedAgreements: PropTypes.arrayOf(
        PropTypes.shape({
          agreement: PropTypes.shape({
            agreementStatus: PropTypes.shape({
              label: PropTypes.string.isRequired,
            }).isRequired,
            endDate: PropTypes.string,
            id: PropTypes.string,
            name: PropTypes.string,
            startDate: PropTypes.string,
          }).isRequired,
          note: PropTypes.string,
          type: PropTypes.string.isRequired,
        })
      ),
    }).isRequired,
    id: PropTypes.string,
    searchString: PropTypes.string,
  }

  renderRelatedAgreements = () => (
    this.props.agreement.relatedAgreements.map((ra, index) => (
      <Card
        key={index}
        cardStyle="positive"
        headerStart={(
          <AppIcon app="agreements" size="small">
            <Link
              data-test-agreement-link
              to={`${urls.agreementView(ra.agreement.id)}${this.props.searchString}`}
            >
              <strong>{ra.agreement.name}</strong>
            </Link>
          </AppIcon>
        )}
        id={`ra-card-${ra.agreement.id}`}
        roundedBorder
      >
        <KeyValue
          data-props-ra-relationship
          label={<FormattedMessage id="ui-agreements.relatedAgreements.relationship" />}
          value={<FormattedMessage id={`ui-agreements.relatedAgreements.relationship.${ra.type}`} values={{ agreement: this.props.agreement.name }} />}
        />
        <KeyValue
          data-props-ra-note
          label={<FormattedMessage id="ui-agreements.note" />}
        >
          {ra.note || <NoValue />}
        </KeyValue>
      </Card>
    ))
  )

  renderEmpty = () => (
    <FormattedMessage id="ui-agreements.emptyAccordion.relatedAgreements" />
  );

  renderBadge = () => (
    <Badge>{get(this.props.agreement, 'relatedAgreements.length', 0)}</Badge>
  )

  render() {
    const {
      agreement: { relatedAgreements = [] },
      id,
    } = this.props;

    return (
      <Accordion
        displayWhenClosed={this.renderBadge()}
        displayWhenOpen={this.renderBadge()}
        id={id}
        label={<FormattedMessage id="ui-agreements.relatedAgreements" />}
      >
        { relatedAgreements.length ? this.renderRelatedAgreements() : this.renderEmpty() }
      </Accordion>
    );
  }
}
