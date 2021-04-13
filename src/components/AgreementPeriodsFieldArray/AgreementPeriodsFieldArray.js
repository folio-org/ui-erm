import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Field } from 'react-final-form';

import {
  Button,
  Headline,
} from '@folio/stripes/components';

import { EditCard, withKiwtFieldArray } from '@folio/stripes-erm-components';
import AgreementPeriodField from './AgreementPeriodField';

class AgreementPeriodsFieldArray extends React.Component {
  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.object),
    name: PropTypes.string.isRequired,
    onAddField: PropTypes.func.isRequired,
    onDeleteField: PropTypes.func.isRequired,
  }

  static defaultProps = {
    items: [],
  }

  renderPeriods = () => {
    const { items, name } = this.props;

    return items.map((period, index) => (
      <EditCard
        key={index}
        data-test-cc-number={index}
        deleteButtonTooltipText={<FormattedMessage id="ui-agreements.agreementPeriods.removePeriod" values={{ periodNum: index + 1 }} />}
        header={<FormattedMessage id="ui-agreements.agreementPeriods.periodTitle" values={{ number: index + 1 }} />}
        onDelete={index !== 0 ? () => this.props.onDeleteField(index, period) : undefined}
      >
        <Field
          component={AgreementPeriodField}
          index={index}
          name={`${name}[${index}]`}
        />
      </EditCard>
    ));
  }

  render = () => {
    return (
      <div>
        <Headline margin="x-small" size="large" tag="h3">
          <FormattedMessage id="ui-agreements.agreementPeriods" />
        </Headline>
        <div id="agreement-form-periods">
          {this.renderPeriods()}
        </div>
        <Button id="add-period-button" onClick={() => this.props.onAddField()}>
          <FormattedMessage id="ui-agreements.agreementPeriods.addPeriod" />
        </Button>
      </div>
    );
  }
}

export default withKiwtFieldArray(AgreementPeriodsFieldArray);
