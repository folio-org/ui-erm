import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { get } from 'lodash';
import { Button, Card, KeyValue, Layout, Tooltip } from '@folio/stripes/components';
import { AppIcon, Pluggable } from '@folio/stripes/core';

import css from '../styles.css';

export default class UsageDataProviderField extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    index: PropTypes.number.isRequired,
    input: PropTypes.shape({
      name: PropTypes.string,
      onChange: PropTypes.func.isRequired,
      value: PropTypes.string,
    }).isRequired,
    meta: PropTypes.shape({
      error: PropTypes.node,
      touched: PropTypes.bool,
    }).isRequired,
    onUDPSelected: PropTypes.func.isRequired,
    udp: PropTypes.shape({
      label: PropTypes.string,
    }),
  }

  static defaultProps = {
    udp: {},
  }

  componentDidMount() {
    if (!get(this.props, 'input.value') && get(this.triggerButton, 'current')) {
      this.triggerButton.current.focus();
    }
  }

  renderLinkUDPButton = value => (
    <Pluggable
      dataKey="udp"
      onUDPSelected={this.props.onUDPSelected}
      renderTrigger={(props) => {
        this.triggerButton = props.buttonRef;

        const UDPName = get(this.props.udp, 'label');
        const buttonProps = {
          'aria-haspopup': 'true',
          'buttonRef': this.triggerButton,
          'buttonStyle': value ? 'default' : 'primary',
          'id': `udp-${this.props.index}-search-button`,
          'marginBottom0': true,
          'name': this.props.input.name,
          'onClick': props.onClick
        };
        if (value) {
          return (
            <Tooltip
              id={`${this.props.id}-usageDataProvider-button-tooltip`}
              text={<FormattedMessage id="ui-agreements.usageData.replaceUDPSpecific" values={{ UDPName }} />}
              triggerRef={this.triggerButton}
            >
              {({ ariaIds }) => (
                <Button
                  aria-labelledby={ariaIds.text}
                  {...buttonProps}
                >
                  <FormattedMessage id="ui-agreements.usageData.replaceUDP" />
                </Button>
              )}
            </Tooltip>
          );
        }
        return (
          <Button
            {...buttonProps}
          >
            <FormattedMessage id="ui-agreements.usageData.linkUDP" />
          </Button>
        );
      }}
      type="find-erm-usage-data-provider"
    >
      <FormattedMessage id="ui-agreements.usageData.noUDPPlugin" />
    </Pluggable>
  )

  renderUDP = () => {
    const { udp } = this.props;
    return (
      <KeyValue label={<FormattedMessage id="ui-agreements.viewUDP.name" />}>
        <span data-test-udp-card-name>
          {udp.label}
        </span>
      </KeyValue>
    );
  }

  renderEmpty = () => (
    <div>
      <Layout className="textCentered">
        <strong>
          <FormattedMessage id="ui-agreements.usageData.noUDPLinked" />
        </strong>
      </Layout>
      <Layout className="textCentered">
        <FormattedMessage id="ui-agreements.usageData.linkUDPToStart" />
      </Layout>
    </div>
  )

  renderError = () => (
    <Layout className={`textCentered ${css.error}`}>
      <strong>
        {this.props.meta.error}
      </strong>
    </Layout>
  )

  render() {
    const {
      id,
      input: { value },
      meta: { error, touched }
    } = this.props;

    return (
      <Card
        cardStyle={value ? 'positive' : 'negative'}
        headerEnd={this.renderLinkUDPButton(value)}
        headerStart={(
          <AppIcon app="erm-usage" size="small">
            <strong>
              <FormattedMessage id="ui-agreements.usageData.usageDataProvider" />
            </strong>
          </AppIcon>
        )}
        id={id}
        roundedBorder
      >
        {value ? this.renderUDP() : this.renderEmpty()}
        {touched && error ? this.renderError() : null}
      </Card>
    );
  }
}
