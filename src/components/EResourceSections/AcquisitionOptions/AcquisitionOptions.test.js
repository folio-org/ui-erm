import React from 'react';
import '@folio/stripes-erm-components/test/jest/__mock__';
import { renderWithIntl } from '@folio/stripes-erm-components/test/jest/helpers';
import { Accordion, MultiColumnList, MultiColumnListCell } from '@folio/stripes-testing';
import { MemoryRouter } from 'react-router-dom';
import translationsProperties from '../../../../test/helpers';
import AcquisitionOptions from './AcquisitionOptions';

jest.mock('../../AddToBasketButton', () => () => <div>AddToBasketButton</div>);

const onNeedMoreEntitlementOptions = jest.fn();
const onEResourceClick = jest.fn();

const data = {
  'eresource':{
    'id':'825331c3-c137-44e4-bd6d-75245969ffdc',
    'subType':{
      'id':'2c91809a7722d6c7017722d956450015',
      'value':'electronic',
      'label':'Electronic'
    },
    'dateCreated':'2021-01-21T03:09:56Z',
    'tags':[

    ],
    'lastUpdated':'2021-01-21T03:09:56Z',
    'publicationType':{
      'id':'2c91809a7722d6c7017722e57fbe0049',
      'value':'book',
      'label':'Book'
    },
    'identifiers':[
      {
        'title':{
          'id':'825331c3-c137-44e4-bd6d-75245969ffdc'
        },
        'status':{
          'id':'2c91809a7722d6c7017722d96af70047',
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
      'id':'2c91809a7722d6c7017722d9564b0017',
      'value':'monograph',
      'label':'Monograph'
    },
    'suppressFromDiscovery':false,
    'work':{
      'id':'2b2e0e64-d88a-4463-bb2f-342a09c6cf5d'
    },
    'class':'org.olf.kb.TitleInstance',
    'longName':'"Institutions, industrial upgrading, and economic performance in Japan: the ""flying-geese"" paradigm of catch-up growth"',
    'relatedTitles':[

    ]
  },
  'entitlementOptions':[
    {
      'id':'6b8ac896-324c-4642-b724-2915c65dd953',
      'class':'org.olf.kb.PackageContentItem',
      'name':"'\"Institutions, industrial upgrading, and economic performance in Ja...' on Platform 'Elgaronline' in Package Edward Elgar:Edward Elgar E-Book Archive in Business & Management, ...",
      'suppressFromDiscovery':false,
      'tags':[

      ],
      'customCoverage':false,
      '_object':{
        'id':'6b8ac896-324c-4642-b724-2915c65dd953',
        'accessStart':'2008-01-01',
        'dateCreated':'2021-01-21T03:09:56Z',
        'tags':[

        ],
        'lastUpdated':'2021-01-21T03:10:38Z',
        'depth':'Fulltext',
        'coverage':[

        ],
        'pti':{
          'id':'48be9c5f-f97a-4e1c-83f5-e7b80a58c231',
          'dateCreated':'2021-01-21T03:09:56Z',
          'tags':[

          ],
          'lastUpdated':'2021-01-21T03:09:56Z',
          'platform':{
            'id':'cada9bdc-9930-45a3-a54f-293a35f0de78',
            'dateCreated':'2021-01-21T03:09:13Z',
            'lastUpdated':'2021-01-21T03:09:13Z',
            'name':'Elgaronline',
            'locators':[
              {
                'id':'ac20a97a-a5ef-44eb-86eb-f425ef91cbc8',
                'domainName':'www.elgaronline.com'
              }
            ]
          },
          'templatedUrls':[
            {
              'id':'caac3447-cef5-4d86-8b91-30edca766da3',
              'url':'https://www.elgaronline.com/view/9781843769590.xml',
              'name':'defaultUrl',
              'resource':{
                'id':'48be9c5f-f97a-4e1c-83f5-e7b80a58c231'
              }
            }
          ],
          'coverage':[

          ],
          'titleInstance':{
            'id':'825331c3-c137-44e4-bd6d-75245969ffdc',
            'subType':{
              'id':'2c91809a7722d6c7017722d956450015',
              'value':'electronic',
              'label':'Electronic'
            },
            'dateCreated':'2021-01-21T03:09:56Z',
            'tags':[

            ],
            'lastUpdated':'2021-01-21T03:09:56Z',
            'publicationType':{
              'id':'2c91809a7722d6c7017722e57fbe0049',
              'value':'book',
              'label':'Book'
            },
            'identifiers':[
              {
                'title':{
                  'id':'825331c3-c137-44e4-bd6d-75245969ffdc'
                },
                'status':{
                  'id':'2c91809a7722d6c7017722d96af70047',
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
              'id':'2c91809a7722d6c7017722d9564b0017',
              'value':'monograph',
              'label':'Monograph'
            },
            'suppressFromDiscovery':false,
            'work':{
              'id':'2b2e0e64-d88a-4463-bb2f-342a09c6cf5d'
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
          'id':'bc72234d-8a0a-4747-a89b-2e246ffa614f',
          'dateCreated':'2021-01-21T03:09:13Z',
          'lastUpdated':'2021-01-21T03:09:13Z',
          'vendor':{
            'id':'f130b745-1824-4e3c-bcfa-31335f43f9a6',
            'name':'Edward Elgar',
            'orgsUuid_object':{
              'error':400,
              'message':'Bad Request'
            }
          },
          'source':'GOKb',
          'remoteKb':{
            'id':'a82ae5df-af36-4800-ae03-2798e9cea4e0',
            'cursor':'2021-01-14T14:04:45Z',
            'active':true,
            'trustedSourceTI':false,
            'activationEnabled':false,
            'readonly':false,
            'syncStatus':'idle',
            'lastCheck':1611251312813,
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
        'addedTimestamp':1611198553495,
        'name':"'\"Institutions, industrial upgrading, and economic performance in Ja...' on Platform 'Elgaronline' in Package Edward Elgar:Edward Elgar E-Book Archive in Business & Management, ...",
        'lastSeenTimestamp':1611198553495,
        'suppressFromDiscovery':false,
        'longName':"'\"Institutions, industrial upgrading, and economic performance in Japan: the \"\"flying-geese\"\" paradigm of catch-up growth\"' on Platform 'Elgaronline' in Package Edward Elgar:Edward Elgar E-Book Archive in Business & Management, Economics and Finance:Nationallizenz",
        'class':'org.olf.kb.PackageContentItem'
      }
    },
    {
      'id':'bc72234d-8a0a-4747-a89b-2e246ffa614f',
      'class':'org.olf.kb.Pkg',
      'name':'Edward Elgar:Edward Elgar E-Book Archive in Business & Management, Economics and Finance:Nationallizenz',
      'suppressFromDiscovery':false,
      'publicationType':{
        'id':'2c91809a7722d6c7017722e57fde0049',
        'value':'package',
        'label':'Package'
      },
      'tags':[

      ],
      'customCoverage':false,
      '_object':{
        'id':'bc72234d-8a0a-4747-a89b-2e246ffa614f',
        'dateCreated':'2021-01-21T03:09:13Z',
        'tags':[

        ],
        'lastUpdated':'2021-01-21T03:09:13Z',
        'vendor':{
          'id':'f130b745-1824-4e3c-bcfa-31335f43f9a6',
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
          'id':'a82ae5df-af36-4800-ae03-2798e9cea4e0',
          'cursor':'2021-01-14T14:04:45Z',
          'active':true,
          'trustedSourceTI':false,
          'activationEnabled':false,
          'readonly':false,
          'syncStatus':'idle',
          'lastCheck':1611251312813,
          'name':'GOKb',
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
      }
    }
  ],
  'entitlementOptionsCount':2,
  'entitlements':[

  ],
  'entitlementsCount':0,
  'packageContentsFilter':'current',
  'packageContents':[

  ],
  'packageContentsCount':0,
  'relatedEntitlements':[

  ],
  'searchString':'?sort=name'
};

describe('AcquisitionOptions', () => {
  beforeEach(() => {
    renderWithIntl(
      <MemoryRouter>
        <AcquisitionOptions
          data={data}
          handlers={{ onNeedMoreEntitlementOptions, onEResourceClick }}
          id="acqOptions"
        />
      </MemoryRouter>,
      translationsProperties
    );
  });

  test('renders an Accordion', async () => {
    await Accordion('Options for acquiring e-resource').exists();
  });

  test('renders the MCL', async () => {
    await MultiColumnList('acqOptions-mcl').exists();
  });

  test('renders expected column count', async () => {
    await MultiColumnList({ columnCount: 6 }).exists();
  });

  test('renders expected columns', async () => {
    await MultiColumnList({ columns: ['Data source', 'Name', 'Coverage', 'Platform', 'Acquisition method', 'Actions'] }).exists();
  });

  test('renders expected row count', async () => {
    await MultiColumnList({ rowCount: data.entitlementOptions.length }).exists();
  });

  test('renders expected data source value in each row', async () => {
    Promise.all([
      await MultiColumnListCell({ row: 0, columnIndex: 0 }).has({ content: 'GOKb_TEST' }),
      await MultiColumnListCell({ row: 1, columnIndex: 0 }).has({ content: 'GOKb' })
    ]);
  });

  test('renders expected acquisition method in each row', async () => {
    Promise.all([
      await MultiColumnListCell({ row: 0, columnIndex: 4 }).has({ content: 'Book' }),
      await MultiColumnListCell({ row: 1, columnIndex: 4 }).has({ content: 'Package' })
    ]);
  });

  describe('clicking a row', () => {
    beforeEach(async () => {
      await MultiColumnList().click({ row: 0, columnIndex: 1 });
    });
    test('should invoke the onEResourceClick handler', () => {
      expect(onEResourceClick.mock.calls.length).toBe(1);
    });
  });
});
