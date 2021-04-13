import {
  interactor,
  isPresent,
  collection,
  clickable,
  fillable,
  value,
} from '@bigtest/interactor';

import POLineCardInteractor from './po-line-card';
import CustomCoverageFieldInteractor from './coverage-field';

export default @interactor class AgreementLineFormInteractor {
  isAgreementLineForm = isPresent('#pane-agreement-line-form');

  activeFrom = value('#agreement-line-active-from');
  fillActiveFrom = fillable('#agreement-line-active-from');
  activeTo = value('#agreement-line-active-to');
  fillActiveTo = fillable('#agreement-line-active-to');
  note = value('#agreement-line-note');
  fillNote = fillable('#agreement-line-note');

  poLines = collection('[data-test-po-line-card]', POLineCardInteractor);
  coverage = collection('[data-test-coverage-number]', CustomCoverageFieldInteractor);

  hasPOLinesAccordion = isPresent('#accordion-toggle-button-agreement-line-form-po-lines')
  hasCoverageAccordion = isPresent('#accordion-toggle-button-agreement-line-form-coverage');

  addPOLine = clickable('#add-poline-btn-0');
  addCoverage = clickable('#add-agreement-line-custom-coverage-button');

  save = clickable('#clickable-update-agreement-line');
  cancel = clickable('#clickable-cancel');

  whenLoaded() {
    return this.when(() => this.isAgreementLineForm).timeout(5000);
  }
}
