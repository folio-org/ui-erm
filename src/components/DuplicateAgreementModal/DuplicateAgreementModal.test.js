import React from 'react';
import '@folio/stripes-erm-components/test/jest/__mock__';
import { renderWithIntl } from '@folio/stripes-erm-components/test/jest/helpers';
import DuplicateAgreementModal from './DuplicateAgreementModal';

describe('DuplicateAgreementModal', () => {
  test('renders expected duplicate agreement modal', () => {
    const { getByTestId } = renderWithIntl(<DuplicateAgreementModal />);
    expect(getByTestId('duplicateModal')).toBeInTheDocument();
  });
});

