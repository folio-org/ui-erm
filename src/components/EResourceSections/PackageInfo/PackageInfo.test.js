import React from 'react';
import '@folio/stripes-erm-components/test/jest/__mock__';
import { renderWithIntl } from '@folio/stripes-erm-components/test/jest/helpers';
import { MemoryRouter } from 'react-router-dom';
import { KeyValue } from '@folio/stripes-testing';
import translationsProperties from '../../../../test/helpers';
import PackageInfo from './PackageInfo';

jest.mock('../../AddToBasketButton', () => () => <div>Add package to basket</div>);

const data = {
  'eresource':{
    'id':'98a7b8fe-cd85-41b4-8eea-11eb80c0290f',
    'dateCreated':'2021-01-28T13:05:23Z',
    'lastUpdated':'2021-01-28T13:05:23Z',
    'vendor':{
      'id':'e90cffdd-8d04-47be-aa37-355778d30e43',
      'name':'PBS Video',
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
      'lastCheck':1611863286252,
      'name':'GOKb_TEST',
      'type':'org.olf.kb.adapters.GOKbOAIAdapter',
      'fullPrefix':'gokb',
      'uri':'http://gokbt.gbv.de/gokb/oai/index',
      'supportsHarvesting':true,
      'rectype':1
    },
    'name':'AVA VOD Library',
    'suppressFromDiscovery':false,
    'reference':'AVA_VOD_Library',
    'resourceCount':2,
    'class':'org.olf.kb.Pkg'
  },
  'entitlementOptions':[

  ],
  'entitlementOptionsCount':0,
  'entitlements':[

  ],
  'entitlementsCount':0,
  'packageContentsFilter':'current',
  'packageContents':[
    {
      'id':'036e8ac6-928d-485d-ba01-20900492777a',
      'dateCreated':'2021-01-28T13:05:24Z',
      'tags':[

      ],
      'lastUpdated':'2021-01-28T13:05:24Z',
      'depth':'Fulltext',
      'coverage':[
        {
          'id':'5c74781f-db5f-4669-b4b0-34995ba25850',
          'startDate':'2010-01-01',
          'startVolume':'1',
          'startIssue':'1',
          'summary':'v1/i1/2010-01-01 - v*/i*/*'
        }
      ],
      'pti':{
        'id':'1e887137-e75d-45b6-80d6-b811dc987c70',
        'dateCreated':'2021-01-28T13:05:24Z',
        'tags':[

        ],
        'lastUpdated':'2021-01-28T13:05:24Z',
        'platform':{
          'id':'6e479d70-ad9c-4508-917d-96193c5af3e2',
          'dateCreated':'2021-01-28T13:05:24Z',
          'lastUpdated':'2021-01-28T13:05:24Z',
          'name':'hbz Hosting Platform',
          'locators':[
            {
              'id':'b6727430-f1bb-4785-933b-bf20f10da3c6',
              'domainName':'cdroms.digibib.net'
            }
          ]
        },
        'templatedUrls':[
          {
            'id':'f9984b66-127c-4ad8-99a2-1c8e0719d7d8',
            'url':'https://hbz.ava.watch/film/0068-snipers-nest/',
            'name':'defaultUrl',
            'resource':{
              'id':'1e887137-e75d-45b6-80d6-b811dc987c70'
            }
          }
        ],
        'coverage':[
          {
            'id':'fd69e2ea-96f1-4190-846d-9b05348e5096',
            'startDate':'2010-01-01',
            'summary':'v*/i*/2010-01-01 - v*/i*/*'
          }
        ],
        'titleInstance':{
          'id':'017ec760-756c-4e1e-ae02-d2a398f59f2e',
          'subType':{
            'id':'2c91809a774908300177490b0a92000b',
            'value':'electronic',
            'label':'Electronic'
          },
          'dateCreated':'2021-01-28T13:05:24Z',
          'tags':[

          ],
          'lastUpdated':'2021-01-28T13:05:24Z',
          'publicationType':{
            'id':'2c91809a774908300177491877c60049',
            'value':'book',
            'label':'Book'
          },
          'identifiers':[

          ],
          'coverage':[
            {
              'id':'9dfe8f57-3804-4193-956b-33e281a21efd',
              'startDate':'2010-01-01',
              'summary':'v*/i*/2010-01-01 - v*/i*/*'
            }
          ],
          'name':'0068 Sniper`s Nest',
          'type':{
            'id':'2c91809a774908300177490b0a9a000d',
            'value':'monograph',
            'label':'Monograph'
          },
          'suppressFromDiscovery':false,
          'work':{
            'id':'737989b0-0655-47da-85d2-edf4e013c056'
          },
          'class':'org.olf.kb.TitleInstance',
          'longName':'0068 Sniper`s Nest',
          'relatedTitles':[

          ]
        },
        'url':'https://hbz.ava.watch/film/0068-snipers-nest/',
        'name':"'0068 Sniper`s Nest' on Platform 'hbz Hosting Platform'",
        'suppressFromDiscovery':false,
        'class':'org.olf.kb.PlatformTitleInstance',
        'longName':"'0068 Sniper`s Nest' on Platform 'hbz Hosting Platform'"
      },
      'pkg':{
        'id':'98a7b8fe-cd85-41b4-8eea-11eb80c0290f',
        'dateCreated':'2021-01-28T13:05:23Z',
        'lastUpdated':'2021-01-28T13:05:23Z',
        'vendor':{
          'id':'e90cffdd-8d04-47be-aa37-355778d30e43',
          'name':'PBS Video',
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
          'lastCheck':1611863286252,
          'name':'GOKb_TEST',
          'type':'org.olf.kb.adapters.GOKbOAIAdapter',
          'fullPrefix':'gokb',
          'uri':'http://gokbt.gbv.de/gokb/oai/index',
          'supportsHarvesting':true,
          'rectype':1
        },
        'name':'AVA VOD Library',
        'suppressFromDiscovery':false,
        'reference':'AVA_VOD_Library',
        'resourceCount':382,
        'class':'org.olf.kb.Pkg'
      },
      'addedTimestamp':1611839123974,
      'name':"'0068 Sniper`s Nest' on Platform 'hbz Hosting Platform' in Package AVA VOD Library",
      'lastSeenTimestamp':1611839123974,
      'suppressFromDiscovery':false,
      'note':'00: 19: 52',
      'longName':"'0068 Sniper`s Nest' on Platform 'hbz Hosting Platform' in Package AVA VOD Library",
      'class':'org.olf.kb.PackageContentItem'
    },
    {
      'id':'19a0c84c-abe5-48d7-85b0-9285fa9cba71',
      'dateCreated':'2021-01-28T13:05:24Z',
      'tags':[

      ],
      'lastUpdated':'2021-01-28T13:05:24Z',
      'depth':'Fulltext',
      'coverage':[

      ],
      'pti':{
        'id':'84b39082-8ae4-4212-ade7-edfec477b92c',
        'dateCreated':'2021-01-28T13:05:24Z',
        'tags':[

        ],
        'lastUpdated':'2021-01-28T13:05:24Z',
        'platform':{
          'id':'6e479d70-ad9c-4508-917d-96193c5af3e2',
          'dateCreated':'2021-01-28T13:05:24Z',
          'lastUpdated':'2021-01-28T13:05:24Z',
          'name':'hbz Hosting Platform',
          'locators':[
            {
              'id':'b6727430-f1bb-4785-933b-bf20f10da3c6',
              'domainName':'cdroms.digibib.net'
            }
          ]
        },
        'templatedUrls':[
          {
            'id':'794a0c01-cab6-4063-8b29-e8621a9af253',
            'url':'https://hbz.ava.watch/film/shift/',
            'name':'defaultUrl',
            'resource':{
              'id':'84b39082-8ae4-4212-ade7-edfec477b92c'
            }
          }
        ],
        'coverage':[

        ],
        'titleInstance':{
          'id':'368458e1-1ec7-4d01-aed0-5c480a46e76f',
          'subType':{
            'id':'2c91809a774908300177490b0a92000b',
            'value':'electronic',
            'label':'Electronic'
          },
          'dateCreated':'2021-01-28T13:05:24Z',
          'tags':[

          ],
          'lastUpdated':'2021-01-28T13:05:24Z',
          'publicationType':{
            'id':'2c91809a774908300177491877c60049',
            'value':'book',
            'label':'Book'
          },
          'identifiers':[

          ],
          'coverage':[

          ],
          'name':'15 Minuten Wahrheit',
          'type':{
            'id':'2c91809a774908300177490b0a9a000d',
            'value':'monograph',
            'label':'Monograph'
          },
          'suppressFromDiscovery':false,
          'work':{
            'id':'f9b07ac1-2d8f-4ea2-a344-438eee6088e1'
          },
          'class':'org.olf.kb.TitleInstance',
          'longName':'15 Minuten Wahrheit',
          'relatedTitles':[

          ]
        },
        'url':'https://hbz.ava.watch/film/shift/',
        'name':"'15 Minuten Wahrheit' on Platform 'hbz Hosting Platform'",
        'suppressFromDiscovery':false,
        'class':'org.olf.kb.PlatformTitleInstance',
        'longName':"'15 Minuten Wahrheit' on Platform 'hbz Hosting Platform'"
      },
      'pkg':{
        'id':'98a7b8fe-cd85-41b4-8eea-11eb80c0290f',
        'dateCreated':'2021-01-28T13:05:23Z',
        'lastUpdated':'2021-01-28T13:05:23Z',
        'vendor':{
          'id':'e90cffdd-8d04-47be-aa37-355778d30e43',
          'name':'PBS Video',
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
          'lastCheck':1611863286252,
          'name':'GOKb_TEST',
          'type':'org.olf.kb.adapters.GOKbOAIAdapter',
          'fullPrefix':'gokb',
          'uri':'http://gokbt.gbv.de/gokb/oai/index',
          'supportsHarvesting':true,
          'rectype':1
        },
        'name':'AVA VOD Library',
        'suppressFromDiscovery':false,
        'reference':'AVA_VOD_Library',
        'resourceCount':382,
        'class':'org.olf.kb.Pkg'
      },
      'addedTimestamp':1611839123974,
      'name':"'15 Minuten Wahrheit' on Platform 'hbz Hosting Platform' in Package AVA VOD Library",
      'lastSeenTimestamp':1611839123974,
      'suppressFromDiscovery':false,
      'note':'00: 18: 00',
      'longName':"'15 Minuten Wahrheit' on Platform 'hbz Hosting Platform' in Package AVA VOD Library",
      'class':'org.olf.kb.PackageContentItem'
    },
  ],
  'packageContentsCount':382,
  'relatedEntitlements':[

  ],
  'searchString':'?filters=class.package&sort=name'
};

const dataWithEmptyFieldValues = {
  'eresource':{
    'id':'98a7b8fe-cd85-41b4-8eea-11eb80c0290f',
    'dateCreated':'2021-01-28T13:05:23Z',
    'lastUpdated':'2021-01-28T13:05:23Z',
    'remoteKb':{
      'id':'4e5c35f5-2570-4259-8a13-f7eaca072477',
      'cursor':'2021-01-27T19:28:26Z',
      'active':true,
      'trustedSourceTI':false,
      'activationEnabled':false,
      'readonly':false,
      'syncStatus':'idle',
      'lastCheck':1611863286252,
      'name':'GOKb_TEST',
      'type':'org.olf.kb.adapters.GOKbOAIAdapter',
      'fullPrefix':'gokb',
      'uri':'http://gokbt.gbv.de/gokb/oai/index',
      'supportsHarvesting':true,
      'rectype':1
    },
    'name':'AVA VOD Library',
    'suppressFromDiscovery':false,
    'resourceCount':2,
    'class':'org.olf.kb.Pkg'
  },
  'entitlementOptions':[

  ],
  'entitlementOptionsCount':0,
  'entitlements':[

  ],
  'entitlementsCount':0,
  'packageContentsFilter':'current',
  'packageContents':[
    {
      'id':'036e8ac6-928d-485d-ba01-20900492777a',
      'dateCreated':'2021-01-28T13:05:24Z',
      'tags':[

      ],
      'lastUpdated':'2021-01-28T13:05:24Z',
      'depth':'Fulltext',
      'coverage':[
        {
          'id':'5c74781f-db5f-4669-b4b0-34995ba25850',
          'startDate':'2010-01-01',
          'startVolume':'1',
          'startIssue':'1',
          'summary':'v1/i1/2010-01-01 - v*/i*/*'
        }
      ],
      'pti':{
        'id':'1e887137-e75d-45b6-80d6-b811dc987c70',
        'dateCreated':'2021-01-28T13:05:24Z',
        'tags':[

        ],
        'lastUpdated':'2021-01-28T13:05:24Z',
        'platform':{
          'id':'6e479d70-ad9c-4508-917d-96193c5af3e2',
          'dateCreated':'2021-01-28T13:05:24Z',
          'lastUpdated':'2021-01-28T13:05:24Z',
          'name':'hbz Hosting Platform',
          'locators':[
            {
              'id':'b6727430-f1bb-4785-933b-bf20f10da3c6',
              'domainName':'cdroms.digibib.net'
            }
          ]
        },
        'templatedUrls':[
          {
            'id':'f9984b66-127c-4ad8-99a2-1c8e0719d7d8',
            'url':'https://hbz.ava.watch/film/0068-snipers-nest/',
            'name':'defaultUrl',
            'resource':{
              'id':'1e887137-e75d-45b6-80d6-b811dc987c70'
            }
          }
        ],
        'coverage':[
          {
            'id':'fd69e2ea-96f1-4190-846d-9b05348e5096',
            'startDate':'2010-01-01',
            'summary':'v*/i*/2010-01-01 - v*/i*/*'
          }
        ],
        'titleInstance':{
          'id':'017ec760-756c-4e1e-ae02-d2a398f59f2e',
          'subType':{
            'id':'2c91809a774908300177490b0a92000b',
            'value':'electronic',
            'label':'Electronic'
          },
          'dateCreated':'2021-01-28T13:05:24Z',
          'tags':[

          ],
          'lastUpdated':'2021-01-28T13:05:24Z',
          'publicationType':{
            'id':'2c91809a774908300177491877c60049',
            'value':'book',
            'label':'Book'
          },
          'identifiers':[

          ],
          'coverage':[
            {
              'id':'9dfe8f57-3804-4193-956b-33e281a21efd',
              'startDate':'2010-01-01',
              'summary':'v*/i*/2010-01-01 - v*/i*/*'
            }
          ],
          'name':'0068 Sniper`s Nest',
          'type':{
            'id':'2c91809a774908300177490b0a9a000d',
            'value':'monograph',
            'label':'Monograph'
          },
          'suppressFromDiscovery':false,
          'work':{
            'id':'737989b0-0655-47da-85d2-edf4e013c056'
          },
          'class':'org.olf.kb.TitleInstance',
          'longName':'0068 Sniper`s Nest',
          'relatedTitles':[

          ]
        },
        'url':'https://hbz.ava.watch/film/0068-snipers-nest/',
        'name':"'0068 Sniper`s Nest' on Platform 'hbz Hosting Platform'",
        'suppressFromDiscovery':false,
        'class':'org.olf.kb.PlatformTitleInstance',
        'longName':"'0068 Sniper`s Nest' on Platform 'hbz Hosting Platform'"
      },
      'pkg':{
        'id':'98a7b8fe-cd85-41b4-8eea-11eb80c0290f',
        'dateCreated':'2021-01-28T13:05:23Z',
        'lastUpdated':'2021-01-28T13:05:23Z',
        'vendor':{
          'id':'e90cffdd-8d04-47be-aa37-355778d30e43',
          'name':'PBS Video',
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
          'lastCheck':1611863286252,
          'name':'GOKb_TEST',
          'type':'org.olf.kb.adapters.GOKbOAIAdapter',
          'fullPrefix':'gokb',
          'uri':'http://gokbt.gbv.de/gokb/oai/index',
          'supportsHarvesting':true,
          'rectype':1
        },
        'name':'AVA VOD Library',
        'suppressFromDiscovery':false,
        'reference':'AVA_VOD_Library',
        'resourceCount':382,
        'class':'org.olf.kb.Pkg'
      },
      'addedTimestamp':1611839123974,
      'name':"'0068 Sniper`s Nest' on Platform 'hbz Hosting Platform' in Package AVA VOD Library",
      'lastSeenTimestamp':1611839123974,
      'suppressFromDiscovery':false,
      'note':'00: 19: 52',
      'longName':"'0068 Sniper`s Nest' on Platform 'hbz Hosting Platform' in Package AVA VOD Library",
      'class':'org.olf.kb.PackageContentItem'
    },
    {
      'id':'19a0c84c-abe5-48d7-85b0-9285fa9cba71',
      'dateCreated':'2021-01-28T13:05:24Z',
      'tags':[

      ],
      'lastUpdated':'2021-01-28T13:05:24Z',
      'depth':'Fulltext',
      'coverage':[

      ],
      'pti':{
        'id':'84b39082-8ae4-4212-ade7-edfec477b92c',
        'dateCreated':'2021-01-28T13:05:24Z',
        'tags':[

        ],
        'lastUpdated':'2021-01-28T13:05:24Z',
        'platform':{
          'id':'6e479d70-ad9c-4508-917d-96193c5af3e2',
          'dateCreated':'2021-01-28T13:05:24Z',
          'lastUpdated':'2021-01-28T13:05:24Z',
          'name':'hbz Hosting Platform',
          'locators':[
            {
              'id':'b6727430-f1bb-4785-933b-bf20f10da3c6',
              'domainName':'cdroms.digibib.net'
            }
          ]
        },
        'templatedUrls':[
          {
            'id':'794a0c01-cab6-4063-8b29-e8621a9af253',
            'url':'https://hbz.ava.watch/film/shift/',
            'name':'defaultUrl',
            'resource':{
              'id':'84b39082-8ae4-4212-ade7-edfec477b92c'
            }
          }
        ],
        'coverage':[

        ],
        'titleInstance':{
          'id':'368458e1-1ec7-4d01-aed0-5c480a46e76f',
          'subType':{
            'id':'2c91809a774908300177490b0a92000b',
            'value':'electronic',
            'label':'Electronic'
          },
          'dateCreated':'2021-01-28T13:05:24Z',
          'tags':[

          ],
          'lastUpdated':'2021-01-28T13:05:24Z',
          'publicationType':{
            'id':'2c91809a774908300177491877c60049',
            'value':'book',
            'label':'Book'
          },
          'identifiers':[

          ],
          'coverage':[

          ],
          'name':'15 Minuten Wahrheit',
          'type':{
            'id':'2c91809a774908300177490b0a9a000d',
            'value':'monograph',
            'label':'Monograph'
          },
          'suppressFromDiscovery':false,
          'work':{
            'id':'f9b07ac1-2d8f-4ea2-a344-438eee6088e1'
          },
          'class':'org.olf.kb.TitleInstance',
          'longName':'15 Minuten Wahrheit',
          'relatedTitles':[

          ]
        },
        'url':'https://hbz.ava.watch/film/shift/',
        'name':"'15 Minuten Wahrheit' on Platform 'hbz Hosting Platform'",
        'suppressFromDiscovery':false,
        'class':'org.olf.kb.PlatformTitleInstance',
        'longName':"'15 Minuten Wahrheit' on Platform 'hbz Hosting Platform'"
      },
      'pkg':{
        'id':'98a7b8fe-cd85-41b4-8eea-11eb80c0290f',
        'dateCreated':'2021-01-28T13:05:23Z',
        'lastUpdated':'2021-01-28T13:05:23Z',
        'vendor':{
          'id':'e90cffdd-8d04-47be-aa37-355778d30e43',
          'name':'PBS Video',
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
          'lastCheck':1611863286252,
          'name':'GOKb_TEST',
          'type':'org.olf.kb.adapters.GOKbOAIAdapter',
          'fullPrefix':'gokb',
          'uri':'http://gokbt.gbv.de/gokb/oai/index',
          'supportsHarvesting':true,
          'rectype':1
        },
        'name':'AVA VOD Library',
        'suppressFromDiscovery':false,
        'reference':'AVA_VOD_Library',
        'resourceCount':382,
        'class':'org.olf.kb.Pkg'
      },
      'addedTimestamp':1611839123974,
      'name':"'15 Minuten Wahrheit' on Platform 'hbz Hosting Platform' in Package AVA VOD Library",
      'lastSeenTimestamp':1611839123974,
      'suppressFromDiscovery':false,
      'note':'00: 18: 00',
      'longName':"'15 Minuten Wahrheit' on Platform 'hbz Hosting Platform' in Package AVA VOD Library",
      'class':'org.olf.kb.PackageContentItem'
    },
  ],
  'packageContentsCount':382,
  'relatedEntitlements':[

  ],
  'searchString':'?filters=class.package&sort=name'
};

let renderComponent;

describe('PackageInfo', () => {
  describe('when data is passed', () => {
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <MemoryRouter>
          <PackageInfo
            data={data}
          />
        </MemoryRouter>,
        translationsProperties
      );
    });

    test('renders the package name', () => {
      const { getByText } = renderComponent;
      expect(getByText(data.eresource.name)).toBeInTheDocument();
    });

    test('renders the Add package to basket button', () => {
      const { getByText } = renderComponent;
      expect(getByText('Add package to basket')).toBeInTheDocument();
    });

    test('renders the Provider field', async () => {
      await KeyValue('Provider').exists();
    });

    test('renders the expcected provider', async () => {
      await KeyValue('Provider').has({ value: 'PBS Video' });
    });

    test('renders the Source field', async () => {
      await KeyValue('Source').exists();
    });

    test('renders the expcected source', async () => {
      await KeyValue('Source').has({ value: 'GOKb' });
    });

    test('renders the Reference field', async () => {
      await KeyValue('Reference').exists();
    });

    test('renders the expcected reference', async () => {
      await KeyValue('Reference').has({ value: 'AVA_VOD_Library' });
    });
  });

  describe('when data with empty provider, source and reference is passed', () => {
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <MemoryRouter>
          <PackageInfo
            data={dataWithEmptyFieldValues}
          />
        </MemoryRouter>
      );
    });

    test('renders the expcected provider', async () => {
      await KeyValue('Provider').has({ value: '-' });
    });

    test('renders the expcected source', async () => {
      await KeyValue('Source').has({ value: '-' });
    });

    test('renders the expcected reference', async () => {
      await KeyValue('Reference').has({ value: '-' });
    });
  });
});
