import {
  clickable,
  interactor,
  isPresent,
} from '@bigtest/interactor';

import DuplicateModalInteractor from '@folio/stripes-erm-components/lib/DuplicateModal/tests/interactor';
import AgreementLinesInteractor from './agreement-lines';

@interactor class HeaderDropdownMenu {
  isDuplicateButtonPresent = isPresent('#clickable-dropdown-duplicate-agreement')
  clickDuplicate = clickable('#clickable-dropdown-duplicate-agreement');
}

export default @interactor class AgreementViewInteractor {
  isViewAgreement = isPresent('#pane-view-agreement');
  isLoading = isPresent('#pane-view-agreement[data-loading]');
  actionsDropdownButtonPresent = isPresent('[data-test-pane-header-actions-button]');
  clickActionsDropdownButton = clickable('[data-test-pane-header-actions-button]');

  headerDropdownMenu = new HeaderDropdownMenu();
  duplicateAgreementModal = new DuplicateModalInteractor();
  expandAll = clickable('[data-tast-expand-button]');

  linesSection = new AgreementLinesInteractor('#lines');

  whenLoaded() {
    return this.when(() => this.isLoading === false).timeout(5000);
  }

  whenActionsDropDownButtonLoaded() {
    return this.when(() => this.actionsDropdownButtonPresent === true).timeout(5000);
  }
}
