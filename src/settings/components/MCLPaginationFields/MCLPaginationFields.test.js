import React from 'react';
import '@folio/stripes-erm-components/test/jest/__mock__';
import { renderWithIntl, TestForm } from '@folio/stripes-erm-components/test/jest/helpers';
import userEvent from '@testing-library/user-event';
import MCLPaginationFields from './MCLPaginationFields';

const onSubmit = jest.fn();
const mclList = ['agreementLines', 'agreementEresources', 'entitlementOptions', 'packageContents', 'entitlements'];

describe('MCLPaginationFields', () => {
  test('renders mcl fields', () => {
    const { getByTestId } = renderWithIntl(
      <TestForm onSubmit={onSubmit}>
        <MCLPaginationFields />
      </TestForm>
    );
    mclList.forEach((mcl) => {
      expect(getByTestId(mcl)).toBeInTheDocument();
    });
  });

  test('submitting form should return expected payload', () => {
    const { getByTestId } = renderWithIntl(
      <TestForm onSubmit={onSubmit}>
        <MCLPaginationFields />
      </TestForm>
    );

    mclList.forEach((mcl) => {
      userEvent.type(getByTestId(mcl), '15');
    });

    const expectedPayload = {
      'pageSize':{
        'agreementEresources':15,
        'agreementLines':15,
        'entitlementOptions':15,
        'entitlements':15,
        'packageContents':15
      }
    };

    userEvent.click(getByTestId('submit'));
    expect(onSubmit.mock.calls.length).toBe(1);
    expect(onSubmit.mock.calls[0][0]).toEqual(expectedPayload);
  });
});
// Add validation tests once TextField interactor is made available
