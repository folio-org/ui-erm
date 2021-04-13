import {
  interactor,
  isPresent,
  clickable,
  text,
} from '@bigtest/interactor';

import PackageContentInteractor from './package-content';

export default @interactor class EresourceViewInteractor {
  isLoading = isPresent('#pane-view-eresource[data-loading]')
  headline = text('#package-info [data-test-headline]');

  clickAddToBasket = clickable('[data-test-basket-add-button]');

  packageContent = new PackageContentInteractor();

  whenLoaded() {
    return this.when(() => this.isLoading === false).timeout(5000);
  }
}
