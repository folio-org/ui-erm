import React from 'react';
import { render } from '@testing-library/react';
import EResourceCount from './EResourceCount';

const AgreementLineResource = {
  'id':'357a0d60-b7be-45c0-bca2-5cc38634340f',
  'class':'org.olf.kb.Pkg',
  'name':'American Society of Civil Engineers : Journals',
  'suppressFromDiscovery':false,
  'tags':[

  ],
  'customCoverage':false,
  '_object':{
    'id':'357a0d60-b7be-45c0-bca2-5cc38634340f',
    'dateCreated':'2020-12-28T03:28:02Z',
    'tags':[

    ],
    'lastUpdated':'2020-12-28T03:28:02Z',
    'vendor':{
      'id':'b5aba478-32b8-47c7-b6fa-c86d11ee2a75',
      'name':'American Society of Civil Engineers'
    },
    'coverage':[

    ],
    'source':'GOKb',
    'remoteKb':{
      'id':'1a66ae2e-42a7-450f-a071-8d73bb4d8dff',
      'cursor':'2020-11-06T11:46:34Z',
      'active':true,
      'trustedSourceTI':false,
      'activationEnabled':false,
      'readonly':false,
      'syncStatus':'idle',
      'lastCheck':1609165650369,
      'name':'GOKb_TEST',
      'type':'org.olf.kb.adapters.GOKbOAIAdapter',
      'fullPrefix':'gokb',
      'uri':'http://gokbt.gbv.de/gokb/oai/index',
      'supportsHarvesting':true,
      'rectype':1
    },
    'name':'American Society of Civil Engineers : Journals',
    'suppressFromDiscovery':false,
    'reference':'American_Society_of_Civil_Engineers_:_Journals',
    'resourceCount':41,
    'class':'org.olf.kb.Pkg'
  }
};

const eHoldingsPackageResource = {
  'label': 'EBSCO eBooks',
  'type': 'Package',
  'provider': 'EBSCO',
  'titleCount': 1902197,
  'selectedCount': 1902193,
  'contentType': 'E-Book',
  'providerName': 'EBSCO',
  'isSelected': true,
  'accessStatusType': 'Trial'
};

const PackageResource = {
  'id':'62a3b42d-9e36-49c8-b06e-a55d64b08159',
  'dateCreated':'2020-12-28T04:06:45Z',
  'lastUpdated':'2020-12-28T04:06:45Z',
  'vendor':{
    'id':'2b03a1ce-c7f8-4710-93a5-86cd1eba4191',
    'name':'Edward Elgar',
    'orgsUuid_object':{
      'error':400,
      'message':'Bad Request'
    }
  },
  'source':'GOKb',
  'remoteKb':{
    'id':'1a66ae2e-42a7-450f-a071-8d73bb4d8dff',
    'cursor':'2020-11-06T11:46:34Z',
    'active':true,
    'trustedSourceTI':false,
    'activationEnabled':false,
    'readonly':false,
    'syncStatus':'idle',
    'lastCheck':1609165650369,
    'name':'GOKb_TEST',
    'type':'org.olf.kb.adapters.GOKbOAIAdapter',
    'fullPrefix':'gokb',
    'uri':'http://gokbt.gbv.de/gokb/oai/index',
    'supportsHarvesting':true,
    'rectype':1
  },
  'name':'Edward Elgar:Edward Elgar E-Book Archive in Business & Management, Economics and Finance:Nationallizenz',
  'suppressFromDiscovery':false,
  'reference':'Edward_Elgar:Edward_Elgar_E-Book_Archive_in_Business_&_Management,_Economics_and_Finance:Nationalliz',
  'resourceCount':2540,
  'class':'org.olf.kb.Pkg'
};

const ExternalPackageResource = {
  'id':'a63baae8-9e63-43b9-9c72-acc09659ba01',
  'type':'external',
  'description':null,
  'authority':'EKB-PACKAGE',
  'reference':'350-1207861',
  'explanation':null,
  'startDate':null,
  'endDate':null,
  'activeFrom':null,
  'activeTo':null,
  'contentUpdated':null,
  'haveAccess':true,
  'suppressFromDiscovery':false,
  'note':null,
  'tags':[

  ],
  'owner':{
    'id':'dbef7eca-1ca1-442e-8c74-7c936eba8ef2',
    'name':'AM ag 1',
    'orgs':[

    ],
    'externalLicenseDocs':[

    ],
    'outwardRelationships':[

    ],
    'customProperties':{

    },
    'contacts':[

    ],
    'tags':[

    ],
    'inwardRelationships':[

    ],
    'linkedLicenses':[

    ],
    'docs':[

    ],
    'periods':[
      {
        'id':'9358e6aa-a7e5-48e0-a7f5-1b1525493ea9',
        'startDate':'2020-12-29',
        'owner':{
          'id':'dbef7eca-1ca1-442e-8c74-7c936eba8ef2'
        }
      }
    ],
    'usageDataProviders':[

    ],
    'agreementStatus':{
      'id':'2c9180b776a761e10176a7622f0e0027',
      'value':'active',
      'label':'Active'
    },
    'supplementaryDocs':[

    ],
    'currentPeriod':null,
    'startDate':'2020-12-29',
    'endDate':null,
    'cancellationDeadline':null,
    'items':[
      {
        'id':'a63baae8-9e63-43b9-9c72-acc09659ba01'
      },
      {
        'id':'f490b01f-55a8-4a96-ba13-67a40d048333'
      }
    ],
    'alternateNames':[

    ]
  },
  'customCoverage':true,
  'coverage':[
    {
      'startDate':'2020-09-01',
      'endDate':'2020-10-21',
      'summary':'v*/i*/2020-09-01 - v*/i*/2020-10-21'
    }
  ],
  'reference_object':{
    'label':'A Biographical Dictionary of Later Han to the Three Kingdoms (23–220 AD) Online',
    'type':'Package',
    'provider':'Brill',
    'titleCount':1,
    'selectedCount':1,
    'contentType':'Online Reference',
    'providerName':'Brill',
    'isSelected':true
  },
  'poLines':[

  ]
};

describe('EResourceCount', () => {
  test('AgreementLine resource renders expected eresource count', () => {
    const { getByText } = render(
      <EResourceCount
        resource={AgreementLineResource}
      />
    );

    expect(getByText(AgreementLineResource._object.resourceCount));
  });

  test('Package resource renders expected eresource count', () => {
    const { getByText } = render(
      <EResourceCount
        resource={PackageResource}
      />
    );

    expect(getByText(PackageResource.resourceCount));
  });

  test('External package resource renders expected eresource count', () => {
    const { getByText } = render(
      <EResourceCount
        resource={ExternalPackageResource}
      />
    );

    expect(getByText('1 / 1'));
  });

  test('eHoldings package resource renders expected eresource count', () => {
    const { getByText } = render(
      <EResourceCount
        resource={eHoldingsPackageResource}
      />
    );

    expect(getByText('1902193 / 1902197'));
  });

  test('empty resource should render null', () => {
    const { container } = render(
      <EResourceCount
        resource={{}}
      />
    );

    expect(container.firstChild).toBeNull();
  });
});
