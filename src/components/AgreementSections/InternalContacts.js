import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { FormattedMessage } from 'react-intl';

import { Accordion, Badge } from '@folio/stripes/components';
import { InternalContactCard } from '@folio/stripes-erm-components';

export default class InternalContacts extends React.Component {
  static propTypes = {
    agreement: PropTypes.shape({
      contacts: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string,
        })
      ),
    }).isRequired,
    id: PropTypes.string,
  };

  renderBadge = () => {
    const count = get(this.props, 'agreement.contacts.length', 0);
    return <Badge>{count}</Badge>;
  }

  renderContacts = () => {
    const { contacts = [] } = this.props.agreement;

    if (!contacts.length) return <FormattedMessage id="ui-agreements.emptyAccordion.internalContacts" />;

    return contacts.map(contact => (
      <InternalContactCard
        key={contact.id}
        contact={contact}
      />
    ));
  }

  render() {
    const { id } = this.props;

    return (
      <Accordion
        displayWhenClosed={this.renderBadge()}
        displayWhenOpen={this.renderBadge()}
        id={id}
        label={<FormattedMessage id="ui-agreements.agreements.internalContacts" />}
      >
        {this.renderContacts()}
      </Accordion>
    );
  }
}
