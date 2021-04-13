import React from 'react';
import '@folio/stripes-erm-components/test/jest/__mock__';
import { renderWithIntl } from '@folio/stripes-erm-components/test/jest/helpers';
import { Accordion, MultiColumnList, MultiColumnListCell } from '@folio/stripes-testing';
import { MemoryRouter } from 'react-router-dom';
import translationsProperties from '../../../../test/helpers';
import PCICoverage from './PCICoverage';

const data = {
  eresource: {
    'id': 'a36cee05-1af3-44b2-abb3-f8c15075b642',
    'accessStart': '2014-01-01',
    'class': 'org.olf.kb.PackageContentItem',
    'dateCreated': '2020-04-24T15:20:16Z',
    'lastUpdated': '2020-04-24T15:20:16Z',
    'suppressFromDiscovery': true,
    'depth': 'full text',
    'embargo': {
      'movingWallEnd': {
        'length': 2,
        'unit': 'months'
      },
      'movingWallStart': {
        'length': 10,
        'unit': 'years'
      }
    },
    'coverage': [
      {
        'id': 'f74c8234-1b86-47a1-bf7b-33c3c726caa0',
        'startDate': '1963-01-01',
        'endDate': '1965-01-01',
        'endVolume': '3',
        'startIssue': '1',
        'endIssue': '2',
        'startVolume': '6',
        'summary': 'v6/i1/1963-01-01 - v*/i*/*',
      },
      {
        'id': 'f74c8234-b86-47a1-bf7b-33c3c726caa0',
        'startDate': '1967-01-01',
        'endDate': '1969-01-01',
        'endVolume': '12',
        'startIssue': '21',
        'endIssue': '5',
        'startVolume': '9',
        'summary': 'v9/i21/1967-01-01 - v*/i*/*',
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
  }
};

describe('PCI Coverage', () => {
  let renderComponent;
  beforeEach(() => {
    renderComponent = renderWithIntl(
      <MemoryRouter>
        <PCICoverage
          data={data}
        />
      </MemoryRouter>,
      translationsProperties
    );
  });

  test('renders an Accordion', async () => {
    await Accordion('Coverage').exists();
  });

  test('renders the coverage MCL', async () => {
    await MultiColumnList('pci-coverage-list').exists();
  });

  test('renders expected column count', async () => {
    await MultiColumnList({ id: 'pci-coverage-list', columnCount: 6 }).exists();
  });


  test('renders expected columns', async () => {
    await MultiColumnList({ id: 'pci-coverage-list', columns: ['Start date', 'Start volume', 'Start issue', 'End date', 'End volume', 'End issue'] }).exists();
  });

  test('renders expected row count', async () => {
    await MultiColumnList({ id: 'pci-coverage-list', rowCount: data.eresource.coverage.length }).exists();
  });

  test('renders expected coverage details in first row', async () => {
    Promise.all([
      await MultiColumnListCell({ row: 0, columnIndex: 0 }).has({ content: '1/1/1963' }),
      await MultiColumnListCell({ row: 0, columnIndex: 1 }).has({ content: '6' }),
      await MultiColumnListCell({ row: 0, columnIndex: 2 }).has({ content: '1' }),
      await MultiColumnListCell({ row: 0, columnIndex: 3 }).has({ content: '1/1/1965' }),
      await MultiColumnListCell({ row: 0, columnIndex: 4 }).has({ content: '3' }),
      await MultiColumnListCell({ row: 0, columnIndex: 5 }).has({ content: '2' }),
    ]);
  });

  test('renders the embargo', async () => {
    const { getByTestId } = renderComponent;
    expect(getByTestId('embargo')).toBeInTheDocument();
  });
});

