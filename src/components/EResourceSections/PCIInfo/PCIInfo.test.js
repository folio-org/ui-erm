
import React from 'react';
import '@folio/stripes-erm-components/test/jest/__mock__';
import { renderWithIntl } from '@folio/stripes-erm-components/test/jest/helpers';
import { KeyValue } from '@folio/stripes-testing';
import translationsProperties from '../../../../test/helpers';
import PCIInfo from './PCIInfo';

jest.mock('../../AddToBasketButton', () => () => <div>AddToBasketButton</div>);

const pci = {
  'id':'c17079cc-c4b1-4214-aa4d-a7b0156bf644',
  'accessStart':'2008-01-01',
  'accessEnd':'2009-01-01',
  'dateCreated':'2021-01-28T13:11:36Z',
  'tags':[

  ],
  'lastUpdated':'2021-01-28T13:12:22Z',
  'depth':'Fulltext',
  'coverage':[

  ],
  'pti':{
    'id':'e3660182-273e-4908-982e-f463fcb351d5',
    'dateCreated':'2021-01-28T13:11:36Z',
    'tags':[

    ],
    'lastUpdated':'2021-01-28T13:11:36Z',
    'platform':{
      'id':'21bbba64-0658-455e-9daf-edf4a9a10165',
      'dateCreated':'2021-01-28T13:10:50Z',
      'lastUpdated':'2021-01-28T13:10:50Z',
      'name':'Elgaronline',
      'locators':[
        {
          'id':'0c548a73-3d6f-437c-a094-d3e31afa8905',
          'domainName':'www.elgaronline.com'
        }
      ]
    },
    'templatedUrls':[
      {
        'id':'c8559aa2-1736-4654-a904-0debcd4400f8',
        'url':'https://www.elgaronline.com/view/9781843769590.xml',
        'name':'defaultUrl',
        'resource':{
          'id':'e3660182-273e-4908-982e-f463fcb351d5'
        }
      }
    ],
    'coverage':[

    ],
    'titleInstance':{
      'id':'49165c15-08f3-4e0b-8e92-26aec4394b29',
      'subType':{
        'id':'2c91809a774908300177490b0a92000b',
        'value':'electronic',
        'label':'Electronic'
      },
      'dateCreated':'2021-01-28T13:11:36Z',
      'tags':[

      ],
      'lastUpdated':'2021-01-28T13:11:36Z',
      'publicationType':{
        'id':'2c91809a774908300177491877c60049',
        'value':'book',
        'label':'Book'
      },
      'identifiers':[
        {
          'title':{
            'id':'49165c15-08f3-4e0b-8e92-26aec4394b29'
          },
          'status':{
            'id':'2c91809a774908300177490b1f300047',
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
        'id':'2c91809a774908300177490b0a9a000d',
        'value':'monograph',
        'label':'Monograph'
      },
      'suppressFromDiscovery':false,
      'work':{
        'id':'4308f3fe-b6e6-49c0-9fa3-0057de8b71fd'
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
    'id':'dc1f2079-04d9-4bed-801a-b808a0027187',
    'dateCreated':'2021-01-28T13:10:50Z',
    'lastUpdated':'2021-01-28T13:10:50Z',
    'vendor':{
      'id':'617eefa9-3c89-4a09-b326-40d2302fc9d5',
      'name':'Edward Elgar',
      'orgsUuid_object':{
        'error':400,
        'message':'Bad Request'
      }
    },
    'source':'GOKb',
    'remoteKb':{
      'id':'4e5c35f5-2570-4259-8a13-f7eaca072477',
      'cursor':'2021-01-27T19:28:26Z',
      'active':true,
      'trustedSourceTI':false,
      'activationEnabled':false,
      'readonly':false,
      'syncStatus':'idle',
      'lastCheck':1611859686460,
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
  'addedTimestamp':1611839450042,
  'name':"'\"Institutions, industrial upgrading, and economic performance in Ja...' on Platform 'Elgaronline' in Package Edward Elgar:Edward Elgar E-Book Archive in Business & Management, ...",
  'lastSeenTimestamp':1611839450042,
  'suppressFromDiscovery':false,
  'longName':"'\"Institutions, industrial upgrading, and economic performance in Japan: the \"\"flying-geese\"\" paradigm of catch-up growth\"' on Platform 'Elgaronline' in Package Edward Elgar:Edward Elgar E-Book Archive in Business & Management, Economics and Finance:Nationallizenz",
  'class':'org.olf.kb.PackageContentItem'
};

describe('PCIInfo', () => {
  let renderComponent;

  beforeEach(() => {
    renderComponent = renderWithIntl(
      <PCIInfo pci={pci} />,
      translationsProperties
    );
  });

  test('renders the expected headline', () => {
    const { getByText } = renderComponent;
    expect(getByText(pci.name)).toBeInTheDocument();
  });

  test('renders the Title on platform URL header', async () => {
    await KeyValue('Title on platform URL').exists();
  });

  test('renders the expected Title on platform URL', async () => {
    await KeyValue('Title on platform URL').has({ value: pci.pti.url });
  });

  test('renders the Add To Basket Button', () => {
    const { getByText } = renderComponent;
    expect(getByText('AddToBasketButton')).toBeInTheDocument();
  });

  test('renders the Accessible from date header', async () => {
    await KeyValue('Accessible from').exists();
  });

  test('renders the Accessible until date header', async () => {
    await KeyValue('Accessible until').exists();
  });

  test('renders the expected Accessible from date', async () => {
    await KeyValue('Accessible from').has({ value: '2008-01-01' });
  });

  test('renders the expected Accessible until date', async () => {
    await KeyValue('Accessible until').has({ value: '2009-01-01' });
  });
});
