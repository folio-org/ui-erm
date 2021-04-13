import React from 'react';
import '@folio/stripes-erm-components/test/jest/__mock__';
import { renderWithIntl, TestForm } from '@folio/stripes-erm-components/test/jest/helpers';
import { Accordion, Button } from '@folio/stripes-testing';
import translationsProperties from '../../../../test/helpers';
import PCIFormCoverage from './PCIFormCoverage';

const onSubmit = jest.fn();

const values = {
  'id':'7d25cb14-a7a4-44ee-91a6-8b37021010c5',
  'dateCreated':'2021-01-27T01:57:13Z',
  'tags':[

  ],
  'lastUpdated':'2021-01-27T01:57:13Z',
  'depth':'Fulltext',
  'embargo': {
    'movingWallEnd': {
      'length': 2,
      'unit': 'months'
    },
    'movingWallStart': {
      'length': 10,
      'unit': 'years'
    }
  },
  'coverage':[
    {
      'id':'b8189b73-800b-4f88-876b-b7baea01b631',
      'startDate':'2003-11-01',
      'endDate':'2013-03-15',
      'startVolume':'5',
      'startIssue':'Nov',
      'endVolume':'9',
      'endIssue':'1-4',
      'summary':'v5/iNov/2003-11-01 - v9/i1-4/2013-03-15'
    }
  ],
  'pti':{
    'id':'e04eac0a-bbe4-48ef-b8fc-70a7ca051169',
    'dateCreated':'2021-01-27T01:57:13Z',
    'tags':[

    ],
    'lastUpdated':'2021-01-27T01:57:13Z',
    'platform':{
      'id':'6f52937f-f191-4c2a-96fe-8537bbe29921',
      'dateCreated':'2021-01-27T01:44:47Z',
      'lastUpdated':'2021-01-27T01:44:47Z',
      'name':'DeGruyter Online',
      'locators':[
        {
          'id':'a68a8076-484b-473e-813d-985557c847d8',
          'domainName':'www.degruyter.com'
        }
      ]
    },
    'templatedUrls':[
      {
        'id':'b20b242a-d91d-4831-93fb-f0373b1a9b7c',
        'url':'https://www.degruyter.com/openurl?genre=journal&issn=2191-2491',
        'name':'defaultUrl',
        'resource':{
          'id':'e04eac0a-bbe4-48ef-b8fc-70a7ca051169'
        }
      }
    ],
    'coverage':[
      {
        'id':'7e88f690-4720-43ed-a595-75c441644870',
        'startDate':'2003-11-01',
        'endDate':'2013-03-15',
        'summary':'v*/i*/2003-11-01 - v*/i*/2013-03-15'
      }
    ],
    'titleInstance':{
      'id':'0372a359-0de4-4a04-8fcd-3f7bd6f9e07e',
      'subType':{
        'id':'2c91809a7741802c0177418300d9000b',
        'value':'electronic',
        'label':'Electronic'
      },
      'dateCreated':'2021-01-27T01:57:13Z',
      'tags':[

      ],
      'lastUpdated':'2021-01-27T01:57:13Z',
      'publicationType':{
        'id':'2c91809a7741802c0177418314cc0045',
        'value':'journal',
        'label':'Journal'
      },
      'identifiers':[
        {
          'title':{
            'id':'0372a359-0de4-4a04-8fcd-3f7bd6f9e07e'
          },
          'status':{
            'id':'2c91809a7741802c0177418315150047',
            'value':'approved',
            'label':'approved'
          },
          'identifier':{
            'value':'151865',
            'ns':{
              'value':'ezb'
            }
          }
        },
        {
          'title':{
            'id':'0372a359-0de4-4a04-8fcd-3f7bd6f9e07e'
          },
          'status':{
            'id':'2c91809a7741802c0177418315150047',
            'value':'approved',
            'label':'approved'
          },
          'identifier':{
            'value':'2191-2491',
            'ns':{
              'value':'eissn'
            }
          }
        },
        {
          'title':{
            'id':'0372a359-0de4-4a04-8fcd-3f7bd6f9e07e'
          },
          'status':{
            'id':'2c91809a7741802c0177418315150047',
            'value':'approved',
            'label':'approved'
          },
          'identifier':{
            'value':'2598375-1',
            'ns':{
              'value':'zdb'
            }
          }
        }
      ],
      'coverage':[
        {
          'id':'84f26a2d-be63-4999-85df-c591bb7d2166',
          'startDate':'2003-11-01',
          'endDate':'2013-03-15',
          'summary':'v*/i*/2003-11-01 - v*/i*/2013-03-15'
        }
      ],
      'name':'BioInorganic reaction mechanisms',
      'type':{
        'id':'2c91809a7741802c0177418300e8000e',
        'value':'serial',
        'label':'Serial'
      },
      'suppressFromDiscovery':false,
      'work':{
        'id':'2381b931-fdfe-41af-b59b-8f9a79249288'
      },
      'class':'org.olf.kb.TitleInstance',
      'longName':'BioInorganic reaction mechanisms',
      'relatedTitles':[
        {
          'id':'567a2509-c011-483d-a2f3-508c35d77062',
          'subType':{
            'id':'2c91809a7741802c0177418300d3000a',
            'value':'print',
            'label':'Print'
          },
          'publicationType':{
            'id':'2c91809a7741802c0177418314cc0045',
            'value':'journal',
            'label':'Journal'
          },
          'identifiers':[
            {
              'title':{
                'id':'567a2509-c011-483d-a2f3-508c35d77062'
              },
              'status':{
                'id':'2c91809a7741802c0177418315150047',
                'value':'approved',
                'label':'approved'
              },
              'identifier':{
                'value':'2191-2483',
                'ns':{
                  'value':'issn'
                }
              }
            }
          ],
          'name':'BioInorganic reaction mechanisms',
          'type':{
            'id':'2c91809a7741802c0177418300e8000e',
            'value':'serial',
            'label':'Serial'
          },
          'longName':'BioInorganic reaction mechanisms'
        }
      ]
    },
    'url':'https://www.degruyter.com/openurl?genre=journal&issn=2191-2491',
    'name':"'BioInorganic reaction mechanisms' on Platform 'DeGruyter Online'",
    'suppressFromDiscovery':false,
    'class':'org.olf.kb.PlatformTitleInstance',
    'longName':"'BioInorganic reaction mechanisms' on Platform 'DeGruyter Online'"
  },
  'pkg':{
    'id':'f800ff26-59f7-43b5-a9da-9c5d5343ab85',
    'dateCreated':'2021-01-27T01:57:13Z',
    'lastUpdated':'2021-01-27T01:57:13Z',
    'vendor':{
      'id':'a7aad826-7fbe-47d7-8971-e2877d692458',
      'name':'De Gruyter',
      'orgsUuid_object':{
        'error':400,
        'message':'Bad Request'
      }
    },
    'source':'GOKb',
    'remoteKb':{
      'id':'05f9853f-e79a-4d1f-b316-16baa3507d20',
      'cursor':'2021-01-27T19:28:26Z',
      'active':true,
      'trustedSourceTI':false,
      'activationEnabled':false,
      'readonly':false,
      'syncStatus':'idle',
      'lastCheck':1611780133068,
      'name':'GOKb_TEST',
      'type':'org.olf.kb.adapters.GOKbOAIAdapter',
      'fullPrefix':'gokb',
      'uri':'http://gokbt.gbv.de/gokb/oai/index',
      'supportsHarvesting':true,
      'rectype':1
    },
    'name':'De Gruyter : Journal Archive Package Biology, Chemistry, Geosciences : 2019-07-08',
    'suppressFromDiscovery':false,
    'reference':'De_Gruyter_:_Journal_Archive_Package_Biology,_Chemistry,_Geosciences_:_2019-07-08',
    'resourceCount':21,
    'class':'org.olf.kb.Pkg'
  },
  'addedTimestamp':1611712633682,
  'name':"'BioInorganic reaction mechanisms' on Platform 'DeGruyter Online' in Package De Gruyter : Journal Archive Package Biology, Chemistry, Geoscience...",
  'lastSeenTimestamp':1611712633682,
  'suppressFromDiscovery':false,
  'longName':"'BioInorganic reaction mechanisms' on Platform 'DeGruyter Online' in Package De Gruyter : Journal Archive Package Biology, Chemistry, Geosciences : 2019-07-08",
  'class':'org.olf.kb.PackageContentItem'
};

describe('PCIFormCoverage', () => {
  let renderComponent;

  beforeEach(() => {
    renderComponent = renderWithIntl(
      <TestForm onSubmit={onSubmit}>
        <PCIFormCoverage
          values={values}
        />
      </TestForm>,
      translationsProperties
    );
  });

  test('renders the Accordion', async () => {
    await Accordion('Coverage').exists();
  });

  test('renders the coverage field array', () => {
    const { getByTestId } = renderComponent;
    expect(getByTestId('coverageFieldArray')).toBeInTheDocument();
  });

  test('renders embargo', () => {
    const { getByTestId } = renderComponent;
    expect(getByTestId('embargo')).toBeInTheDocument();
  });

  test('renders the Add coverage button', async () => {
    await Button('Add coverage').exists();
  });
});
