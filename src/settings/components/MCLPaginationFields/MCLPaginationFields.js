import React from 'react';
import { FormattedMessage } from 'react-intl';

import { Field } from 'react-final-form';

import {
  Col,
  Layout,
  Row,
  TextField,
} from '@folio/stripes/components';

const mclList = ['agreementLines', 'agreementEresources', 'entitlementOptions', 'packageContents', 'entitlements'];

const inRange = (x, min, max) => {
  return ((x - min) * (x - max) <= 0);
};

const validate = (fieldValue, min, max) => {
  return (!inRange(fieldValue, min, max)) ?
    <FormattedMessage id="ui-agreements.settings.error.valueNotInRange" values={{ min, max }} /> : undefined;
};

const MCLPaginationFields = () => {
  return (
    <>
      <Layout className="padding-bottom-gutter padding-top-gutter" data-test-mcl-description>
        <FormattedMessage id="ui-agreements.settings.tabularList.pagination" />
      </Layout>
      <Layout className="padding-bottom-gutter">
        <Row>
          <Col xs={8}> <FormattedMessage id="ui-agreements.settings.tabularList" /> </Col>
          <Col xs={4}> <FormattedMessage id="ui-agreements.settings.mcl.pageSize" /> </Col>
        </Row>
      </Layout>
      { mclList.map((mcl, index) => (
        <div key={index}>
          <Row>
            <Col
              id={`pageSize-${mcl}`}
              xs={8}
            >
              <FormattedMessage id={`ui-agreements.settings.mcl.${mcl}`} />
            </Col>
            <Col xs={4}>
              <Field
                ariaLabelledBy={`pageSize-${mcl}`}
                component={TextField}
                data-testid={mcl}
                id={`pageSize-${mcl}`}
                name={`pageSize.${mcl}`}
                parse={v => parseInt(v, 10)}
                type="number"
                validate={v => validate(v, 1, 100)}
              />
            </Col>
          </Row>
        </div>
      ))
    }
    </>
  );
};

export default MCLPaginationFields;

