import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { FieldArray } from 'react-final-form-arrays';
import { Accordion } from '@folio/stripes/components';

import RelatedAgreementsFieldArray from '../RelatedAgreementsFieldArray';

export default class FormRelatedAgreements extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    onToggle: PropTypes.func,
    open: PropTypes.bool,
    values: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
    }),
  };

  render() {
    const { id, onToggle, open, values = {} } = this.props;

    return (
      <Accordion
        id={id}
        label={<FormattedMessage id="ui-agreements.relatedAgreements" />}
        onToggle={onToggle}
        open={open}
      >
        <FieldArray
          component={RelatedAgreementsFieldArray}
          currentAgreementId={values.id}
          currentAgreementName={values.name}
          name="relatedAgreements"
        />
      </Accordion>
    );
  }
}
