
import React from 'react';
import '@folio/stripes-erm-components/test/jest/__mock__';
import { renderWithIntl } from '@folio/stripes-erm-components/test/jest/helpers';
import { MemoryRouter } from 'react-router-dom';
import { noop } from 'lodash';
import translationsProperties from '../../../test/helpers';
import AgreementsRoute from './AgreementsRoute';

jest.mock('@folio/stripes-erm-components', () => ({
  ...jest.requireActual('@folio/stripes-erm-components'),
  InternalContactSelection: () => <div>InternalContactSelection</div>,
}));

jest.mock('@folio/stripes-components', () => ({
  ...jest.requireActual('@folio/stripes-components'),
  Selection: () => <div>Selection</div>,
}));

const agreements = {
  'hasLoaded':true,
  'isPending':false,
  'failed':false,
  'records':[
    {
      'id':'9c9fd849-1f4c-4386-936a-1067dd1deae3',
      'name':'OS Test Agreement 1',
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
        {
          'id':2,
          'normValue':'important',
          'value':'important'
        }
      ],
      'inwardRelationships':[

      ],
      'startDate':'2021-02-01',
      'linkedLicenses':[

      ],
      'docs':[

      ],
      'periods':[
        {
          'id':'8e03f087-051a-4268-8cab-e025be0c5691',
          'startDate':'2021-02-01',
          'owner':{
            'id':'9c9fd849-1f4c-4386-936a-1067dd1deae3'
          }
        }
      ],
      'usageDataProviders':[

      ],
      'agreementStatus':{
        'id':'2c9180b5775ba07f01775ba0d4020029',
        'value':'active',
        'label':'Active'
      },
      'supplementaryDocs':[

      ],
      'currentPeriod':{
        'id':'8e03f087-051a-4268-8cab-e025be0c5691',
        'startDate':'2021-02-01',
        'owner':{
          'id':'9c9fd849-1f4c-4386-936a-1067dd1deae3'
        }
      },
      'endDate':null,
      'cancellationDeadline':null,
      'alternateNames':[

      ]
    },
    {
      'id':'e84c89bd-4c12-4310-a83a-916a6d68eb9f',
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
      'startDate':'2021-02-01',
      'linkedLicenses':[

      ],
      'docs':[

      ],
      'periods':[
        {
          'id':'fab18136-f850-4af1-acbc-25c4b1b26207',
          'startDate':'2021-02-01',
          'owner':{
            'id':'e84c89bd-4c12-4310-a83a-916a6d68eb9f'
          }
        }
      ],
      'usageDataProviders':[

      ],
      'agreementStatus':{
        'id':'2c9180b87765edd0017765ee23bf002a',
        'value':'active',
        'label':'Active'
      },
      'supplementaryDocs':[

      ],
      'currentPeriod':{
        'id':'fab18136-f850-4af1-acbc-25c4b1b26207',
        'startDate':'2021-02-01',
        'owner':{
          'id':'e84c89bd-4c12-4310-a83a-916a6d68eb9f'
        }
      },
      'endDate':null,
      'cancellationDeadline':null,
      'alternateNames':[

      ]
    }
  ],
  'successfulMutations':[

  ],
  'failedMutations':[

  ],
  'pendingMutations':[

  ],
  'loadedAt':'2021-02-01T21:06:59.882Z',
  'url':'https://folio-testing-okapi.dev.folio.org/erm/sas?filters=agreementStatus.value%3D%3Dactive%7C%7CagreementStatus.value%3D%3Ddraft%7C%7CagreementStatus.value%3D%3Din_negotiation%7C%7CagreementStatus.value%3D%3Drequested&perPage=100&sort=name%3Basc&stats=true',
  'headers':{

  },
  'httpStatus':200,
  'other':{
    'pageSize':100,
    'page':1,
    'totalPages':1,
    'meta':{

    },
    'totalRecords':1,
    'total':1
  },
  'resource':'agreements',
  'module':'@folio/agreements',
  'throwErrors':true
};

const routeProps = {
  history: {
    push: () => jest.fn()
  },
  location: {},
  mutator: {
    query: { update: noop },
  },
  resources: { agreements }
};

describe('AgreementsRoute', () => {
  describe('rendering the route with permissions', () => {
    let renderComponent;
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <MemoryRouter>
          <AgreementsRoute {...routeProps} />
        </MemoryRouter>,
        translationsProperties
      );
    });

    test('renders the agreements component', () => {
      const { getByTestId } = renderComponent;
      expect(getByTestId('agreements')).toBeInTheDocument();
    });

    describe('re-rendering the route', () => { // makes sure that we hit the componentDidUpdate block
      beforeEach(() => {
        renderWithIntl(
          <MemoryRouter>
            <AgreementsRoute {...routeProps} />
          </MemoryRouter>,
          translationsProperties,
          renderComponent.rerender
        );
      });

      test('renders the agreements component', () => {
        const { getByTestId } = renderComponent;
        expect(getByTestId('agreements')).toBeInTheDocument();
      });
    });
  });

  describe('rendering with no permissions', () => {
    let renderComponent;
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <MemoryRouter>
          <AgreementsRoute
            {...routeProps}
            stripes={{ hasPerm: () => false }}
          />
        </MemoryRouter>,
        translationsProperties
      );
    });

    test('displays the permission error', () => {
      const { getByText } = renderComponent;
      expect(getByText('stripes-smart-components.permissionError')).toBeInTheDocument();
    });
  });
});
