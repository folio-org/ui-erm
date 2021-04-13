import {
  attribute,
  fillable,
  interactor,
  isPresent,
  value,
} from '@bigtest/interactor';

export default @interactor class CustomCoverageFieldInteractor {
  static defaultScope = '[data-test-coverage-number]';

  isCoverageField = isPresent('[data-test-coverage-field]');

  index = attribute('[data-test-coverage-number]');

  startDate = value('[id^=cc-start-date-]');
  startVolume = value('[id^=cc-start-volume-]');
  startIssue = value('[id^=cc-start-issue-]');
  fillStartDate = fillable('[id^=cc-start-date-]');
  fillStartVolume = fillable('[id^=cc-start-volume-]');
  fillStartIssue = fillable('[id^=cc-start-issue-]');

  endDate = value('[id^=cc-end-date-]');
  endVolume = value('[id^=cc-end-volume-]');
  endIssue = value('[id^=cc-end-issue-]');
  fillEndDate = fillable('[id^=cc-end-date-]');
  fillEndVolume = fillable('[id^=cc-end-volume-]');
  fillEndIssue = fillable('[id^=cc-end-issue-]');
}
