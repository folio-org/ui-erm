import {
  interactor,
  clickable,
} from '@bigtest/interactor';

export default @interactor class BasketInteractor {
  clickOpenBasket = clickable('#open-basket-button');
  clickCreateNewAgreement = clickable('[data-test-basket-create-agreement]');
}
