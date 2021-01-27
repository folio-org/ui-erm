import React from 'react';
import '@folio/stripes-erm-components/test/jest/__mock__';
import { renderWithIntl, TestForm } from '@folio/stripes-erm-components/test/jest/helpers';
// import userEvent from '@testing-library/user-event';
import NoPermissions from './NoPermissions';

import translationsProperties from '../../../test/helpers';

// const onSubmit = jest.fn();

describe('NoPermissions', () => {
  test('renders Permission Error message', () => {
    const { getByRole, getByText } = renderWithIntl(
      <NoPermissions />, translationsProperties
    );
    expect(getByRole('heading', { name: 'stripes-smart-components.permissionError' })).toBeInTheDocument();
    expect(getByText('stripes-smart-components.permissionsDoNotAllowAccess')).toBeInTheDocument();
  });
});