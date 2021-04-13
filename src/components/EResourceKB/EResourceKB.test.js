import React from 'react';
import { render } from '@testing-library/react';
import '@folio/stripes-erm-components/test/jest/__mock__';
import { renderWithIntl } from '@folio/stripes-erm-components/test/jest/helpers';
import EResourceKB from './EResourceKB';

const PackageResource = {
  'id':'0c8a8b44-44a2-4423-8b6e-b1df806e474f',
  'class':'org.olf.kb.Pkg',
  'name':'Edward Elgar:Edward Elgar E-Book Archive in Business & Management, Economics and Finance:Nationallizenz',
  'suppressFromDiscovery':false,
  'tags':[

  ],
  'customCoverage':false,
  '_object':{
    'id':'0c8a8b44-44a2-4423-8b6e-b1df806e474f',
    'dateCreated':'2020-12-28T17:30:08Z',
    'tags':[

    ],
    'lastUpdated':'2020-12-28T17:30:08Z',
    'vendor':{
      'id':'87b38f36-6dfd-4f91-9675-82bafeba4fd3',
      'name':'Edward Elgar',
      'orgsUuid_object':{
        'error':400,
        'message':'Bad Request'
      }
    },
    'coverage':[

    ],
    'source':'GOKb',
    'remoteKb':{
      'id':'a375f1a7-cbaf-486f-87ec-5939280a37c6',
      'cursor':'2020-11-06T11:46:34Z',
      'active':true,
      'trustedSourceTI':false,
      'activationEnabled':false,
      'readonly':false,
      'syncStatus':'idle',
      'lastCheck':1609181451045,
      'name':'GOKb_PACKAGE',
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
  },
  'rowIndex':0
};

const PCIresource = {
  'id':'2fb04c44-c197-4822-a43b-b9368d0715eb',
  'class':'org.olf.kb.PackageContentItem',
  'name':"'\"Institutions, industrial upgrading, and economic performance in Ja...' on Platform 'Elgaronline' in Package Edward Elgar:Edward Elgar E-Book Archive in Business & Management, ...",
  'suppressFromDiscovery':false,
  'tags':[

  ],
  'customCoverage':false,
  '_object':{
    'id':'2fb04c44-c197-4822-a43b-b9368d0715eb',
    'accessStart':'2008-01-01',
    'dateCreated':'2020-12-28T17:30:51Z',
    'tags':[

    ],
    'lastUpdated':'2020-12-28T17:31:32Z',
    'depth':'Fulltext',
    'coverage':[

    ],
    'pti':{
      'id':'137190c9-139a-4b4f-bcbc-e9b4460e469e',
      'dateCreated':'2020-12-28T17:30:51Z',
      'tags':[

      ],
      'lastUpdated':'2020-12-28T17:30:51Z',
      'platform':{
        'id':'150de273-0850-4372-a6e6-b57daeb4e794',
        'dateCreated':'2020-12-28T17:30:08Z',
        'lastUpdated':'2020-12-28T17:30:08Z',
        'name':'Elgaronline',
        'locators':[
          {
            'id':'76962dbf-bbc7-40a4-8f0f-887c53f152f0',
            'domainName':'www.elgaronline.com'
          }
        ]
      },
      'templatedUrls':[
        {
          'id':'9ededb67-2a77-49ce-b79f-96450b90205a',
          'url':'https://www.elgaronline.com/view/9781843769590.xml',
          'name':'defaultUrl',
          'resource':{
            'id':'137190c9-139a-4b4f-bcbc-e9b4460e469e'
          }
        }
      ],
      'coverage':[

      ],
      'titleInstance':{
        'id':'e77aa4d1-3f93-4996-ae1e-878612bf2556',
        'subType':{
          'id':'2c9180b476aa415c0176aa41b056001c',
          'value':'electronic',
          'label':'Electronic'
        },
        'dateCreated':'2020-12-28T17:30:51Z',
        'tags':[

        ],
        'lastUpdated':'2020-12-28T17:30:51Z',
        'publicationType':{
          'id':'2c9180b476aa415c0176aa5c6c090049',
          'value':'book',
          'label':'Book'
        },
        'identifiers':[
          {
            'title':{
              'id':'e77aa4d1-3f93-4996-ae1e-878612bf2556'
            },
            'status':{
              'id':'2c9180b476aa415c0176aa41cda80047',
              'value':'approved',
              'label':'approved'
            },
            'identifier':{
              'value':'9781845425678',
              'ns':{
                'value':'isbn'
              }
            }
          }
        ],
        'coverage':[

        ],
        'name':'"Institutions, industrial upgrading, and economic performance in Japan: the ""flying-geese"" paradigm of catch-up growth"',
        'type':{
          'id':'2c9180b476aa415c0176aa41b05d001e',
          'value':'monograph',
          'label':'Monograph'
        },
        'suppressFromDiscovery':false,
        'work':{
          'id':'800989f7-da3f-4f27-81d9-dda8f27373f5'
        },
        'class':'org.olf.kb.TitleInstance',
        'longName':'"Institutions, industrial upgrading, and economic performance in Japan: the ""flying-geese"" paradigm of catch-up growth"',
        'relatedTitles':[

        ]
      },
      'url':'https://www.elgaronline.com/view/9781843769590.xml',
      'name':"'\"Institutions, industrial upgrading, and economic performance in Japan: the \"\"flying-geese\"\" paradigm of ca...' on Platform 'Elgaronline'",
      'suppressFromDiscovery':false,
      'class':'org.olf.kb.PlatformTitleInstance',
      'longName':"'\"Institutions, industrial upgrading, and economic performance in Japan: the \"\"flying-geese\"\" paradigm of catch-up growth\"' on Platform 'Elgaronline'"
    },
    'pkg':{
      'id':'0c8a8b44-44a2-4423-8b6e-b1df806e474f',
      'dateCreated':'2020-12-28T17:30:08Z',
      'tags':[

      ],
      'lastUpdated':'2020-12-28T17:30:08Z',
      'vendor':{
        'id':'87b38f36-6dfd-4f91-9675-82bafeba4fd3',
        'name':'Edward Elgar',
        'orgsUuid_object':{
          'error':400,
          'message':'Bad Request'
        }
      },
      'coverage':[

      ],
      'source':'GOKb',
      'remoteKb':{
        'id':'a375f1a7-cbaf-486f-87ec-5939280a37c6',
        'cursor':'2020-11-06T11:46:34Z',
        'active':true,
        'trustedSourceTI':false,
        'activationEnabled':false,
        'readonly':false,
        'syncStatus':'idle',
        'lastCheck':1609181451045,
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
    },
    'addedTimestamp':1609176607962,
    'name':"'\"Institutions, industrial upgrading, and economic performance in Ja...' on Platform 'Elgaronline' in Package Edward Elgar:Edward Elgar E-Book Archive in Business & Management, ...",
    'lastSeenTimestamp':1609176607962,
    'suppressFromDiscovery':false,
    'longName':"'\"Institutions, industrial upgrading, and economic performance in Japan: the \"\"flying-geese\"\" paradigm of catch-up growth\"' on Platform 'Elgaronline' in Package Edward Elgar:Edward Elgar E-Book Archive in Business & Management, Economics and Finance:Nationallizenz",
    'class':'org.olf.kb.PackageContentItem'
  },
  'rowIndex':1
};

describe('EResourceKB', () => {
  test('renders expected eresource data source for a PCI', () => {
    const { getByText } = render(
      <EResourceKB
        resource={PCIresource}
      />
    );

    expect(getByText('GOKb_TEST')).toBeInTheDocument();
  });

  test('renders expected eresource data source for a package', () => {
    const { getByText } = render(
      <EResourceKB
        resource={PackageResource}
      />
    );

    expect(getByText('GOKb_PACKAGE')).toBeInTheDocument();
  });

  test('renders no value for an empty resource', () => {
    const { getByText } = renderWithIntl(
      <EResourceKB
        resource={{}}
      />,
      [{
        prefix: 'stripes-components',
        translations: { 'noValue.noValueSet': 'No value set' },
      }]
    );

    expect(getByText('-')).toBeInTheDocument();
  });
});
