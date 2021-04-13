import {
  clickable,
  interactor,
  isPresent,
  property,
} from '@bigtest/interactor';

export default @interactor class TitleInstanceEditPaneInteractor {
  isTitleForm = isPresent('#pane-title-form');
  isSuppressFromDiscoveryCheckboxPresent = isPresent('#title-suppress-from-discovery');
  suppressFromDiscoveryCheckboxChecked = property('#title-suppress-from-discovery', 'checked');
  clickSuppressFromDiscoveryCheckbox = clickable('#title-suppress-from-discovery');

  submit = clickable('#submit');

  whenLoaded() {
    return this.when(() => this.isTitleForm).timeout(5000);
  }
}
