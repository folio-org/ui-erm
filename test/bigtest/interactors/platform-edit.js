import {
  interactor,
  value
} from '@bigtest/interactor';

export default @interactor class PlatformEditInteractor {
  platformCode = value('#edit-local-platform-code');
}
