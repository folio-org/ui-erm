import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import '@folio/stripes-erm-components/test/jest/__mock__';
import { renderWithIntl } from '@folio/stripes-erm-components/test/jest/helpers';
import EntitlementAgreementsList from './EntitlementAgreementsList';

const entitlements = [
  {
    'id':'c8028411-16f1-498e-b4cf-be1572f42722',
    'tags':[

    ],
    'owner':{
      'id':'29ad7bea-26d3-4bd5-a392-65a330c96bbc',
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
          'id':'89e6b478-fbb9-4177-b563-a51d6c102e4d',
          'startDate':'2020-12-16',
          'owner':{
            'id':'29ad7bea-26d3-4bd5-a392-65a330c96bbc'
          }
        }
      ],
      'usageDataProviders':[

      ],
      'agreementStatus':{
        'id':'2c9180b4768da23801768da28b99003e',
        'value':'active',
        'label':'Active'
      },
      'supplementaryDocs':[

      ],
      'currentPeriod':{
        'id':'89e6b478-fbb9-4177-b563-a51d6c102e4d',
        'startDate':'2020-12-16',
        'owner':{
          'id':'29ad7bea-26d3-4bd5-a392-65a330c96bbc'
        }
      },
      'startDate':'2020-12-16',
      'endDate':'2020-12-19',
      'cancellationDeadline':null,
      'items':[
        {
          'id':'c55ae151-22a3-4007-8729-cba74d254e5e'
        },
        {
          'id':'c8028411-16f1-498e-b4cf-be1572f42722'
        }
      ],
      'alternateNames':[

      ]
    },
    'resource':{
      'id':'2063248f-5cf8-419c-b836-ca4ea42d5306',
      'class':'org.olf.kb.Pkg',
      'name':'Edward Elgar:Edward Elgar E-Book Archive in Business & Management, Economics and Finance:Nationallizenz',
      'suppressFromDiscovery':false,
      'tags':[

      ],
      '_object':{
        'id':'2063248f-5cf8-419c-b836-ca4ea42d5306',
        'dateCreated':'2020-12-23T03:47:43Z',
        'tags':[

        ],
        'lastUpdated':'2020-12-23T03:47:43Z',
        'vendor':{
          'id':'d7f1d4a5-6375-4e89-81ff-d6b5c40cbf55',
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
          'id':'d971b9ce-a448-43db-9a48-204df881aec1',
          'cursor':'2020-11-06T11:46:34Z',
          'active':true,
          'trustedSourceTI':false,
          'activationEnabled':false,
          'readonly':false,
          'syncStatus':'idle',
          'lastCheck':1608748059739,
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
      }
    },
    'poLines':[

    ],
    'suppressFromDiscovery':false,
    'customCoverage':false,
    'explanation':'Agreement includes a package containing this item',
    'startDate':null,
    'endDate':null,
    'activeFrom':null,
    'activeTo':null,
    'contentUpdated':null,
    'haveAccess':true
  },
  {
    'id':'c55ae151-22a3-4007-8729-cba74d254e5e',
    'tags':[

    ],
    'owner':{
      'id':'29ad7bea-26d3-4bd5-a392-65a330c96bbc',
      'items':[
        {
          'id':'c55ae151-22a3-4007-8729-cba74d254e5e'
        },
        {
          'id':'c8028411-16f1-498e-b4cf-be1572f42722'
        }
      ],
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
          'id':'89e6b478-fbb9-4177-b563-a51d6c102e4d',
          'startDate':'2020-12-16',
          'owner':{
            'id':'29ad7bea-26d3-4bd5-a392-65a330c96bbc'
          }
        }
      ],
      'usageDataProviders':[

      ],
      'agreementStatus':{},
      'supplementaryDocs':[

      ],
      'currentPeriod':{
        'id':'89e6b478-fbb9-4177-b563-a51d6c102e4d',
        'startDate':'2020-12-16',
        'owner':{
          'id':'29ad7bea-26d3-4bd5-a392-65a330c96bbc'
        }
      },
      'startDate':'2020-12-16',
      'endDate':null,
      'cancellationDeadline':null,
      'alternateNames':[

      ]
    },
    'resource':{
      'id':'ae92d837-2183-4ca2-b03c-3ced044bf9b0',
      'class':'org.olf.kb.PackageContentItem',
      'name':"'\"Institutions, industrial upgrading, and economic performance in Ja...' on Platform 'Elgaronline' in Package Edward Elgar:Edward Elgar E-Book Archive in Business & Management, ...",
      'suppressFromDiscovery':false,
      'tags':[

      ],
      'customCoverage':true,
      '_object':{
        'id':'ae92d837-2183-4ca2-b03c-3ced044bf9b0',
        'accessStart':'2008-01-01',
        'dateCreated':'2020-12-23T03:48:31Z',
        'tags':[

        ],
        'lastUpdated':'2020-12-23T03:49:18Z',
        'depth':'Fulltext',
        'coverage':[

        ],
        'pti':{
          'id':'1da76733-1f53-4bec-9476-498c09e2c4c9',
          'dateCreated':'2020-12-23T03:48:31Z',
          'tags':[

          ],
          'lastUpdated':'2020-12-23T03:48:31Z',
          'platform':{
            'id':'3f7f08ed-380e-4bc5-9fdd-5e5fcac3826f',
            'dateCreated':'2020-12-23T03:47:43Z',
            'lastUpdated':'2020-12-23T03:47:43Z',
            'name':'Elgaronline',
            'locators':[
              {
                'id':'f969aea0-fdfc-497a-8b7f-d839a38563ca',
                'domainName':'www.elgaronline.com'
              }
            ]
          },
          'templatedUrls':[
            {
              'id':'2318fe26-d074-4702-a4b6-e02c6021d11a',
              'url':'https://www.elgaronline.com/view/9781843769590.xml',
              'name':'defaultUrl',
              'resource':{
                'id':'1da76733-1f53-4bec-9476-498c09e2c4c9'
              }
            }
          ],
          'coverage':[

          ],
          'titleInstance':{
            'id':'730d055f-61bb-4420-b3ab-d4e52fa806f8',
            'subType':{
              'id':'2c9180b4768da23801768da28ad50018',
              'value':'electronic',
              'label':'Electronic'
            },
            'dateCreated':'2020-12-23T03:48:31Z',
            'tags':[

            ],
            'lastUpdated':'2020-12-23T03:48:31Z',
            'publicationType':{
              'id':'2c9180b4768da23801768db003fa0049',
              'value':'book',
              'label':'Book'
            },
            'identifiers':[
              {
                'title':{
                  'id':'730d055f-61bb-4420-b3ab-d4e52fa806f8'
                },
                'status':{
                  'id':'2c9180b4768da23801768da29ce70047',
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
              'id':'2c9180b4768da23801768da28add001a',
              'value':'monograph',
              'label':'Monograph'
            },
            'suppressFromDiscovery':false,
            'work':{
              'id':'313e4fff-c49b-449e-b8c9-5641fb71c81b'
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
          'id':'2063248f-5cf8-419c-b836-ca4ea42d5306',
          'dateCreated':'2020-12-23T03:47:43Z',
          'tags':[

          ],
          'lastUpdated':'2020-12-23T03:47:43Z',
          'vendor':{
            'id':'d7f1d4a5-6375-4e89-81ff-d6b5c40cbf55',
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
            'id':'d971b9ce-a448-43db-9a48-204df881aec1',
            'cursor':'2020-11-06T11:46:34Z',
            'active':true,
            'trustedSourceTI':false,
            'activationEnabled':false,
            'readonly':false,
            'syncStatus':'idle',
            'lastCheck':1608748059739,
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
        'addedTimestamp':1608695263041,
        'name':"'\"Institutions, industrial upgrading, and economic performance in Ja...' on Platform 'Elgaronline' in Package Edward Elgar:Edward Elgar E-Book Archive in Business & Management, ...",
        'lastSeenTimestamp':1608695263041,
        'suppressFromDiscovery':false,
        'longName':"'\"Institutions, industrial upgrading, and economic performance in Japan: the \"\"flying-geese\"\" paradigm of catch-up growth\"' on Platform 'Elgaronline' in Package Edward Elgar:Edward Elgar E-Book Archive in Business & Management, Economics and Finance:Nationallizenz",
        'class':'org.olf.kb.PackageContentItem'
      }
    },
    'poLines':[

    ],
    'suppressFromDiscovery':false,
    'customCoverage':false,
    'explanation':'Agreement includes this item from a package specifically',
    'startDate':null,
    'endDate':null,
    'activeFrom':null,
    'activeTo':null,
    'contentUpdated':null,
    'haveAccess':true
  }
];

describe('EntitlementAgreementsList', () => {
  test('renders expected agreements list', () => {
    const { getByRole } = renderWithIntl(
      <MemoryRouter>
        <EntitlementAgreementsList
          entitlements={entitlements}
          headline={<div>EntitlementAgreementsList</div>}
          id="pci-agreements-list"
          visibleColumns={['name', 'type', 'package', 'startDate', 'eresource', 'coverage', 'isCustomCoverage', 'acqMethod', 'endDate']}
        />
      </MemoryRouter>
    );

    expect(getByRole('grid')).toBeInTheDocument();
  });

  test('renders expected agreements list without headline', () => {
    const { getByRole } = renderWithIntl(
      <MemoryRouter>
        <EntitlementAgreementsList
          entitlements={entitlements}
          id="pci-agreements-list"
          visibleColumns={['name', 'type', 'package', 'startDate', 'eresource', 'coverage', 'isCustomCoverage', 'acqMethod', 'endDate']}
        />
      </MemoryRouter>
    );

    expect(getByRole('grid')).toBeInTheDocument();
  });
});


