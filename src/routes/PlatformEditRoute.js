import React from 'react';
import PropTypes from 'prop-types';
import { cloneDeep } from 'lodash';
import compose from 'compose-function';

import { stripesConnect } from '@folio/stripes/core';
import { LoadingView } from '@folio/stripes/components';

import View from '../components/views/PlatformForm';
import NoPermissions from '../components/NoPermissions';
import { urls } from '../components/utilities';

class PlatformEditRoute extends React.Component {
  static manifest = Object.freeze({
    platform: {
      type: 'okapi',
      path: 'erm/platforms/:{id}',
      shouldRefresh: () => false,
    },
  });

  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    location: PropTypes.shape({
      search: PropTypes.string.isRequired,
    }).isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
    mutator: PropTypes.shape({
      platform: PropTypes.shape({
        PUT: PropTypes.func.isRequired,
      }),
    }).isRequired,
    resources: PropTypes.shape({
      platform: PropTypes.object,
    }).isRequired,
    stripes: PropTypes.shape({
      hasPerm: PropTypes.func.isRequired,
    }).isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      hasPerms: props.stripes.hasPerm('ui-agreements.platforms.edit'),
    };
  }

  getInitialValues = () => {
    const { resources } = this.props;
    const platform = resources?.platform?.records?.[0] ?? {};
    const initialValues = cloneDeep(platform);
    return initialValues;
  }

  handleClose = () => {
    const { location, match } = this.props;
    this.props.history.push(`${urls.platformView(match.params.id)}${location.search}`);
  }

  handleSubmit = (platform) => {
    const { history, location, mutator } = this.props;

    return mutator.platform
      .PUT(platform)
      .then(({ id }) => {
        history.push(`${urls.platformView(id)}${location.search}`);
      });
  }

  fetchIsPending = () => {
    return Object.values(this.props.resources)
      .filter(r => r && r.resource !== 'platform')
      .some(r => r.isPending);
  }

  render() {
    if (!this.state.hasPerms) return <NoPermissions />;
    if (this.fetchIsPending()) return <LoadingView dismissible onClose={this.handleClose} />;

    return (
      <View
        handlers={{
          onClose: this.handleClose,
        }}
        initialValues={this.getInitialValues()}
        onSubmit={this.handleSubmit}
      />
    );
  }
}

export default compose(
  stripesConnect,
)(PlatformEditRoute);
