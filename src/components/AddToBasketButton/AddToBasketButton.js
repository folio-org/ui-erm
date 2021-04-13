import React from 'react';
import PropTypes from 'prop-types';

import { Button, Tooltip } from '@folio/stripes/components';
import { IfPermission, stripesConnect } from '@folio/stripes/core';
import { get, uniqueId } from 'lodash';

class AddToBasketButton extends React.Component {
  static manifest = Object.freeze({
    basket: {
      initialValue: [],
    }
  });

  static propTypes = {
    addButtonTooltipText: PropTypes.node,
    addLabel: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
    buttonProps: PropTypes.object,
    removeLabel: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
    disabled: PropTypes.bool,
    item: PropTypes.shape({
      id: PropTypes.string,
    }),
    mutator: PropTypes.shape({
      basket: PropTypes.shape({
        replace: PropTypes.func,
      }),
    }),
    removeButtonTooltipText: PropTypes.node,
    resources: PropTypes.shape({
      basket: PropTypes.arrayOf(PropTypes.object),
    }),
  }

  static defaultProps = {
    addButtonTooltipText: '',
    addLabel: 'Add to basket',
    buttonProps: {},
    removeButtonTooltipText: '',
    removeLabel: 'Remove from basket',
  }

  state = {
    itemExistsInBasket: false,
    basketSize: 0, // eslint-disable-line react/no-unused-state
  }

  static getDerivedStateFromProps(props, state) {
    const basket = props.resources.basket;
    if (basket.length !== state.basketSize) {
      const item = basket.find(i => i.id === props.item.id);
      return {
        itemExistsInBasket: item !== undefined,
        basketSize: basket.length,
      };
    }

    return null;
  }

  addToBasket = (e) => {
    e.stopPropagation();
    const { item, mutator, resources } = this.props;

    const basket = [...resources.basket];
    basket.push(item);
    mutator.basket.replace(basket);
  }

  removeFromBasket = (e) => {
    e.stopPropagation();
    const { item, mutator, resources } = this.props;

    const basket = resources.basket;
    const updatedBasket = basket.filter(i => i.id !== item.id);

    mutator.basket.replace(updatedBasket);
  }

  render() {
    const { itemExistsInBasket } = this.state;
    const {
      addButtonTooltipText,
      addLabel,
      buttonProps,
      disabled,
      item,
      removeButtonTooltipText,
      removeLabel,
    } = this.props;

    const coverage = JSON.stringify(get(item, '_object.coverage[0]', {}));

    const baseProps = {
      'buttonStyle': itemExistsInBasket ? 'default' : 'primary',
      'data-test-basket-add-button': itemExistsInBasket ? undefined : true,
      'data-test-basket-remove-button': itemExistsInBasket ? true : undefined,
      'data-test-coverage-details': coverage,
      'data-test-entitlement-option-id': item.id,
      disabled,
      'onClick': itemExistsInBasket ? this.removeFromBasket : this.addToBasket,
      'data-testid': 'addtobasketbutton'
    };

    const button = addButtonTooltipText ?
      (
        <Tooltip
          id={uniqueId('addtobasketbutton')}
          text={itemExistsInBasket ? removeButtonTooltipText : addButtonTooltipText}
        >
          {({ ref, ariaIds }) => (
            <Button
              {...baseProps}
              {...buttonProps}
              ref={ref}
              aria-labelledby={ariaIds.text}
            >
              {itemExistsInBasket ? removeLabel : addLabel}
            </Button>
          )}
        </Tooltip>
      ) : (
        <Button
          {...baseProps}
          {...buttonProps}
        >
          {itemExistsInBasket ? removeLabel : addLabel}
        </Button>
      );

    return (
      <IfPermission perm="ui-agreements.agreements.edit">
        {button}
      </IfPermission>
    );
  }
}

export default stripesConnect(AddToBasketButton);
