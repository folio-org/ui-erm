import {
  attribute,
  interactor,
  isPresent,
} from '@bigtest/interactor';

@interactor class EmbargoInteractor {
  static defaultScope = '[data-test-embargo]';

  exists = isPresent('div');

  movingWallEndExists = isPresent('[data-test-embargo-end]')
  movingWallStartExists = isPresent('[data-test-embargo-start]')
  endLength = attribute('[data-test-embargo-end-length]', 'data-test-embargo-end-length')
  endUnit = attribute('[data-test-embargo-end-unit]', 'data-test-embargo-end-unit')
  startLength = attribute('[data-test-embargo-start-length]', 'data-test-embargo-start-length')
  startUnit = attribute('[data-test-embargo-start-unit]', 'data-test-embargo-start-unit')
}

export default EmbargoInteractor;
