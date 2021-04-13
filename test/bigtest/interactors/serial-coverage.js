import {
  interactor,
  isPresent,
  text,
} from '@bigtest/interactor';

@interactor class SerialCoverageInteractor {
  static defaultScope = '[data-test-serial-coverage]';

  exists = isPresent('div');
  first = isPresent('[data-test-start]')
  end = isPresent('[data-test-end]')
  icon = isPresent('[data-test-icon-element]')

  startDate = text('[data-test-date]')
  startIssue = text('[data-test-issue]')
  startVolume = text('[data-test-volume]')

  endDate = text('[data-test-date]')
  endIssue = text('[data-test-issue]')
  endVolume = text('[data-test-volume]')
}

export default SerialCoverageInteractor;
