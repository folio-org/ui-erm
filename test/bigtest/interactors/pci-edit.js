import {
  blurrable,
  clickable,
  collection,
  count,
  fillable,
  interactor,
  isPresent,
  property,
  value,
} from '@bigtest/interactor';

import DatepickerInteractor from '@folio/stripes-components/lib/Datepicker/tests/interactor'; // eslint-disable-line

@interactor class coverageCardInteractor {
  startDate = value('[id^="cc-start-date"]');
  endDate = value('[id^="cc-end-date"]');
  startVolume = value('[id^="cc-start-volume"]');
  endVolume = value('[id^="cc-end-volume"]');
  startIssue = value('[id^="cc-start-issue"]');
  endIssue = value('[id^="cc-end-issue"]');
  clickDeleteButton = clickable('[data-test-card-header-end] > button');

  fillStartDate = fillable('[id^="cc-start-date"]');
  blurStartDate = blurrable('[id^="cc-start-date"]');

  fillEndDate = fillable('[id^="cc-end-date"]');
  blurEndDate = blurrable('[id^="cc-end-date"]');

  fillStartVolume = fillable('[id^="cc-start-volume"]');
  fillEndVolume = fillable('[id^="cc-end-volume"]');
  fillStartIssue = fillable('[id^="cc-start-issue"]');
  fillEndIssue = fillable('[id^="cc-end-issue"]');

  fillAndBlurStartDate(val) {
    return this
      .fillStartDate(val)
      .blurStartDate();
  }

  fillAndBlurEndDate(val) {
    return this
      .fillEndDate(val)
      .blurEndDate();
  }

  hasError = isPresent('div[class^="feedbackError"]')
  isTooEarlyErrorPresent = isPresent('[data-test-error-end-date-too-early]');
  isOverlappingErrorPresent = isPresent('[data-test-error-overlapping-dates]');
}

export default @interactor class PCIEditPaneInteractor {
  isCoverageAccordionPresent = isPresent('#accordion-toggle-button-pciFormCoverage');
  isAddButtonPresent = isPresent('#edit-pci-add-coverage-button')
  pciName = value('[data-test-pci-name]');
  accessFrom = value('#pci-access-from');
  accessUntil = value('#pci-access-end');

  coverageCards = collection('[data-test-coverage-number]', coverageCardInteractor)
  coverageCount = count('[data-test-coverage-number]');
  clickAddButton = clickable('#edit-pci-add-coverage-button');

  isSuppressFromDiscoveryCheckboxPresent = isPresent('#pci-suppress-from-discovery');
  suppressFromDiscoveryCheckboxChecked = property('#pci-suppress-from-discovery', 'checked');
  clickSuppressFromDiscoveryCheckbox = clickable('#pci-suppress-from-discovery');

  submit = clickable('#submit')
}
