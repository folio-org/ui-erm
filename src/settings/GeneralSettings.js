import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { stripesConnect, withStripes } from '@folio/stripes/core';
import { ConfigManager } from '@folio/stripes/smart-components';

import { defaultMclPageSize } from '../constants';
import GeneralSettingsForm from './GeneralSettingsForm';

class GeneralSettings extends React.Component {
  static propTypes = {
    stripes: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.connectedConfigManager = stripesConnect(ConfigManager);
  }

  defaultValues = {
    displaySuppressFromDiscovery: { pci: true, agreementLine: true, title: true },
    hideEResourcesFunctionality: false,
    pageSize: defaultMclPageSize.pageSize,
  }

  beforeSave(data) {
    return JSON.stringify(data);
  }

  getInitialValues = (settings) => {
    let loadedValues = {};
    try {
      const value = settings.length === 0 ? '' : settings[0].value;
      loadedValues = JSON.parse(value);
    } catch (e) {} // eslint-disable-line no-empty
    return {
      ...this.defaultValues,
      ...loadedValues,
    };
  }

  render() {
    return (
      <this.connectedConfigManager
        configFormComponent={GeneralSettingsForm}
        configName="general"
        getInitialValues={this.getInitialValues}
        label={<FormattedMessage id="ui-agreements.settings.displaySettings" />}
        moduleName="AGREEMENTS"
        onBeforeSave={this.beforeSave}
        stripes={this.props.stripes}
      />
    );
  }
}

export default withStripes(GeneralSettings);
