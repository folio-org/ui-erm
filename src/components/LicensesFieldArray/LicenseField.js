import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { FormattedMessage } from 'react-intl';
import {
  Button,
  Card,
  Layout,
  Tooltip,
} from '@folio/stripes/components';
import { AppIcon, Pluggable } from '@folio/stripes/core';

import { LicenseCard } from '@folio/stripes-erm-components';

import css from '../styles.css';

export default class LicenseField extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    input: PropTypes.shape({
      name: PropTypes.string,
      value: PropTypes.string,
    }).isRequired,
    license: PropTypes.object,
    meta: PropTypes.shape({
      error: PropTypes.node,
      touched: PropTypes.bool,
    }).isRequired,
    onLicenseSelected: PropTypes.func.isRequired,
  }

  static defaultProps = {
    license: {},
  }

  componentDidMount() {
    if (!this.props.input.value && get(this.triggerButton, 'current')) {
      this.triggerButton.current.focus();
    }
  }

  renderLinkLicenseButton = (value) => {
    const { id, input: { name }, onLicenseSelected } = this.props;
    return (
      <Pluggable
        dataKey={id}
        onLicenseSelected={onLicenseSelected}
        renderTrigger={(props) => {
          this.triggerButton = props.buttonRef;

          const buttonProps = {
            'buttonStyle': value ? 'default' : 'primary',
            'buttonRef': this.triggerButton,
            'id': `${id}-find-license-btn`,
            'marginBottom0': true,
            'name': name,
            'onClick': props.onClick
          };

          if (value) {
            return (
              <Tooltip
                id={`${this.props.id}-license-button-tooltip`}
                text={<FormattedMessage id="ui-agreements.license.replaceLicenseSpecific" values={{ licenseName: get(this.props.license, 'name') }} />}
                triggerRef={this.triggerButton}
              >
                {({ ariaIds }) => (
                  <Button
                    aria-labelledby={ariaIds.text}
                    {...buttonProps}
                  >
                    <FormattedMessage id="ui-agreements.license.replaceLicense" />
                  </Button>
                )}
              </Tooltip>
            );
          }

          return (
            <Button
              {...buttonProps}
            >
              <FormattedMessage id="ui-agreements.license.linkLicense" />
            </Button>
          );
        }}
        type="find-license"
      >
        <FormattedMessage id="ui-agreements.license.noFindLicensePlugin" />
      </Pluggable>
    );
  }

  renderLicense = () => {
    return (
      <div data-test-license-card-name>
        <LicenseCard license={this.props.license} />
      </div>
    );
  }

  renderEmpty = () => (
    <div>
      <Layout className="textCentered">
        <strong>
          <FormattedMessage id="ui-agreements.license.noLicenseLinked" />
        </strong>
      </Layout>
      <Layout className="textCentered">
        <FormattedMessage id="ui-agreements.license.linkLicenseToStart" />
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
        headerEnd={this.renderLinkLicenseButton(value)}
        headerStart={(
          <AppIcon app="licenses" size="small">
            <strong>
              <FormattedMessage id="ui-agreements.agreements.license" />
            </strong>
          </AppIcon>
        )}
        id={id}
        roundedBorder
      >
        {value ? this.renderLicense() : this.renderEmpty()}
        {touched && error ? this.renderError() : null}
      </Card>
    );
  }
}
