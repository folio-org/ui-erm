import React from 'react';
import { isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { FieldArray } from 'react-final-form-arrays';
import { Accordion, Col, KeyValue, Layout, Row } from '@folio/stripes/components';

import {
  Embargo,
  isPackage,
  SerialCoverage
} from '@folio/stripes-erm-components';

import CoverageFieldArray from '../CoverageFieldArray';
import { isExternal } from '../utilities';

const propTypes = {
  addButtonTooltipId: PropTypes.string,
  disabled: PropTypes.bool,
  line: PropTypes.object,
  resource: PropTypes.object,
};

const FormCoverage = ({
  addButtonTooltipId,
  disabled,
  line = {},
  resource = {},
}) => {
  if (isExternal(line)) return null;
  if (isPackage(resource)) return null;

  return (
    <Accordion
      id="agreement-line-form-coverage"
      label={<FormattedMessage id="ui-agreements.eresources.coverage" />}
    >
      <Row>
        { resource?.embargo ?
          <Col xs={4}>
            <KeyValue label={<FormattedMessage id="ui-agreements.embargo" />}>
              <Embargo embargo={resource?.embargo} />
            </KeyValue>
          </Col>
          :
          null
        }
        {
          !isEmpty(resource.coverage) &&
          <Col xs={4}>
            <KeyValue
              label={(
                <Layout className="textCentered">
                  <FormattedMessage id="ui-agreements.eresources.defaultCoverage" />
                </Layout>
            )}
            >
              {/* This is intentional, after talking to Gill a decision was made that behaviour
                of coverage in the edit screen was to remain blank for monographs. */}
              <SerialCoverage statements={resource.coverage} />
            </KeyValue>
          </Col>
        }
      </Row>
      <FieldArray
        addButtonId="add-agreement-line-custom-coverage-button"
        addButtonTooltipId={addButtonTooltipId}
        addLabelId="ui-agreements.agreementLines.addCustomCoverage"
        component={CoverageFieldArray}
        deleteButtonTooltipId="ui-agreements.agreementLines.removeCustomCoverage"
        disabled={disabled}
        headerId="ui-agreements.agreementLines.customCoverageTitle"
        id="agreement-line-form-custom-coverages"
        name="coverage"
      />
    </Accordion>
  );
};

FormCoverage.propTypes = propTypes;
export default FormCoverage;
