import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { Accordion, Badge } from '@folio/stripes/components';

import POLineCard from '../POLineCard';

const propTypes = {
  line: PropTypes.shape({
    poLines: PropTypes.PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      titleOrPackage: PropTypes.string,
      poLineNumber: PropTypes.string,
    })),
  }).isRequired,
};

const POLines = ({
  line: { poLines = [] },
}) => (
  <Accordion
    displayWhenClosed={<Badge>{poLines.length}</Badge>}
    displayWhenOpen={<Badge>{poLines.length}</Badge>}
    id="agreement-line-po-lines"
    label={<FormattedMessage id="ui-agreements.poLines.poLines" />}
  >
    {poLines.length ?
      poLines.map(poLine => (
        <POLineCard
          key={poLine.id}
          id={`ag-line-pol-card-${poLine.id}`}
          poLine={poLine}
        />
      ))
      :
      <FormattedMessage id="ui-agreements.emptyAccordion.linePOLines" />
    }
  </Accordion>
);

POLines.propTypes = propTypes;
export default POLines;
