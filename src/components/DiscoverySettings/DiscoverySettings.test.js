import React from 'react';
import '@folio/stripes-erm-components/test/jest/__mock__';
import { renderWithIntl } from '@folio/stripes-erm-components/test/jest/helpers';
import translationsProperties from '../../../test/helpers';
import DiscoverySettings from './DiscoverySettings';

const isSuppressFromDiscoveryEnabled = jest.fn((_val) => true);

const title = {
  'eresource':{
    'id':'36ff776e-d693-4700-ba58-be1cdcfbc9db',
    'subType':{
      'id':'2c91809a76dfa7490176dfa9df45002e',
      'value':'electronic',
      'label':'Electronic'
    },
    'dateCreated':'2021-01-08T02:27:34Z',
    'tags':[

    ],
    'lastUpdated':'2021-01-08T02:27:34Z',
    'publicationType':{
      'id':'2c91809a76dfa7490176dfc6fe230049',
      'value':'book',
      'label':'Book'
    },
    'identifiers':[
      {
        'title':{
          'id':'36ff776e-d693-4700-ba58-be1cdcfbc9db'
        },
        'status':{
          'id':'2c91809a76dfa7490176dfaa002c0047',
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
      'id':'2c91809a76dfa7490176dfa9df4b0030',
      'value':'monograph',
      'label':'Monograph'
    },
    'suppressFromDiscovery':false,
    'work':{
      'id':'55eb67e3-223a-4d62-b1b5-6d764c0086cb'
    },
    'class':'org.olf.kb.TitleInstance',
    'longName':'"Institutions, industrial upgrading, and economic performance in Japan: the ""flying-geese"" paradigm of catch-up growth"',
    'relatedTitles':[

    ]
  },
  'entitlementOptions':[
    {
      'id':'a5e8d099-9641-4de5-962a-a7e354674e89',
      'class':'org.olf.kb.PackageContentItem',
      'name':"'\"Institutions, industrial upgrading, and economic performance in Ja...' on Platform 'Elgaronline' in Package Edward Elgar:Edward Elgar E-Book Archive in Business & Management, ...",
      'suppressFromDiscovery':false,
      'tags':[

      ],
      'customCoverage':false,
      '_object':{
        'id':'a5e8d099-9641-4de5-962a-a7e354674e89',
        'accessStart':'2008-01-01',
        'dateCreated':'2021-01-08T02:27:34Z',
        'tags':[

        ],
        'lastUpdated':'2021-01-08T02:28:14Z',
        'depth':'Fulltext',
        'coverage':[

        ],
        'pti':{
          'id':'7ffa1f3d-9669-4490-b87f-508ea07105cf',
          'dateCreated':'2021-01-08T02:27:34Z',
          'tags':[

          ],
          'lastUpdated':'2021-01-08T02:27:34Z',
          'platform':{
            'id':'0e906628-3c39-475d-a5d2-cc6e74b19651',
            'dateCreated':'2021-01-08T02:26:52Z',
            'lastUpdated':'2021-01-08T02:26:52Z',
            'name':'Elgaronline',
            'locators':[
              {
                'id':'47065ef7-a097-4165-91cd-2595116efaba',
                'domainName':'www.elgaronline.com'
              }
            ]
          },
          'templatedUrls':[
            {
              'id':'c7307b44-b5ec-4da5-ae4e-02dad46879f9',
              'url':'https://www.elgaronline.com/view/9781843769590.xml',
              'name':'defaultUrl',
              'resource':{
                'id':'7ffa1f3d-9669-4490-b87f-508ea07105cf'
              }
            }
          ],
          'coverage':[

          ],
          'titleInstance':{
            'id':'36ff776e-d693-4700-ba58-be1cdcfbc9db',
            'subType':{
              'id':'2c91809a76dfa7490176dfa9df45002e',
              'value':'electronic',
              'label':'Electronic'
            },
            'dateCreated':'2021-01-08T02:27:34Z',
            'tags':[

            ],
            'lastUpdated':'2021-01-08T02:27:34Z',
            'publicationType':{
              'id':'2c91809a76dfa7490176dfc6fe230049',
              'value':'book',
              'label':'Book'
            },
            'identifiers':[
              {
                'title':{
                  'id':'36ff776e-d693-4700-ba58-be1cdcfbc9db'
                },
                'status':{
                  'id':'2c91809a76dfa7490176dfaa002c0047',
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
              'id':'2c91809a76dfa7490176dfa9df4b0030',
              'value':'monograph',
              'label':'Monograph'
            },
            'suppressFromDiscovery':false,
            'work':{
              'id':'55eb67e3-223a-4d62-b1b5-6d764c0086cb'
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
          'id':'e6ff8c19-1ba5-40c8-a5de-eca856022a95',
          'dateCreated':'2021-01-08T02:26:52Z',
          'lastUpdated':'2021-01-08T02:26:52Z',
          'vendor':{
            'id':'bbcde79c-0ed6-46ff-a8ad-8df23987b7d7',
            'name':'Edward Elgar',
            'orgsUuid_object':{
              'error':400,
              'message':'Bad Request'
            }
          },
          'source':'GOKb',
          'remoteKb':{
            'id':'3430f084-aa81-4cfd-ba85-a5f3419a2cfd',
            'cursor':'2021-01-05T12:32:00Z',
            'active':true,
            'trustedSourceTI':false,
            'activationEnabled':false,
            'readonly':false,
            'syncStatus':'idle',
            'lastCheck':1610142128363,
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
        'addedTimestamp':1610072812668,
        'name':"'\"Institutions, industrial upgrading, and economic performance in Ja...' on Platform 'Elgaronline' in Package Edward Elgar:Edward Elgar E-Book Archive in Business & Management, ...",
        'lastSeenTimestamp':1610072812668,
        'suppressFromDiscovery':false,
        'longName':"'\"Institutions, industrial upgrading, and economic performance in Japan: the \"\"flying-geese\"\" paradigm of catch-up growth\"' on Platform 'Elgaronline' in Package Edward Elgar:Edward Elgar E-Book Archive in Business & Management, Economics and Finance:Nationallizenz",
        'class':'org.olf.kb.PackageContentItem'
      }
    },
    {
      'id':'e6ff8c19-1ba5-40c8-a5de-eca856022a95',
      'class':'org.olf.kb.Pkg',
      'name':'Edward Elgar:Edward Elgar E-Book Archive in Business & Management, Economics and Finance:Nationallizenz',
      'suppressFromDiscovery':false,
      'tags':[

      ],
      'customCoverage':false,
      '_object':{
        'id':'e6ff8c19-1ba5-40c8-a5de-eca856022a95',
        'dateCreated':'2021-01-08T02:26:52Z',
        'tags':[

        ],
        'lastUpdated':'2021-01-08T02:26:52Z',
        'vendor':{
          'id':'bbcde79c-0ed6-46ff-a8ad-8df23987b7d7',
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
          'id':'3430f084-aa81-4cfd-ba85-a5f3419a2cfd',
          'cursor':'2021-01-05T12:32:00Z',
          'active':true,
          'trustedSourceTI':false,
          'activationEnabled':false,
          'readonly':false,
          'syncStatus':'idle',
          'lastCheck':1610142128363,
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
    }
  ],
  'entitlementOptionsCount':2,
  'entitlements':[
    {
      'id':'1209bf82-2f5f-4405-9f6d-e4bd68e828df',
      'tags':[

      ],
      'owner':{
        'id':'83306d2e-570e-4219-980e-17e44a25122e',
        'name':'Test Agreement',
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
            'id':'63cf6ba5-2df0-4195-8dd6-abbde55d6eb5',
            'startDate':'2021-01-01',
            'owner':{
              'id':'83306d2e-570e-4219-980e-17e44a25122e'
            }
          }
        ],
        'usageDataProviders':[

        ],
        'agreementStatus':{
          'id':'2c91809a76dfa7490176dfa9dedf0015',
          'value':'active',
          'label':'Active'
        },
        'supplementaryDocs':[

        ],
        'currentPeriod':{
          'id':'63cf6ba5-2df0-4195-8dd6-abbde55d6eb5',
          'startDate':'2021-01-01',
          'owner':{
            'id':'83306d2e-570e-4219-980e-17e44a25122e'
          }
        },
        'startDate':'2021-01-01',
        'endDate':null,
        'cancellationDeadline':null,
        'items':[
          {
            'id':'1644f74f-e843-4524-ba65-e1907bc11638'
          },
          {
            'id':'1209bf82-2f5f-4405-9f6d-e4bd68e828df'
          },
          {
            'id':'9e1be192-0a6f-4680-b3f0-9ef3eddd618a'
          }
        ],
        'alternateNames':[

        ]
      },
      'resource':{
        'id':'a5e8d099-9641-4de5-962a-a7e354674e89',
        'class':'org.olf.kb.PackageContentItem',
        'name':"'\"Institutions, industrial upgrading, and economic performance in Ja...' on Platform 'Elgaronline' in Package Edward Elgar:Edward Elgar E-Book Archive in Business & Management, ...",
        'suppressFromDiscovery':false,
        'tags':[

        ],
        'customCoverage':false,
        '_object':{
          'id':'a5e8d099-9641-4de5-962a-a7e354674e89',
          'accessStart':'2008-01-01',
          'dateCreated':'2021-01-08T02:27:34Z',
          'tags':[

          ],
          'lastUpdated':'2021-01-08T02:28:14Z',
          'depth':'Fulltext',
          'coverage':[

          ],
          'pti':{
            'id':'7ffa1f3d-9669-4490-b87f-508ea07105cf',
            'dateCreated':'2021-01-08T02:27:34Z',
            'tags':[

            ],
            'lastUpdated':'2021-01-08T02:27:34Z',
            'platform':{
              'id':'0e906628-3c39-475d-a5d2-cc6e74b19651',
              'dateCreated':'2021-01-08T02:26:52Z',
              'lastUpdated':'2021-01-08T02:26:52Z',
              'name':'Elgaronline',
              'locators':[
                {
                  'id':'47065ef7-a097-4165-91cd-2595116efaba',
                  'domainName':'www.elgaronline.com'
                }
              ]
            },
            'templatedUrls':[
              {
                'id':'c7307b44-b5ec-4da5-ae4e-02dad46879f9',
                'url':'https://www.elgaronline.com/view/9781843769590.xml',
                'name':'defaultUrl',
                'resource':{
                  'id':'7ffa1f3d-9669-4490-b87f-508ea07105cf'
                }
              }
            ],
            'coverage':[

            ],
            'titleInstance':{
              'id':'36ff776e-d693-4700-ba58-be1cdcfbc9db',
              'subType':{
                'id':'2c91809a76dfa7490176dfa9df45002e',
                'value':'electronic',
                'label':'Electronic'
              },
              'dateCreated':'2021-01-08T02:27:34Z',
              'tags':[

              ],
              'lastUpdated':'2021-01-08T02:27:34Z',
              'publicationType':{
                'id':'2c91809a76dfa7490176dfc6fe230049',
                'value':'book',
                'label':'Book'
              },
              'identifiers':[
                {
                  'title':{
                    'id':'36ff776e-d693-4700-ba58-be1cdcfbc9db'
                  },
                  'status':{
                    'id':'2c91809a76dfa7490176dfaa002c0047',
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
                'id':'2c91809a76dfa7490176dfa9df4b0030',
                'value':'monograph',
                'label':'Monograph'
              },
              'suppressFromDiscovery':false,
              'work':{
                'id':'55eb67e3-223a-4d62-b1b5-6d764c0086cb'
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
            'id':'e6ff8c19-1ba5-40c8-a5de-eca856022a95',
            'dateCreated':'2021-01-08T02:26:52Z',
            'lastUpdated':'2021-01-08T02:26:52Z',
            'vendor':{
              'id':'bbcde79c-0ed6-46ff-a8ad-8df23987b7d7',
              'name':'Edward Elgar',
              'orgsUuid_object':{
                'error':400,
                'message':'Bad Request'
              }
            },
            'source':'GOKb',
            'remoteKb':{
              'id':'3430f084-aa81-4cfd-ba85-a5f3419a2cfd',
              'cursor':'2021-01-05T12:32:00Z',
              'active':true,
              'trustedSourceTI':false,
              'activationEnabled':false,
              'readonly':false,
              'syncStatus':'idle',
              'lastCheck':1610142128363,
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
          'addedTimestamp':1610072812668,
          'name':"'\"Institutions, industrial upgrading, and economic performance in Ja...' on Platform 'Elgaronline' in Package Edward Elgar:Edward Elgar E-Book Archive in Business & Management, ...",
          'lastSeenTimestamp':1610072812668,
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
  ],
  'entitlementsCount':1,
  'packageContentsFilter':'current',
  'packageContents':[

  ],
  'packageContentsCount':0,
  'relatedEntitlements':[

  ],
  'searchString':'?sort=name'
};

const pci = {
  'id': 'aa4cac86-f74b-4868-a5e0-cc745b68e741',
  'accessStart': '2008-01-01',
  'dateCreated': '2021-01-05T02:27:28Z',
  'tags': [],
  'lastUpdated': '2021-01-05T02:28:09Z',
  'depth': 'Fulltext',
  'coverage': [],
  'pti': {
    'id': '993a4733-8944-47f9-9ffb-a29a5627a9d2',
    'dateCreated': '2021-01-05T02:27:27Z',
    'tags': [],
    'lastUpdated': '2021-01-05T02:27:27Z',
    'platform': {
      'id': '8494c0b6-bf44-4d7b-95fe-636b8db47041',
      'dateCreated': '2021-01-05T02:26:46Z',
      'lastUpdated': '2021-01-05T02:26:46Z',
      'name': 'Elgaronline',
      'locators': [
        {
          'id': '98f61231-bf73-4766-b282-85aa5ff171ca',
          'domainName': 'www.elgaronline.com'
        }
      ]
    },
    'templatedUrls': [
      {
        'id': '36ddc8e2-0f68-4efa-85ba-437490519d35',
        'url': 'https://www.elgaronline.com/view/9781843769590.xml',
        'name': 'defaultUrl',
        'resource': {
          'id': '993a4733-8944-47f9-9ffb-a29a5627a9d2'
        }
      }
    ],
    'coverage': [],
    'titleInstance': {
      'id': 'c6623ca5-bce0-498a-816d-0a7a1da01cc2',
      'subType': {
        'id': '2c91809a76d034720176d03713690036',
        'value': 'electronic',
        'label': 'Electronic'
      },
      'dateCreated': '2021-01-05T02:27:27Z',
      'tags': [],
      'lastUpdated': '2021-01-05T02:27:27Z',
      'publicationType': {
        'id': '2c91809a76d034720176d0543ee20049',
        'value': 'book',
        'label': 'Book'
      },
      'identifiers': [
        {
          'title': {
            'id': 'c6623ca5-bce0-498a-816d-0a7a1da01cc2'
          },
          'status': {
            'id': '2c91809a76d034720176d03733610047',
            'value': 'approved',
            'label': 'approved'
          },
          'identifier': {
            'value': '9781845425678',
            'ns': {
              'value': 'isbn'
            }
          }
        }
      ],
      'coverage': [],
      'name': '"Institutions, industrial upgrading, and economic performance in Japan: the ""flying-geese"" paradigm of catch-up growth"',
      'type': {
        'id': '2c91809a76d034720176d037136f0038',
        'value': 'monograph',
        'label': 'Monograph'
      },
      'suppressFromDiscovery': false,
      'work': {
        'id': '6a10ed98-5ebe-46c6-a43b-fb3ca4522c61'
      },
      'class': 'org.olf.kb.TitleInstance',
      'longName': '"Institutions, industrial upgrading, and economic performance in Japan: the ""flying-geese"" paradigm of catch-up growth"',
      'relatedTitles': []
    },
    'url': 'https://www.elgaronline.com/view/9781843769590.xml',
    'name': "'\"Institutions, industrial upgrading, and economic performance in Japan: the \"\"flying-geese\"\" paradigm of ca...' on Platform 'Elgaronline'",
    'suppressFromDiscovery': false,
    'class': 'org.olf.kb.PlatformTitleInstance',
    'longName': "'\"Institutions, industrial upgrading, and economic performance in Japan: the \"\"flying-geese\"\" paradigm of catch-up growth\"' on Platform 'Elgaronline'"
  },
  'pkg': {
    'id': '1a150964-2440-4306-8a84-7834fbc25324',
    'dateCreated': '2021-01-05T02:26:46Z',
    'lastUpdated': '2021-01-05T02:26:46Z',
    'vendor': {
      'id': 'ddd3f65b-837e-400e-82b5-8933fa28a6b2',
      'name': 'Edward Elgar',
      'orgsUuid_object': {
        'error': 400,
        'message': 'Bad Request'
      }
    },
    'source': 'GOKb',
    'remoteKb': {
      'id': '4e9dc304-7203-42fe-b023-912c4a826eda',
      'cursor': '2021-01-05T12:32:00Z',
      'active': true,
      'trustedSourceTI': false,
      'activationEnabled': false,
      'readonly': false,
      'syncStatus': 'idle',
      'lastCheck': 1609879344226,
      'name': 'GOKb_TEST',
      'type': 'org.olf.kb.adapters.GOKbOAIAdapter',
      'fullPrefix': 'gokb',
      'uri': 'http://gokbt.gbv.de/gokb/oai/index',
      'supportsHarvesting': true,
      'rectype': 1
    },
    'name': 'Edward Elgar:Edward Elgar E-Book Archive in Business & Management, Economics and Finance:Nationallizenz',
    'suppressFromDiscovery': false,
    'reference': 'Edward_Elgar:Edward_Elgar_E-Book_Archive_in_Business_&_Management,_Economics_and_Finance:Nationalliz',
    'resourceCount': 2540,
    'class': 'org.olf.kb.Pkg'
  },
  'addedTimestamp': 1609813606306,
  'name': "'\"Institutions, industrial upgrading, and economic performance in Ja...' on Platform 'Elgaronline' in Package Edward Elgar:Edward Elgar E-Book Archive in Business & Management, ...",
  'lastSeenTimestamp': 1609813606306,
  'suppressFromDiscovery': false,
  'longName': "'\"Institutions, industrial upgrading, and economic performance in Japan: the \"\"flying-geese\"\" paradigm of catch-up growth\"' on Platform 'Elgaronline' in Package Edward Elgar:Edward Elgar E-Book Archive in Business & Management, Economics and Finance:Nationallizenz",
  'class': 'org.olf.kb.PackageContentItem'
};

const line = {
  'id':'ac964055-95ed-4526-910d-8deadbe4ff96',
  'tags':[
  ],
  'owner':{
    'id':'971b54a9-8387-4d32-9c97-dc4010223f7b',
    'name':'GO test 1',
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
        'id':'085b25bc-c027-431d-b602-ec9eb8a2ba3e',
        'startDate':'2021-01-28',
        'owner':{
          'id':'971b54a9-8387-4d32-9c97-dc4010223f7b'
        }
      }
    ],
    'usageDataProviders':[
    ],
    'agreementStatus':{
      'id':'2c9180b576d095700176d095c4db0027',
      'value':'active',
      'label':'Active'
    },
    'supplementaryDocs':[
    ],
    'currentPeriod':null,
    'startDate':'2021-01-28',
    'endDate':null,
    'cancellationDeadline':null,
    'items':[
      {
        'id':'ac964055-95ed-4526-910d-8deadbe4ff96'
      },
      {
        'id':'e8092d2c-0529-4a7f-bd84-63cfb4b9e23d'
      }
    ],
    'alternateNames':[
    ]
  },
  'resource':{
    'id':'a0463b17-5593-4574-b0e0-07a0f5425962',
    'class':'org.olf.kb.PackageContentItem',
    'name':"'30 Years of darkness' on Platform 'hbz Hosting Platform' in Package AVA VOD Library",
    'suppressFromDiscovery':true,
    'tags':[
    ],
    'customCoverage':false,
    '_object':{
      'id':'a0463b17-5593-4574-b0e0-07a0f5425962',
      'dateCreated':'2021-01-05T04:00:21Z',
      'tags':[
      ],
      'lastUpdated':'2021-01-05T04:00:21Z',
      'depth':'Fulltext',
      'coverage':[
      ],
      'pti':{
        'id':'6ed36c4f-8fcd-4f41-aaf5-f1fac8abcab3',
        'dateCreated':'2021-01-05T04:00:21Z',
        'tags':[
        ],
        'lastUpdated':'2021-01-05T04:00:21Z',
        'platform':{
          'id':'5f1e6929-76e0-4b3b-ac31-35ca08a6b32f',
          'dateCreated':'2021-01-05T04:00:21Z',
          'lastUpdated':'2021-01-05T04:00:21Z',
          'name':'hbz Hosting Platform',
          'locators':[
            {
              'id':'45672f62-a8b7-4bee-bb9a-3f5944157ac6',
              'domainName':'cdroms.digibib.net'
            }
          ]
        },
        'templatedUrls':[
          {
            'id':'063f9a78-1914-4393-9af3-4d629ca379f1',
            'url':'https://hbz.ava.watch/film/30-years-of-darkness/',
            'name':'defaultUrl',
            'resource':{
              'id':'6ed36c4f-8fcd-4f41-aaf5-f1fac8abcab3'
            }
          }
        ],
        'coverage':[
        ],
        'titleInstance':{
          'id':'fe01de81-1658-491f-b9f3-e0d952095d06',
          'subType':{
            'id':'2c9180b576d095700176d095c5260036',
            'value':'electronic',
            'label':'Electronic'
          },
          'dateCreated':'2021-01-05T04:00:21Z',
          'tags':[
          ],
          'lastUpdated':'2021-01-05T04:00:21Z',
          'publicationType':{
            'id':'2c9180b576d095700176d0b2c2150049',
            'value':'book',
            'label':'Book'
          },
          'identifiers':[
          ],
          'coverage':[
          ],
          'name':'30 Years of darkness',
          'type':{
            'id':'2c9180b576d095700176d095c52f0038',
            'value':'monograph',
            'label':'Monograph'
          },
          'suppressFromDiscovery':true,
          'work':{
            'id':'2d961d00-e14e-4661-bf0a-a40a1c5c0397'
          },
          'class':'org.olf.kb.TitleInstance',
          'longName':'30 Years of darkness',
          'relatedTitles':[
          ]
        },
        'url':'https://hbz.ava.watch/film/30-years-of-darkness/',
        'name':"'30 Years of darkness' on Platform 'hbz Hosting Platform'",
        'suppressFromDiscovery':true,
        'class':'org.olf.kb.PlatformTitleInstance',
        'longName':"'30 Years of darkness' on Platform 'hbz Hosting Platform'"
      },
      'pkg':{
        'id':'99580206-6153-4b02-a8ba-ce51db8ef7d8',
        'dateCreated':'2021-01-05T04:00:21Z',
        'lastUpdated':'2021-01-05T04:00:21Z',
        'vendor':{
          'id':'4ce03f2a-1e36-4777-901d-65fefef58623',
          'name':'PBS Video',
          'orgsUuid_object':{
            'error':400,
            'message':'Bad Request'
          }
        },
        'source':'GOKb',
        'remoteKb':{
          'id':'85a9bce8-7bc6-48ab-b7a4-ab69d4b7709a',
          'cursor':'2021-01-05T12:32:00Z',
          'active':true,
          'trustedSourceTI':false,
          'activationEnabled':false,
          'readonly':false,
          'syncStatus':'idle',
          'lastCheck':1609878496830,
          'name':'GOKb_TEST',
          'type':'org.olf.kb.adapters.GOKbOAIAdapter',
          'fullPrefix':'gokb',
          'uri':'http://gokbt.gbv.de/gokb/oai/index',
          'supportsHarvesting':true,
          'rectype':1
        },
        'name':'AVA VOD Library',
        'suppressFromDiscovery':true,
        'reference':'AVA_VOD_Library',
        'resourceCount':382,
        'class':'org.olf.kb.Pkg'
      },
      'addedTimestamp':1609819221392,
      'name':"'30 Years of darkness' on Platform 'hbz Hosting Platform' in Package AVA VOD Library",
      'lastSeenTimestamp':1609819221392,
      'suppressFromDiscovery':true,
      'note':'02: 20: 00',
      'longName':"'30 Years of darkness' on Platform 'hbz Hosting Platform' in Package AVA VOD Library",
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
};

describe('DiscoverySettings', () => {
  describe('DiscoverySettings for an agreement line', () => {
    test('renders DiscoverySettings accordion', () => {
      const { getByText } = renderWithIntl(
        <DiscoverySettings
          handlers={{ isSuppressFromDiscoveryEnabled }}
          line={line}
        />,
        translationsProperties
      );
      expect(getByText('Discovery settings')).toBeInTheDocument();
    });

    test('renders expected suppress from discovery(Agreement Line) value', () => {
      const { getByTestId } = renderWithIntl(
        <DiscoverySettings
          handlers={{ isSuppressFromDiscoveryEnabled }}
          line={line}
        />,
        translationsProperties
      );
      expect(getByTestId('suppressFromDiscoveryAgreementLine')).toHaveTextContent('No');
    });

    test('renders expected Suppress from discovery(Title in package) value', () => {
      const { getByTestId } = renderWithIntl(
        <DiscoverySettings
          handlers={{ isSuppressFromDiscoveryEnabled }}
          line={line}
        />,
        translationsProperties
      );
      expect(getByTestId('suppressFromDiscoveryTitleInPackage')).toHaveTextContent('Yes');
    });

    test('renders expected suppress from discovery(Title) value', () => {
      const { getByTestId } = renderWithIntl(
        <DiscoverySettings
          handlers={{ isSuppressFromDiscoveryEnabled }}
          line={line}
        />,
        translationsProperties
      );
      expect(getByTestId('suppressFromDiscoveryTitle')).toHaveTextContent('Yes');
    });
  });

  describe('DiscoverySettings for a pci', () => {
    test('renders DiscoverySettings accordion', () => {
      const { getByText } = renderWithIntl(
        <DiscoverySettings
          handlers={{ isSuppressFromDiscoveryEnabled }}
          pci={pci}
        />,
        translationsProperties
      );
      expect(getByText('Discovery settings')).toBeInTheDocument();
    });

    test('renders expected Suppress from discovery(Title in package) value', () => {
      const { getByTestId } = renderWithIntl(
        <DiscoverySettings
          handlers={{ isSuppressFromDiscoveryEnabled }}
          line={line}
        />,
        translationsProperties
      );
      expect(getByTestId('suppressFromDiscoveryTitleInPackage')).toHaveTextContent('Yes');
    });

    test('renders expected suppress from discovery(Title) value', () => {
      const { getByTestId } = renderWithIntl(
        <DiscoverySettings
          handlers={{ isSuppressFromDiscoveryEnabled }}
          line={line}
        />,
        translationsProperties
      );
      expect(getByTestId('suppressFromDiscoveryTitle')).toHaveTextContent('Yes');
    });
  });

  describe('DiscoverySettings for a title', () => {
    test('renders DiscoverySettings accordion', () => {
      const { getByText } = renderWithIntl(
        <DiscoverySettings
          handlers={{ isSuppressFromDiscoveryEnabled }}
          title={title}
        />,
        translationsProperties
      );
      expect(getByText('Discovery settings')).toBeInTheDocument();
    });

    test('renders expected suppress from discovery(Title) value', () => {
      const { getByTestId } = renderWithIntl(
        <DiscoverySettings
          handlers={{ isSuppressFromDiscoveryEnabled }}
          line={line}
        />,
        translationsProperties
      );
      expect(getByTestId('suppressFromDiscoveryTitle')).toHaveTextContent('Yes');
    });
  });
});


