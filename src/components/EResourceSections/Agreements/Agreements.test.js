import React from 'react';
import '@folio/stripes-erm-components/test/jest/__mock__';
import { renderWithIntl } from '@folio/stripes-erm-components/test/jest/helpers';
import { Accordion, MultiColumnList, MultiColumnListCell } from '@folio/stripes-testing';
import { MemoryRouter } from 'react-router-dom';
import translationsProperties from '../../../../test/helpers';
import Agreements from './Agreements';

const onNeedMoreEntitlements = jest.fn();

const AgreementsProps = {
  data: {
    'eresource':{
      'id':'bf1d1e3c-59b7-41d2-bb77-0c6023221e2c',
      'subType':{
        'id':'2c91809a773c597801773c5c0a9d000b',
        'value':'electronic',
        'label':'Electronic'
      },
      'dateCreated':'2021-01-26T02:04:08Z',
      'tags':[

      ],
      'lastUpdated':'2021-01-26T02:04:08Z',
      'publicationType':{
        'id':'2c91809a773c597801773c68cf5d0049',
        'value':'book',
        'label':'Book'
      },
      'identifiers':[
        {
          'title':{
            'id':'bf1d1e3c-59b7-41d2-bb77-0c6023221e2c'
          },
          'status':{
            'id':'2c91809a773c597801773c5c1dc50047',
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
        'id':'2c91809a773c597801773c5c0aa3000d',
        'value':'monograph',
        'label':'Monograph'
      },
      'suppressFromDiscovery':false,
      'work':{
        'id':'3013b61a-33fc-44d4-8adf-f0760b617a6c'
      },
      'class':'org.olf.kb.TitleInstance',
      'longName':'"Institutions, industrial upgrading, and economic performance in Japan: the ""flying-geese"" paradigm of catch-up growth"',
      'relatedTitles':[

      ]
    },
    'entitlementOptions':[
      {
        'id':'a09a629e-980a-40ae-84df-103175553c51',
        'class':'org.olf.kb.PackageContentItem',
        'name':"'\"Institutions, industrial upgrading, and economic performance in Ja...' on Platform 'Elgaronline' in Package Edward Elgar:Edward Elgar E-Book Archive in Business & Management, ...",
        'suppressFromDiscovery':false,
        'tags':[

        ],
        'customCoverage':false,
        '_object':{
          'id':'a09a629e-980a-40ae-84df-103175553c51',
          'accessStart':'2008-01-01',
          'dateCreated':'2021-01-26T02:04:08Z',
          'tags':[

          ],
          'lastUpdated':'2021-01-26T02:04:49Z',
          'depth':'Fulltext',
          'coverage':[

          ],
          'pti':{
            'id':'e8b9bf80-436f-40f7-9e81-eb8e25e5fe6c',
            'dateCreated':'2021-01-26T02:04:08Z',
            'tags':[

            ],
            'lastUpdated':'2021-01-26T02:04:08Z',
            'platform':{
              'id':'b7a68b0d-6227-45fd-9c96-519fd11e7e95',
              'dateCreated':'2021-01-26T02:03:25Z',
              'lastUpdated':'2021-01-26T02:03:25Z',
              'name':'Elgaronline',
              'locators':[
                {
                  'id':'dc1981b9-90e8-4ee4-a232-0369c4fcba76',
                  'domainName':'www.elgaronline.com'
                }
              ]
            },
            'templatedUrls':[
              {
                'id':'a12c8100-a26f-4137-bace-bdbdd01a306b',
                'url':'https://www.elgaronline.com/view/9781843769590.xml',
                'name':'defaultUrl',
                'resource':{
                  'id':'e8b9bf80-436f-40f7-9e81-eb8e25e5fe6c'
                }
              }
            ],
            'coverage':[

            ],
            'titleInstance':{
              'id':'bf1d1e3c-59b7-41d2-bb77-0c6023221e2c',
              'subType':{
                'id':'2c91809a773c597801773c5c0a9d000b',
                'value':'electronic',
                'label':'Electronic'
              },
              'dateCreated':'2021-01-26T02:04:08Z',
              'tags':[

              ],
              'lastUpdated':'2021-01-26T02:04:08Z',
              'publicationType':{
                'id':'2c91809a773c597801773c68cf5d0049',
                'value':'book',
                'label':'Book'
              },
              'identifiers':[
                {
                  'title':{
                    'id':'bf1d1e3c-59b7-41d2-bb77-0c6023221e2c'
                  },
                  'status':{
                    'id':'2c91809a773c597801773c5c1dc50047',
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
                'id':'2c91809a773c597801773c5c0aa3000d',
                'value':'monograph',
                'label':'Monograph'
              },
              'suppressFromDiscovery':false,
              'work':{
                'id':'3013b61a-33fc-44d4-8adf-f0760b617a6c'
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
            'id':'ef535e39-f7c8-4632-90b6-dd7ab9ee2ecd',
            'dateCreated':'2021-01-26T02:03:25Z',
            'lastUpdated':'2021-01-26T02:03:25Z',
            'vendor':{
              'id':'7d91a36a-723e-4673-b708-ecd6031a1b0f',
              'name':'Edward Elgar',
              'orgsUuid_object':{
                'error':400,
                'message':'Bad Request'
              }
            },
            'source':'GOKb',
            'remoteKb':{
              'id':'64fe64f3-b415-4c54-9300-756d17bc9472',
              'cursor':'2021-01-14T14:04:45Z',
              'active':true,
              'trustedSourceTI':false,
              'activationEnabled':false,
              'readonly':false,
              'syncStatus':'idle',
              'lastCheck':1611682908334,
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
          'addedTimestamp':1611626605327,
          'name':"'\"Institutions, industrial upgrading, and economic performance in Ja...' on Platform 'Elgaronline' in Package Edward Elgar:Edward Elgar E-Book Archive in Business & Management, ...",
          'lastSeenTimestamp':1611626605327,
          'suppressFromDiscovery':false,
          'longName':"'\"Institutions, industrial upgrading, and economic performance in Japan: the \"\"flying-geese\"\" paradigm of catch-up growth\"' on Platform 'Elgaronline' in Package Edward Elgar:Edward Elgar E-Book Archive in Business & Management, Economics and Finance:Nationallizenz",
          'class':'org.olf.kb.PackageContentItem'
        }
      },
      {
        'id':'ef535e39-f7c8-4632-90b6-dd7ab9ee2ecd',
        'class':'org.olf.kb.Pkg',
        'name':'Edward Elgar:Edward Elgar E-Book Archive in Business & Management, Economics and Finance:Nationallizenz',
        'suppressFromDiscovery':false,
        'tags':[

        ],
        'customCoverage':false,
        '_object':{
          'id':'ef535e39-f7c8-4632-90b6-dd7ab9ee2ecd',
          'dateCreated':'2021-01-26T02:03:25Z',
          'tags':[

          ],
          'lastUpdated':'2021-01-26T02:03:25Z',
          'vendor':{
            'id':'7d91a36a-723e-4673-b708-ecd6031a1b0f',
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
            'id':'64fe64f3-b415-4c54-9300-756d17bc9472',
            'cursor':'2021-01-14T14:04:45Z',
            'active':true,
            'trustedSourceTI':false,
            'activationEnabled':false,
            'readonly':false,
            'syncStatus':'idle',
            'lastCheck':1611682908334,
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
    'relatedEntitlements': [
      {
        'id':'89595010-e649-4f26-9904-b66e74b6be81',
        'tags':[

        ],
        'owner':{
          'id':'1f1da31f-9803-4dd3-b10e-91369eba3745',
          'name':'AM ag 3',
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
          'startDate':'2021-01-26',
          'linkedLicenses':[

          ],
          'docs':[

          ],
          'periods':[
            {
              'id':'2f31a0d8-6e55-48eb-b6f7-5c29c259e5c7',
              'startDate':'2021-01-26',
              'owner':{
                'id':'1f1da31f-9803-4dd3-b10e-91369eba3745'
              }
            }
          ],
          'usageDataProviders':[

          ],
          'agreementStatus':{
            'id':'2c91809a773c597801773c5c0b73003a',
            'value':'active',
            'label':'Active'
          },
          'supplementaryDocs':[

          ],
          'currentPeriod':{
            'id':'2f31a0d8-6e55-48eb-b6f7-5c29c259e5c7',
            'startDate':'2021-01-26',
            'owner':{
              'id':'1f1da31f-9803-4dd3-b10e-91369eba3745'
            }
          },
          'endDate':null,
          'cancellationDeadline':null,
          'items':[
            {
              'id':'89595010-e649-4f26-9904-b66e74b6be81'
            },
            {
              'id':'78681980-dfb7-4f49-96f3-b1e0f58a7799'
            }
          ],
          'alternateNames':[

          ]
        },
        'resource':{
          'id':'a09a629e-980a-40ae-84df-103175553c51',
          'class':'org.olf.kb.PackageContentItem',
          'name':"'\"Institutions, industrial upgrading, and economic performance in Ja...' on Platform 'Elgaronline' in Package Edward Elgar:Edward Elgar E-Book Archive in Business & Management, ...",
          'suppressFromDiscovery':false,
          'tags':[

          ],
          'customCoverage':false,
          '_object':{
            'id':'a09a629e-980a-40ae-84df-103175553c51',
            'accessStart':'2008-01-01',
            'dateCreated':'2021-01-26T02:04:08Z',
            'tags':[

            ],
            'lastUpdated':'2021-01-26T02:04:49Z',
            'depth':'Fulltext',
            'coverage':[

            ],
            'pti':{
              'id':'e8b9bf80-436f-40f7-9e81-eb8e25e5fe6c',
              'dateCreated':'2021-01-26T02:04:08Z',
              'tags':[

              ],
              'lastUpdated':'2021-01-26T02:04:08Z',
              'platform':{
                'id':'b7a68b0d-6227-45fd-9c96-519fd11e7e95',
                'dateCreated':'2021-01-26T02:03:25Z',
                'lastUpdated':'2021-01-26T02:03:25Z',
                'name':'Elgaronline',
                'locators':[
                  {
                    'id':'dc1981b9-90e8-4ee4-a232-0369c4fcba76',
                    'domainName':'www.elgaronline.com'
                  }
                ]
              },
              'templatedUrls':[
                {
                  'id':'a12c8100-a26f-4137-bace-bdbdd01a306b',
                  'url':'https://www.elgaronline.com/view/9781843769590.xml',
                  'name':'defaultUrl',
                  'resource':{
                    'id':'e8b9bf80-436f-40f7-9e81-eb8e25e5fe6c'
                  }
                }
              ],
              'coverage':[

              ],
              'titleInstance':{
                'id':'bf1d1e3c-59b7-41d2-bb77-0c6023221e2c',
                'subType':{
                  'id':'2c91809a773c597801773c5c0a9d000b',
                  'value':'electronic',
                  'label':'Electronic'
                },
                'dateCreated':'2021-01-26T02:04:08Z',
                'tags':[

                ],
                'lastUpdated':'2021-01-26T02:04:08Z',
                'publicationType':{
                  'id':'2c91809a773c597801773c68cf5d0049',
                  'value':'book',
                  'label':'Book'
                },
                'identifiers':[
                  {
                    'title':{
                      'id':'bf1d1e3c-59b7-41d2-bb77-0c6023221e2c'
                    },
                    'status':{
                      'id':'2c91809a773c597801773c5c1dc50047',
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
                  'id':'2c91809a773c597801773c5c0aa3000d',
                  'value':'monograph',
                  'label':'Monograph'
                },
                'suppressFromDiscovery':false,
                'work':{
                  'id':'3013b61a-33fc-44d4-8adf-f0760b617a6c'
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
              'id':'ef535e39-f7c8-4632-90b6-dd7ab9ee2ecd',
              'dateCreated':'2021-01-26T02:03:25Z',
              'lastUpdated':'2021-01-26T02:03:25Z',
              'vendor':{
                'id':'7d91a36a-723e-4673-b708-ecd6031a1b0f',
                'name':'Edward Elgar',
                'orgsUuid_object':{
                  'error':400,
                  'message':'Bad Request'
                }
              },
              'source':'GOKb',
              'remoteKb':{
                'id':'64fe64f3-b415-4c54-9300-756d17bc9472',
                'cursor':'2021-01-14T14:04:45Z',
                'active':true,
                'trustedSourceTI':false,
                'activationEnabled':false,
                'readonly':false,
                'syncStatus':'idle',
                'lastCheck':1611682908334,
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
            'addedTimestamp':1611626605327,
            'name':"'\"Institutions, industrial upgrading, and economic performance in Ja...' on Platform 'Elgaronline' in Package Edward Elgar:Edward Elgar E-Book Archive in Business & Management, ...",
            'lastSeenTimestamp':1611626605327,
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
      },
    ],
    'entitlements':[
      {
        'id':'89595010-e649-4f26-9904-b66e74b6be81',
        'tags':[

        ],
        'owner':{
          'id':'1f1da31f-9803-4dd3-b10e-91369eba3745',
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
          'startDate':'2021-01-26',
          'linkedLicenses':[

          ],
          'docs':[

          ],
          'periods':[
            {
              'id':'2f31a0d8-6e55-48eb-b6f7-5c29c259e5c7',
              'startDate':'2021-01-26',
              'owner':{
                'id':'1f1da31f-9803-4dd3-b10e-91369eba3745'
              }
            }
          ],
          'usageDataProviders':[

          ],
          'agreementStatus':{
            'id':'2c91809a773c597801773c5c0b73003a',
            'value':'active',
            'label':'Active'
          },
          'supplementaryDocs':[

          ],
          'currentPeriod':{
            'id':'2f31a0d8-6e55-48eb-b6f7-5c29c259e5c7',
            'startDate':'2021-01-26',
            'owner':{
              'id':'1f1da31f-9803-4dd3-b10e-91369eba3745'
            }
          },
          'endDate':null,
          'cancellationDeadline':null,
          'items':[
            {
              'id':'89595010-e649-4f26-9904-b66e74b6be81'
            },
            {
              'id':'78681980-dfb7-4f49-96f3-b1e0f58a7799'
            }
          ],
          'alternateNames':[

          ]
        },
        'resource':{
          'id':'a09a629e-980a-40ae-84df-103175553c51',
          'class':'org.olf.kb.PackageContentItem',
          'name':"'\"Institutions, industrial upgrading, and economic performance in Ja...' on Platform 'Elgaronline' in Package Edward Elgar:Edward Elgar E-Book Archive in Business & Management, ...",
          'suppressFromDiscovery':false,
          'tags':[

          ],
          'customCoverage':false,
          '_object':{
            'id':'a09a629e-980a-40ae-84df-103175553c51',
            'accessStart':'2008-01-01',
            'dateCreated':'2021-01-26T02:04:08Z',
            'tags':[

            ],
            'lastUpdated':'2021-01-26T02:04:49Z',
            'depth':'Fulltext',
            'coverage':[

            ],
            'pti':{
              'id':'e8b9bf80-436f-40f7-9e81-eb8e25e5fe6c',
              'dateCreated':'2021-01-26T02:04:08Z',
              'tags':[

              ],
              'lastUpdated':'2021-01-26T02:04:08Z',
              'platform':{
                'id':'b7a68b0d-6227-45fd-9c96-519fd11e7e95',
                'dateCreated':'2021-01-26T02:03:25Z',
                'lastUpdated':'2021-01-26T02:03:25Z',
                'name':'Elgaronline',
                'locators':[
                  {
                    'id':'dc1981b9-90e8-4ee4-a232-0369c4fcba76',
                    'domainName':'www.elgaronline.com'
                  }
                ]
              },
              'templatedUrls':[
                {
                  'id':'a12c8100-a26f-4137-bace-bdbdd01a306b',
                  'url':'https://www.elgaronline.com/view/9781843769590.xml',
                  'name':'defaultUrl',
                  'resource':{
                    'id':'e8b9bf80-436f-40f7-9e81-eb8e25e5fe6c'
                  }
                }
              ],
              'coverage':[

              ],
              'titleInstance':{
                'id':'bf1d1e3c-59b7-41d2-bb77-0c6023221e2c',
                'subType':{
                  'id':'2c91809a773c597801773c5c0a9d000b',
                  'value':'electronic',
                  'label':'Electronic'
                },
                'dateCreated':'2021-01-26T02:04:08Z',
                'tags':[

                ],
                'lastUpdated':'2021-01-26T02:04:08Z',
                'publicationType':{
                  'id':'2c91809a773c597801773c68cf5d0049',
                  'value':'book',
                  'label':'Book'
                },
                'identifiers':[
                  {
                    'title':{
                      'id':'bf1d1e3c-59b7-41d2-bb77-0c6023221e2c'
                    },
                    'status':{
                      'id':'2c91809a773c597801773c5c1dc50047',
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
                  'id':'2c91809a773c597801773c5c0aa3000d',
                  'value':'monograph',
                  'label':'Monograph'
                },
                'suppressFromDiscovery':false,
                'work':{
                  'id':'3013b61a-33fc-44d4-8adf-f0760b617a6c'
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
              'id':'ef535e39-f7c8-4632-90b6-dd7ab9ee2ecd',
              'dateCreated':'2021-01-26T02:03:25Z',
              'lastUpdated':'2021-01-26T02:03:25Z',
              'vendor':{
                'id':'7d91a36a-723e-4673-b708-ecd6031a1b0f',
                'name':'Edward Elgar',
                'orgsUuid_object':{
                  'error':400,
                  'message':'Bad Request'
                }
              },
              'source':'GOKb',
              'remoteKb':{
                'id':'64fe64f3-b415-4c54-9300-756d17bc9472',
                'cursor':'2021-01-14T14:04:45Z',
                'active':true,
                'trustedSourceTI':false,
                'activationEnabled':false,
                'readonly':false,
                'syncStatus':'idle',
                'lastCheck':1611682908334,
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
            'addedTimestamp':1611626605327,
            'name':"'\"Institutions, industrial upgrading, and economic performance in Ja...' on Platform 'Elgaronline' in Package Edward Elgar:Edward Elgar E-Book Archive in Business & Management, ...",
            'lastSeenTimestamp':1611626605327,
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
      },
      {
        'id':'70b7418e-af64-4ad1-8755-34ef5c83f325',
        'tags':[

        ],
        'owner':{
          'id':'ee2fe880-6fc8-4efe-b70a-8a658118974a',
          'name':'AM ag 2',
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
          'startDate':'2021-01-30',
          'linkedLicenses':[

          ],
          'docs':[

          ],
          'periods':[
            {
              'id':'cba2c65a-83d6-4b30-8f08-7abd8cb29c95',
              'startDate':'2021-01-30',
              'owner':{
                'id':'ee2fe880-6fc8-4efe-b70a-8a658118974a'
              }
            }
          ],
          'usageDataProviders':[

          ],
          'agreementStatus':{
            'id':'2c91809a773c597801773c5c0b6e0039',
            'value':'in_negotiation',
            'label':'In negotiation'
          },
          'supplementaryDocs':[

          ],
          'currentPeriod':null,
          'endDate':null,
          'cancellationDeadline':null,
          'items':[
            {
              'id':'70b7418e-af64-4ad1-8755-34ef5c83f325'
            }
          ],
          'alternateNames':[

          ]
        },
        'resource':{
          'id':'a09a629e-980a-40ae-84df-103175553c51',
          'class':'org.olf.kb.PackageContentItem',
          'name':"'\"Institutions, industrial upgrading, and economic performance in Ja...' on Platform 'Elgaronline' in Package Edward Elgar:Edward Elgar E-Book Archive in Business & Management, ...",
          'suppressFromDiscovery':false,
          'tags':[

          ],
          'customCoverage':false,
          '_object':{
            'id':'a09a629e-980a-40ae-84df-103175553c51',
            'accessStart':'2008-01-01',
            'dateCreated':'2021-01-26T02:04:08Z',
            'tags':[

            ],
            'lastUpdated':'2021-01-26T02:04:49Z',
            'depth':'Fulltext',
            'coverage':[

            ],
            'pti':{
              'id':'e8b9bf80-436f-40f7-9e81-eb8e25e5fe6c',
              'dateCreated':'2021-01-26T02:04:08Z',
              'tags':[

              ],
              'lastUpdated':'2021-01-26T02:04:08Z',
              'platform':{
                'id':'b7a68b0d-6227-45fd-9c96-519fd11e7e95',
                'dateCreated':'2021-01-26T02:03:25Z',
                'lastUpdated':'2021-01-26T02:03:25Z',
                'name':'Elgaronline',
                'locators':[
                  {
                    'id':'dc1981b9-90e8-4ee4-a232-0369c4fcba76',
                    'domainName':'www.elgaronline.com'
                  }
                ]
              },
              'templatedUrls':[
                {
                  'id':'a12c8100-a26f-4137-bace-bdbdd01a306b',
                  'url':'https://www.elgaronline.com/view/9781843769590.xml',
                  'name':'defaultUrl',
                  'resource':{
                    'id':'e8b9bf80-436f-40f7-9e81-eb8e25e5fe6c'
                  }
                }
              ],
              'coverage':[

              ],
              'titleInstance':{
                'id':'bf1d1e3c-59b7-41d2-bb77-0c6023221e2c',
                'subType':{
                  'id':'2c91809a773c597801773c5c0a9d000b',
                  'value':'electronic',
                  'label':'Electronic'
                },
                'dateCreated':'2021-01-26T02:04:08Z',
                'tags':[

                ],
                'lastUpdated':'2021-01-26T02:04:08Z',
                'publicationType':{
                  'id':'2c91809a773c597801773c68cf5d0049',
                  'value':'book',
                  'label':'Book'
                },
                'identifiers':[
                  {
                    'title':{
                      'id':'bf1d1e3c-59b7-41d2-bb77-0c6023221e2c'
                    },
                    'status':{
                      'id':'2c91809a773c597801773c5c1dc50047',
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
                  'id':'2c91809a773c597801773c5c0aa3000d',
                  'value':'monograph',
                  'label':'Monograph'
                },
                'suppressFromDiscovery':false,
                'work':{
                  'id':'3013b61a-33fc-44d4-8adf-f0760b617a6c'
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
              'id':'ef535e39-f7c8-4632-90b6-dd7ab9ee2ecd',
              'dateCreated':'2021-01-26T02:03:25Z',
              'lastUpdated':'2021-01-26T02:03:25Z',
              'vendor':{
                'id':'7d91a36a-723e-4673-b708-ecd6031a1b0f',
                'name':'Edward Elgar',
                'orgsUuid_object':{
                  'error':400,
                  'message':'Bad Request'
                }
              },
              'source':'GOKb',
              'remoteKb':{
                'id':'64fe64f3-b415-4c54-9300-756d17bc9472',
                'cursor':'2021-01-14T14:04:45Z',
                'active':true,
                'trustedSourceTI':false,
                'activationEnabled':false,
                'readonly':false,
                'syncStatus':'idle',
                'lastCheck':1611682908334,
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
            'addedTimestamp':1611626605327,
            'name':"'\"Institutions, industrial upgrading, and economic performance in Ja...' on Platform 'Elgaronline' in Package Edward Elgar:Edward Elgar E-Book Archive in Business & Management, ...",
            'lastSeenTimestamp':1611626605327,
            'suppressFromDiscovery':false,
            'longName':"'\"Institutions, industrial upgrading, and economic performance in Japan: the \"\"flying-geese\"\" paradigm of catch-up growth\"' on Platform 'Elgaronline' in Package Edward Elgar:Edward Elgar E-Book Archive in Business & Management, Economics and Finance:Nationallizenz",
            'class':'org.olf.kb.PackageContentItem'
          }
        },
        'poLines':[
          {
            'id':'e8a459fc-6c72-4e78-98a0-a102cf4fd6cc',
            'poLineId':'fdae6fc5-1fbc-4f7f-ad94-649b31136c32',
            'owner':{
              'id':'70b7418e-af64-4ad1-8755-34ef5c83f325'
            }
          }
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
    'entitlementsCount':2,
    'packageContentsFilter':'current',
    'packageContents':[

    ],
    'packageContentsCount':0,
    'searchString':'?sort=name'
  },
  eresource: {
    'id':'bf1d1e3c-59b7-41d2-bb77-0c6023221e2c',
    'subType':{
      'id':'2c91809a773c597801773c5c0a9d000b',
      'value':'electronic',
      'label':'Electronic'
    },
    'dateCreated':'2021-01-26T02:04:08Z',
    'tags':[

    ],
    'lastUpdated':'2021-01-26T02:04:08Z',
    'publicationType':{
      'id':'2c91809a773c597801773c68cf5d0049',
      'value':'book',
      'label':'Book'
    },
    'identifiers':[
      {
        'title':{
          'id':'bf1d1e3c-59b7-41d2-bb77-0c6023221e2c'
        },
        'status':{
          'id':'2c91809a773c597801773c5c1dc50047',
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
      'id':'2c91809a773c597801773c5c0aa3000d',
      'value':'monograph',
      'label':'Monograph'
    },
    'suppressFromDiscovery':false,
    'work':{
      'id':'3013b61a-33fc-44d4-8adf-f0760b617a6c'
    },
    'class':'org.olf.kb.TitleInstance',
    'longName':'"Institutions, industrial upgrading, and economic performance in Japan: the ""flying-geese"" paradigm of catch-up growth"',
    'relatedTitles':[

    ]
  },
};

describe('Agreements', () => {
  beforeEach(() => {
    renderWithIntl(
      <MemoryRouter>
        <Agreements
          handlers={{ onNeedMoreEntitlements }}
          id="agreements"
          visibleColumns={['name', 'type', 'startDate', 'endDate', 'eresource', 'acqMethod', 'coverage', 'isCustomCoverage']}
          {...AgreementsProps}
        />
      </MemoryRouter>,
      translationsProperties
    );
  });

  test('renders an Accordion', async () => {
    await Accordion('Agreements for this e-resource').exists();
  });

  test('renders the MCL', async () => {
    await MultiColumnList('pci-agreements-list').exists();
  });

  test('renders expected column count', async () => {
    await MultiColumnList({ id: 'pci-agreements-list', columnCount: 8 }).exists();
  });


  test('renders expected columns', async () => {
    await MultiColumnList({ id: 'pci-agreements-list', columns: ['Name', 'Status', 'Period start', 'Period end', 'E-resource', 'Acquisition method', 'Coverage', ' '] }).exists();
  });

  test('renders expected row count', async () => {
    await MultiColumnList({ id: 'pci-agreements-list', rowCount: AgreementsProps.data.entitlements.length }).exists();
  });

  test('renders expected agreement in each row', async () => {
    Promise.all([
      await MultiColumnListCell({ row: 0, columnIndex: 0 }).has({ content: 'AM ag 1' }),
      await MultiColumnListCell({ row: 1, columnIndex: 0 }).has({ content: 'AM ag 2' })
    ]);
  });

  describe('render related entitlement', () => {
    beforeEach(() => {
      renderWithIntl(
        <MemoryRouter>
          <Agreements
            handlers={{ onNeedMoreEntitlements }}
            id="agreements"
            renderRelatedEntitlements
            visibleColumns={['name', 'type', 'startDate', 'endDate', 'eresource', 'acqMethod', 'coverage', 'isCustomCoverage']}
            {...AgreementsProps}
          />
        </MemoryRouter>,
        translationsProperties
      );
    });

    test('renders related entitlements MCL', async () => {
      await MultiColumnList('related-agreements-list').exists();
    });
  });
});
