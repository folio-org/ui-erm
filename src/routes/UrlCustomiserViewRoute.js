import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { CalloutContext, stripesConnect } from '@folio/stripes/core';
import { checkScope, collapseAllSections, expandAllSections, preventResourceRefresh } from '@folio/stripes-erm-components';

import View from '../components/views/UrlCustomiser';
import { urls } from '../components/utilities';

class UrlCustomiserViewRoute extends React.Component {
  static manifest = Object.freeze({
    urlCustomisation: {
      type: 'okapi',
      path: 'erm/sts/:{templateId}',
      clientGeneratePk: false,
      throwErrors: false,
      shouldRefresh: preventResourceRefresh({ 'urlCustomisation': ['DELETE'] }),
    },
  });

  static propTypes = {
    handlers: PropTypes.object,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    isSuppressFromDiscoveryEnabled: PropTypes.func.isRequired,
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
      agreement: PropTypes.shape({
        PUT: PropTypes.func.isRequired,
      }).isRequired,
      query: PropTypes.shape({
        update: PropTypes.func.isRequired,
      }).isRequired,
    }).isRequired,
    resources: PropTypes.shape({
      line: PropTypes.object,
      orderLines: PropTypes.object,
      query: PropTypes.object,
    }).isRequired,
    stripes: PropTypes.shape({
      hasInterface: PropTypes.func.isRequired,
      hasPerm: PropTypes.func.isRequired,
    }).isRequired,
    tagsEnabled: PropTypes.bool,
  };

  static contextType = CalloutContext;

  handleClose = () => {
    const { history, location, match } = this.props;
    history.push(`${urls.platformView(match.params.platformId)}${location.search}`);
  }

  handleDelete = (template) => {
    const {
      history,
      location,
      match: { params: { platformId, templateId } },
      mutator,
    } = this.props;
    const { sendCallout } = this.context;

    mutator.urlCustomisation.DELETE(template)
      .then(() => {
        history.push(`${urls.platforms()}${location.search}`);
        sendCallout({ message: <FormattedMessage id="ui-agreements.line.delete.callout" /> });
      })
      .catch(error => {
        sendCallout({ type: 'error', timeout: 0, message: <FormattedMessage id="ui-agreements.line.deleteFailed.callout" values={{ message: error.message }} /> });
      });
  }

  handleEdit = () => {
    const {
      history,
      location,
      match: { params: { agreementId, lineId } },
    } = this.props;

    history.push(`${urls.agreementLineEdit(agreementId, lineId)}${location.search}`);
  }

  isLoading = () => {
    const { match, resources } = this.props;

    return (
      match.params.lineId !== resources.line?.records?.[0]?.id &&
      (resources?.line?.isPending ?? true)
    );
  }

  render() {
    const { resources, tagsEnabled, isSuppressFromDiscoveryEnabled, match } = this.props;
    const urlCustomisationRecord = (resources?.urlCustomisation?.records?.[0] ?? {});

    console.log(urlCustomisationRecord, 'urlCustomisationRecord');
    // return null;
    return (
      <View
        data={{
          urlCustomisation: urlCustomisationRecord,
        }}
        handlers={{
          ...this.props.handlers,
          checkScope,
          collapseAllSections,
          expandAllSections,
          isSuppressFromDiscoveryEnabled,
          onClose: this.handleClose,
          onDelete: this.handleDelete,
          onEdit: this.handleEdit,
          onToggleTags: tagsEnabled ? this.handleToggleTags : undefined,
        }}
        isLoading={this.isLoading()}
      />
    );
  }
}

export default stripesConnect(UrlCustomiserViewRoute);