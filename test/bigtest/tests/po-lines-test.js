import { beforeEach, describe, it } from '@bigtest/mocha';
import faker from 'faker';

import { expect } from 'chai';

import setupApplication from '../helpers/setup-application';
import { getCurrentPOLine } from '../helpers/findPOLineModule';

import BasketInteractor from '../interactors/basket';
import AgreementFormInteractor from '../interactors/agreement-form';
import AgreementViewInteractor from '../interactors/agreement-view';
import EresourcesInteractor from '../interactors/eresources';
import EresourceViewInteractor from '../interactors/eresource-view';

const eresourcesToCreate = [
  { name: 'Package of Apples', class: 'org.olf.kb.Pkg' },
  { name: 'Package of Bananas', class: 'org.olf.kb.Pkg' }
];

describe('PO Lines', () => {
  setupApplication();
  const basketInteractor = new BasketInteractor();
  const agreementForm = new AgreementFormInteractor();
  const agreementView = new AgreementViewInteractor();
  const eresourcesInteractor = new EresourcesInteractor();
  const eresourceInteractor = new EresourceViewInteractor();

  let eresources = [];
  const poLines = [];

  const shouldRenderCorrectPOLineInfo = (agreementLineIndex, poLineIndex) => {
    const poLine = getCurrentPOLine();
    poLines.push(poLine);

    expect(agreementForm.linesSection.lines(agreementLineIndex).poLines(poLineIndex).acquisitionMethod).to.equal(poLine.acquisitionMethod);
    expect(agreementForm.linesSection.lines(agreementLineIndex).poLines(poLineIndex).poLineNumber).to.include(poLine.poLineNumber);
    expect(agreementForm.linesSection.lines(agreementLineIndex).poLines(poLineIndex).title).to.equal(poLine.titleOrPackage);
  };

  beforeEach(async function () {
    eresources = await eresourcesToCreate.map(eresource => this.server.create('eresource', eresource));
  });

  describe('visiting the E-Resources page', () => {
    beforeEach(async function () {
      await this.visit('/erm/eresources');
    });

    describe('loading e-resources list', () => {
      beforeEach(async function () {
        await eresourcesInteractor.whenLoaded();
      });

      it('should list the created eresources', () => {
        expect(eresourcesInteractor.list.rowCount).to.equal(eresourcesToCreate.length);
      });

      describe('add first eresource to basket', () => {
        beforeEach(async function () {
          await eresourcesInteractor.list.rows(0).click();
          await eresourceInteractor.clickAddToBasket();
        });

        describe('add second eresource to basket', () => {
          beforeEach(async function () {
            await eresourcesInteractor.list.rows(1).click();
            await eresourceInteractor.clickAddToBasket();
          });

          describe('open basket', () => {
            beforeEach(async function () {
              await basketInteractor.clickOpenBasket();
            });

            describe('begin creating new agreement with the basket contents', () => {
              beforeEach(async function () {
                await basketInteractor.clickCreateNewAgreement();
              });

              it('should have two agreement lines', () => {
                expect(agreementForm.linesSection.lineCount).to.equal(2);
              });

              it('should have correct eresource names for each agreement line', () => {
                const names = eresources.map(e => e.name);
                expect(names).to.include(agreementForm.linesSection.lines(0).name);
                expect(names).to.include(agreementForm.linesSection.lines(1).name);
              });

              describe('add PO line to first agreement line', () => {
                beforeEach(async function () {
                  await agreementForm.linesSection.lines(0).clickAddPOLine();
                });

                it('should have empty PO Line card', () => {
                  expect(agreementForm.linesSection.lines(0).poLines(0).isSelected).to.be.false;
                });

                describe('link PO line to PO line card', () => {
                  beforeEach(async function () {
                    await agreementForm.linesSection.lines(0).poLines(0).clickSelectPOLine();
                  });

                  it('should render correct PO line info for first PO line', () => {
                    shouldRenderCorrectPOLineInfo(0, 0);
                  });

                  describe('add and link second PO line to first agreement line', () => {
                    beforeEach(async function () {
                      await agreementForm.linesSection.lines(0).clickAddPOLine();
                      await agreementForm.linesSection.lines(0).poLines(1).clickSelectPOLine();
                    });

                    it('should render correct PO line info for second PO line', () => {
                      shouldRenderCorrectPOLineInfo(0, 1);
                    });

                    describe('add and link PO line to second agreement line', () => {
                      beforeEach(async function () {
                        await agreementForm.linesSection.lines(1).clickAddPOLine();
                        await agreementForm.linesSection.lines(1).poLines(0).clickSelectPOLine();
                      });

                      it('should render correct PO line info for third PO line', () => {
                        shouldRenderCorrectPOLineInfo(1, 0);
                      });

                      describe('fill out required agreement fields', () => {
                        beforeEach(async function () {
                          await agreementForm.fillName(faker.company.companyName());
                          await agreementForm.fillStartDate('01/01/2019');
                          await agreementForm.selectStatus('Draft');
                          await agreementForm.createAgreement();
                        });

                        describe('save agreement', () => {
                          beforeEach(async function () {
                            await agreementView.whenLoaded();
                            await agreementView.expandAll();
                            await agreementView.linesSection.whenLoaded();
                          });

                          it('should have two agreement lines', () => {
                            expect(agreementView.linesSection.linesCount()).to.equal(2);
                          });

                          it('should have three PO lines', () => {
                            expect(agreementView.linesSection.poLinesCount).to.equal(3);
                          });
                        });
                      });
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
  });
});
