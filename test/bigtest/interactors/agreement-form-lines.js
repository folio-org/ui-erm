import {
  interactor,
  clickable,
  collection,
  count,
  isPresent,
  text,
} from '@bigtest/interactor';

@interactor class POLineFieldInteractor {
  isSelected = isPresent('[data-test-po-line-title]');
  hasError = isPresent('[data-test-error]');

  clickSelectPOLine = clickable('[data-test-po-line-select-po-line]');

  acquisitionMethod = text('[data-test-po-line-acq-method]');
  poLineNumber = text('[data-test-po-line-number]');
  title = text('[data-test-po-line-title]');
}

@interactor class AgreementFormLineInteractor {
  name = text('[data-test-ag-line-name]');
  clickAddPOLine = clickable('[data-test-poline-fa-add-button]');

  poLines = collection('[data-test-po-line]', POLineFieldInteractor);
}

export default @interactor class AgreementFormLinesInteractor {
  lineCount = count('[data-test-ag-line-number]');

  lines = collection('[data-test-ag-line-number]', AgreementFormLineInteractor);
}
