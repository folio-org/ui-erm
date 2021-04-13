import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';

import {
  Button,
  Col,
  Layout,
  Selection,
} from '@folio/stripes/components';

import { requiredValidator } from '@folio/stripes-erm-components';

export default class BasketSelector extends React.Component {
  static propTypes = {
    addButtonLabel: PropTypes.node,
    autoFocus: PropTypes.bool,
    basket: PropTypes.arrayOf(PropTypes.object),
    error: PropTypes.node,
    fullWidth: PropTypes.bool,
    inlineButton: PropTypes.bool,
    label: PropTypes.node,
    name: PropTypes.string,
    onAdd: PropTypes.func,
    required: PropTypes.bool
  }

  state = {
    item: { id: '' },
  }

  handleChange = id => {
    const item = this.props.basket.find(i => i.id === id);
    if (!item) return;

    this.setState({ item });
  }

  renderSelector() {
    const { basket } = this.props;

    const dataOptions = [
      ...basket.map(resource => ({
        value: resource.id,
        label: resource.name,
        disabled: false,
      }))
    ];
    const { error, name, required } = this.props;
    const { item } = this.state;

    return (
      <Field
        autoFocus={this.props.autoFocus}
        component={Selection}
        dataOptions={dataOptions}
        error={error}
        id={`${name}-basket-selector`}
        label={this.props.label}
        name={`${name}.selection`}
        onChange={this.handleChange}
        required={required}
        validate={required && requiredValidator}
        value={item.id}
      />
    );
  }

  renderAddButton() {
    const { addButtonLabel, name, onAdd } = this.props;
    const { item } = this.state;

    return (
      <Button
        buttonStyle="primary"
        disabled={!item.id}
        fullWidth={this.props.fullWidth}
        id={`${name}-basket-selector-add-button`}
        onClick={() => { onAdd(item); }}
      >
        {addButtonLabel}
      </Button>
    );
  }

  render() {
    const { inlineButton } = this.props;
    /* Adding this conditional logic here as we are going to make the rendering look consistent
    eventually */

    return (
      <div>
        {
          inlineButton ? (
            <>
              <Col md={8} xs={12}>
                {this.renderSelector()}
              </Col>
              <Col md={4} xs={12}>
                <Layout className="flex flex-align-items-center" style={{ height: '100%' }}>
                  {this.renderAddButton()}
                </Layout>
              </Col>
            </>
          ) : (
            <>
              {this.renderSelector()}
              {this.renderAddButton()}
            </>
          )
        }
      </div>
    );
  }
}
