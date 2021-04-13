import React from 'react';
import PropTypes from 'prop-types';
import compose from 'compose-function';
import { isEmpty } from 'lodash';
import { LoadingView } from '@folio/stripes/components';
import { CalloutContext, stripesConnect } from '@folio/stripes/core';
import SafeHTMLMessage from '@folio/react-intl-safe-html';
import View from '../components/views/AgreementLineForm';
import { urls, withSuppressFromDiscovery } from '../components/utilities';

class AgreementLineEditRoute extends React.Component {
  static manifest = Object.freeze({
    entitlements: {
      type: 'okapi',
      path: 'erm/entitlements',
      fetch: false,
    },
    line: {
      type: 'okapi',
      path: 'erm/entitlements/:{lineId}',
    },
    orderLines: {
      type: 'okapi',
      path: 'orders/order-lines',
      params: (_q, _p, _r, _l, props) => {
        const query = (props.resources.line?.records?.[0]?.poLines ?? [])
          .map(poLine => `id==${poLine.poLineId}`)
          .join(' or ');

        return query ? { query } : null;
      },

      fetch: props => (!!props.stripes.hasInterface('order-lines', '1.0 2.0')),
      records: 'poLines',
      throwErrors: false,
    },
    basket: { initialValue: [] },
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
        agreementId: PropTypes.string.isRequired,
        lineId: PropTypes.string.isRequired,
      }).isRequired
    }).isRequired,
    mutator: PropTypes.shape({
      entitlements: PropTypes.shape({
        PUT: PropTypes.func.isRequired,
      }),
    }),
    resources: PropTypes.shape({
      basket: PropTypes.arrayOf(PropTypes.object),
      line: PropTypes.object,
      orderLines: PropTypes.object,
      settings: PropTypes.object,
    }).isRequired,
    stripes: PropTypes.shape({
      hasInterface: PropTypes.func.isRequired,
      hasPerm: PropTypes.func.isRequired,
    }).isRequired,
  };

  static contextType = CalloutContext;

  constructor(props) {
    super(props);

    this.state = {
      isEholdingsEnabled: props.stripes.hasPerm('module.eholdings.enabled'),
    };
  }

  getCompositeLine = () => {
    const { resources } = this.props;
    const line = resources.line?.records?.[0] ?? {};
    const orderLines = resources.orderLines?.records || [];

    const poLines = (line.poLines || [])
      .map(linePOL => orderLines.find(orderLine => orderLine.id === linePOL.poLineId))
      .filter(poLine => poLine);

    return {
      ...line,
      poLines,
    };
  }

  getInitialValues = () => {
    const line = this.props.resources.line?.records?.[0] ?? {};

    return {
      ...line,
      linkedResource: line.type !== 'detached' ? line : undefined,
      coverage: line.customCoverage ? line.coverage : undefined,
    };
  }

  handleClose = () => {
    const {
      history,
      location,
      match: { params: { agreementId, lineId } },
    } = this.props;
    history.push(`${urls.agreementLineView(agreementId, lineId)}${location.search}`);
  }

  handleSubmit = (line) => {
    const {
      history,
      location,
      match: { params: { agreementId, lineId } },
      mutator,
    } = this.props;

    let payload; // payload to be PUT to the endpoint
    const { linkedResource, type, ...rest } = line;
    if (linkedResource?.type === 'packages') { // On submitting a package selected from eholdings plugin
      payload = {
        'type': 'external',
        'authority': 'ekb-package',
        'reference': linkedResource.id,
        ...rest,
        resource: null
      };
    } else if (linkedResource?.type === 'resources') { // On submitting a title selected from eholdings plugin
      payload = {
        'type': 'external',
        'authority': 'ekb-title',
        'reference': linkedResource.id,
        ...rest,
        resource: null
      };
    } else if (isEmpty(linkedResource)) { // On editing a detached line but not adding a resource
      payload = { 'type': 'detached', ...rest, resource: null };
    } else if (type === 'detached') { // on editing a detached line and adding a resource
      payload = { resource: linkedResource, ...rest, type: null };
    } else if (type === 'external') { // on editing an external line
      payload = { resource: null, ...rest, type: 'external' };
    } else { // on editing an internal line
      payload = { resource: linkedResource, ...rest, type };
    }

    return mutator.entitlements
      .PUT({
        id: lineId,
        ...payload
      })
      .then(({ id }) => {
        this.context.sendCallout({ message: <SafeHTMLMessage id="ui-agreements.line.update.callout" /> });
        history.push(`${urls.agreementLineView(agreementId, id)}${location.search}`);
      });
  }

  isLoading = () => {
    return Object.values(this.props.resources).some(r => r.resource !== 'settings' && r.isPending);
  }

  render() {
    const { match, resources, isSuppressFromDiscoveryEnabled } = this.props;

    if (this.isLoading()) return <LoadingView dismissible onClose={this.handleClose} />;

    return (
      <View
        key={resources.line?.loadedAt ?? 'loading'}
        data={{
          basket: (resources?.basket ?? []),
          line: this.getCompositeLine(),
        }}
        handlers={{
          ...this.props.handlers,
          isSuppressFromDiscoveryEnabled,
          onClose: this.handleClose,
        }}
        initialValues={this.getInitialValues()}
        isEholdingsEnabled={this.state.isEholdingsEnabled}
        isLoading={this.isLoading()}
        lineId={match.params.lineId}
        onSubmit={this.handleSubmit}
      />
    );
  }
}

export default compose(
  stripesConnect,
  withSuppressFromDiscovery,
)(AgreementLineEditRoute);
