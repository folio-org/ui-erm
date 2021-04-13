import {
  interactor,
  text,
} from '@bigtest/interactor';

export default @interactor class TitleCardInteractor {
  static defaultScope = '[data-test-title-card]';

  titleInstanceName = text('[data-test-title-instance-name]');
  titleInstanceType = text('[data-test-title-instance-publication-type]');
  titleInstanceSubType = text('[data-test-title-instance-sub-type]');
  titleInstanceFirstAuthor = text('[data-test-title-instance-first-author]');
  titleInstanceFirstEditor = text('[data-test-title-instance-first-editor]');
  titleInstancePublicationDate = text('[data-test-title-instance-monograph-publication-date]');
  titleInstanceMonographEdition = text('[data-test-title-instance-monograph-edition]');
  titleInstanceMonographVolume = text('[data-test-title-instance-monograph-volume]');
  titleInstanceISBN = text('[data-test-isbn]');
  titleInstanceDOI = text('[data-test-doi]');
  titleInstanceEZB = text('[data-test-ezb]');
  titleInstanceZDB = text('[data-test-zdb]');
  titleInstanceEISSN = text('[data-test-eissn]');
  titleInstancePISSN = text('[data-test-pissn]');
}
