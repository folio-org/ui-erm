import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { FieldArray } from 'react-final-form-arrays';
import { Accordion } from '@folio/stripes/components';

import UsageDataProvidersFieldArray from '../UsageDataProvidersFieldArray';

export default class FormUsageData extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    onToggle: PropTypes.func,
    open: PropTypes.bool,
  };

  render() {
    const { id, onToggle, open } = this.props;

    return (
      <Accordion
        id={id}
        label={<FormattedMessage id="ui-agreements.usageData" />}
        onToggle={onToggle}
        open={open}
      >
        <FieldArray
          component={UsageDataProvidersFieldArray}
          name="usageDataProviders"
        />
      </Accordion>
    );
  }
}
