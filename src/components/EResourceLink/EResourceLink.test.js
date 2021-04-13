import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@folio/stripes-erm-components/test/jest/__mock__';
import { renderWithIntl } from '@folio/stripes-erm-components/test/jest/helpers';
import EResourceLink from './EResourceLink';

const externalTitle = {
  'id': 'f6b05998-bf1f-4db5-9c7c-ccf59edd98b0',
  'type': 'external',
  'authority': 'EKB-TITLE',
  'reference': '29-808-189410',
  'explanation': null,
  'startDate': null,
  'endDate': null,
  'activeFrom': null,
  'activeTo': null,
  'contentUpdated': null,
  'haveAccess': true,
  'suppressFromDiscovery': false,
  'note': null,
  'tags': [],
  'owner': {
    'id': 'e1696818-4e29-450d-a94e-5e801f997797'
  },
  'customCoverage': false,
  'reference_object': {
    'label': 'ProQuest Datatimes',
    'type': 'Journal',
    'provider': 'LexisNexis',
    'publicationType': 'Journal',
    'packageData': {
      'name': 'Lexis.com',
      'titleCount': 16283,
      'selectedCount': 2,
      'contentType': 'Aggregated Full Text',
      'providerName': 'LexisNexis',
      'isSelected': true
    },
    'providerName': 'LexisNexis',
    'isSelected': true
  }
};

const externalPackage = {
  'id':'d49689f7-186a-45bf-a8b7-1ff91dbeab4d',
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
    'id':'9e218cc5-bd24-4fd0-bf27-4bb1db63848e',
    'name':'am ag 1',
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
        'id':'eb886479-c33a-4fe3-85cb-a4267073d179',
        'startDate':'2020-12-25',
        'owner':{
          'id':'9e218cc5-bd24-4fd0-bf27-4bb1db63848e'
        }
      }
    ],
    'usageDataProviders':[

    ],
    'agreementStatus':{
      'id':'2c9180b476aa415c0176aa41b0480019',
      'value':'active',
      'label':'Active'
    },
    'supplementaryDocs':[

    ],
    'currentPeriod':{
      'id':'eb886479-c33a-4fe3-85cb-a4267073d179',
      'startDate':'2020-12-25',
      'owner':{
        'id':'9e218cc5-bd24-4fd0-bf27-4bb1db63848e'
      }
    },
    'startDate':'2020-12-25',
    'endDate':null,
    'cancellationDeadline':null,
    'items':[
      {
        'id':'d49689f7-186a-45bf-a8b7-1ff91dbeab4d'
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

const titleInstance = {
  'id':'d946711e-c14c-486c-94ae-247a6a079349',
  'subType':{
    'id':'2c9180b476aa415c0176aa41b056001c',
    'value':'electronic',
    'label':'Electronic'
  },
  'dateCreated':'2020-12-28T17:20:22Z',
  'tags':[

  ],
  'lastUpdated':'2020-12-28T17:20:22Z',
  'publicationType':{
    'id':'2c9180b476aa415c0176aa5c6c090049',
    'value':'book',
    'label':'Book'
  },
  'identifiers':[

  ],
  'coverage':[

  ],
  'name':'3 Zimmer/Küche/Bad',
  'type':{
    'id':'2c9180b476aa415c0176aa41b05d001e',
    'value':'monograph',
    'label':'Monograph'
  },
  'suppressFromDiscovery':false,
  'work':{
    'id':'8a44e9c9-02b6-4dbb-a7b3-0404f38cf7cf'
  },
  'class':'org.olf.kb.TitleInstance',
  'longName':'3 Zimmer/Küche/Bad',
  'relatedTitles':[

  ]
};

describe('EResourceLink', () => {
  test('renders expected name for an internal titleInstance', () => {
    const { getByText } = render(
      <MemoryRouter>
        <EResourceLink
          eresource={titleInstance}
        />
      </MemoryRouter>
    );

    expect(getByText('3 Zimmer/Küche/Bad')).toBeInTheDocument();
  });

  test('renders expected name for an external package', () => {
    const { getByText } = render(
      <MemoryRouter>
        <EResourceLink
          eresource={externalPackage}
        />
      </MemoryRouter>
    );

    expect(getByText('A Biographical Dictionary of Later Han to the Three Kingdoms (23–220 AD) Online')).toBeInTheDocument();
  });

  test('renders expected name for an external title', () => {
    const { getByText } = render(
      <MemoryRouter>
        <EResourceLink
          eresource={externalTitle}
        />
      </MemoryRouter>
    );

    expect(getByText('ProQuest Datatimes')).toBeInTheDocument();
  });

  test('renders no value for an empty resource', () => {
    const { getByText } = renderWithIntl(
      <MemoryRouter>
        <EResourceLink
          eresource={{}}
        />,
      </MemoryRouter>,
      [{
        prefix: 'stripes-components',
        translations: { 'noValue.noValueSet': 'No value set' },
      }]
    );

    expect(getByText('-')).toBeInTheDocument();
  });
});
