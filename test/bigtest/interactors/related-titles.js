import {
  collection,
  interactor,
  text,
} from '@bigtest/interactor';

@interactor class RelatedTitleInteractor {
  titleInstanceName = text('[data-test-title-instance-name]');
  titleInstanceSubType = text('[data-test-title-instance-sub-type]');
  titleInstanceISBN = text('[data-test-isbn]');
  titleInstanceDOI = text('[data-test-doi]');
  titleInstanceEZB = text('[data-test-ezb]');
  titleInstanceZDB = text('[data-test-zdb]');
  titleInstanceEISSN = text('[data-test-eissn]');
  titleInstanceISSN = text('[data-test-issn]');
}

export default @interactor class RelatedTitlesInteractor {
  relatedTitles = collection('[data-test-related-titles]', RelatedTitleInteractor)
}
