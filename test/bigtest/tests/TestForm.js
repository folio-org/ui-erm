import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { Button } from '@folio/stripes/components';

export default class TestForm extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    initialValues: PropTypes.object,
    onSubmit: PropTypes.func,
  };

  static defaultProps = {
    initialValues: {},
    onSubmit: () => {},
  };

  render() {
    return (
      <Form
        initialValues={this.props.initialValues}
        mutators={arrayMutators}
        onSubmit={this.props.onSubmit}
      >
        {props => (
          <form onSubmit={props.handleSubmit}>
            {this.props.children}
            <Button id="submit" type="submit">
              Submit
            </Button>
          </form>
        )}
      </Form>
    );
  }
}
