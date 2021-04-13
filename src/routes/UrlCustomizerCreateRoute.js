import React from 'react';
import PropTypes from 'prop-types';
import { CalloutContext, stripesConnect } from '@folio/stripes/core';
import SafeHTMLMessage from '@folio/react-intl-safe-html';
import View from '../components/views/UrlCustomizerForm';
import { urls } from '../components/utilities';

class UrlCustomizerCreateRoute extends React.Component {
  static manifest = Object.freeze({
    stringTemplate: {
      type: 'okapi',
      path: 'erm/sts',
      fetch: false,
    },
  });

  static propTypes = {
    handlers: PropTypes.object,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    location: PropTypes.shape({
      search: PropTypes.string.isRequired,
    }).isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({
        agreementId: PropTypes.string.isRequired,
        platformId: PropTypes.string.isRequired,
      }).isRequired
    }).isRequired,
    mutator: PropTypes.shape({
      stringTemplate: PropTypes.shape({
        POST: PropTypes.func.isRequired,
      }),
    }),
  };

  static contextType = CalloutContext;

  handleClose = () => {
    const {
      history,
      location,
      match: { params: { platformId } },
    } = this.props;
    history.push(`${urls.platformView(platformId)}${location.search}`);
  }

  handleSubmit = (urlCustomization) => {
    const {
      history,
      match: { params: { platformId } },
      mutator,
      location
    } = this.props;

    return mutator.stringTemplate
      .POST({ ...urlCustomization, 'idScopes': [platformId], 'context': 'urlCustomiser' })
      .then(({ id }) => {
        this.context.sendCallout({ message: <SafeHTMLMessage id="ui-agreements.platform.urlCustomization.create.callout" /> });
        history.push(`${urls.urlCustomizerView(platformId, id)}${location.search}`);
      });
  }

  render() {
    return (
      <View
        handlers={{
          ...this.props.handlers,
          onClose: this.handleClose,
        }}
        onSubmit={this.handleSubmit}
      />
    );
  }
}

export default stripesConnect(UrlCustomizerCreateRoute);
