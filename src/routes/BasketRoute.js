import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';

import { stripesConnect } from '@folio/stripes/core';

import View from '../components/views/Basket';
import { urls } from '../components/utilities';

class BasketRoute extends React.Component {
  static manifest = Object.freeze({
    openAgreements: {
      type: 'okapi',
      path: 'erm/sas',
      records: 'results',
      limitParam: 'perPage',
      perRequest: 100,
      recordsRequired: '1000',
      params: {
        stats: 'true',
        filters: [
          'agreementStatus.value==active',
          'agreementStatus.value==draft',
          'agreementStatus.value==in_negotiation',
          'agreementStatus.value==requested',
        ].join('||'),
        sort: 'name',
      },
    },
    basket: { initialValue: [] },
    query: {},
  });

  static propTypes = {
    history: PropTypes.shape({
      goBack: PropTypes.func.isRequired,
      push: PropTypes.func.isRequired,
    }).isRequired,
    mutator: PropTypes.shape({
      basket: PropTypes.shape({
        replace: PropTypes.func.isRequired,
      }).isRequired,
    }),
    resources: PropTypes.shape({
      basket: PropTypes.arrayOf(PropTypes.object),
      openAgreements: PropTypes.object,
    }),
  }

  handleAddToExistingAgreement = (addFromBasket, agreementId) => {
    this.props.history.push(`${urls.agreementEdit(agreementId)}?addFromBasket=${addFromBasket}`);
  }

  handleAddToNewAgreement = (addFromBasket) => {
    this.props.history.push(`${urls.agreementCreate()}?addFromBasket=${addFromBasket}`);
  }

  handleClose = () => {
    this.props.history.goBack();
  }

  handleRemoveBasketItem = (itemToDelete) => {
    const { mutator, resources: { basket = [] } } = this.props;

    mutator.basket.replace(basket.filter(item => item.id !== itemToDelete.id));
  }

  render() {
    const { resources } = this.props;

    return (
      <View
        data={{
          openAgreements: get(resources, 'openAgreements.records', []),
          basket: get(resources, 'basket', []),
        }}
        handlers={{
          onAddToExistingAgreement: this.handleAddToExistingAgreement,
          onAddToNewAgreement: this.handleAddToNewAgreement,
          onClose: this.handleClose,
          onRemoveBasketItem: this.handleRemoveBasketItem,
        }}
      />
    );
  }
}

export default stripesConnect(BasketRoute);
