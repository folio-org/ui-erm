import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { FieldArray } from 'react-final-form-arrays';
import { Accordion } from '@folio/stripes/components';

import POLinesFieldArray from '../POLinesFieldArray';

const propTypes = {
  line: PropTypes.shape({
    poLines: PropTypes.arrayOf(PropTypes.object),
  }),
};

const FormPOLines = ({
  line: { poLines = [] } = {},
}) => (
  <Accordion
    id="agreement-line-form-po-lines"
    label={<FormattedMessage id="ui-agreements.poLines.poLines" />}
  >
    <FieldArray
      agreementLineIndex={0}
      component={POLinesFieldArray}
      name="poLines"
      poLines={poLines}
    />
  </Accordion>
);

FormPOLines.propTypes = propTypes;
export default FormPOLines;
