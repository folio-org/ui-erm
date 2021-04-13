import React from 'react';
import '@folio/stripes-erm-components/test/jest/__mock__';
import { MemoryRouter } from 'react-router-dom';
import { renderWithIntl } from '@folio/stripes-erm-components/test/jest/helpers';
import BasketList from './BasketList';

const onRemoveItem = jest.fn();
const onToggleAll = jest.fn();
const onToggleItem = jest.fn();

const basket = [
  {
    'class':'org.olf.kb.PackageContentItem',
    'id':'211c1940-87d0-473c-b55b-be205fd45f15',
    'name':"'\"Institutions, industrial upgrading, and economic performance in Ja...' on Platform 'Elgaronline' in Package Edward Elgar:Edward Elgar E-Book Archive in Business & Management, ...",
    '_object':{
      'id':'211c1940-87d0-473c-b55b-be205fd45f15',
      'accessStart':'2008-01-01',
      'dateCreated':'2020-12-16T03:51:21Z',
      'tags':[

      ],
      'lastUpdated':'2020-12-16T03:52:11Z',
      'depth':'Fulltext',
      'coverage':[

      ],
      'pti':{
        'id':'67e69cbb-0a6d-4878-a19c-464a137796b2',
        'dateCreated':'2020-12-16T03:51:21Z',
        'tags':[

        ],
        'lastUpdated':'2020-12-16T03:51:21Z',
        'platform':{
          'id':'295bc8d3-f4f4-4068-87c7-e1e8bfa45300',
          'dateCreated':'2020-12-16T03:50:30Z',
          'lastUpdated':'2020-12-16T03:50:30Z',
          'name':'Elgaronline',
          'locators':[
            {
              'id':'9202e9fe-8aa6-4910-881d-0c8cf91c682e',
              'domainName':'www.elgaronline.com'
            }
          ]
        },
        'templatedUrls':[
          {
            'id':'6cf2f31b-04d7-45b1-97ce-6458064acc97',
            'url':'https://www.elgaronline.com/view/9781843769590.xml',
            'name':'defaultUrl',
            'resource':{
              'id':'67e69cbb-0a6d-4878-a19c-464a137796b2'
            }
          }
        ],
        'coverage':[

        ],
        'titleInstance':{
          'id':'c6f69a25-f9a5-4416-bff6-72b405b9c025',
          'subType':{
            'id':'2c9180b37669967101766996cc440036',
            'value':'electronic',
            'label':'Electronic'
          },
          'dateCreated':'2020-12-16T03:51:21Z',
          'tags':[

          ],
          'lastUpdated':'2020-12-16T03:51:21Z',
          'publicationType':{
            'id':'2c9180b376699671017669a59af70049',
            'value':'book',
            'label':'Book'
          },
          'identifiers':[
            {
              'title':{
                'id':'c6f69a25-f9a5-4416-bff6-72b405b9c025'
              },
              'status':{
                'id':'2c9180b37669967101766996e0970047',
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
            'id':'2c9180b37669967101766996cc4b0038',
            'value':'monograph',
            'label':'Monograph'
          },
          'suppressFromDiscovery':false,
          'work':{
            'id':'81fb2047-9210-4f03-a722-9d3a663215b8'
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
        'id':'7982495e-441a-4eb9-96fd-a6d34a7d934a',
        'dateCreated':'2020-12-16T03:50:30Z',
        'lastUpdated':'2020-12-16T03:50:30Z',
        'vendor':{
          'id':'481cd982-9274-4af8-8d3d-009c87788983',
          'name':'Edward Elgar',
          'orgsUuid_object':{
            'error':400,
            'message':'Bad Request'
          }
        },
        'source':'GOKb',
        'remoteKb':{
          'id':'9968a0cb-ec5e-473c-9975-d09fca6bc185',
          'cursor':'2020-11-06T11:46:34Z',
          'active':true,
          'trustedSourceTI':false,
          'activationEnabled':false,
          'readonly':false,
          'syncStatus':'idle',
          'lastCheck':1608154108749,
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
      'addedTimestamp':1608090630848,
      'name':"'\"Institutions, industrial upgrading, and economic performance in Ja...' on Platform 'Elgaronline' in Package Edward Elgar:Edward Elgar E-Book Archive in Business & Management, ...",
      'lastSeenTimestamp':1608090630848,
      'suppressFromDiscovery':false,
      'longName':"'\"Institutions, industrial upgrading, and economic performance in Japan: the \"\"flying-geese\"\" paradigm of catch-up growth\"' on Platform 'Elgaronline' in Package Edward Elgar:Edward Elgar E-Book Archive in Business & Management, Economics and Finance:Nationallizenz",
      'class':'org.olf.kb.PackageContentItem'
    }
  },
  {
    'id':'7982495e-441a-4eb9-96fd-a6d34a7d934a',
    'class':'org.olf.kb.Pkg',
    'name':'Edward Elgar:Edward Elgar E-Book Archive in Business & Management, Economics and Finance:Nationallizenz',
    'suppressFromDiscovery':false,
    'tags':[

    ],
    'customCoverage':false,
    '_object':{
      'id':'7982495e-441a-4eb9-96fd-a6d34a7d934a',
      'dateCreated':'2020-12-16T03:50:30Z',
      'tags':[

      ],
      'lastUpdated':'2020-12-16T03:50:30Z',
      'vendor':{
        'id':'481cd982-9274-4af8-8d3d-009c87788983',
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
        'id':'9968a0cb-ec5e-473c-9975-d09fca6bc185',
        'cursor':'2020-11-06T11:46:34Z',
        'active':true,
        'trustedSourceTI':false,
        'activationEnabled':false,
        'readonly':false,
        'syncStatus':'idle',
        'lastCheck':1608154108749,
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
    'rowIndex':1
  },
  {
    'id':'beadf493-5674-4736-bd70-42679c017286',
    'class':'org.olf.kb.Pkg',
    'name':'Duncker & Humblot E-Books „Best of reprints“ WIRTSCHAFT & FINANZEN 1875–1941',
    'suppressFromDiscovery':false,
    'tags':[

    ],
    'customCoverage':false,
    '_object':{
      'id':'beadf493-5674-4736-bd70-42679c017286',
      'dateCreated':'2020-12-16T03:43:49Z',
      'tags':[

      ],
      'lastUpdated':'2020-12-16T03:43:49Z',
      'vendor':{
        'id':'411f0d76-8303-4bfe-968e-76d9b9ee3974',
        'name':'Duncker & Humblot',
        'orgsUuid_object':{
          'error':400,
          'message':'Bad Request'
        }
      },
      'coverage':[

      ],
      'source':'GOKb',
      'remoteKb':{
        'id':'9968a0cb-ec5e-473c-9975-d09fca6bc185',
        'cursor':'2020-11-06T11:46:34Z',
        'active':true,
        'trustedSourceTI':false,
        'activationEnabled':false,
        'readonly':false,
        'syncStatus':'idle',
        'lastCheck':1608154108749,
        'name':'GOKb_TEST',
        'type':'org.olf.kb.adapters.GOKbOAIAdapter',
        'fullPrefix':'gokb',
        'uri':'http://gokbt.gbv.de/gokb/oai/index',
        'supportsHarvesting':true,
        'rectype':1
      },
      'name':'Duncker & Humblot E-Books „Best of reprints“ WIRTSCHAFT & FINANZEN 1875–1941',
      'suppressFromDiscovery':false,
      'reference':'Duncker_&_Humblot_E-Books_„Best_of_reprints“_WIRTSCHAFT_&_FINANZEN_1875–1941',
      'resourceCount':100,
      'class':'org.olf.kb.Pkg'
    },
    'rowIndex':0
  },
  {
    'id':'ce1b861b-8b96-4aa9-bd1d-096a87ad5c10',
    'class':'org.olf.kb.PackageContentItem',
    'name':"'\"Wirtschaftswissenschaft?\": [Lujo Brentano zum siebzigsten Geburtst...' on Platform 'Duncker & Humblot eLibrary' in Package Duncker & Humblot E-Books „Best of reprints“ WIRTSCHAFT & FINANZEN ...",
    'suppressFromDiscovery':false,
    'tags':[

    ],
    'customCoverage':false,
    '_object':{
      'id':'ce1b861b-8b96-4aa9-bd1d-096a87ad5c10',
      'dateCreated':'2020-12-16T03:43:50Z',
      'tags':[

      ],
      'lastUpdated':'2020-12-16T03:43:50Z',
      'depth':'Fulltext',
      'coverage':[

      ],
      'pti':{
        'id':'588c9222-ff73-4288-a21f-074b77c3f13e',
        'dateCreated':'2020-12-16T03:43:50Z',
        'tags':[

        ],
        'lastUpdated':'2020-12-16T03:43:50Z',
        'platform':{
          'id':'b4cbde5f-7918-4221-a466-bc61c92b2393',
          'dateCreated':'2020-12-16T03:43:49Z',
          'lastUpdated':'2020-12-16T03:43:49Z',
          'name':'Duncker & Humblot eLibrary',
          'locators':[
            {
              'id':'bae0645d-86b7-4fe3-9825-16a52e3e9e6b',
              'domainName':'elibrary.duncker-humblot.com'
            }
          ]
        },
        'templatedUrls':[
          {
            'id':'f57a2a1f-05ca-40d6-9a65-d725e745430d',
            'url':'http://elibrary.duncker-humblot.de/9783428569625/U1',
            'name':'defaultUrl',
            'resource':{
              'id':'588c9222-ff73-4288-a21f-074b77c3f13e'
            }
          }
        ],
        'coverage':[

        ],
        'titleInstance':{
          'id':'840a399f-c867-4166-9d12-923bd4209c76',
          'subType':{
            'id':'2c9180b37669967101766996cc440036',
            'value':'electronic',
            'label':'Electronic'
          },
          'dateCreated':'2020-12-16T03:43:50Z',
          'tags':[

          ],
          'lastUpdated':'2020-12-16T03:43:50Z',
          'publicationType':{
            'id':'2c9180b376699671017669a59af70049',
            'value':'book',
            'label':'Book'
          },
          'identifiers':[
            {
              'title':{
                'id':'840a399f-c867-4166-9d12-923bd4209c76'
              },
              'status':{
                'id':'2c9180b37669967101766996e0970047',
                'value':'approved',
                'label':'approved'
              },
              'identifier':{
                'value':'978-3-428-16962-7',
                'ns':{
                  'value':'pisbn'
                }
              }
            },
            {
              'title':{
                'id':'840a399f-c867-4166-9d12-923bd4209c76'
              },
              'status':{
                'id':'2c9180b37669967101766996e0970047',
                'value':'approved',
                'label':'approved'
              },
              'identifier':{
                'value':'978-3-428-56962-5',
                'ns':{
                  'value':'isbn'
                }
              }
            }
          ],
          'coverage':[

          ],
          'name':'"Wirtschaftswissenschaft?": [Lujo Brentano zum siebzigsten Geburtstag in alter Verehrung zugeeignet]',
          'type':{
            'id':'2c9180b37669967101766996cc4b0038',
            'value':'monograph',
            'label':'Monograph'
          },
          'suppressFromDiscovery':false,
          'work':{
            'id':'7505e98b-5f09-4f5f-896d-7d01dbd3f734'
          },
          'class':'org.olf.kb.TitleInstance',
          'longName':'"Wirtschaftswissenschaft?": [Lujo Brentano zum siebzigsten Geburtstag in alter Verehrung zugeeignet]',
          'relatedTitles':[

          ]
        },
        'url':'http://elibrary.duncker-humblot.de/9783428569625/U1',
        'name':"'\"Wirtschaftswissenschaft?\": [Lujo Brentano zum siebzigsten Geburtstag in alter Verehrung zugeeignet]' on Platform 'Duncker & Humblot eLibrary'",
        'suppressFromDiscovery':false,
        'class':'org.olf.kb.PlatformTitleInstance',
        'longName':"'\"Wirtschaftswissenschaft?\": [Lujo Brentano zum siebzigsten Geburtstag in alter Verehrung zugeeignet]' on Platform 'Duncker & Humblot eLibrary'"
      },
      'pkg':{
        'id':'beadf493-5674-4736-bd70-42679c017286',
        'dateCreated':'2020-12-16T03:43:49Z',
        'tags':[

        ],
        'lastUpdated':'2020-12-16T03:43:49Z',
        'vendor':{
          'id':'411f0d76-8303-4bfe-968e-76d9b9ee3974',
          'name':'Duncker & Humblot',
          'orgsUuid_object':{
            'error':400,
            'message':'Bad Request'
          }
        },
        'coverage':[

        ],
        'source':'GOKb',
        'remoteKb':{
          'id':'9968a0cb-ec5e-473c-9975-d09fca6bc185',
          'cursor':'2020-11-06T11:46:34Z',
          'active':true,
          'trustedSourceTI':false,
          'activationEnabled':false,
          'readonly':false,
          'syncStatus':'idle',
          'lastCheck':1608154108749,
          'name':'GOKb_TEST',
          'type':'org.olf.kb.adapters.GOKbOAIAdapter',
          'fullPrefix':'gokb',
          'uri':'http://gokbt.gbv.de/gokb/oai/index',
          'supportsHarvesting':true,
          'rectype':1
        },
        'name':'Duncker & Humblot E-Books „Best of reprints“ WIRTSCHAFT & FINANZEN 1875–1941',
        'suppressFromDiscovery':false,
        'reference':'Duncker_&_Humblot_E-Books_„Best_of_reprints“_WIRTSCHAFT_&_FINANZEN_1875–1941',
        'resourceCount':100,
        'class':'org.olf.kb.Pkg'
      },
      'addedTimestamp':1608090229477,
      'name':"'\"Wirtschaftswissenschaft?\": [Lujo Brentano zum siebzigsten Geburtst...' on Platform 'Duncker & Humblot eLibrary' in Package Duncker & Humblot E-Books „Best of reprints“ WIRTSCHAFT & FINANZEN ...",
      'lastSeenTimestamp':1608090229477,
      'suppressFromDiscovery':false,
      'longName':"'\"Wirtschaftswissenschaft?\": [Lujo Brentano zum siebzigsten Geburtstag in alter Verehrung zugeeignet]' on Platform 'Duncker & Humblot eLibrary' in Package Duncker & Humblot E-Books „Best of reprints“ WIRTSCHAFT & FINANZEN 1875–1941",
      'class':'org.olf.kb.PackageContentItem'
    },
    'rowIndex':1
  }
];

const selectedItems = {
  '211c1940-87d0-473c-b55b-be205fd45f15': true,
  'beadf493-5674-4736-bd70-42679c017286': true
};

describe('BasketList', () => {
  test('renders add To Basket button', () => {
    const { getByRole } = renderWithIntl(
      <MemoryRouter>
        <BasketList
          basket={basket}
          onRemoveItem={onRemoveItem}
          onToggleAll={onToggleAll}
          onToggleItem={onToggleItem}
          selectedItems={{}}
        />
      </MemoryRouter>
    );

    expect(getByRole('grid')).toBeInTheDocument();
  });

  test('renders add To Basket button', () => {
    const { getByRole } = renderWithIntl(
      <MemoryRouter>
        <BasketList
          basket={basket}
          onRemoveItem={onRemoveItem}
          onToggleAll={onToggleAll}
          onToggleItem={onToggleItem}
          selectedItems={selectedItems}
        />
      </MemoryRouter>
    );

    expect(getByRole('grid')).toBeInTheDocument();
  });
});
