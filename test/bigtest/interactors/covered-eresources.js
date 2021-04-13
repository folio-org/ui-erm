import {
  interactor,
  clickable,
  property,
} from '@bigtest/interactor';

import MultiColumnListInteractor from '@folio/stripes-components/lib/MultiColumnList/tests/interactor';

export default @interactor class CoveredEresourcesListInteractor {
  clickAll = clickable('#clickable-pci-all');
  clickCurrent = clickable('#clickable-pci-current');
  clickFuture = clickable('#clickable-pci-future');
  clickDropped = clickable('#clickable-pci-dropped');
  isExportBtnDisabled = property('[data-test-export-button]', 'disabled');

  list = new MultiColumnListInteractor('#eresources-covered');
  eresourceName = index => this.list.rows(index).cells(0).content;
}
