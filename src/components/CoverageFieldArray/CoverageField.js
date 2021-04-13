import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { FormattedMessage } from 'react-intl';
import { Field } from 'react-final-form';

import {
  Col,
  Datepicker,
  Row,
  TextField,
} from '@folio/stripes/components';

import { composeValidators } from '@folio/stripes-erm-components';
import { validators } from '../utilities';

const multipleOpenEndedCoverages = (...rest) => (
  validators.multipleOpenEnded(...rest, 'ui-agreements.errors.multipleOpenEndedCoverages')
);

const overlappingCoverages = (...rest) => (
  validators.overlappingDates(...rest, 'ui-agreements.errors.overlappingCoverage')
);

export default class CoverageField extends React.Component {
  static propTypes = {
    index: PropTypes.number.isRequired,
    input: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
  }

  constructor(props) {
    super(props);

    this.inputRef = React.createRef();
  }

  componentDidMount() {
    if (!get(this.props, 'input.value.id') && get(this.inputRef, 'current')) {
      this.inputRef.current.focus();
    }
  }

  render = () => {
    const { index, input: { name } } = this.props;

    return (
      <div
        data-test-coverage-field
        data-testid="coverageField"
      >
        <Row>
          <Col md={2} xs={4}>
            <Field
              name={`${name}.startDate`}
              validate={composeValidators(
                validators.requiredStartDate,
                validators.dateOrder,
                multipleOpenEndedCoverages,
                overlappingCoverages,
              )}
            >
              {({ input, meta }) => {
                return (
                  <Datepicker
                    backendDateStandard="YYYY-MM-DD"
                    error={!meta?.data?.warning && meta.touched ? meta.error : undefined}
                    id={`cc-start-date-${index}`}
                    input={input}
                    inputRef={this.inputRef}
                    label={<FormattedMessage id="ui-agreements.agreements.startDate" />}
                    required
                    timeZone="UTC"
                    usePortal
                    warning={meta.touched && input.value ? meta?.data?.warning : undefined}
                  />
                );
              }}
            </Field>
          </Col>
          <Col md={2} xs={4}>
            <Field
              name={`${name}.startVolume`}
              parse={v => v}
            >
              {({ input, meta }) => {
                return (
                  <TextField
                    {...input}
                    error={!meta?.data?.warning && meta.touched ? meta.error : undefined}
                    id={`cc-start-volume-${index}`}
                    label={<FormattedMessage id="ui-agreements.agreementLines.customCoverage.startVolume" />}
                    warning={meta.touched && input.value ? meta?.data?.warning : undefined}
                  />
                );
              }}
            </Field>
          </Col>
          <Col md={2} xs={4}>
            <Field
              name={`${name}.startIssue`}
              parse={v => v}
            >
              {({ input, meta }) => {
                return (
                  <TextField
                    {...input}
                    error={!meta?.data?.warning && meta.touched ? meta.error : undefined}
                    id={`cc-start-issue-${index}`}
                    label={<FormattedMessage id="ui-agreements.agreementLines.customCoverage.startIssue" />}
                    warning={meta.touched && input.value ? meta?.data?.warning : undefined}
                  />
                );
              }}
            </Field>
          </Col>
          <Col md={2} xs={4}>
            <Field
              name={`${name}.endDate`}
              parse={v => v} // Lets us send an empty string instead of `undefined`
              validate={composeValidators(
                validators.dateOrder,
                multipleOpenEndedCoverages,
                overlappingCoverages,
              )}
            >
              {({ input, meta }) => {
                return (
                  <Datepicker
                    {...input}
                    backendDateStandard="YYYY-MM-DD"
                    error={!meta?.data?.warning && meta.touched ? meta.error : undefined}
                    id={`cc-end-date-${index}`}
                    input={input}
                    inputRef={this.inputRef}
                    label={<FormattedMessage id="ui-agreements.agreements.endDate" />}
                    timeZone="UTC"
                    usePortal
                    warning={meta.touched && input.value ? meta?.data?.warning : undefined}
                  />
                );
              }}
            </Field>
          </Col>
          <Col md={2} xs={4}>
            <Field
              name={`${name}.endVolume`}
              parse={v => v}
            >
              {({ input, meta }) => {
                return (
                  <TextField
                    {...input}
                    error={!meta?.data?.warning && meta.touched ? meta.error : undefined}
                    id={`cc-end-volume-${index}`}
                    label={<FormattedMessage id="ui-agreements.agreementLines.customCoverage.endVolume" />}
                    warning={meta.touched && input.value ? meta?.data?.warning : undefined}
                  />
                );
              }}
            </Field>
          </Col>
          <Col md={2} xs={4}>
            <Field
              name={`${name}.endIssue`}
              parse={v => v}
            >
              {({ input, meta }) => {
                return (
                  <TextField
                    {...input}
                    error={!meta?.data?.warning && meta.touched ? meta.error : undefined}
                    id={`cc-end-issue-${index}`}
                    label={<FormattedMessage id="ui-agreements.agreementLines.customCoverage.endIssue" />}
                    warning={meta.touched && input.value ? meta?.data?.warning : undefined}
                  />
                );
              }}
            </Field>
          </Col>
        </Row>
      </div>
    );
  }
}
