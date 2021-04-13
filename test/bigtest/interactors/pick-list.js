import {
  interactor,
  clickable,
  collection,
  count,
  isPresent,
  property,
} from '@bigtest/interactor';

import SelectInteractor from '@folio/stripes-components/lib/Select/tests/interactor'; // eslint-disable-line

const rowSelector = '[class*=editListRow--]';

const RowInteractor = interactor(class RowInteractor {
  isEditPickListButtonPresent = isPresent('[id^="clickable-edit-pick-lists-"]');
  isDeletePickListButtonPresent = isPresent('[id^="clickable-delete-pick-lists-"]');

  isEditPickListValuesButtonPresent = isPresent('[id^="clickable-edit-pick-list-values-"]');
  isDeletePickListValuesButtonPresent = isPresent('[id^="clickable-delete-pick-list-values-"]');
});

@interactor class ListInteractor {
  rowCount = count(rowSelector);
  rows = collection(rowSelector, RowInteractor);
}

export default @interactor class PickListInteractor {
  pickList = new ListInteractor('#editList-pick-lists');
  valuesList = new ListInteractor('#editList-pick-list-values');
  pickListDropdown = new SelectInteractor('[class*=selectWrap---]');
  isNewButtonDisabled = property('#clickable-add-pick-list-values', 'disabled');
  clickableNewButton = clickable('#clickable-add-pick-list-values');
}
