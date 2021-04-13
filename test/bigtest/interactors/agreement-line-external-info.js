import {
  interactor,
  isPresent,
  text,
} from '@bigtest/interactor';

export default @interactor class AgreementLineInfoInteractor {
  isTitleCardPresent = isPresent('[data-test-title-card]');
  isPkgCardPresent = isPresent('[data-test-package-card]');

  parentAgreementName = text('[data-test-agreement-line-agreement]');
  activeFrom = text('[data-test-agreement-line-active-from]');
  activeTo = text('[data-test-agreement-line-active-to]');
  suppressFromDiscovery = text('[data-test-agreement-line-suppress-from-discovery]');
  isSuppressFromDiscoveryPresent = isPresent('[data-test-agreement-line-suppress-from-discovery]');
  note = text('[data-test-agreement-line-note]');

  titleName = text('[data-test-title-instance-name]');
  titleType = text('[data-test-title-type]');
  titleHoldingStatus = text('[data-test-title-holding-status]');
  titleAccessStatusType = text('[data-test-title-access-status-type]');
  titleUrl = text('[data-test-agreement-line-url]');

  pkgName = text('[data-test-package-link]');
  pkgContentType = text('[data-test-package-content-type]')
  pkgHoldingStatus = text('[data-test-package-holding-status]');
  pkgAccessStatusType = text('[data-test-package-access-status-type]');
  pkgProvider = text('[data-test-package-vendor-name]');
  pkgCount = text('[data-test-package-resource-count]');
}
