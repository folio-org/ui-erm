import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';

import { stripesConnect } from '@folio/stripes/core';
import { StripesConnectedSource } from '@folio/stripes/smart-components';
import { generateQueryParams, preventResourceRefresh } from '@folio/stripes-erm-components';

import View from '../../components/views/Agreements';
import NoPermissions from '../../components/NoPermissions';
import { urls } from '../../components/utilities';

const INITIAL_RESULT_COUNT = 100;
const RESULT_COUNT_INCREMENT = 100;
const RECORDS_PER_REQUEST = 100;

class AgreementsRoute extends React.Component {
  static manifest = Object.freeze({
    agreements: {
      type: 'okapi',
      path: 'erm/sas',
      records: 'results',
      recordsRequired: '%{resultCount}',
      perRequest: 100,
      limitParam: 'perPage',
      params: generateQueryParams({
        searchKey: 'name,alternateNames.name,description',
        filterKeys: {
          agreementStatus: 'agreementStatus.value',
          contacts: 'contacts.user',
          contactRole: 'contacts.role',
          isPerpetual: 'isPerpetual.value',
          orgs: 'orgs.org',
          renewalPriority: 'renewalPriority.value',
          role: 'orgs.role',
          tags: 'tags.value',
        },
      }),
    },
    agreementStatusValues: {
      type: 'okapi',
      path: 'erm/refdata/SubscriptionAgreement/agreementStatus',
      shouldRefresh: () => false,
    },
    renewalPriorityValues: {
      limitParam: 'perPage',
      type: 'okapi',
      path: 'erm/refdata/SubscriptionAgreement/renewalPriority',
      perRequest: RECORDS_PER_REQUEST,
      shouldRefresh: () => false,
    },
    isPerpetualValues: {
      type: 'okapi',
      path: 'erm/refdata/SubscriptionAgreement/isPerpetual',
      shouldRefresh: () => false,
    },
    contactRoleValues: {
      type: 'okapi',
      path: 'erm/refdata/InternalContact/role',
      limitParam: 'perPage',
      perRequest: RECORDS_PER_REQUEST,
      shouldRefresh: () => false,
    },
    orgRoleValues: {
      type: 'okapi',
      path: 'erm/refdata/SubscriptionAgreementOrg/role',
      shouldRefresh: () => false,
    },
    supplementaryProperties: {
      type: 'okapi',
      path: 'erm/custprops',
      shouldRefresh: preventResourceRefresh({ 'agreement': ['DELETE'] }),
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
    basket: { initialValue: [] },
    query: { initialValue: {} },
    resultCount: { initialValue: INITIAL_RESULT_COUNT },
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
    this.state = {
      hasPerms: props.stripes.hasPerm('ui-agreements.agreements.view'),
    };
  }

  componentDidMount() {
    this.source = new StripesConnectedSource(this.props, this.logger, 'agreements');
  }

  componentDidUpdate(prevProps) {
    const newCount = this.source.totalCount();
    const newRecords = this.source.records();

    if (newCount === 1) {
      const { history, location } = this.props;

      const prevSource = new StripesConnectedSource(prevProps, this.logger, 'agreements');
      const oldCount = prevSource.totalCount();
      const oldRecords = prevSource.records();

      if (oldCount !== 1 || (oldCount === 1 && oldRecords[0].id !== newRecords[0].id)) {
        const record = newRecords[0];
        history.push(`${urls.agreementView(record.id)}${location.search}`);
      }
    }
  }

  handleNeedMoreData = () => {
    if (this.source) {
      this.source.fetchMore(RESULT_COUNT_INCREMENT);
    }
  }

  querySetter = ({ nsValues }) => {
    this.props.mutator.query.update(nsValues);
  }

  queryGetter = () => {
    return get(this.props.resources, 'query', {});
  }

  render() {
    const { children, location, resources } = this.props;

    if (this.source) {
      this.source.update(this.props, 'agreements');
    }

    if (!this.state.hasPerms) return <NoPermissions />;

    return (
      <View
        data={{
          agreements: get(resources, 'agreements.records', []),
          agreementStatusValues: get(resources, 'agreementStatusValues.records', []),
          renewalPriorityValues: get(resources, 'renewalPriorityValues.records', []),
          isPerpetualValues: get(resources, 'isPerpetualValues.records', []),
          contactRoleValues: get(resources, 'contactRoleValues.records', []),
          orgRoleValues: get(resources, 'orgRoleValues.records', []),
          supplementaryProperties: resources?.supplementaryProperties?.records ?? [],
          tagsValues: get(resources, 'tagsValues.records', []),
        }}
        history={this.props.history}
        onNeedMoreData={this.handleNeedMoreData}
        queryGetter={this.queryGetter}
        querySetter={this.querySetter}
        searchString={location.search}
        source={this.source}
      >
        {children}
      </View>
    );
  }
}

export default stripesConnect(AgreementsRoute);
