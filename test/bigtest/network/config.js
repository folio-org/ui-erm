// typical mirage config export
// http://www.ember-cli-mirage.com/docs/v0.4.x/configuration/
import { get, isEmpty } from 'lodash';
import faker from 'faker';
import parseQueryString from './util';

const getItems = (schema, request, recordName) => {
  const queryString = request.url.split('?')[1];
  const params = parseQueryString(queryString);
  let { filters } = params;
  // when there is only one filter and its not an array
  if (filters && !isEmpty(filters) && !Array.isArray(filters)) filters = [filters];

  // returns a flattened array of { name, value } pairs of filter name and its value
  const parsed = filters && filters.map((filter) => {
    return filter.split('||').map(f => {
      const [name, value] = f.split('==');
      return { name, value };
    });
  }).flat();

  let results;
  if (parsed) {
    results = schema[recordName].where(record => {
      return parsed.reduce((acc, { name, value }) => {
        return acc || get(record, name) === value;
      }, false);
    }).models;
  } else {
    results = schema[recordName].all().models;
  }

  return { results, totalRecords: results.length };
};

export default function config() {
  this.get('/configurations/entries', {
    configs: []
  });

  this.get('/erm/resource/electronic', (schema, request) => {
    return getItems(schema, request, 'eresources');
  });

  this.get('/erm/resource/:id', (schema, request) => {
    return schema.eresources.find(request.params.id).attrs;
  });

  this.get('/erm/kbs', () => []);

  this.get('/erm/resource/:id/entitlementOptions', () => []);

  this.get('/erm/custprops', () => []);

  this.post('/erm/validate/subscriptionAgreement/name', () => []);

  this.get('/erm/resource/:id/entitlements/related', () => ({ results: [] }));

  this.get('/erm/resource/:id/entitlements', () => ({ results: [] }));

  this.get('/erm/resource/:id/related', () => ({ results: [] }));

  this.get('/erm/packages/:id/content/current', (schema) => ({
    results: schema.pcis.where(pci => new Date(pci.accessStart).getTime() < new Date().getTime() && new Date(pci.accessEnd).getTime() > new Date().getTime()).models,
  }));

  this.get('/erm/packages/:id/content/future', (schema) => ({
    results: schema.pcis.where(pci => !pci.accessEnd && new Date(pci.accessStart).getTime() > new Date().getTime()).models,
  }));

  this.get('/erm/packages/:id/content/dropped', (schema) => ({
    results: schema.pcis.where(pci => !pci.accessStart && new Date(pci.accessEnd).getTime() < new Date().getTime()).models,
  }));

  this.get('/note-links/domain/agreements/type/eresource/id/:id', () => []);

  this.get('/erm/sas', (schema, request) => {
    return getItems(schema, request, 'agreements');
  });

  this.post('erm/sas', (_, request) => {
    const body = JSON.parse(request.requestBody);
    return this.create('agreement', body).attrs;
  });

  this.get('/erm/sas/:id', (schema, request) => {
    return schema.agreements.find(request.params.id);
  });

  const getAgreementCoveredResources = (schema, request, shouldInclude) => {
    const agreement = schema.agreements.find(request.params.id).attrs;
    if (!agreement.items) return { results: [] };
    const itemIds = agreement.items.map(item => item.resource.id);
    const resources = schema.pcis.all().models.filter(pci => itemIds.includes(pci.pkg.id) && shouldInclude(pci));

    return {
      results: resources.map(resource => ({
        class: 'org.olf.kb.PackageContentItem',
        coverage: [],
        customCoverage: false,
        id: resource.id,
        _object: resource
      }))
    };
  };

  this.get('/erm/sas/:id/resources', (schema, request) => {
    return getAgreementCoveredResources(schema, request, () => true);
  });

  this.get('/erm/sas/:id/resources/current', (schema, request) => {
    return getAgreementCoveredResources(schema, request, pci => (new Date(pci.accessStart).getTime() < new Date().getTime() && new Date(pci.accessEnd).getTime() > new Date().getTime()));
  });

  this.get('/erm/sas/:id/resources/future', (schema, request) => {
    return getAgreementCoveredResources(schema, request, pci => (new Date(pci.accessStart).getTime() > new Date().getTime()));
  });

  this.get('/erm/sas/:id/resources/dropped', (schema, request) => {
    return getAgreementCoveredResources(schema, request, pci => (new Date(pci.accessEnd).getTime() < new Date().getTime()));
  });

  this.get('/erm/entitlements', (schema, request) => {
    return getItems(schema, request, 'agreementLines');
  });

  this.get('/erm/contacts', { results: [] });

  this.get('/erm/org', () => []);

  this.get('/note-links/domain/agreements/type/agreement/id/:id', () => { });

  this.get('/note-types', () => { });

  this.get('/erm/refdata', ({ pickLists }) => {
    return pickLists.all().models;
  });

  this.get('/erm/refdata/:id', (schema, request) => {
    return (request.params.id !== 'undefined') && schema.pickLists.find(request.params.id).attrs;
  });

  this.get('/orders/order-lines', (schema, request) => {
    // query will look something like `id==123 or id==456`
    const { query } = request.queryParams;

    if (!query) return { poLines: [], totalRecords: 0 };

    const poLineIds = query.split(' or ')
      .map(idEquality => idEquality.substring('id=='.length)); // strip leading `id==`

    const { number, words } = faker.random;

    return {
      poLines: poLineIds.map(id => ({
        id,
        acquisitionMethod: faker.finance.transactionType(),
        poLineNumber: `${number()}-${number()}`,
        title: words(),
      })),
      totalRecords: poLineIds.length,
    };
  });

  this.get('/licenses/custprops', () => []);

  this.get('/tags', { tags: [] });

  this.get('/erm/refdata/TitleInstance/type', () => {
    return [
      { 'id': '188389636d9ece46016d9ed0184b0027', 'value': 'journal', 'label': 'Journal' },
      { 'id': '188389636d9ece46016d9ed018550028', 'value': 'book', 'label': 'Book' }
    ];
  });

  this.get('/erm/refdata/SubscriptionAgreement/agreementStatus', () => {
    return [
      { 'id': '188389636d9ece46016d9ed0177f0010', 'value': 'draft', 'label': 'Draft' },
      { 'id': '188389636d9ece46016d9ed017880011', 'value': 'requested', 'label': 'Requested' },
      { 'id': '188389636d9ece46016d9ed0179a0012', 'value': 'in_negotiation', 'label': 'In negotiation' },
      { 'id': '188389636d9ece46016d9ed017b30014', 'value': 'active', 'label': 'Active' },
      { 'id': '3ce500b0ab45998006d16bbd3361b9bc', 'value': 'closed', 'label': 'Closed' }];
  });

  this.get('/erm/refdata/SubscriptionAgreement/reasonForClosure', () => {
    return [
      { 'id': 'df1c93f9c99b26bc99a5a9d72b40a1a5', 'value': 'rejected', 'label': 'Rejected' },
      { 'id': '188389636db6c763016db6ca076e0000', 'value': 'cancelled', 'label': 'Cancelled' },
      { 'id': '188389636db6c763016db6ca07820001', 'value': 'ceased', 'label': 'Ceased' },
      { 'id': '188389636db6c763016db6ca07900002', 'value': 'superseded', 'label': 'Superseded' }];
  });

  this.get('/erm/refdata/LicenseAmendmentStatus/status', () => {
    return [
      { 'id': '188389636d9ece46016d9ed018bd0033', 'value': 'current', 'label': 'Current' },
      { 'id': '188389636d9ece46016d9ed018ca0034', 'value': 'future', 'label': 'Future' },
      { 'id': '188389636d9ece46016d9ed018d30035', 'value': 'historical', 'label': 'Historical' },
      { 'id': '188389636d9ece46016d9ed018dc0036', 'value': 'does_not_apply', 'label': 'Does not apply' }];
  });

  this.get('/erm/refdata/InternalContact/role', () => {
    return [
      { 'id': '188389636d9ece46016d9ed0180c001f', 'value': 'agreement_owner', 'label': 'Agreement owner' },
      { 'id': '188389636d9ece46016d9ed018160020', 'value': 'authorized_signatory', 'label': 'Authorized signatory' },
      { 'id': '188389636d9ece46016d9ed018200021', 'value': 'erm_librarian', 'label': 'ERM librarian' },
      { 'id': '188389636d9ece46016d9ed018280022', 'value': 'subject_specialist', 'label': 'Subject specialist' }];
  });

  this.get('/erm/refdata/SubscriptionAgreement/isPerpetual', () => {
    return [
      { 'id': '188389636d9ece46016d9ed01759000d', 'value': 'yes', 'label': 'Yes' },
      { 'id': '188389636d9ece46016d9ed01766000e', 'value': 'no', 'label': 'No' }
    ];
  });

  this.get('/erm/refdata/TitleInstance/publicationType', () => {
    return [
      {
        'id':'2c9180b4740a3eee01740a4011e00004',
        'value':'book',
        'label':'Book'
      },
      {
        'id':'2c9180b4740a3eee01740a4011e30005',
        'value':'journal',
        'label':'Journal'
      },
      {
        'id':'2c9180b4740a3eee01740a4011e70006',
        'value':'monograph',
        'label':'Monograph'
      },
      {
        'id':'2c9180b4740a3eee01740a4011ea0007',
        'value':'serial',
        'label':'Serial'
      }
    ];
  });

  this.get('/erm/refdata/RemoteLicenseLink/status', () => {
    return [
      { 'id': '188389636d9ece46016d9ed017ed001b', 'value': 'controlling', 'label': 'Controlling' },
      { 'id': '188389636d9ece46016d9ed017f4001c', 'value': 'future', 'label': 'Future' },
      { 'id': '188389636d9ece46016d9ed017fc001d', 'value': 'historical', 'label': 'Historical' }
    ];
  });

  this.get('/erm/refdata/SubscriptionAgreementOrg/role', () => {
    return [
      { 'id': '188389636d9ece46016d9ed018ee0038', 'value': 'content_provider', 'label': 'Content Provider' },
      { 'id': '188389636d9ece46016d9ed018f60039', 'value': 'subscription_agent', 'label': 'Subscription Agent' },
      { 'id': '188389636d9ece46016d9ed018fd003a', 'value': 'vendor', 'label': 'Vendor' }
    ];
  });

  this.get('/erm/refdata/SubscriptionAgreement/renewalPriority', () => {
    return [
      { 'id': '188389636d9ece46016d9ed017290009', 'value': 'definitely_renew', 'label': 'Definitely renew' },
      { 'id': '188389636d9ece46016d9ed01735000a', 'value': 'for_review', 'label': 'For review' },
      { 'id': '188389636d9ece46016d9ed01745000b', 'value': 'definitely_cancel', 'label': 'Definitely cancel' }
    ];
  });

  this.get('/erm/refdata/DocumentAttachment/atType', () => ([
    { 'id': '18836ea8717e097901717e1c09370027', 'value': 'license', 'label': 'License' },
    { 'id': '18836ea8717e097901717e1c093d0028', 'value': 'misc', 'label': 'Misc' },
    { 'id': '18836ea8717e097901717e1c09440029', 'value': 'consortium_negotiation_document', 'label': 'Consortium negotiation document' },
  ]));

  this.get('erm/refdata/AgreementRelationship/type', () => (
    [
      {
        'id':'18836ea97420fce2017421060d1a0041',
        'value':'supersedes',
        'label':'Supersedes'
      },
      {
        'id':'18836ea97420fce2017421060d2d0042',
        'value':'provides_post-cancellation_access_for',
        'label':'Provides post-cancellation access for'
      },
      {
        'id':'18836ea97420fce2017421060d3c0043',
        'value':'tracks_demand-driven_acquisitions_for',
        'label':'Tracks demand-driven acquisitions for'
      },
      {
        'id':'18836ea97420fce2017421060d4b0044',
        'value':'related_to',
        'label':'Related to'
      },
      {
        'id':'18836ea97420fce2017421060d5e0045',
        'value':'has_backfile_in',
        'label':'Has backfile in'
      }
    ]
  ));

  this.get('/users', (schema) => {
    const users = schema.contacts.all().models;

    return {
      users,
      totalRecords: users.length,
    };
  });

  this.get('note-links/domain/agreements/type/agreement/id/:id', () => { });

  this.post('erm/sas/:id/clone', (schema, request) => {
    const agreement = schema.agreements.find(request.params.id);

    if (request.requestBody.internalContacts === false) {
      return this.create('agreement', { name: agreement.name });
    }

    const agreementData = {
      name: agreement.name,
      internalContactData: agreement.internalContactData
    };

    return this.create('agreement', 'withContacts', agreementData);
  });
}
