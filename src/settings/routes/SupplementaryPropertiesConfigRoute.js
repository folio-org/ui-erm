import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { stripesConnect } from '@folio/stripes/core';
import SupplementaryPropertiesConfigForm from '../components';

class SupplementaryPropertiesConfigRoute extends React.Component {
  static manifest = Object.freeze({
    supplementaryProperties: {
      type: 'okapi',
      path: 'erm/custprops',
      params: {
        sort: 'id;desc'
      },
      clientGeneratePk: false,
      throwErrors: false,
    },
  });

  static propTypes = {
    resources: PropTypes.shape({
      supplementaryProperties: PropTypes.object,
    }),
    mutator: PropTypes.shape({
      supplementaryProperties: PropTypes.shape({
        DELETE: PropTypes.func.isRequired,
        POST: PropTypes.func.isRequired,
        PUT: PropTypes.func.isRequired,
      }),
    }),
  }

  state = {
    // loadedAt is used in gDSFP to determine whether to reinit form values
    loadedAt: new Date(), // eslint-disable-line react/no-unused-state
    supplementaryProperties: [],
  }

  static getDerivedStateFromProps(props, state) {
    const newState = {};

    const supplementaryProperties = get(props, 'resources.supplementaryProperties'); // can't use default value bc of `null`
    if (supplementaryProperties && supplementaryProperties.hasLoaded && supplementaryProperties.loadedAt > state.loadedAt) {
      newState.loadedAt = supplementaryProperties.loadedAt;
      newState.supplementaryProperties = supplementaryProperties.records.map(supplementaryProperty => ({
        ...supplementaryProperty,
        category: supplementaryProperty.category ? supplementaryProperty.category.id : undefined,
      }));
    }

    return Object.keys(newState).length ? newState : null;
  }

  handleDelete = (supplementaryProperty) => {
    return this.props.mutator.supplementaryProperties.DELETE(supplementaryProperty);
  }

  handleSave = (supplementaryProperty) => {
    const mutator = this.props.mutator.supplementaryProperties;

    const promise = supplementaryProperty.id ?
      mutator.PUT(supplementaryProperty, { pk: supplementaryProperty.id }) :
      mutator.POST(supplementaryProperty);

    return promise;
  }

  render() {
    const { supplementaryProperties } = this.state;

    return (
      <SupplementaryPropertiesConfigForm
        initialValues={{ customProperties: supplementaryProperties }}
        onDelete={this.handleDelete}
        onSave={this.handleSave}
        onSubmit={this.handleSave}
      />
    );
  }
}

export default stripesConnect(SupplementaryPropertiesConfigRoute);
