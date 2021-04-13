import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { FieldArray } from 'react-final-form-arrays';

import { Accordion } from '@folio/stripes/components';
import { InternalContactsFieldArray } from '@folio/stripes-erm-components';

export default class FormInternalContacts extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    onToggle: PropTypes.func,
    open: PropTypes.bool,
    data: PropTypes.shape({
      contactRoleValues: PropTypes.arrayOf(PropTypes.object),
      users: PropTypes.arrayOf(PropTypes.object),
    }),
  };

  render() {
    const { id, onToggle, open } = this.props;

    return (
      <Accordion
        id={id}
        label={<FormattedMessage id="ui-agreements.agreements.internalContacts" />}
        onToggle={onToggle}
        open={open}
      >
        <FieldArray
          component={InternalContactsFieldArray}
          contactRoles={this.props.data.contactRoleValues}
          isEmptyMessage={<FormattedMessage id="ui-agreements.emptyAccordion.internalContacts" />}
          name="contacts"
          users={this.props.data.users}
        />
      </Accordion>
    );
  }
}
