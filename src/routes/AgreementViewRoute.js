import React from 'react';
import PropTypes from 'prop-types';
import { get, flatten, uniqBy } from 'lodash';
import compose from 'compose-function';
import { injectIntl } from 'react-intl';

import { CalloutContext, stripesConnect } from '@folio/stripes/core';
import { withTags } from '@folio/stripes/smart-components';
import { preventResourceRefresh, Tags } from '@folio/stripes-erm-components';
import SafeHTMLMessage from '@folio/react-intl-safe-html';

import withFileHandlers from './components/withFileHandlers';
import View from '../components/views/Agreement';
import { parseMclPageSize, urls } from '../components/utilities';
import { errorTypes } from '../constants';

import { joinRelatedAgreements } from './utilities/processRelatedAgreements';

const RECORDS_PER_REQUEST = 100;

class AgreementViewRoute extends React.Component {
  static manifest = Object.freeze({
    agreement: {
      type: 'okapi',
      path: 'erm/sas/:{id}',
      shouldRefresh: preventResourceRefresh({ 'agreement': ['DELETE'] }),
    },
    agreementLines: {
      type: 'okapi',
      path: 'erm/entitlements',
      limitParam: 'perPage',
      perRequest: (_q, _p, _r, _l, props) => parseMclPageSize(props.resources?.settings, 'agreementLines'),
      params: {
        filters: 'owner=:{id}',
        sort: 'resource.name',
        stats: 'true',
      },
      records: 'results',
      resultOffset: (_q, _p, _r, _l, props) => {
        const { match, resources } = props;
        const resultOffset = resources?.agreementLinesOffset;
        const agreementId = resources?.agreement?.records?.[0]?.id;
        return agreementId !== match.params.id ? 0 : resultOffset;
      },
      shouldRefresh: preventResourceRefresh({ 'agreement': ['DELETE'] }),
    },
    agreementEresources: {
      type: 'okapi',
      path: 'erm/sas/:{id}/resources/%{eresourcesFilterPath}',
      limitParam: 'perPage',
      perRequest: (_q, _p, _r, _l, props) => parseMclPageSize(props.resources?.settings, 'agreementEresources'),
      records: 'results',
      resultOffset: (_q, _p, _r, _l, props) => {
        const { match, resources } = props;
        const resultOffset = resources?.agreementEresourcesOffset;
        const agreementId = resources?.agreement?.records?.[0]?.id;
        return agreementId !== match.params.id ? 0 : resultOffset;
      },
      params: {
        sort: 'pti.titleInstance.name;asc',
        stats: 'true',
      },
      shouldRefresh: preventResourceRefresh({ 'agreement': ['DELETE'] }),
    },
    eresourcesFilterPath: { initialValue: 'current' },
    interfaces: {
      type: 'okapi',
      path: 'organizations-storage/interfaces',
      perRequest: RECORDS_PER_REQUEST,
      params: (_q, _p, _r, _l, props) => {
        const orgs = get(props.resources, 'agreement.records[0].orgs', []);
        const interfaces = flatten(orgs.map(o => get(o, 'org.orgsUuid_object.interfaces', [])));
        const query = [
          ...new Set(interfaces.map(i => `id==${i}`))
        ].join(' or ');

        return query ? { query } : null;
      },
      fetch: props => !!props.stripes.hasInterface('organizations-storage.interfaces', '2.0'),
      permissionsRequired: 'organizations-storage.interfaces.collection.get',
      records: 'interfaces',
    },
    orderLines: {
      type: 'okapi',
      path: 'orders/order-lines',
      params: (_q, _p, _r, _l, props) => {
        const query = get(props.resources, 'agreementLines.records', [])
          .filter(line => line.poLines && line.poLines.length)
          .map(line => (line.poLines
            .map(poLine => `id==${poLine.poLineId}`)
            .join(' or ')
          ))
          .join(' or ');
        return query ? { query } : null;
      },
      fetch: props => (!!props.stripes.hasInterface('order-lines', '1.0 2.0')),
      records: 'poLines',
      throwErrors: false,
    },
    settings: {
      type: 'okapi',
      path: 'configurations/entries?query=(module=AGREEMENTS and configName=general)',
      records: 'configs',
    },
    supplementaryProperties: {
      type: 'okapi',
      path: 'erm/custprops',
      shouldRefresh: preventResourceRefresh({ 'agreement': ['DELETE'] }),
    },
    terms: {
      type: 'okapi',
      path: 'licenses/custprops',
    },
    users: {
      type: 'okapi',
      path: 'users',
      perRequest: RECORDS_PER_REQUEST,
      params: (_q, _p, _r, _l, props) => {
        const query = get(props.resources, 'agreement.records[0].contacts', [])
          .filter(contact => contact.user)
          .map(contact => `id==${contact.user}`)
          .join(' or ');

        return query ? { query } : null;
      },
      fetch: props => !!props.stripes.hasInterface('users', '15.0'),
      permissionsRequired: 'users.collection.get',
      records: 'users',
    },
    interfacesCredentials: {
      clientGeneratePk: false,
      throwErrors: false,
      path: 'organizations-storage/interfaces/%{interfaceRecord.id}/credentials',
      type: 'okapi',
      pk: 'FAKE_PK',  // it's done to fool stripes-connect not to add cred id to the path's end.
      permissionsRequired: 'organizations-storage.interfaces.credentials.item.get',
      fetch: props => !!props.stripes.hasInterface('organizations-storage.interfaces', '1.0 2.0'),
    },
    interfaceRecord: {},
    agreementEresourcesOffset: { initialValue: 0 },
    agreementLinesOffset: { initialValue: 0 },
    query: {},
  });

  static propTypes = {
    handlers: PropTypes.object,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    intl: PropTypes.object,
    location: PropTypes.shape({
      search: PropTypes.string.isRequired,
    }).isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string.isRequired,
      }).isRequired
    }).isRequired,
    mutator: PropTypes.shape({
      agreement: PropTypes.shape({
        DELETE: PropTypes.func.isRequired,
      }),
      eresourcesFilterPath: PropTypes.shape({
        replace: PropTypes.func,
      }),
      interfaceRecord: PropTypes.shape({
        replace: PropTypes.func,
      }),
      agreementEresourcesOffset: PropTypes.shape({
        replace: PropTypes.func,
      }).isRequired,
      agreementLinesOffset: PropTypes.shape({
        replace: PropTypes.func,
      }).isRequired,
      query: PropTypes.shape({
        update: PropTypes.func.isRequired,
      }).isRequired,
    }).isRequired,
    resources: PropTypes.shape({
      agreement: PropTypes.object,
      agreementLines: PropTypes.object,
      agreementEresources: PropTypes.object,
      eresourcesFilterPath: PropTypes.string,
      interfaces: PropTypes.object,
      orderLines: PropTypes.object,
      query: PropTypes.object,
      settings: PropTypes.object,
      users: PropTypes.object,
    }).isRequired,
    stripes: PropTypes.shape({
      hasInterface: PropTypes.func.isRequired,
      hasPerm: PropTypes.func.isRequired,
      okapi: PropTypes.shape({
        tenant: PropTypes.string.isRequired,
        token: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
    tagsEnabled: PropTypes.bool,
  };

  static defaultProps = {
    handlers: { },
  }

  static contextType = CalloutContext;

  componentDidUpdate(prevProps) {
    const { mutator } = this.props;
    if (prevProps?.resources?.agreement?.records?.[0]?.id !== this.props?.resources?.agreement?.records?.[0]?.id) {
      mutator.agreementEresourcesOffset.replace(0);
      mutator.agreementLinesOffset.replace(0);
    }
  }

  downloadBlob = (name) => (
    blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = name;
      document.body.appendChild(a);
      a.click();
      a.remove();
    }
  )

  getCompositeAgreement = () => {
    const { resources } = this.props;
    const agreement = get(resources, 'agreement.records[0]', {
      contacts: [],
      orgs: [],
    });

    const contacts = agreement.contacts.map(c => ({
      ...c,
      user: this.getRecord(c.user, 'users') || c.user,
    }));

    const interfacesCredentials = uniqBy(get(resources, 'interfacesCredentials.records', []), 'id');

    const orgs = agreement.orgs.map(o => ({
      ...o,
      interfaces: get(o, 'org.orgsUuid_object.interfaces', [])
        .map(id => ({
          ...this.getRecord(id, 'interfaces') || {},
          credentials: interfacesCredentials.find(cred => cred.interfaceId === id)
        })),
    }));

    joinRelatedAgreements(agreement);

    return {
      ...agreement,
      contacts,
      lines: this.getLinesRecords(),
      agreementLinesCount: get(resources, 'agreementLines.other.totalRecords') ?? 0,
      eresources: this.getAgreementEresourcesRecords(),
      eresourcesCount: get(resources, 'agreementEresources.other.totalRecords'),
      orderLines: get(resources, 'orderLines.records'),
      orgs,
    };
  }

  getHelperApp = () => {
    const { match, resources } = this.props;
    const helper = resources.query.helper;
    if (!helper) return null;

    let HelperComponent = null;

    if (helper === 'tags') HelperComponent = Tags;

    if (!HelperComponent) return null;

    return (
      <HelperComponent
        link={`erm/sas/${match.params.id}`}
        onToggle={() => this.handleToggleHelper(helper)}
      />
    );
  }

  getAgreementEresourcesRecords = () => {
    const { resources, match } = this.props;
    const agreementEresourcesUrl = resources?.agreementEresources?.url ?? '';
    // If a new agreement is selected or if the filter has changed return undefined until the new set of records is fetched
    if (agreementEresourcesUrl.indexOf(`${match.params.id}`) === -1 ||
      agreementEresourcesUrl.indexOf(`resources/${resources.eresourcesFilterPath}`) === -1) {
      return undefined;
    } else {
      return resources?.agreementEresources?.records;
    }
  }

  getLinesRecords = () => {
    const { resources, match } = this.props;
    const agreementLinesUrl = resources?.agreementLines?.url ?? '';
    // If a new agreement is selected return undefined until the new set of records is fetched
    if (agreementLinesUrl.indexOf(`${match.params.id}`) === -1) {
      return undefined;
    } else {
      return resources?.agreementLines?.records;
    }
  }

  getRecord = (id, resourceType) => {
    return get(this.props.resources, `${resourceType}.records`, [])
      .find(i => i.id === id);
  }

  handleClone = (cloneableProperties) => {
    const { history, intl, location, match, resources, stripes: { okapi } } = this.props;

    const name = resources?.agreement?.records?.[0].name;

    return fetch(`${okapi.url}/erm/sas/${match.params.id}/clone`, {
      method: 'POST',
      headers: {
        'X-Okapi-Tenant': okapi.tenant,
        'X-Okapi-Token': okapi.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(cloneableProperties),
    }).then(response => {
      if (response.ok) {
        return response.text(); // Parse it as text
      } else if (response.status === 422) { // handle 422 error specifically
        return response.json()
          .then(({ errors }) => {
            throw new Error(intl.formatMessage(
              { id: `ui-agreements.duplicateAgreementModal.${errors[0].i18n_code}` }, // use the i18n_code to find the corresponding translation
              { name },
            ));
          });
      } else {
        throw new Error(errorTypes.JSON_ERROR);
      }
    }).then(text => {
      const data = JSON.parse(text); // Try to parse it as json
      if (data.id) {
        return Promise.resolve(history.push(`${urls.agreementEdit(data.id)}${location.search}`));
      } else {
        throw new Error(errorTypes.INVALID_JSON_ERROR); // when the json response body doesn't contain an id
      }
    }).catch(error => {
      throw error;
    });
  }

  handleClose = () => {
    this.props.history.push(`${urls.agreements()}${this.props.location.search}`);
  }

  handleDelete = () => {
    const { sendCallout } = this.context;
    const { history, location, mutator } = this.props;
    const agreement = this.getCompositeAgreement();

    if (agreement.items?.length) {
      sendCallout({ type: 'error', timeout: 0, message: <SafeHTMLMessage id="ui-agreements.errors.noDeleteHasAgreementLines" /> });
      return;
    }

    if (agreement.linkedLicenses?.length) {
      sendCallout({ type: 'error', timeout: 0, message: <SafeHTMLMessage id="ui-agreements.errors.noDeleteHasLicenses" /> });
      return;
    }

    if (agreement.relatedAgreements?.length) {
      sendCallout({ type: 'error', timeout: 0, message: <SafeHTMLMessage id="ui-agreements.errors.noDeleteHasRelatedAgreements" /> });
      return;
    }

    mutator.agreement.DELETE(agreement)
      .then(() => {
        history.push(`${urls.agreements()}${location.search}`);
        sendCallout({ message: <SafeHTMLMessage id="ui-agreements.agreements.deletedAgreement" values={{ name : agreement.name }} /> });
      })
      .catch(error => {
        sendCallout({ type: 'error', timeout: 0, message: <SafeHTMLMessage id="ui-agreements.errors.noDeleteAgreementBackendError" values={{ message: error.message }} /> });
      });
  }

  handleFilterEResources = (path) => {
    const { mutator } = this.props;
    mutator.eresourcesFilterPath.replace(path);
    mutator.agreementEresourcesOffset.replace(0);
  }

  handleEdit = () => {
    const { history, location, match } = this.props;
    history.push(`${urls.agreementEdit(match.params.id)}${location.search}`);
  }

  handleExportAgreement = () => {
    const { resources, stripes: { okapi } } = this.props;
    const { id, name } = get(resources, 'agreement.records[0]', {});

    return fetch(`${okapi.url}/erm/sas/${id}/export/current`, {
      headers: {
        'X-Okapi-Tenant': okapi.tenant,
        'X-Okapi-Token': okapi.token,
      },
    }).then(response => response.blob())
      .then(this.downloadBlob(name));
  }

  handleExportEResourcesAsJSON = () => {
    const { resources, stripes: { okapi } } = this.props;
    const { id, name } = get(resources, 'agreement.records[0]', {});

    return fetch(`${okapi.url}/erm/sas/${id}/resources/export/${resources.eresourcesFilterPath}`, {
      headers: {
        'X-Okapi-Tenant': okapi.tenant,
        'X-Okapi-Token': okapi.token,
      },
    }).then(response => response.blob())
      .then(this.downloadBlob(name));
  }

  handleExportEResourcesAsKBART = () => {
    const { resources, stripes: { okapi } } = this.props;
    const { id, name } = get(resources, 'agreement.records[0]', {});

    return fetch(`${okapi.url}/erm/sas/${id}/resources/export/${resources.eresourcesFilterPath}/kbart`, {
      headers: {
        'X-Okapi-Tenant': okapi.tenant,
        'X-Okapi-Token': okapi.token,
      },
    }).then(response => response.blob())
      .then(this.downloadBlob(name));
  }

  handleFetchCredentials = (id) => {
    const { mutator } = this.props;
    mutator.interfaceRecord.replace({ id });
  }

  handleNeedMoreLines = (_askAmount, index) => {
    const { mutator } = this.props;
    mutator.agreementLinesOffset.replace(index);
  }

  handleNeedMoreEResources = (_askAmount, index) => {
    const { mutator } = this.props;
    mutator.agreementEresourcesOffset.replace(index);
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

  handleViewAgreementLine = (lineId) => {
    const { history, location, match } = this.props;
    history.push(`${urls.agreementLineView(match.params.id, lineId)}${location.search}`);
  }

  isLoading = () => {
    const { match, resources } = this.props;

    return (
      match.params.id !== get(resources, 'agreement.records[0].id') &&
      get(resources, 'agreement.isPending', true)
    );
  }

  render() {
    const {
      handlers,
      resources,
      tagsEnabled,
    } = this.props;

    return (
      <View
        key={get(resources, 'agreement.loadedAt', 'loading')}
        data={{
          agreement: this.getCompositeAgreement(),
          eresourcesFilterPath: this.props.resources.eresourcesFilterPath,
          searchString: this.props.location.search,
          supplementaryProperties: get(resources, 'supplementaryProperties.records', []),
          terms: get(resources, 'terms.records', []),
        }}
        handlers={{
          ...handlers,
          onClone: this.handleClone,
          onClose: this.handleClose,
          onDelete: this.handleDelete,
          onEdit: this.handleEdit,
          onExportAgreement: this.handleExportAgreement,
          onExportEResourcesAsJSON: this.handleExportEResourcesAsJSON,
          onExportEResourcesAsKBART: this.handleExportEResourcesAsKBART,
          onFetchCredentials: this.handleFetchCredentials,
          onFilterEResources: this.handleFilterEResources,
          onNeedMoreEResources: this.handleNeedMoreEResources,
          onNeedMoreLines: this.handleNeedMoreLines,
          onToggleTags: tagsEnabled ? this.handleToggleTags : undefined,
          onViewAgreementLine: this.handleViewAgreementLine,
        }}
        helperApp={this.getHelperApp()}
        isLoading={this.isLoading()}
      />
    );
  }
}

export default compose(
  injectIntl,
  withFileHandlers,
  stripesConnect,
  withTags,
)(AgreementViewRoute);
