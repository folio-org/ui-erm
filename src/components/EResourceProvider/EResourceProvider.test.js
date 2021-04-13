import React from 'react';
import { render } from '@testing-library/react';
import '@folio/stripes-erm-components/test/jest/__mock__';
import EResourceProvider from './EResourceProvider';

const resource = {
  'id':'7bf439b7-884d-4c08-9da7-f17c4d23daa9',
  'dateCreated':'2021-01-12T13:41:35Z',
  'lastUpdated':'2021-01-12T13:41:35Z',
  'vendor':{
    'id':'822203ba-bd05-4b06-ae23-8608d1ae48af',
    'name':'AVOD',
    'orgsUuid_object':{
      'error':400,
      'message':'Bad Request'
    }
  },
  'source':'GOKb',
  'remoteKb':{
    'id':'3f8e904f-2df8-48ff-ada9-299d5979636a',
    'cursor':'2021-01-05T12:32:00Z',
    'active':true,
    'trustedSourceTI':false,
    'activationEnabled':false,
    'readonly':false,
    'syncStatus':'idle',
    'lastCheck':1610479321117,
    'name':'GOKb_TEST',
    'type':'org.olf.kb.adapters.GOKbOAIAdapter',
    'fullPrefix':'gokb',
    'uri':'http://gokbt.gbv.de/gokb/oai/index',
    'supportsHarvesting':true,
    'rectype':1
  },
  'name':'AVA VOD Library',
  'suppressFromDiscovery':false,
  'reference':'AVA_VOD_Library',
  'resourceCount':382,
  'class':'org.olf.kb.Pkg'
};

const resourceWithObject = {
  'id':'7bf439b7-884d-4c08-9da7-f17c4d23daa9',
  'class':'org.olf.kb.Pkg',
  'name':'AVA VOD Library',
  'suppressFromDiscovery':false,
  'tags':[

  ],
  'customCoverage':false,
  '_object':{
    'id':'7bf439b7-884d-4c08-9da7-f17c4d23daa9',
    'dateCreated':'2021-01-12T13:41:35Z',
    'tags':[

    ],
    'lastUpdated':'2021-01-12T13:41:35Z',
    'vendor':{
      'id':'822203ba-bd05-4b06-ae23-8608d1ae48af',
      'name':'PBS Video'
    },
    'coverage':[

    ],
    'source':'GOKb',
    'remoteKb':{
      'id':'3f8e904f-2df8-48ff-ada9-299d5979636a',
      'cursor':'2021-01-05T12:32:00Z',
      'active':true,
      'trustedSourceTI':false,
      'activationEnabled':false,
      'readonly':false,
      'syncStatus':'idle',
      'lastCheck':1610479321117,
      'name':'GOKb_TEST',
      'type':'org.olf.kb.adapters.GOKbOAIAdapter',
      'fullPrefix':'gokb',
      'uri':'http://gokbt.gbv.de/gokb/oai/index',
      'supportsHarvesting':true,
      'rectype':1
    },
    'name':'AVA VOD Library',
    'suppressFromDiscovery':false,
    'reference':'AVA_VOD_Library',
    'resourceCount':382,
    'class':'org.olf.kb.Pkg'
  }
};

const externalResource = {
  'id':'4fe04f01-9475-4042-8992-6246eca28b98',
  'type':'external',
  'description':null,
  'authority':'EKB-PACKAGE',
  'reference':'123355-3212792',
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
    'id':'aa18dd35-944c-4094-aea4-da287eeabe45',
    'items':[
      {
        'id':'2653a064-42c1-4bda-a067-f8be890775bf'
      },
      {
        'id':'4fe04f01-9475-4042-8992-6246eca28b98'
      }
    ],
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
        'id':'7a8995be-33e1-4ec1-9a53-ae2182640fe3',
        'startDate':'2021-01-13',
        'owner':{
          'id':'aa18dd35-944c-4094-aea4-da287eeabe45'
        }
      }
    ],
    'usageDataProviders':[

    ],
    'agreementStatus':{
      'id':'2c91809a76f6c17c0176f6c407a20035',
      'value':'active',
      'label':'Active'
    },
    'supplementaryDocs':[

    ],
    'currentPeriod':null,
    'startDate':'2021-01-13',
    'endDate':null,
    'cancellationDeadline':null,
    'alternateNames':[

    ]
  },
  'customCoverage':false,
  'reference_object':{
    'label':'A test package for our demo (with one title) ',
    'type':'Package',
    'provider':'API DEV CORPORATE CUSTOMER',
    'titleCount':1,
    'selectedCount':1,
    'contentType':'Online Reference',
    'providerName':'API DEV CORPORATE CUSTOMER',
    'isSelected':true
  },
  'rowIndex':1
};

describe('EResourceProvider', () => {
  test('renders expected vendor', () => {
    const { getByText } = render(
      <EResourceProvider
        resource={resource}
      />
    );

    expect(getByText('AVOD')).toBeInTheDocument();
  });

  test('renders expected provider for a resource with _object', () => {
    const { getByText } = render(
      <EResourceProvider
        resource={resourceWithObject}
      />
    );

    expect(getByText('PBS Video')).toBeInTheDocument();
  });

  test('renders expected provider for a resource with _object', () => {
    const { getByText } = render(
      <EResourceProvider
        resource={resourceWithObject}
      />
    );

    expect(getByText('PBS Video')).toBeInTheDocument();
  });

  test('renders expected provider for an external resource', () => {
    const { getByText } = render(
      <EResourceProvider
        resource={externalResource}
      />
    );

    expect(getByText('API DEV CORPORATE CUSTOMER')).toBeInTheDocument();
  });
});
