import {
  clickable,
  interactor,
  isPresent,
  property,
} from '@bigtest/interactor';

export default @interactor class SuppressFromDiscoveryInteractor {
  isDescription = isPresent('[data-test-sfdfa-description]');
  isAgreementLineCheckboxPresent = isPresent('[data-test-sfdfa-agreement-line]');
  clickAgreementLine = clickable('[data-test-sfdfa-agreement-line]');
  agreementLineFieldName = property('[data-test-sfdfa-agreement-line]', 'name')
  agreementLineFieldChecked = property('[data-test-sfdfa-agreement-line]', 'checked')

  isPCICheckboxPresent = isPresent('[data-test-sfdfa-pci]');
  clickPCI = clickable('[data-test-sfdfa-pci]');
  pciFieldName = property('[data-test-sfdfa-pci]', 'name')
  pciFieldChecked = property('[data-test-sfdfa-pci]', 'checked')

  isTitleInstanceCheckboxPresent = isPresent('[data-test-sfdfa-title]');
  clickTitleInstance = clickable('[data-test-sfdfa-title]');
  titleInstanceFieldName = property('[data-test-sfdfa-title]', 'name')
  titleInstanceFieldChecked = property('[data-test-sfdfa-title]', 'checked')
}
