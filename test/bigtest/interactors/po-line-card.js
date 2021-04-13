import {
  attribute,
  interactor,
  isPresent,
  text,
} from '@bigtest/interactor';

export default @interactor class POLineCardInteractor {
  static defaultScope = '[data-test-po-line-card]';

  textContent = text();

  id = attribute('id');
  acqMethod = text('[data-test-po-line-acq-method]');
  title = text('[data-test-po-line-title]');
  poLineNumber = text('[data-test-po-line-number]');
  inventoryLinkIsPresent = isPresent('[data-test-po-line-view-in-inventory]')
}
