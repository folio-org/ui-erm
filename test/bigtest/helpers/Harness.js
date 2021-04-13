import React from 'react';
import PropTypes from 'prop-types';
import { IntlProvider } from 'react-intl';

import translations from '../../../translations/ui-agreements/en';

// mimics the StripesTranslationPlugin in @folio/stripes-core
function prefixKeys(obj) {
  const res = {};
  for (const key of Object.keys(obj)) { // eslint-disable-line no-unused-vars
    res[`ui-agreements.${key}`] = obj[key];
  }
  return res;
}

class Harness extends React.Component {
  render() {
    return (
      <IntlProvider key="en" locale="en" messages={prefixKeys(translations)} timeZone="UTC">
        {this.props.children}
      </IntlProvider>
    );
  }
}

Harness.propTypes = {
  children: PropTypes.node,
};

export default Harness;
