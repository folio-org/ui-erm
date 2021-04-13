import React from 'react';
import { render } from '@testing-library/react';
import '@folio/stripes-erm-components/test/jest/__mock__';
import CustomCoverageIcon from './CustomCoverageIcon';

describe('CustomCoverageIcon', () => {
  test('renders expected CustomCoverageIcon', () => {
    const { getByTestId } = render(<CustomCoverageIcon />);
    expect(getByTestId('customCoverageIcon')).toBeInTheDocument();
  });
});


