import React from 'react';
import PropTypes from 'prop-types';
import { get, isEmpty } from 'lodash';
import { FormattedMessage } from 'react-intl';
import { Field } from 'react-final-form';

import {
  Col,
  Datepicker,
  Row,
  TextArea,
} from '@folio/stripes/components';

import { composeValidators } from '@folio/stripes-erm-components';
import { validators } from '../utilities';

const multipleOpenEndedPeriods = (...rest) => (
  validators.multipleOpenEnded(...rest, 'ui-agreements.errors.multipleOpenEndedPeriods')
);

const overlappingPeriods = (...rest) => (
  validators.overlappingDates(...rest, 'ui-agreements.errors.overlappingPeriod')
);

export default class AgreementPeriodField extends React.Component {
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
    const value = get(this.props, 'input.value');

    /* Focus only when add agreement period button is clicked in which case the value object
    would look like value:{ _delete: false }. Prevent focus on initial mount (value === {}) or
    when value.id is defined */

    if (!isEmpty(value) && !value.id && get(this.inputRef, 'current')) {
      this.inputRef.current.focus();
    }
  }

  render = () => {
    const { index, input: { name } } = this.props;

    return (
      <div>
        <Row>
          <Col xs={4}>
            <Field
              backendDateStandard="YYYY-MM-DD"
              component={Datepicker}
              id={`period-start-date-${index}`}
              inputRef={this.inputRef}
              label={<FormattedMessage id="ui-agreements.agreements.startDate" />}
              name={`${name}.startDate`}
              required
              timeZone="UTC"
              usePortal
              validate={composeValidators(
                validators.requiredStartDate,
                validators.dateOrder,
                overlappingPeriods,
              )}
            />
          </Col>
          <Col xs={4}>
            <Field
              backendDateStandard="YYYY-MM-DD"
              component={Datepicker}
              id={`period-end-date-${index}`}
              label={<FormattedMessage id="ui-agreements.agreements.endDate" />}
              name={`${name}.endDate`}
              parse={v => v} // Lets us send an empty string instead of `undefined`
              timeZone="UTC"
              usePortal
              validate={composeValidators(
                validators.dateOrder,
                multipleOpenEndedPeriods,
                overlappingPeriods,
              )}
            />
          </Col>
          <Col xs={4}>
            <Field
              backendDateStandard="YYYY-MM-DD"
              component={Datepicker}
              id={`period-cancellation-deadline-${index}`}
              label={<FormattedMessage id="ui-agreements.agreements.cancellationDeadline" />}
              name={`${name}.cancellationDeadline`}
              parse={v => v} // Lets us send an empty string instead of `undefined`
              timeZone="UTC"
              usePortal
            />
          </Col>
        </Row>
        <Field
          component={TextArea}
          id={`period-note-${index}`}
          label={<FormattedMessage id="ui-agreements.agreementPeriods.periodNote" />}
          name={`${name}.note`}
          parse={v => v} // Lets us send an empty string instead of `undefined`
        />
      </div>
    );
  }
}
