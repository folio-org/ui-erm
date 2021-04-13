import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Field } from 'react-final-form';

import { Button, Layout } from '@folio/stripes/components';
import { requiredObjectValidator, withKiwtFieldArray } from '@folio/stripes-erm-components';

import IfEResourcesEnabled from '../IfEResourcesEnabled';
import { isExternal } from '../utilities';

import AgreementLineField from './AgreementLineField';

class AgreementLinesFieldArray extends React.Component {
  static propTypes = {
    data: PropTypes.shape({
      basket: PropTypes.arrayOf(PropTypes.object),
      agreementLines: PropTypes.arrayOf(PropTypes.object),
      orderLines: PropTypes.arrayOf(PropTypes.object),
    }),
    items: PropTypes.arrayOf(PropTypes.object),
    name: PropTypes.string.isRequired,
    onAddField: PropTypes.func.isRequired,
    onDeleteField: PropTypes.func.isRequired,
    onReplaceField: PropTypes.func.isRequired,
  }

  getLineResource = (line) => {
    const { data: { agreementLines } } = this.props;

    if (line.resource) return line.resource;

    if (line.id) {
      const savedLine = agreementLines.find(l => l.id === line.id);
      if (savedLine) {
        if (savedLine.type === 'detached') return savedLine;
        return isExternal(savedLine) ? savedLine : savedLine.resource;
      }
    }

    if (isExternal(line)) {
      return line;
    }

    return undefined;
  }

  handleResourceSelected = (index, resource) => {
    this.props.onReplaceField(index, { resource });
  }

  renderEmpty = () => (
    <Layout className="padding-bottom-gutter">
      <FormattedMessage id="ui-agreements.agreementLines.noLines" />
    </Layout>
  )

  renderLines = () => {
    return this.props.items.map((line, i) => (
      <Field
        key={i}
        basket={this.props.data.basket}
        component={AgreementLineField}
        index={i}
        name={`${this.props.name}[${i}]`}
        onDelete={() => this.props.onDeleteField(i, line)}
        onResourceSelected={this.handleResourceSelected}
        poLines={this.props.data.orderLines || []}
        resource={this.getLineResource(line)}
        validate={requiredObjectValidator}
      />
    ));
  }

  render() {
    return (
      <div>
        <div id="agreement-form-lines">
          {this.props.items.length ? this.renderLines() : this.renderEmpty()}
        </div>
        <IfEResourcesEnabled>
          <Button id="add-agreement-line-button" onClick={() => this.props.onAddField()}>
            <FormattedMessage id="ui-agreements.agreementLines.addLine" />
          </Button>
        </IfEResourcesEnabled>
      </div>
    );
  }
}

export default withKiwtFieldArray(AgreementLinesFieldArray);
