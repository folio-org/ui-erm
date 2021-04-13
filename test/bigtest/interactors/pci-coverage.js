import {
  interactor,
  text,
} from '@bigtest/interactor';

export default @interactor class PCICoverageDetailsInteractor {
  startDate = text('[data-test-start-date]');
  startVolume = text('[data-test-start-volume]');
  startIssue = text('[data-test-start-issue]');
  endDate = text('[data-test-end-date]');
  endVolume = text('[data-test-end-volume]');
  endIssue = text('[data-test-end-issue]');
}
