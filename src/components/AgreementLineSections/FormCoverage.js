import React from 'react';
import { isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { FieldArray } from 'react-final-form-arrays';
import { Accordion, Col, KeyValue, Layout, MessageBanner, Row } from '@folio/stripes/components';

import {
  Embargo,
  isPackage,
  SerialCoverage
} from '@folio/stripes-erm-components';

import CoverageFieldArray from '../CoverageFieldArray';
import { isExternal } from '../utilities';

const propTypes = {
  addButtonTooltipId: PropTypes.string,
  values: PropTypes.object,
  line: PropTypes.object,
  resource: PropTypes.object,
};

const FormCoverage = ({
  addButtonTooltipId,
  values = {},
  line = {},
  resource = {},
}) => {
  if (isExternal(line)) return null;
  if (isPackage(resource) || isPackage(values?.linkedResource ?? {})) return null;

  const { linkedResource, coverage } = values;

  return (
    <Accordion
      id="agreement-line-form-coverage"
      label={<FormattedMessage id="ui-agreements.eresources.coverage" />}
    >
      {
        linkedResource && isEmpty(linkedResource) && coverage && !isEmpty(coverage) && // display warning banner
        <Layout className="padding-bottom-gutter">
          <MessageBanner type="warning">
            <FormattedMessage id="ui-agreements.eresources.warn.customCoverageCleared" />
          </MessageBanner>
        </Layout>
      }
      <Row>
        { resource?.embargo ?
          <Col xs={4}>
            <KeyValue label={<FormattedMessage id="ui-agreements.embargo" />}>
              <Embargo alignment="left" embargo={resource?.embargo} />
            </KeyValue>
          </Col>
          :
          null
        }
        {
          (!isEmpty(resource.coverage) || !isEmpty(linkedResource?.coverage)) &&
          <Col xs={4}>
            <KeyValue
              label={(
                <Layout className="textCentered">
                  <FormattedMessage id="ui-agreements.eresources.defaultCoverage" />
                </Layout>
              )}
            >
              <SerialCoverage statements={resource.coverage || linkedResource?.coverage} />
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
        disabled={isEmpty(linkedResource)}
        headerId="ui-agreements.agreementLines.customCoverageTitle"
        id="agreement-line-form-custom-coverages"
        name="coverage"
      />
    </Accordion>
  );
};

FormCoverage.propTypes = propTypes;
export default FormCoverage;
