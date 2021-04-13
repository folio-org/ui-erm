import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Field } from 'react-final-form';

import { Button, Layout } from '@folio/stripes/components';
import { EditCard, withKiwtFieldArray, requiredValidator } from '@folio/stripes-erm-components';

import POLineField from './POLineField';

class POLinesFieldArray extends React.Component {
  static propTypes = {
    agreementLineIndex: PropTypes.number.isRequired,
    items: PropTypes.arrayOf(PropTypes.object),
    name: PropTypes.string.isRequired,
    onAddField: PropTypes.func.isRequired,
    onDeleteField: PropTypes.func.isRequired,
    onUpdateField: PropTypes.func.isRequired,
    poLines: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      poLineNumber: PropTypes.string,
    }))
  }

  static defaultProps = {
    poLines: [],
  }

  state = {
    poLines: [],
  }

  static getDerivedStateFromProps(props, state) {
    if (!state.poLines.length && props.poLines.length) {
      return { poLines: props.poLines };
    }

    return null;
  }

  handlePOLineSelected = (index, poLine) => {
    this.props.onUpdateField(index, { poLineId: poLine.id });

    this.setState(prevState => ({
      poLines: [...prevState.poLines, poLine]
    }));
  }

  renderEmpty = () => (
    <Layout className="padding-bottom-gutter" data-test-ra-empty-message>
      <FormattedMessage id="ui-agreements.polines.lineHasNone" />
    </Layout>
  );

  renderPOLines() {
    const { agreementLineIndex, items, name } = this.props;

    return items.length ? items.map((poLine, index) => (
      <EditCard
        key={index}
        data-test-po-line
        deleteBtnProps={{
          'id': `poline-delete-${agreementLineIndex}-${index}`,
          'data-test-delete-field-button': true
        }}
        deleteButtonTooltipText={<FormattedMessage id="ui-agreements.poLines.remove" values={{ index: index + 1 }} />}
        header={<FormattedMessage id="ui-agreements.poLines.poLineIndex" values={{ index: index + 1 }} />}
        id={`edit-ra-card-${agreementLineIndex}-${index}`}
        onDelete={() => this.props.onDeleteField(index, poLine)}
      >
        <Field
          component={POLineField}
          id={`edit-poline-${agreementLineIndex}-${index}`}
          name={`${name}[${index}].poLineId`}
          onPOLineSelected={selectedLine => this.handlePOLineSelected(index, selectedLine)}
          poLine={this.state.poLines.find(l => l.id === poLine.poLineId)}
          validate={requiredValidator}
        />
      </EditCard>
    )) : (
      <Layout className="padding-bottom-gutter">
        <FormattedMessage id="ui-agreements.emptyAccordion.linePOLines" />
      </Layout>
    );
  }

  render() {
    const { agreementLineIndex, onAddField } = this.props;

    return (
      <div data-test-polines-fa>
        <div>
          {this.renderPOLines()}
        </div>
        <Button
          data-test-poline-fa-add-button
          id={`add-poline-btn-${agreementLineIndex}`}
          onClick={() => onAddField()}
        >
          <FormattedMessage id="ui-agreements.poLines.addPOLine" />
        </Button>
      </div>
    );
  }
}

export default withKiwtFieldArray(POLinesFieldArray);
