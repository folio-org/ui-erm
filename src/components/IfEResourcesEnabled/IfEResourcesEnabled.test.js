import React from 'react';
import { render } from '@testing-library/react';
import '@folio/stripes-erm-components/test/jest/__mock__';
import IfEResourcesEnabled from './IfEResourcesEnabled';

const showInternalKbResource = {
  'settings':{
    'hasLoaded':true,
    'isPending':false,
    'failed':false,
    'records':[
      {
        'id':'91873ed5-7672-4bdd-9507-e565929e1c22',
        'module':'AGREEMENTS',
        'configName':'general',
        'enabled':true,
        'value':'{"displaySuppressFromDiscovery":{"pci":true,"agreementLine":true,"title":true},"hideEResourcesFunctionality":true,"pageSize":{"agreementLines":10,"agreementEresources":10,"entitlementOptions":10,"packageContents":10,"entitlements":10}}',
        'metadata':{
          'createdDate':'2021-01-20T22:10:45.116+00:00',
          'createdByUserId':'51ffbeb5-eebf-5f6c-be84-7769e3e18291',
          'updatedDate':'2021-01-20T22:10:45.116+00:00',
          'updatedByUserId':'51ffbeb5-eebf-5f6c-be84-7769e3e18291'
        }
      }
    ],
    'successfulMutations':[
      {
        'type':'POST',
        'record':{
          'id':'91873ed5-7672-4bdd-9507-e565929e1c22',
          'module':'AGREEMENTS',
          'configName':'general',
          'enabled':true,
          'value':'{"displaySuppressFromDiscovery":{"pci":true,"agreementLine":true,"title":true},"hideEResourcesFunctionality":false,"pageSize":{"agreementLines":10,"agreementEresources":10,"entitlementOptions":10,"packageContents":10,"entitlements":10}}',
          'metadata':{
            'createdDate':'2021-01-20T22:10:45.116+00:00',
            'createdByUserId':'51ffbeb5-eebf-5f6c-be84-7769e3e18291',
            'updatedDate':'2021-01-20T22:10:45.116+00:00',
            'updatedByUserId':'51ffbeb5-eebf-5f6c-be84-7769e3e18291'
          }
        }
      }
    ],
    'failedMutations':[

    ],
    'pendingMutations':[

    ],
    'loadedAt':'2021-01-20T22:10:52.599Z',
    'url':'https://folio-snapshot-okapi.dev.folio.org/configurations/entries?query=(module=AGREEMENTS%20and%20configName=general)',
    'headers':{

    },
    'httpStatus':200,
    'other':{
      'totalRecords':1,
      'resultInfo':{
        'totalRecords':1,
        'facets':[

        ],
        'diagnostics':[

        ]
      }
    },
    'resource':'settings',
    'module':'@folio/agreements',
    'throwErrors':true
  }
};

const hideInternalKbResource = {
  'settings':{
    'hasLoaded':true,
    'isPending':false,
    'failed':false,
    'records':[
      {
        'id':'91873ed5-7672-4bdd-9507-e565929e1c22',
        'module':'AGREEMENTS',
        'configName':'general',
        'enabled':true,
        'value':'{"displaySuppressFromDiscovery":{"pci":true,"agreementLine":true,"title":true},"hideEResourcesFunctionality":false,"pageSize":{"agreementLines":10,"agreementEresources":10,"entitlementOptions":10,"packageContents":10,"entitlements":10}}',
        'metadata':{
          'createdDate':'2021-01-20T22:10:45.116+00:00',
          'createdByUserId':'51ffbeb5-eebf-5f6c-be84-7769e3e18291',
          'updatedDate':'2021-01-20T22:10:45.116+00:00',
          'updatedByUserId':'51ffbeb5-eebf-5f6c-be84-7769e3e18291'
        }
      }
    ],
    'successfulMutations':[
      {
        'type':'POST',
        'record':{
          'id':'91873ed5-7672-4bdd-9507-e565929e1c22',
          'module':'AGREEMENTS',
          'configName':'general',
          'enabled':true,
          'value':'{"displaySuppressFromDiscovery":{"pci":true,"agreementLine":true,"title":true},"hideEResourcesFunctionality":false,"pageSize":{"agreementLines":10,"agreementEresources":10,"entitlementOptions":10,"packageContents":10,"entitlements":10}}',
          'metadata':{
            'createdDate':'2021-01-20T22:10:45.116+00:00',
            'createdByUserId':'51ffbeb5-eebf-5f6c-be84-7769e3e18291',
            'updatedDate':'2021-01-20T22:10:45.116+00:00',
            'updatedByUserId':'51ffbeb5-eebf-5f6c-be84-7769e3e18291'
          }
        }
      }
    ],
    'failedMutations':[

    ],
    'pendingMutations':[

    ],
    'loadedAt':'2021-01-20T22:10:52.599Z',
    'url':'https://folio-snapshot-okapi.dev.folio.org/configurations/entries?query=(module=AGREEMENTS%20and%20configName=general)',
    'headers':{

    },
    'httpStatus':200,
    'other':{
      'totalRecords':1,
      'resultInfo':{
        'totalRecords':1,
        'facets':[

        ],
        'diagnostics':[

        ]
      }
    },
    'resource':'settings',
    'module':'@folio/agreements',
    'throwErrors':true
  }
};

describe('IfEResourcesEnabled', () => {
  test('should not render children when internal kb set to true', () => {
    const { queryByText } = render(
      <IfEResourcesEnabled resources={showInternalKbResource}>
        <div>Child</div>
      </IfEResourcesEnabled>
    );

    expect(queryByText('Child')).not.toBeInTheDocument();
  });

  test('should not render children when hide internal kb set to false', () => {
    const { queryByText } = render(
      <IfEResourcesEnabled resources={hideInternalKbResource}>
        <div>Child</div>
      </IfEResourcesEnabled>
    );

    expect(queryByText('Child')).toBeInTheDocument();
  });

  test('should not render children when internal kb set to true', () => {
    const { queryByText } = render(
      <IfEResourcesEnabled resources={showInternalKbResource}>
        {({ isEnabled }) => (isEnabled ? (<div>Child</div>) : null)}
      </IfEResourcesEnabled>
    );

    expect(queryByText('Child')).not.toBeInTheDocument();
  });

  test('should not render children passed as a function when hide internal kb set to false', () => {
    const { queryByText } = render(
      <IfEResourcesEnabled resources={hideInternalKbResource}>
        {({ isEnabled }) => (isEnabled ? (<div>Child</div>) : null)}
      </IfEResourcesEnabled>
    );

    expect(queryByText('Child')).toBeInTheDocument();
  });
});
