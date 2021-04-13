import React from 'react';
import '@folio/stripes-erm-components/test/jest/__mock__';
import { TestForm, renderWithIntl } from '@folio/stripes-erm-components/test/jest/helpers';
import userEvent from '@testing-library/user-event';
import BasketSelector from './BasketSelector';

import translationsProperties from '../../../test/helpers';

const onAdd = jest.fn();
const onSubmit = jest.fn();

const basketSelectorProps = {
  'addButtonLabel':'add button',
  'autoFocus':true,
  'basket':[{
    'id':'5650325f-52ef-4ac3-a77a-893911ccb666',
    'class':'org.olf.kb.Pkg',
    'name':'Edward Elgar:Edward Elgar E-Book Archive in Business & Management, Economics and Finance:Nationallizenz',
    'suppressFromDiscovery':false,
    'tags':[

    ],
    'customCoverage':false,
    '_object':{
      'id':'5650325f-52ef-4ac3-a77a-893911ccb666',
      'dateCreated':'2020-12-22T02:04:28Z',
      'tags':[

      ],
      'lastUpdated':'2020-12-22T02:04:28Z',
      'vendor':{
        'id':'75ce6b51-ddd1-4839-806a-3596e05d5e26',
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
        'id':'5cb625f4-7f15-4503-a272-a97d8197e8f0',
        'cursor':'2020-11-06T11:46:34Z',
        'active':true,
        'trustedSourceTI':false,
        'activationEnabled':false,
        'readonly':false,
        'syncStatus':'idle',
        'lastCheck':1608655358964,
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
    'id':'1110ae9d-489d-4864-9183-8dc001a86b44',
    'class':'org.olf.kb.PackageContentItem',
    'name':"'\"Institutions, industrial upgrading, and economic performance in Ja...' on Platform 'Elgaronline' in Package Edward Elgar:Edward Elgar E-Book Archive in Business & Management, ...",
    'suppressFromDiscovery':false,
    'tags':[

    ],
    'customCoverage':false,
    '_object':{
      'id':'1110ae9d-489d-4864-9183-8dc001a86b44',
      'accessStart':'2008-01-01',
      'dateCreated':'2020-12-22T02:05:10Z',
      'tags':[

      ],
      'lastUpdated':'2020-12-22T02:05:50Z',
      'depth':'Fulltext',
      'coverage':[

      ],
      'pti':{
        'id':'736c8453-fd33-483a-935c-6843d64249b8',
        'dateCreated':'2020-12-22T02:05:10Z',
        'tags':[

        ],
        'lastUpdated':'2020-12-22T02:05:10Z',
        'platform':{
          'id':'c0997da1-9c0d-4604-af3e-c74fe4ceed2e',
          'dateCreated':'2020-12-22T02:04:28Z',
          'lastUpdated':'2020-12-22T02:04:28Z',
          'name':'Elgaronline',
          'locators':[
            {
              'id':'f4677ad9-87f7-4034-8249-448c0cb31a44',
              'domainName':'www.elgaronline.com'
            }
          ]
        },
        'templatedUrls':[
          {
            'id':'1863edab-0c17-46fa-b5e7-aebe3a1863a5',
            'url':'https://www.elgaronline.com/view/9781843769590.xml',
            'name':'defaultUrl',
            'resource':{
              'id':'736c8453-fd33-483a-935c-6843d64249b8'
            }
          }
        ],
        'coverage':[

        ],
        'titleInstance':{
          'id':'7082b153-6ac7-4489-95d6-5c79b61e00da',
          'subType':{
            'id':'2c91809a76881ba70176881e15f0001c',
            'value':'electronic',
            'label':'Electronic'
          },
          'dateCreated':'2020-12-22T02:05:10Z',
          'tags':[

          ],
          'lastUpdated':'2020-12-22T02:05:10Z',
          'publicationType':{
            'id':'2c91809a76881ba70176882b43580049',
            'value':'book',
            'label':'Book'
          },
          'identifiers':[
            {
              'title':{
                'id':'7082b153-6ac7-4489-95d6-5c79b61e00da'
              },
              'status':{
                'id':'2c91809a76881ba70176881e29cc0047',
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
            'id':'2c91809a76881ba70176881e15f6001e',
            'value':'monograph',
            'label':'Monograph'
          },
          'suppressFromDiscovery':false,
          'work':{
            'id':'5b997ff7-2409-4b8f-9870-ee717556169b'
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
        'id':'5650325f-52ef-4ac3-a77a-893911ccb666',
        'dateCreated':'2020-12-22T02:04:28Z',
        'lastUpdated':'2020-12-22T02:04:28Z',
        'vendor':{
          'id':'75ce6b51-ddd1-4839-806a-3596e05d5e26',
          'name':'Edward Elgar',
          'orgsUuid_object':{
            'error':400,
            'message':'Bad Request'
          }
        },
        'source':'GOKb',
        'remoteKb':{
          'id':'5cb625f4-7f15-4503-a272-a97d8197e8f0',
          'cursor':'2020-11-06T11:46:34Z',
          'active':true,
          'trustedSourceTI':false,
          'activationEnabled':false,
          'readonly':false,
          'syncStatus':'idle',
          'lastCheck':1608655358964,
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
      'addedTimestamp':1608602668625,
      'name':"'\"Institutions, industrial upgrading, and economic performance in Ja...' on Platform 'Elgaronline' in Package Edward Elgar:Edward Elgar E-Book Archive in Business & Management, ...",
      'lastSeenTimestamp':1608602668625,
      'suppressFromDiscovery':false,
      'longName':"'\"Institutions, industrial upgrading, and economic performance in Japan: the \"\"flying-geese\"\" paradigm of catch-up growth\"' on Platform 'Elgaronline' in Package Edward Elgar:Edward Elgar E-Book Archive in Business & Management, Economics and Finance:Nationallizenz",
      'class':'org.olf.kb.PackageContentItem'
    },
    'rowIndex':0
  }],
  'error':'<FormattedMessage />',
  'fullWidth':true,
  'label':'basketSelector',
  'name':'basketSelector',
  'onAdd':onAdd,
  'required':true
};
describe('BasketSelector', () => {
  test('renders add To Basket button', () => {
    const { getByLabelText } = renderWithIntl(
      <TestForm onSubmit={onSubmit}>
        <BasketSelector
          {...basketSelectorProps}
        />
      </TestForm>, translationsProperties
    );

    expect(getByLabelText(/basketSelector/i)).toBeInTheDocument();
  });

  test('renders add To Basket button', () => {
    const { getByText } = renderWithIntl(
      <TestForm onSubmit={onSubmit}>
        <BasketSelector
          {...basketSelectorProps}
        />
      </TestForm>, translationsProperties

    );

    userEvent.click(getByText(/industrial upgrading/i));
    userEvent.click(getByText(/Finance:Nationallizenz/i));
    userEvent.click(getByText('add button'));
    expect(onAdd.mock.calls.length).toBe(1);
  });
});
