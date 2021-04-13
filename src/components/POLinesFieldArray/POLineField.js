import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { FormattedMessage } from 'react-intl';
import {
  Button,
  Card,
  Col,
  KeyValue,
  Layout,
  NoValue,
  Tooltip,
  Row,
} from '@folio/stripes/components';
import { AppIcon, Pluggable } from '@folio/stripes/core';

import POLineCard from '../POLineCard';
import css from '../styles.css';

export default class POLineField extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    input: PropTypes.shape({
      name: PropTypes.string,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    }).isRequired,
    meta: PropTypes.shape({
      error: PropTypes.node,
      touched: PropTypes.bool,
    }).isRequired,
    onPOLineSelected: PropTypes.func.isRequired,
    poLine: PropTypes.shape({
      acquisitionMethod: PropTypes.string,
      poLineNumber: PropTypes.string,
      titleOrPackage: PropTypes.string,
    }),
  }

  static defaultProps = {
    poLine: {},
  }

  componentDidMount() {
    if (!get(this.props, 'input.value') && get(this.triggerButton, 'current')) {
      this.triggerButton.current.focus();
    }
  }

  renderLinkPOLineButton = value => {
    const { id, input: { name }, onPOLineSelected } = this.props;

    return (
      <Pluggable
        addLines={poLines => onPOLineSelected(poLines[0])}
        dataKey={id}
        isSingleSelect
        renderTrigger={(props) => {
          this.triggerButton = props.buttonRef;

          const buttonProps = {
            'aria-haspopup': 'true',
            'buttonRef': this.triggerButton,
            'buttonStyle': value ? 'default' : 'primary',
            'id': `${id}-find-poline-btn`,
            'name': name,
            'onClick': props.onClick,
            'marginBottom0': true
          };

          if (value) {
            return (
              <Tooltip
                id={`${this.props.id}-po-line-button-tooltip`}
                text={<FormattedMessage id="ui-agreements.poLines.replacePOLineSpecific" values={{ POLineTitle: get(this.props.poLine, 'title') }} />}
                triggerRef={this.triggerButton}
              >
                {({ ariaIds }) => (
                  <Button
                    aria-labelledby={ariaIds.text}
                    data-test-po-line-select-po-line
                    {...buttonProps}
                  >
                    <FormattedMessage id="ui-agreements.poLines.replacePOLine" />
                  </Button>
                )}
              </Tooltip>
            );
          }
          return (
            <Button
              data-test-po-line-select-po-line
              {...buttonProps}
            >
              <FormattedMessage id="ui-agreements.poLines.linkPOLine" />
            </Button>
          );
        }}
        type="find-po-line"
      >
        <FormattedMessage id="ui-agreements.poLines.noPOLinePlugin" />
      </Pluggable>
    );
  }

  renderPOLine = () => {
    const { poLine } = this.props;

    return (
      <div>
        <Row>
          <Col xs={12}>
            <KeyValue label={<FormattedMessage id="ui-agreements.poLines.title" />}>
              <div data-test-po-line-title>
                {poLine.titleOrPackage || <NoValue />}
              </div>
            </KeyValue>
          </Col>
        </Row>
        <Row>
          <Col xs={3}>
            <KeyValue label={<FormattedMessage id="ui-agreements.poLines.acqMethod" />}>
              <div data-test-po-line-acq-method>
                {poLine.acquisitionMethod || <NoValue />}
              </div>
            </KeyValue>
          </Col>
        </Row>
      </div>
    );
  }

  renderError = () => (
    <Layout
      className={`textCentered ${css.error}`}
      data-test-error
    >
      <strong>
        {this.props.meta.error}
      </strong>
    </Layout>
  )

  render() {
    const {
      id,
      input: { value },
      meta,
      poLine = {},
    } = this.props;

    const error = meta.touched && meta.error ? this.renderError() : null;

    if (value) {
      return (
        <POLineCard
          headerEnd={this.renderLinkPOLineButton(value)}
          id={id}
          poLine={poLine}
        >
          {error}
        </POLineCard>
      );
    }

    return (
      <Card
        cardStyle="negative"
        headerEnd={this.renderLinkPOLineButton(value)}
        headerStart={(
          <AppIcon app="orders" size="small">
            <strong data-test-po-line-number>
              <FormattedMessage id="ui-agreements.poLines.poLine" />
            </strong>
          </AppIcon>
        )}
        id={id}
        roundedBorder
      >
        <div>
          <Layout className="textCentered">
            <strong>
              <FormattedMessage id="ui-agreements.poLines.noPOLineLinked" />
            </strong>
          </Layout>
          <Layout className="textCentered">
            <FormattedMessage id="ui-agreements.poLines.linkPOLineToStart" />
          </Layout>
        </div>
        {error}
      </Card>
    );
  }
}
