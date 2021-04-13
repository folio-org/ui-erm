import {
  interactor,
  isPresent,
  collection,
  clickable,
  fillable,
  scoped,
  selectable,
  text,
  value,
} from '@bigtest/interactor';

import AgreementFormLinesInteractor from './agreement-form-lines';

@interactor class InternalContactCardInteractor {
  userName = text('[data-test-user-name]');
  isCardPresent = isPresent('[data-test-internal-contact]')
}

export default @interactor class AgreementFormInteractor {
  isAgreementForm = isPresent('#pane-agreement-form');
  fillName = fillable('#edit-agreement-name');
  name = value('#edit-agreement-name');
  selectStatus = selectable('#edit-agreement-status');
  fillStartDate = fillable('#period-start-date-0');
  createAgreement = clickable('#clickable-create-agreement');
  clickCancel = clickable('#clickable-cancel');
  clickCloseWithoutSave = clickable('[data-test-confirmation-modal-cancel-button]');
  clickSaveAndClose = clickable('#clickable-update-agreement');

  internalContacts = collection('[data-test-internal-contact]', InternalContactCardInteractor)

  whenLoaded() {
    return this.when(() => this.isAgreementForm).timeout(5000);
  }

  linesSection = scoped('#formLines', AgreementFormLinesInteractor);
}
