import {
  interactor,
  isPresent,
  clickable,
  count,
} from '@bigtest/interactor';

import MultiColumnListInteractor from '@folio/stripes-components/lib/MultiColumnList/tests/interactor';

import CoveredEresourcesListInteractor from './covered-eresources';

export default @interactor class AgreementLinesInteractor {
  clickLinesAccordion = clickable('#accordion-toggle-button-lines');
  isLoaded = isPresent('#agreement-lines');

  linesList = new MultiColumnListInteractor('#agreement-lines');
  linesCount = () => this.linesList.rowCount
  lineName = lineNumber => this.linesList.rows(lineNumber).cells(0)
  lineProvider = lineNumber => this.linesList.rows(lineNumber).cells(1)
  lineType = lineNumber => this.linesList.rows(lineNumber).cells(2)
  lineCount = lineNumber => this.linesList.rows(lineNumber).cells(3)
  lineCoverage = lineNumber => this.linesList.rows(lineNumber).cells(4)
  lineCustomCoverage = lineNumber => this.linesList.rows(lineNumber).cells(5)
  lineActiveFrom = lineNumber => this.linesList.rows(lineNumber).cells(6)
  lineActiveTo = lineNumber => this.linesList.rows(lineNumber).cells(7)
  linePOLine = lineNumber => this.linesList.rows(lineNumber).cells(8)

  poLinesCount = count('[data-test-po-line]')

  coveredEresourcesList = new CoveredEresourcesListInteractor();

  whenLoaded() {
    return this.timeout(5000).when(() => this.isLoaded);
  }
}
