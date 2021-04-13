import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { Field } from 'react-final-form';
import {
  Card,
  Col,
  FormattedUTCDate,
  Headline,
  MessageBanner,
  KeyValue,
  Row,
  Select,
  TextArea,
  NoValue
} from '@folio/stripes/components';
import { LicenseEndDate, requiredValidator, withKiwtFieldArray } from '@folio/stripes-erm-components';

import { urls, getConflictWarnings } from '../utilities';

class AmendmentsFieldArray extends React.Component {
  static propTypes = {
    amendmentStatusValues: PropTypes.arrayOf(PropTypes.object),
    form: PropTypes.shape({
      mutators: PropTypes.shape({
        setFieldData: PropTypes.func.isRequired,
      }).isRequired,
    }).isRequired,
    items: PropTypes.arrayOf(PropTypes.object),
    license: PropTypes.shape({
      amendments: PropTypes.arrayOf(PropTypes.shape({
        endDate: PropTypes.string,
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        startDate: PropTypes.string,
        status: PropTypes.shape({
          label: PropTypes.string.isRequired,
          value: PropTypes.string.isRequired,
        }).isRequired,
      })),
    }),
    name: PropTypes.string.isRequired,
  };

  state = {
    warnings: []
  }

  render() {
    const {
      amendmentStatusValues,
      items,
      license = {},
      name
    } = this.props;
    const { amendments = [] } = license;

    if (!items.length) {
      return null;
    }

    return (
      <div data-test-amendments-fa>
        <Headline margin="x-small" size="medium" tag="h5">
          <FormattedMessage id="ui-agreements.license.licenseAmendments" />
        </Headline>
        {items.map((item, i) => {
          const amendment = amendments.find(a => item.amendmentId === a.id) || {};
          return (
            <Card
              key={amendment.id}
              data-test-amendment={amendment.name}
              headerStart={
                <Link
                  data-test-amendment-name
                  to={urls.amendmentView(license.id, amendment.id)}
                >
                  <strong>{amendment.name}</strong>
                </Link>
              }
            >
              <Row>
                <Col md={4} xs={12}>
                  <KeyValue
                    data-test-amendment-status
                    label={<FormattedMessage id="ui-agreements.agreements.agreementStatus" />}
                    value={amendment?.status?.label ?? <NoValue />}
                  />
                </Col>
                <Col md={4} xs={6}>
                  <KeyValue
                    data-test-amendment-start-date
                    label={<FormattedMessage id="ui-agreements.agreements.startDate" />}
                  >
                    {amendment.startDate ? <FormattedUTCDate value={amendment.startDate} /> : <NoValue />}
                  </KeyValue>
                </Col>
                <Col md={4} xs={6}>
                  <KeyValue
                    data-test-amendment-end-date
                    label={<FormattedMessage id="ui-agreements.agreements.endDate" />}
                  >
                    <LicenseEndDate license={amendment} />
                  </KeyValue>
                </Col>
              </Row>
              <Row>
                <Col md={4} xs={12}>
                  <Field
                    name={`${name}[${i}].status`}
                    validate={requiredValidator}
                  >
                    {props => (
                      <Select
                        {...props}
                        dataOptions={amendmentStatusValues}
                        label={<FormattedMessage id="ui-agreements.license.prop.status" />}
                        onChange={(e) => {
                          const { value } = e.target;

                          const warning = getConflictWarnings.amendmentWarning({
                            ...amendment,
                            statusForThisAgreement: { value },
                          });

                          this.setState(prevState => {
                            const warnings = [...prevState.warnings];
                            warnings[i] = warning;
                            return { warnings };
                          });
                          props.input.onChange(e);
                        }}
                        placeholder=" "
                        required
                      />
                    )}
                  </Field>
                </Col>
                <Col md={8} xs={12}>
                  <Field
                    component={TextArea}
                    label={<FormattedMessage id="ui-agreements.license.amendmentNote" />}
                    name={`${name}[${i}].note`}
                    parse={v => v} // Lets us send an empty string instead of `undefined`
                  />
                </Col>
              </Row>
              {
                this.state.warnings[i] ?
                  <MessageBanner type="warning">
                    {this.state.warnings[i]}
                  </MessageBanner> : null
              }
            </Card>
          );
        })}
      </div>
    );
  }
}

export default withKiwtFieldArray(AmendmentsFieldArray);
