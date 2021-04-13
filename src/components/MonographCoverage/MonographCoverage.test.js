import React from 'react';
import '@folio/stripes-erm-components/test/jest/__mock__';
import { renderWithIntl } from '@folio/stripes-erm-components/test/jest/helpers';
import MonographCoverage from './MonographCoverage';

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

const monographResourceNoEdition = {
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

const monographResourceNoVolume = {
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

describe('MonographCoverage', () => {
  test('renders expected monograph coverage when passed as a pci', () => {
    const { getByTestId } = renderWithIntl(
      <MonographCoverage
        pci={monographResource}
      />
    );

    // renders monograph coverage element
    expect(getByTestId('monographCoverage')).toBeInTheDocument();
    // renders correct date
    expect(getByTestId('dateDisplay')).toHaveTextContent('1850');
    // renders correct edition
    expect(getByTestId('editionDisplay')).toHaveTextContent('1st');
    // renders correct volume
    expect(getByTestId('volumeDisplay')).toHaveTextContent('1');
  });

  test('renders expected monograph coverage when passed without an edition', () => {
    const { queryByTestId } = renderWithIntl(
      <MonographCoverage
        pci={monographResourceNoEdition}
      />
    );
    // does not render edition
    expect(queryByTestId('editionDisplay')).not.toBeInTheDocument();
  });

  test('renders expected monograph coverage when passed without a volume', () => {
    const { queryByTestId } = renderWithIntl(
      <MonographCoverage
        pci={monographResourceNoVolume}
      />
    );
    // does not render volume
    expect(queryByTestId('volumeDisplay')).not.toBeInTheDocument();
  });

  test('renders expected monograph coverage when passed without a pci', () => {
    const { queryByTestId } = renderWithIntl(
      <MonographCoverage />
    );
    // does not render monograph coverage element
    expect(queryByTestId('monographCoverage')).not.toBeInTheDocument();
  });
});
