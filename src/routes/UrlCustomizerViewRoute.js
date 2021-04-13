import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { CalloutContext, stripesConnect } from '@folio/stripes/core';
import { preventResourceRefresh } from '@folio/stripes-erm-components';

import View from '../components/views/UrlCustomizer';
import { urls } from '../components/utilities';

class UrlCustomizerViewRoute extends React.Component {
  static manifest = Object.freeze({
    urlCustomization: {
      type: 'okapi',
      path: 'erm/sts/:{templateId}',
      clientGeneratePk: false,
      throwErrors: false,
      shouldRefresh: preventResourceRefresh({ 'urlCustomization': ['DELETE'] }),
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
        templateId: PropTypes.string.isRequired,
        platformId: PropTypes.string.isRequired,
      }).isRequired
    }).isRequired,
    mutator: PropTypes.shape({
      urlCustomization: PropTypes.shape({
        DELETE: PropTypes.func.isRequired,
      }).isRequired,
    }).isRequired,
    resources: PropTypes.shape({
      urlCustomization: PropTypes.object,
    }).isRequired,
    stripes: PropTypes.shape({
      hasInterface: PropTypes.func.isRequired,
      hasPerm: PropTypes.func.isRequired,
    }).isRequired,
  };

  static contextType = CalloutContext;

  handleClose = () => {
    const { history, location, match } = this.props;
    history.push(`${urls.platformView(match.params.platformId)}${location.search}`);
  }

  handleDelete = () => {
    const {
      history,
      location,
      match: { params: { templateId } },
      mutator,
    } = this.props;
    const { sendCallout } = this.context;

    mutator.urlCustomization.DELETE(templateId)
      .then(() => {
        history.push(`${urls.platforms()}${location.search}`);
        sendCallout({ message: <FormattedMessage id="ui-agreements.platform.urlCustomization.delete.callout" /> });
      })
      .catch(error => {
        sendCallout({ type: 'error', timeout: 0, message: <FormattedMessage id="ui-agreements.platform.urlCustomization..deleteFailed.callout" values={{ message: error.message }} /> });
      });
  }

  handleEdit = () => {
    const {
      history,
      location,
      match: { params: { platformId, templateId } },
    } = this.props;

    history.push(`${urls.urlCustomizerEdit(platformId, templateId)}${location.search}`);
  }

  isLoading = () => {
    const { match, resources: { urlCustomization = {} } } = this.props;

    return (
      match.params.templateId !== urlCustomization?.records?.[0]?.id &&
      (urlCustomization?.isPending ?? true)
    );
  }

  render() {
    const { resources } = this.props;
    const urlCustomizationRecord = (resources?.urlCustomization?.records?.[0] ?? {});

    return (
      <View
        data={{
          urlCustomization: urlCustomizationRecord,
        }}
        handlers={{
          ...this.props.handlers,
          onClose: this.handleClose,
          onDelete: this.handleDelete,
          onEdit: this.handleEdit,
        }}
        isLoading={this.isLoading()}
      />
    );
  }
}

export default stripesConnect(UrlCustomizerViewRoute);
