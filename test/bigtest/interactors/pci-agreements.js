import {
  interactor,
  text,
} from '@bigtest/interactor';

import MultiColumnListInteractor from '@folio/stripes-components/lib/MultiColumnList/tests/interactor';

export default @interactor class PCIAgreementsInteractor {
  agreementsList = new MultiColumnListInteractor('#pci-agreements-list');
  relatedAgreementsList = new MultiColumnListInteractor('#related-agreements-list');

  eresourceName = text('[data-test-eresource-name]');

  agreementName = rowNumber => this.agreementsList.rows(rowNumber).cells(0).content
  agreementStatus = rowNumber => this.agreementsList.rows(rowNumber).cells(1).content
  startDate = rowNumber => this.agreementsList.rows(rowNumber).cells(2).content
  endDate = rowNumber => this.agreementsList.rows(rowNumber).cells(3).content

  relatedAgreementName = rowNumber => this.relatedAgreementsList.rows(rowNumber).cells(0).content
  relatedAgreementStatus = rowNumber => this.relatedAgreementsList.rows(rowNumber).cells(1).content
  relatedAgreementPackage = rowNumber => this.relatedAgreementsList.rows(rowNumber).cells(2).content
  relatedAgreementStartDate = rowNumber => this.relatedAgreementsList.rows(rowNumber).cells(3).content
  relatedAgreementEndDate = rowNumber => this.relatedAgreementsList.rows(rowNumber).cells(4).content
}
