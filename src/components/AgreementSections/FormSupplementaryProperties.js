import React from 'react';
import PropTypes from 'prop-types';
import { Accordion, Headline } from '@folio/stripes/components';
import { FormattedMessage } from 'react-intl';

import { FormCustomProperties } from '@folio/stripes-erm-components';

class FormSupplementaryProperties extends React.Component {
  static propTypes = {
    data: PropTypes.object,
    id: PropTypes.string,
    onToggle: PropTypes.func,
    open: PropTypes.bool,
  };

  render() {
    const { id, onToggle, open, data: { supplementaryProperties = [] } } = this.props;

    return (
      <Accordion
        id={id}
        label={<FormattedMessage id="ui-agreements.supplementaryProperties" />}
        onToggle={onToggle}
        open={open}
      >
        <FormCustomProperties
          customProperties={supplementaryProperties}
          name="customProperties"
          optionalSectionLabel={
            <Headline margin="x-small" size="large" tag="h4">
              <FormattedMessage id="ui-agreements.supplementaryProperties.optionalProperties" />
            </Headline>
          }
          primarySectionLabel={
            <Headline margin="x-small" size="large" tag="h4">
              <FormattedMessage id="ui-agreements.supplementaryProperties.primaryProperties" />
            </Headline>
          }
          translationKey="supplementaryProperty"
        />
      </Accordion>
    );
  }
}

export default FormSupplementaryProperties;
