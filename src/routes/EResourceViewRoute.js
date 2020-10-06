import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import compose from 'compose-function';

import { stripesConnect } from '@folio/stripes/core';
import { withTags } from '@folio/stripes/smart-components';
import { Tags } from '@folio/stripes-erm-components';

import View from '../components/views/EResource';
import { urls, withSuppressFromDiscovery } from '../components/utilities';
import { resultCount, resourceClasses } from '../constants';

const RECORDS_PER_REQUEST = 100;

class EResourceViewRoute extends React.Component {
  static manifest = Object.freeze({
    eresource: {
      type: 'okapi',
      path: 'erm/resource/:{id}',
    },
    entitlementOptions: {
      type: 'okapi',
      path: 'erm/resource/:{id}/entitlementOptions',
      throwErrors: false,
    },
    entitlements: {
      type: 'okapi',
      path: 'erm/resource/:{id}/entitlements',
      records: 'results',
      perRequest: RECORDS_PER_REQUEST,
      recordsRequired: '%{entitlementsCount}',
      limitParam: 'perPage',
      params: {
        stats: 'true',
      },
    },
    relatedEntitlements: {
      type: 'okapi',
      path: 'erm/resource/:{id}/entitlements/related',
      perRequest: RECORDS_PER_REQUEST,
      recordsRequired: '%{entitlementsCount}',
      limitParam: 'perPage',
      throwErrors: false,
    },
    packageContents: {
      type: 'okapi',
      path: 'erm/packages/:{id}/content/%{packageContentsFilter}',
      records: 'results',
      limitParam: 'perPage',
      perRequest: resultCount.RESULT_COUNT_INCREMENT,
      resultOffset: (_q, _p, _r, _l, props) => {
        const { match, resources } = props;
        const resultOffset = get(resources, 'packageContentsOffset');
        const eresourceId = get(resources, 'eresource.records[0].id');
        return eresourceId !== match.params.id ? 0 : resultOffset;
      },
      params: {
        filters: 'pkg.id==:{id}',
        sort: 'pti.titleInstance.name;asc',
        stats: 'true',
      },
    },
    query: {},
    entitlementsCount: { initialValue: resultCount.INITIAL_RESULT_COUNT },
    packageContentsFilter: { initialValue: 'current' },
    packageContentsOffset: { initialValue: 0 },
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
        id: PropTypes.string.isRequired,
      }).isRequired
    }).isRequired,
    mutator: PropTypes.shape({
      entitlementsCount: PropTypes.shape({
        replace: PropTypes.func.isRequired,
      }),
      packageContentsCount: PropTypes.shape({
        replace: PropTypes.func.isRequired,
      }),
      packageContentsFilter: PropTypes.shape({
        replace: PropTypes.func.isRequired,
      }),
      packageContentsOffset: PropTypes.shape({
        replace: PropTypes.func.isRequired,
      }),
      query: PropTypes.shape({
        update: PropTypes.func.isRequired,
      }).isRequired,
    }).isRequired,
    resources: PropTypes.shape({
      entitlementsCount: PropTypes.number,
      eresource: PropTypes.object,
      packageContentsFilter: PropTypes.string,
      packageContentsCount: PropTypes.number,
      query: PropTypes.object,
    }).isRequired,
    stripes: PropTypes.shape({
      hasPerm: PropTypes.func.isRequired,
    }).isRequired,
    tagsEnabled: PropTypes.bool,
  };

  static defaultProps = {
    handlers: {},
  }

  componentDidUpdate() {
    const { mutator, resources } = this.props;
    const totalEntitlements = get(resources, 'entitlements.other.totalRecords', RECORDS_PER_REQUEST);
    const { entitlementsCount } = resources;

    if (totalEntitlements > entitlementsCount) {
      mutator.entitlementsCount.replace(totalEntitlements);
    }
  }

  getHelperApp = (eresource = {}) => {
    const { match, resources } = this.props;
    const helper = resources.query.helper;
    if (!helper) return null;

    let HelperComponent = null;

    if (helper === 'tags') HelperComponent = Tags;

    if (!HelperComponent) return null;

    let resource;
    if (eresource.class === resourceClasses.TITLEINSTANCE) {
      resource = 'titles';
    } else if (eresource.class === resourceClasses.PCI) {
      resource = 'pci';
    }

    return (
      <HelperComponent
        link={`erm/${resource}/${match.params.id}`}
        onToggle={() => this.handleToggleHelper(helper)}
      />
    );
  }

  handleClose = () => {
    this.props.history.push(`${urls.eresources()}${this.props.location.search}`);
  }

  handleEdit = () => {
    const { history, location, match } = this.props;
    history.push(`${urls.eresourceEdit(match.params.id)}${location.search}`);
  }

  handleEResourceClick = (id) => {
    this.props.history.push(`${urls.eresourceView(id)}${this.props.location.search}`);
  }

  handleFilterPackageContents = (path) => {
    const { mutator } = this.props;
    mutator.packageContentsFilter.replace(path);
    mutator.packageContentsOffset.replace(0);
  }

  handleNeedMorePackageContents = (_askAmount, index) => {
    const { mutator } = this.props;
    mutator.packageContentsOffset.replace(index);
  }

  handleToggleHelper = (helper) => {
    const { mutator, resources } = this.props;
    const currentHelper = resources.query.helper;
    const nextHelper = currentHelper !== helper ? helper : null;

    mutator.query.update({ helper: nextHelper });
  }

  handleToggleTags = () => {
    this.handleToggleHelper('tags');
  }

  isLoading = () => {
    const { match, resources } = this.props;
    const { manifest } = EResourceViewRoute;
    return (
      match.params.id !== resources?.eresource?.records?.[0]?.id &&
      Object.keys(manifest).some(
        key => manifest[key].type === 'okapi' && (resources?.[key]?.isPending ?? true) // check if any of the okapi resource is in pending
      )
    );
  }

  getPackageContentsRecordsCount() {
    return this.getPackageContentsRecords()
      ?
      get(this.props.resources, 'packageContents.other.totalRecords', 0)
      :
      0;
  }

  getPackageContentsRecords = () => {
    const { resources, match } = this.props;
    const packageContentsUrl = get(resources, 'packageContents.url', '');

    // If a new eresource is selected or if the filter has changed return undefined
    return (packageContentsUrl.indexOf(`${match.params.id}`) === -1 ||
      packageContentsUrl.indexOf(`content/${resources.packageContentsFilter}`) === -1)
      ?
      undefined
      :
      get(resources, 'packageContents.records');
  }

  getRecords = (resource) => {
    return get(this.props.resources, `${resource}.isPending`, true)
      ?
      undefined
      :
      get(this.props.resources, `${resource}.records`);
  }

  render() {
    const {
      handlers,
      isSuppressFromDiscoveryEnabled,
      resources,
      tagsEnabled,
    } = this.props;

    return (
      <View
        key={get(resources, 'eresource.loadedAt', 'loading')}
        data={{
          eresource: resources?.eresource?.records?.[0] ?? {},
          entitlementOptions: this.getRecords('entitlementOptions'),
          entitlements: this.getRecords('entitlements'),
          packageContentsFilter: this.props.resources.packageContentsFilter,
          packageContents: this.getPackageContentsRecords(),
          packageContentsCount: this.getPackageContentsRecordsCount(),
          relatedEntitlements: this.getRecords('relatedEntitlements'),
          searchString: this.props.location.search,
        }}
        handlers={{
          ...handlers,
          isSuppressFromDiscoveryEnabled,
          onFilterPackageContents: this.handleFilterPackageContents,
          onNeedMorePackageContents: this.handleNeedMorePackageContents,
          onClose: this.handleClose,
          onEdit: this.handleEdit,
          onEResourceClick: this.handleEResourceClick,
          onToggleTags: tagsEnabled ? this.handleToggleTags : undefined,
        }}
        helperApp={(eresource) => this.getHelperApp(eresource)}
        isLoading={this.isLoading()}
      />
    );
  }
}

export default compose(
  stripesConnect,
  withSuppressFromDiscovery,
  withTags,
)(EResourceViewRoute);
