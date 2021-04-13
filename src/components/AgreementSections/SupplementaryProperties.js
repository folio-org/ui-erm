import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { CustomPropertiesList } from '@folio/stripes-erm-components';
import { Accordion } from '@folio/stripes/components';

export default class SupplementaryProperties extends React.Component {
  static propTypes = {
    agreement: PropTypes.object,
    id: PropTypes.string,
    data: PropTypes.shape({ supplementaryProperties: PropTypes.arrayOf(PropTypes.object) }),
  }

  render() {
    const {
      agreement,
      data: { supplementaryProperties },
      id,
    } = this.props;

    return (
      <Accordion
        id={id}
        label={<FormattedMessage id="ui-agreements.supplementaryProperties" />}
      >
        <CustomPropertiesList
          customProperties={supplementaryProperties}
          isEmptyMessage={<FormattedMessage id="ui-agreements.emptyAccordion.supplementaryProperties" />}
          resource={agreement}
        />
      </Accordion>
    );
  }
}
