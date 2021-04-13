import {
  interactor,
  isPresent,
  text
} from '@bigtest/interactor';

export default @interactor class PlatformViewInteractor {
  isLoading = isPresent('#pane-view-platform[data-loading]');

  isLocalCodePresent = isPresent('[data-test-local-platform-code]');
  isLocatorsPresent = isPresent('[data-test-platform-locators]');
  isPlatformNamePresent = isPresent('[data-test-platform-name]');

  localCode = text('[data-test-local-platform-code]');
  locators = text('[data-test-platform-locators]');
  platformName = text('[data-test-platform-name]');

  whenLoaded() {
    return this.when(() => this.isLoading === false).timeout(5000);
  }
}
