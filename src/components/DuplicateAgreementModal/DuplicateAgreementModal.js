import React from 'react';
import { FormattedMessage } from 'react-intl';
import { DuplicateModal } from '@folio/stripes-erm-components';

export default class DuplicateAgreementModal extends React.Component {
  cloneableProperties = [
    { key: 'agreementInfo', value: <FormattedMessage id="ui-agreements.duplicateAgreementModal.agreementInfo" /> },
    { key: 'internalContacts', value: <FormattedMessage id="ui-agreements.duplicateAgreementModal.internalContacts" /> },
    { key: 'agreementLines', value : <FormattedMessage id="ui-agreements.duplicateAgreementModal.agreementLines" /> },
    { key: 'linkedLicenses', value: <FormattedMessage id="ui-agreements.duplicateAgreementModal.linkedLicenses" /> },
    { key: 'externalLicenses', value: <FormattedMessage id="ui-agreements.duplicateAgreementModal.externalLicenses" /> },
    { key: 'organizations', value: <FormattedMessage id="ui-agreements.duplicateAgreementModal.organizations" /> },
    { key: 'supplementaryInformation', value: <FormattedMessage id="ui-agreements.duplicateAgreementModal.supplementaryInformation" /> },
    { key: 'usageData', value: <FormattedMessage id="ui-agreements.duplicateAgreementModal.usageData" /> },
  ];

  translationIds = {
    cloneEndpointError: 'ui-agreements.duplicateAgreementModal.cloneEndpointError',
    duplicateModalLabel: 'ui-agreements.duplicateAgreementModal.duplicateAgreement',
    duplicateModalMessage: 'ui-agreements.duplicateAgreementModal.duplicateMessage',
    duplicateModalError: 'ui-agreements.duplicateAgreementModal.duplicateModalError',
    invalidResponseError: 'ui-agreements.duplicateAgreementModal.invalidResponseError',
  };

  render() {
    return (
      <DuplicateModal
        {...this.props}
        cloneableProperties={this.cloneableProperties}
        translationIds={this.translationIds}
      />
    );
  }
}
