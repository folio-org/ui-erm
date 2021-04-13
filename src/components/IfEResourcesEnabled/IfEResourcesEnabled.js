import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { stripesConnect } from '@folio/stripes/core';

class IfEResourcesEnabled extends React.Component {
  static manifest = {
    settings: {
      type: 'okapi',
      path: 'configurations/entries?query=(module=AGREEMENTS and configName=general)',
      records: 'configs',
      shouldRefresh: () => false,
    },
  };

  static propTypes = {
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    resources: PropTypes.shape({
      settings: PropTypes.object,
    }),
  };

  isHidden = () => {
    const settings = JSON.parse(get(this.props.resources.settings, 'records[0].value', '{}'));
    return settings.hideEResourcesFunctionality;
  }

  render() {
    const { children } = this.props;
    const isEnabled = !this.isHidden();

    if (typeof children === 'function') {
      return children({ isEnabled });
    }

    return isEnabled ? children : null;
  }
}

export default stripesConnect(IfEResourcesEnabled);
