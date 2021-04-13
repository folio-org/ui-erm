import React from 'react';
import '@folio/stripes-erm-components/test/jest/__mock__';
import { renderWithIntl } from '@folio/stripes-erm-components/test/jest/helpers';
import NoPermissions from './NoPermissions';
import translationsProperties from '../../../test/helpers';

describe('NoPermissions', () => {
  test('renders Permission Error message', () => {
    const { getByRole, getByText } = renderWithIntl(
      <NoPermissions />, translationsProperties
    );
    expect(getByRole('heading', { name: 'stripes-smart-components.permissionError' })).toBeInTheDocument();
    expect(getByText('stripes-smart-components.permissionsDoNotAllowAccess')).toBeInTheDocument();
  });
});
