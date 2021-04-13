import {
  interactor,
  clickable,
} from '@bigtest/interactor';

import MultiColumnListInteractor from '@folio/stripes-components/lib/MultiColumnList/tests/interactor';

export default @interactor class PackageContentInteractor {
  clickAll = clickable('#clickable-pci-all');
  clickCurrent = clickable('#clickable-pci-current');
  clickDropped = clickable('#clickable-pci-dropped');
  clickFuture = clickable('#clickable-pci-future');

  list = new MultiColumnListInteractor('#package-contents-list');
  eresourceName = index => this.list.rows(index).cells(0).content;
}
