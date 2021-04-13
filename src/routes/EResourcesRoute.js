import React from 'react';
import PropTypes from 'prop-types';

import { stripesConnect } from '@folio/stripes/core';
import { StripesConnectedSource } from '@folio/stripes/smart-components';
import { getSASParams } from '@folio/stripes-erm-components';

import View from '../components/views/EResources';
import NoPermissions from '../components/NoPermissions';
import { urls } from '../components/utilities';
import { resultCount } from '../constants';

const RESULT_COUNT_INCREMENT = resultCount.RESULT_COUNT_INCREMENT;

class EResourcesRoute extends React.Component {
  static manifest = Object.freeze({
    eresources: {
      type: 'okapi',
      path: 'erm/resource/electronic',
      records: 'results',
      resultOffset: '%{resultOffset}',
      perRequest: resultCount.RESULT_COUNT_INCREMENT,
      limitParam: 'perPage',
      params: getSASParams({
        searchKey: 'name,identifiers.identifier.value',
        filterConfig: [{
          name: 'class',
          values: [
            { name: 'package', value: 'org.olf.kb.Pkg' },
            { name: 'nopackage', value: 'org.olf.kb.TitleInstance' },
          ]
        }],
        filterKeys: {
          remoteKb: 'remoteKb.id',
          tags: 'tags.value',
          publicationType: 'publicationType.value',
          type: 'type.value'
        }
      }),
    },
    publicationTypeValues: {
      type: 'okapi',
      path: 'erm/refdata/TitleInstance/publicationType',
      perRequest: 100,
      limitParam: 'perPage',
    },
    sourceValues: {
      type: 'okapi',
      path: 'erm/kbs',
      shouldRefresh: () => false,
    },
    typeValues: {
      type: 'okapi',
      path: 'erm/refdata/TitleInstance/type',
      perRequest: 100,
      limitParam: 'perPage',
    },
    tagsValues: {
      type: 'okapi',
      path: 'tags',
      params: {
        limit: '1000',
        query: 'cql.allRecords=1 sortby label',
      },
      records: 'tags',
    },
    query: { initialValue: {} },
    resultOffset: { initialValue: 0 },
  });

  static propTypes = {
    children: PropTypes.node,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string,
      search: PropTypes.string,
    }).isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string,
      }),
    }),
    mutator: PropTypes.object,
    resources: PropTypes.object,
    stripes: PropTypes.shape({
      hasPerm: PropTypes.func.isRequired,
      logger: PropTypes.object,
    }),
  }

  constructor(props) {
    super(props);

    this.logger = props.stripes.logger;
    this.searchField = React.createRef();

    this.state = {
      hasPerms: props.stripes.hasPerm('ui-agreements.agreements.view'),
    };
  }

  componentDidMount() {
    this.source = new StripesConnectedSource(this.props, this.logger, 'eresources');

    if (this.searchField.current) {
      this.searchField.current.focus();
    }
  }

  componentDidUpdate(prevProps) {
    const newCount = this.source.totalCount();
    const newRecords = this.source.records();

    if (newCount === 1) {
      const { history, location } = this.props;

      const prevSource = new StripesConnectedSource(prevProps, this.logger, 'eresources');
      const oldCount = prevSource.totalCount();
      const oldRecords = prevSource.records();

      if (oldCount !== 1 || (oldCount === 1 && oldRecords[0].id !== newRecords[0].id)) {
        const record = newRecords[0];
        history.push(`${urls.eresourceView(record.id)}${location.search}`);
      }
    }
  }

  handleNeedMoreData = (_askAmount, index) => {
    if (this.source && index > 0) {
      this.source.fetchOffset(index);
    } else {
      this.source.fetchMore(RESULT_COUNT_INCREMENT);
    }
  }

  querySetter = ({ nsValues }) => {
    this.props.mutator.query.update(nsValues);
  }

  queryGetter = () => {
    return this.props.resources?.query ?? {};
  }

  render() {
    const { children, location, match, resources } = this.props;

    if (this.source) {
      this.source.update(this.props, 'eresources');
    }

    if (!this.state.hasPerms) return <NoPermissions />;

    return (
      <View
        data={{
          eresources: resources?.eresources?.records ?? [],
          publicationTypeValues: resources?.publicationTypeValues?.records ?? [],
          sourceValues: resources?.sourceValues?.records ?? [],
          typeValues: resources?.typeValues?.records ?? [],
          tagsValues: resources?.tagsValues?.records ?? [],
        }}
        onNeedMoreData={this.handleNeedMoreData}
        queryGetter={this.queryGetter}
        querySetter={this.querySetter}
        searchString={location.search}
        selectedRecordId={match.params.id}
        source={this.source}
      >
        {children}
      </View>
    );
  }
}

export default stripesConnect(EResourcesRoute);
