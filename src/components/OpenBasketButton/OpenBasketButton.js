import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { IfPermission, stripesConnect } from '@folio/stripes/core';
import { Button } from '@folio/stripes/components';

import { urls } from '../utilities';
import css from './OpenBasketButton.css';

class OpenBasketButton extends React.Component {
  static manifest = Object.freeze({
    basket: {
      initialValue: [],
    },
    query: {},
  });

  static propTypes = {
    mutator: PropTypes.shape({
      basket: PropTypes.object,
      query: PropTypes.object,
    }),
    resources: PropTypes.shape({
      basket: PropTypes.arrayOf(PropTypes.object),
    }),
  }

  handleClick = () => {
    this.props.mutator.query.update({
      _path: urls.basket(),
    });
  }

  render() {
    const basket = this.props.resources.basket || [];

    return (
      <IfPermission perm="ui-agreements.agreements.edit">
        <Button
          buttonClass={css.button}
          buttonStyle="primary"
          data-test-basket-size={basket.length}
          data-test-open-basket-button
          disabled={basket.length === 0}
          id="open-basket-button"
          onClick={this.handleClick}
        >
          <FormattedMessage
            id="ui-agreements.basketButton"
            values={{ count: basket.length }}
          />
        </Button>
      </IfPermission>
    );
  }
}

export default stripesConnect(OpenBasketButton);
