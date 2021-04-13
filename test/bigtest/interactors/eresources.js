import {
  interactor,
  clickable,
  fillable,
  isPresent,
} from '@bigtest/interactor';

import MultiColumnListInteractor from '@folio/stripes-components/lib/MultiColumnList/tests/interactor';

export default @interactor class EresourcesInteractor {
  isPackageYesButtonPresent = isPresent('#clickable-filter-class-package');
  clickIsPackageYesButton = clickable('#clickable-filter-class-package');
  searchField = fillable('[data-test-eresource-search-input]');
  clickSearchButton = clickable('#clickable-search-eresources');
  isListPresent = isPresent('#list-eresources');

  list = new MultiColumnListInteractor('#list-eresources');

  whenLoaded() {
    return this.when(() => this.list.loaderPresent === false).timeout(5000);
  }
}
