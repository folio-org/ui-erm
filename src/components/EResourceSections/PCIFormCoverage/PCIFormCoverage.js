import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import {
  Accordion,
  KeyValue
} from '@folio/stripes/components';
import { FieldArray } from 'react-final-form-arrays';
import { Embargo } from '@folio/stripes-erm-components';

import CoverageFieldArray from '../../CoverageFieldArray';

export default class PCIFormCoverage extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    open: PropTypes.bool,
    onToggle: PropTypes.func,
    values: PropTypes.object,
  };

  render() {
    const { id, open, onToggle, values } = this.props;

    return (
      <Accordion
        id={id}
        label={<FormattedMessage id="ui-agreements.eresources.coverage" />}
        onToggle={onToggle}
        open={open}
      >
        {values?.embargo ?
          (
            <KeyValue label={<FormattedMessage id="ui-agreements.embargo" />}>
              <Embargo alignment="left" embargo={values?.embargo} />
            </KeyValue>
          ) : null
        }
        <FieldArray
          addButtonId="edit-pci-add-coverage-button"
          addLabelId="ui-agreements.pci.addCoverage"
          component={CoverageFieldArray}
          deleteButtonTooltipId="ui-agreements.pci.removeCoverage"
          headerId="ui-agreements.pci.coverageTitle"
          id="pci-form-coverages"
          isEmptyCoverageId="ui-agreements.emptyAccordion.lineCoverageEresource"
          name="coverage"
        />
      </Accordion>
    );
  }
}
