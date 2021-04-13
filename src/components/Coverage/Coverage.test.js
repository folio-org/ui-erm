import React from 'react';
import '@folio/stripes-erm-components/test/jest/__mock__';
import { renderWithIntl } from '@folio/stripes-erm-components/test/jest/helpers';
import Coverage from './Coverage';

const serialResource = {
  'id':'b0e57a22-85e1-46cc-bec6-002275f03431',
  'dateCreated':'2020-12-22T01:57:35Z',
  'tags':[

  ],
  'lastUpdated':'2020-12-22T01:57:35Z',
  'depth':'Fulltext',
  'coverage':[
    {
      'id':'223acd2d-dd4e-4e4f-a965-5ba1463e811a',
      'startDate':'1883-01-15',
      'endDate':'2014-10-20',
      'startIssue':'11',
      'endVolume':'228',
      'endIssue':'10-12',
      'summary':'v*/i11/1883-01-15 - v228/i10-12/2014-10-20'
    }
  ],
  'pti':{
    'id':'29488f4f-94f7-48cc-8055-33a96110e170',
    'dateCreated':'2020-12-22T01:57:35Z',
    'tags':[

    ],
    'lastUpdated':'2020-12-22T01:57:36Z',
    'platform':{
      'id':'00898b10-a11d-44b3-aa64-f85e29984a10',
      'dateCreated':'2020-12-22T01:44:45Z',
      'lastUpdated':'2020-12-22T01:44:45Z',
      'name':'DeGruyter Online',
      'locators':[
        {
          'id':'51048b60-378e-4a16-941e-2c308a6247fa',
          'domainName':'www.degruyter.com'
        }
      ]
    },
    'templatedUrls':[
      {
        'id':'49c20ba3-f69c-4e71-816c-3cb012bd12e2',
        'url':'https://www.degruyter.com/openurl?genre=journal&issn=2196-7156',
        'name':'defaultUrl',
        'resource':{
          'id':'29488f4f-94f7-48cc-8055-33a96110e170'
        }
      }
    ],
    'coverage':[
      {
        'id':'5181976d-5ddf-42c2-882d-92b110ef07a0',
        'startDate':'1883-01-15',
        'endDate':'2014-10-20',
        'summary':'v*/i*/1883-01-15 - v*/i*/2014-10-20'
      }
    ],
    'titleInstance':{
      'id':'5214a1da-0521-4123-a605-4d21b7cc4451',
      'subType':{
        'id':'2c91809a76881ba70176881e15f0001c',
        'value':'electronic',
        'label':'Electronic'
      },
      'dateCreated':'2020-12-22T01:57:35Z',
      'tags':[

      ],
      'lastUpdated':'2020-12-22T01:57:36Z',
      'publicationType':{
        'id':'2c91809a76881ba70176881e298f0045',
        'value':'journal',
        'label':'Journal'
      },
      'identifiers':[
        {
          'title':{
            'id':'5214a1da-0521-4123-a605-4d21b7cc4451'
          },
          'status':{
            'id':'2c91809a76881ba70176881e29cc0047',
            'value':'approved',
            'label':'approved'
          },
          'identifier':{
            'value':'2020854-6',
            'ns':{
              'value':'zdb'
            }
          }
        },
        {
          'title':{
            'id':'5214a1da-0521-4123-a605-4d21b7cc4451'
          },
          'status':{
            'id':'2c91809a76881ba70176881e29cc0047',
            'value':'approved',
            'label':'approved'
          },
          'identifier':{
            'value':'2196-7156',
            'ns':{
              'value':'eissn'
            }
          }
        },
        {
          'title':{
            'id':'5214a1da-0521-4123-a605-4d21b7cc4451'
          },
          'status':{
            'id':'2c91809a76881ba70176881e29cc0047',
            'value':'approved',
            'label':'approved'
          },
          'identifier':{
            'value':'8341',
            'ns':{
              'value':'ezb'
            }
          }
        }
      ],
      'coverage':[
        {
          'id':'746e4f4d-688b-4034-8594-145b3ba9d623',
          'startDate':'1883-01-15',
          'endDate':'2014-10-20',
          'summary':'v*/i*/1883-01-15 - v*/i*/2014-10-20'
        }
      ],
      'name':'Zeitschrift für physikalische Chemie',
      'type':{
        'id':'2c91809a76881ba70176881e15fa001f',
        'value':'serial',
        'label':'Serial'
      },
      'suppressFromDiscovery':false,
      'work':{
        'id':'b0672e0d-f3d2-48e8-b931-487f0d0e3886'
      },
      'class':'org.olf.kb.TitleInstance',
      'longName':'Zeitschrift für physikalische Chemie',
      'relatedTitles':[
        {
          'id':'9c741ce5-0bd9-48e4-b586-840704d968f1',
          'subType':{
            'id':'2c91809a76881ba70176881e15ec001b',
            'value':'print',
            'label':'Print'
          },
          'publicationType':{
            'id':'2c91809a76881ba70176881e298f0045',
            'value':'journal',
            'label':'Journal'
          },
          'identifiers':[
            {
              'title':{
                'id':'9c741ce5-0bd9-48e4-b586-840704d968f1'
              },
              'status':{
                'id':'2c91809a76881ba70176881e29cc0047',
                'value':'approved',
                'label':'approved'
              },
              'identifier':{
                'value':'0942-9352',
                'ns':{
                  'value':'issn'
                }
              }
            }
          ],
          'name':'Zeitschrift für physikalische Chemie',
          'type':{
            'id':'2c91809a76881ba70176881e15fa001f',
            'value':'serial',
            'label':'Serial'
          },
          'longName':'Zeitschrift für physikalische Chemie'
        }
      ]
    },
    'url':'https://www.degruyter.com/openurl?genre=journal&issn=2196-7156',
    'name':"'Zeitschrift für physikalische Chemie' on Platform 'DeGruyter Online'",
    'suppressFromDiscovery':false,
    'class':'org.olf.kb.PlatformTitleInstance',
    'longName':"'Zeitschrift für physikalische Chemie' on Platform 'DeGruyter Online'"
  },
  'pkg':{
    'id':'28bacae2-07e0-49e5-b9eb-6818a43752cc',
    'dateCreated':'2020-12-22T01:57:34Z',
    'lastUpdated':'2020-12-22T01:57:34Z',
    'vendor':{
      'id':'9c8fd19a-72a6-481b-af9c-57652f9f7fc8',
      'name':'De Gruyter',
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
      'lastCheck':1608666158969,
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
  'addedTimestamp':1608602254524,
  'name':"'Zeitschrift für physikalische Chemie' on Platform 'DeGruyter Online' in Package De Gruyter : Journal Archive Package Biology, Chemistry, Geoscience...",
  'lastSeenTimestamp':1608602254524,
  'suppressFromDiscovery':false,
  'longName':"'Zeitschrift für physikalische Chemie' on Platform 'DeGruyter Online' in Package De Gruyter : Journal Archive Package Biology, Chemistry, Geosciences : 2019-07-08",
  'class':'org.olf.kb.PackageContentItem',
  'rowIndex':20
};

const monographResource = {
  'id': 'a36cee05-1af3-44b2-abb3-f8c15075b642',
  'accessStart': '2014-01-01',
  'dateCreated': '2020-04-24T15:20:16Z',
  'lastUpdated': '2020-04-24T15:20:16Z',
  'depth': 'full text',
  'coverage': [{
    'id': 'f74c8234-1b86-47a1-bf7b-33c3c726caa0',
    'startDate': '1963-01-01',
    'endDate': '1965-01-01',
    'endVolume': '3',
    'startIssue': '1',
    'startVolume': '6',
    'summary': 'v6/i1/1963-01-01 - v*/i*/*',
  }],
  'pti': {
    'id': 'cb7319b3-4785-4cc4-a472-67e24fa26851',
    'dateCreated': '2020-04-24T15:20:16Z',
    'lastUpdated': '2020-04-24T15:20:16Z',
    'platform': {
      'id': '7eb8f24e-52bf-40d4-b880-2e31e444022e',
      'name': 'Project Gutenberg'
    },
    'coverage': [],
    'entitlements': [],
    'titleInstance': {
      'id': 'dbe591be-230b-4c54-be5e-09cb1149401e',
      'firstEditor': 'Iannucci',
      'subType': {
        'id': '2c9180b271aa43fa0171aa450a91003b',
        'value': 'electronic',
        'label': 'Electronic'
      },
      'dateCreated': '2020-04-24T15:20:16Z',
      'lastUpdated': '2020-04-24T15:20:16Z',
      'dateMonographPublished': '1850',
      'monographEdition': '1st',
      'identifiers': [
        {
          'title': {
            'id': 'dbe591be-230b-4c54-be5e-09cb1149401e'
          },
          'status': {
            'id': '2c9180b271aa43fa0171aa451a7f0040',
            'value': 'approved',
            'label': 'approved'
          },
          'identifier': {
            'value': '9780141974330',
            'ns': {
              'value': 'isbn'
            }
          }
        },
        {
          'title': {
            'id': 'dbe591be-230b-4c4-be5e-09cb1149401e'
          },
          'status': {
            'id': '2c9180b271aa43fa0171aa451a7f0040',
            'value': 'approved',
            'label': 'approved'
          },
          'identifier': {
            'value': '1234567',
            'ns': {
              'value': 'doi'
            }
          }
        }
      ],
      'coverage': [],
      'name': 'The Personal History of David Copperfield',
      'publicationType': {
        'id': '2c9180b271aa43fa0171acc669a50059',
        'value': 'monograph',
        'label': 'monograph'
      },
      'type': {
        'id': '2c9180b271aa43fa0171acc669a50059',
        'value': 'monograph',
        'label': 'monograph'
      },
      'work': {
        'id': '229cddb6-08fd-4de8-ade4-778e360c49c3'
      },
      'platformInstances': [
        {
          'id': 'cb7319b3-4785-4cc4-a472-67e24fa26851'
        }
      ],
      'firstAuthor': 'Dickens',
      'monographVolume': '1'
    },
    'url': 'https://www.gutenberg.org/files/43111/43111-h/43111-h.htm',
    'name': "'The Personal History of David Copperfield' on Platform 'Project Gutenberg'",
    'packageOccurences': [
      {
        'id': 'a36cee05-1af3-44b2-abb3-f8c15075b642'
      }
    ]
  },
  'pkg': {
    'id': '9d282cfa-03ae-4a5a-bbd1-d805fd8b9b30',
    'dateCreated': '2020-04-24T15:20:16Z',
    'lastUpdated': '2020-04-24T15:20:16Z',
    'vendor': {
      'id': 'c327f060-5063-46c8-a974-1815e07e331b',
      'name': 'DIKU',
      'orgsUuid_object': {
        'error': 400,
        'message': 'Bad Request'
      }
    },
    'coverage': [],
    'source': 'Folio Testing',
    'remoteKb': {
      'id': '3366ae11-fc67-4082-a676-ec1489b50ed3',
      'active': true,
      'trustedSourceTI': true,
      'activationEnabled': false,
      'readonly': true,
      'name': 'LOCAL',
      'supportsHarvesting': false,
      'rectype': 1
    },
    'entitlements': [],
    'name': 'simple_package_full_monograph_serial_items Test Package',
    'reference': 'simple_package_full_monograph_serial_items',
    'resourceCount': 2
  },
  'addedTimestamp': 1587741616444,
  'entitlements': [],
  'accessEnd': '2015-01-01',
  'name': "'The Personal History of David Copperfield' on Platform 'Project Gutenberg' in Package simple_package_full_monograph_serial_items Test Package",
  'lastSeenTimestamp': 1587741616444
};

describe('Coverage', () => {
  test('renders expected serial coverage when passed as a pci', () => {
    const { getByTestId } = renderWithIntl(
      <Coverage
        pci={serialResource}
      />

    );

    expect(getByTestId('serialCoverage')).toBeInTheDocument();
  });

  test('renders expected monograph coverage when passed as a pci', () => {
    const { getByTestId } = renderWithIntl(
      <Coverage
        pci={monographResource}
      />

    );

    expect(getByTestId('monographCoverage')).toBeInTheDocument();
  });

  test('renders expected serial coverage when passed as a line', () => {
    const line = monographResource;
    const { getByTestId } = renderWithIntl(
      <Coverage
        line={line}
      />

    );

    expect(getByTestId('serialCoverage')).toBeInTheDocument();
  });

  test('renders expected monograph coverage when passed as a line with an _object', () => {
    const monographLine = {
      resource: {
        _object: monographResource,
      },
    };

    const { getByTestId } = renderWithIntl(
      <Coverage
        line={monographLine}
      />

    );

    expect(getByTestId('monographCoverage')).toBeInTheDocument();
  });
});
