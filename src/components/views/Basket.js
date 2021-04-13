import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import {
  Button,
  Col,
  FormattedUTCDate,
  Headline,
  IconButton,
  Layout,
  MessageBanner,
  Pane,
  PaneMenu,
  Paneset,
  Selection,
} from '@folio/stripes/components';

import BasketList from '../BasketList';

export default class Basket extends React.Component {
  static propTypes = {
    data: PropTypes.shape({
      basket: PropTypes.arrayOf(PropTypes.object).isRequired,
      openAgreements: PropTypes.arrayOf(PropTypes.object).isRequired,
    }).isRequired,
    handlers: PropTypes.shape({
      onAddToNewAgreement: PropTypes.func.isRequired,
      onAddToExistingAgreement: PropTypes.func.isRequired,
      onClose: PropTypes.func.isRequired,
      onRemoveBasketItem: PropTypes.func.isRequired,
    }),
  }

  state = {
    openAgreements: [],
    selectedAgreementId: undefined,
    selectedItems: {},
  }

  static getDerivedStateFromProps(props, state) {
    const newState = {};

    const { data: { basket, openAgreements } } = props;

    // Add all the items in the basket as selected items.
    if (basket.length > Object.keys(state.selectedItems).length) {
      newState.selectedItems = {};
      basket.forEach(item => { newState.selectedItems[item.id] = true; });
    }

    // Make a `dataOptions`-able array of agreements with a `value` key.
    if (openAgreements.length !== state.openAgreements.length) {
      newState.openAgreements = openAgreements.map(a => ({ ...a, value: a.id }));
    }

    return Object.keys(newState).length ? newState : null;
  }

  handleToggleAll = () => {
    const selectedItems = {};

    const someItemsUnselected = Object.values(this.state.selectedItems).includes(false);
    Object.keys(this.state.selectedItems).forEach(key => { selectedItems[key] = someItemsUnselected; });

    this.setState({ selectedItems });
  }

  handleToggleItem = (item) => {
    this.setState(prevState => ({
      selectedItems: {
        ...prevState.selectedItems,
        [item.id]: !(prevState.selectedItems[item.id])
      },
    }));
  }

  getSelectedItems = () => {
    return Object.entries(this.state.selectedItems)
      .filter(([_, selected]) => selected)
      .map(([itemId]) => this.props.data.basket.findIndex(i => i.id === itemId))
      .join(',');
  }

  renderPaneFirstMenu = () => {
    return (
      <PaneMenu>
        <FormattedMessage id="ui-agreements.basket.close">
          {ariaLabel => (
            <IconButton
              aria-label={ariaLabel}
              icon="times"
              id="clickable-close-basket"
              onClick={this.props.handlers.onClose}
            />
          )}
        </FormattedMessage>
      </PaneMenu>
    );
  }

  renderCreateAgreementButton = () => {
    const disabled = Object.values(this.state.selectedItems).find(v => v) === undefined; // None of the `selectedItems` value's are `true`

    return (
      <Layout className="marginTop1">
        <Button
          buttonStyle="primary"
          data-test-basket-create-agreement
          disabled={disabled}
          onClick={() => {
            this.props.handlers.onAddToNewAgreement(this.getSelectedItems());
          }}
        >
          <FormattedMessage id="ui-agreements.basket.createAgreement" />
        </Button>
      </Layout>
    );
  }

  renderAddToAgreementButton = () => {
    const disabled = (
      this.state.selectedAgreementId === undefined ||
      Object.values(this.state.selectedItems).find(v => v) === undefined // None of the `selectedItems` value's are `true`;
    );

    return (
      <div>
        <Layout className="marginTop1">
          <Button
            buttonStyle="primary"
            data-test-basket-add-to-agreement
            disabled={disabled}
            onClick={() => {
              this.props.handlers.onAddToExistingAgreement(
                this.getSelectedItems(),
                this.state.selectedAgreementId
              );
            }}
          >
            <FormattedMessage id="ui-agreements.basket.addToSelectedAgreement" />
          </Button>
        </Layout>
      </div>
    );
  }

  renderAddToAgreementSection = () => {
    if (!this.state.openAgreements.length) return null;

    return (
      <div>
        <Layout className="marginTop1">
          <Headline margin="small" tag="h4">
            <FormattedMessage id="ui-agreements.basket.existingAgreements" tagName="div" />
          </Headline>
        </Layout>
        <Col md={8} xs={12}>
          <Selection
            dataOptions={this.state.openAgreements}
            formatter={({ option }) => (
              <div
                data-test-agreement-id={option.id}
                style={{ textAlign: 'left' }}
              >
                      <Headline>{option.name}&nbsp;&#40;{option.agreementStatus.label}&#41;</Headline>{/* eslint-disable-line */}
                <div>
                        <strong><FormattedMessage id="ui-agreements.agreements.startDate" />: </strong><FormattedUTCDate value={option.startDate} /> {/* eslint-disable-line */}
                </div>
              </div>
            )}
            id="select-agreement-for-basket"
            onChange={(selectedAgreementId) => { this.setState({ selectedAgreementId }); }}
            onFilter={(searchString, agreements) => {
              return agreements.filter(agreement => {
                const lowerCasedSearchString = searchString.toLowerCase();

                return (
                  agreement.name.toLowerCase().includes(lowerCasedSearchString) ||
                        agreement.agreementStatus.label.toLowerCase().includes(lowerCasedSearchString) ||
                        (agreement.startDate && agreement.startDate.toLowerCase().includes(lowerCasedSearchString))
                );
              });
            }}
            optionAlignment="start"
            placeholder=" "
          />
        </Col>
        { this.renderAddToAgreementButton() }
      </div>
    );
  }

  render() {
    const { data, handlers } = this.props;

    return (
      <Paneset id="basket-paneset">
        <Pane
          defaultWidth="100%"
          firstMenu={this.renderPaneFirstMenu()}
          id="basket-pane"
          paneSub={<FormattedMessage id="ui-agreements.basket.recordCount" values={{ count: data.basket.length }} />}
          paneTitle={<FormattedMessage id="ui-agreements.basket.name" />}
        >
          <MessageBanner>
            <FormattedMessage id="ui-agreements.basket.messageBanner" />
          </MessageBanner>
          <div id="basket-contents">
            <BasketList
              basket={data.basket}
              onRemoveItem={handlers.onRemoveBasketItem}
              onToggleAll={this.handleToggleAll}
              onToggleItem={this.handleToggleItem}
              selectedItems={this.state.selectedItems}
            />
            { this.renderCreateAgreementButton() }
            { this.renderAddToAgreementSection() }
          </div>
        </Pane>
      </Paneset>
    );
  }
}
