import {
  interactor,
  text,
} from '@bigtest/interactor';

export default @interactor class PackageCardInteractor {
  static defaultScope = '[data-test-package-card]';

  packageName = text('[data-test-package-link]');
  resourceCount = text('[data-test-resource-count]');
  vendorName = text('[data-test-vendor-name]');
  packageSource = text('[data-test-package-source]');
  packageReference = text('[data-test-package-reference]');
}
