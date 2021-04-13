/* eslint-disable camelcase */
import React from 'react';
import { describe, beforeEach, it } from '@bigtest/mocha';
import chai from 'chai';
import spies from 'chai-spies';
import { StaticRouter as Router } from 'react-router-dom';
import { mountWithContext } from '../helpers/mountWithContext';

import { Info } from '../../../src/components/AgreementLineSections';

import { externalEntitlements } from './resources';
import AgreementLineInfoInteractor from '../interactors/agreement-line-external-info';

chai.use(spies);
const { expect, spy } = chai;

describe('AgreementLineInfo', () => {
  const interactor = new AgreementLineInfoInteractor();
  const isSuppressFromDiscoveryEnabled = spy(resource => resource === 'agreementLine');

  const isSuppressFromDiscoveryEnabledFalse = spy(resource => resource !== 'agreementLine');
  externalEntitlements.forEach((externalResource, i) => {
    describe(`agreement line info of external resource of type '${externalResource?.reference_object?.type}' '${externalResource?.reference_object?.label}', index ${i}`, () => {
      beforeEach(async () => {
        await mountWithContext(
          <Router context={{}}>
            <Info isSuppressFromDiscoveryEnabled={isSuppressFromDiscoveryEnabled} line={externalResource} resource={externalResource} />
          </Router>
        );
      });

      // PARENT AGREEMENT
      // resource = externalResource
      it('should render parent agreement name', () => {
        expect(interactor.parentAgreementName).to.equal(externalResource.owner.name);
      });

      if (externalResource?.activeFrom) {
        it('should render parent agreements activeFrom date', () => {
          expect(interactor.activeFrom).to.equal(externalResource.activeFrom);
        });
      } else {
        it('should render \'-\'', () => {
          expect(interactor.activeFrom).to.equal('-');
        });
      }

      if (externalResource?.activeTo) {
        it('should render parent agreements activeTo date', () => {
          expect(interactor.activeTo).to.equal(externalResource.activeTo);
        });
      } else {
        it('should render \'-\'', () => {
          expect(interactor.activeFrom).to.equal('-');
        });
      }

      it('should have called isSuppressFromDiscoveryEnabled with string "agreementLine"', () => {
        expect(isSuppressFromDiscoveryEnabled).to.have.been.called.with('agreementLine');
      });

      it('should render parent agreements suppress from discovery', () => {
        if (externalResource?.suppressFromDiscovery) {
          expect(interactor.suppressFromDiscovery).to.equal('Yes');
        } else {
          expect(interactor.suppressFromDiscovery).to.equal('No');
        }
      });

      if (externalResource?.note) {
        it('should render parent agreements note', () => {
          expect(interactor.note).to.equal(externalResource.note);
        });
      } else {
        it('should render \'-\'', () => {
          expect(interactor.activeFrom).to.equal('-');
        });
      }

      // PACKAGE
      // resource = externalResource?.reference_object;
      if (externalResource?.reference_object?.type === 'Package') {
        it('should not render title card', () => {
          expect(interactor.isTitleCardPresent).to.be.false;
        });

        it('should render package card', () => {
          expect(interactor.isPkgCardPresent).to.be.true;
        });

        it('should render package name', () => {
          expect(interactor.pkgName).to.equal(externalResource.reference_object.label);
        });

        if (externalResource?.reference_object?.contentType) {
          it('should render package content type', () => {
            expect(interactor.pkgContentType).to.equal(externalResource.reference_object.contentType);
          });
        } else {
          it('should render \'-\'', () => {
            expect(interactor.activeFrom).to.equal('-');
          });
        }

        it('should render package holdings status', () => {
          if (externalResource?.reference_object?.isSelected) {
            expect(interactor.pkgHoldingStatus).to.equal('Selected');
          } else {
            expect(interactor.pkgHoldingStatus).to.equal('Not selected');
          }
        });

        if (externalResource?.reference_object?.accessStatusType) {
          it('should render package access status type', () => {
            expect(interactor.pkgAccessStatusType).to.equal(externalResource.reference_object.accessStatusType);
          });
        } else {
          it('should render \'-\'', () => {
            expect(interactor.activeFrom).to.equal('-');
          });
        }

        if (externalResource?.reference_object?.providerName) {
          it('should render package provider', () => {
            expect(interactor.pkgProvider).to.equal(externalResource.reference_object.providerName);
          });
        } else {
          it('should render \'-\'', () => {
            expect(interactor.activeFrom).to.equal('-');
          });
        }

        it('should render package count', () => {
          expect(interactor.pkgCount).to.have.string(externalResource.reference_object.selectedCount + ' / ' + externalResource.reference_object.titleCount);
        });
      } else {
        // TITLE
        if (externalResource?.reference_object?.url) {
          it('should render title on platform url', () => {
            expect(interactor.titleUrl).to.equal(externalResource.reference_object.url);
          });
        } else {
          it('should render \'-\'', () => {
            expect(interactor.activeFrom).to.equal('-');
          });
        }

        it('should render title card', () => {
          expect(interactor.isTitleCardPresent).to.be.true;
        });

        it('should render title name', () => {
          expect(interactor.titleName).to.equal(externalResource.reference_object.label);
        });

        if (externalResource?.reference_object?.type) {
          it('should render title type', () => {
            expect(interactor.titleType).to.equal(externalResource.reference_object.type);
          });
        } else {
          it('should render \'-\'', () => {
            expect(interactor.activeFrom).to.equal('-');
          });
        }

        it('should render title holdings status', () => {
          if (externalResource?.reference_object.isSelected) {
            expect(interactor.titleHoldingStatus).to.equal('Selected');
          } else {
            expect(interactor.titleHoldingStatus).to.equal('Not selected');
          }
        });

        if (externalResource?.reference_object?.accessStatusType) {
          it('should render title access status type', () => {
            expect(interactor.titleAccessStatusType).to.equal(externalResource.reference_object.accessStatusType);
          });
        } else {
          it('should render \'-\'', () => {
            expect(interactor.activeFrom).to.equal('-');
          });
        }

        // Additionally render the parent package card
        // resource = externalResource?.reference_object?.packageData;
        it('should render parent package card', () => {
          expect(interactor.isPkgCardPresent).to.be.true;
        });

        it('should render parent package name', () => {
          expect(interactor.pkgName).to.equal(externalResource.reference_object.packageData.name);
        });

        if (externalResource?.reference_object?.packageData.contentType) {
          it('should render parent package content type', () => {
            expect(interactor.pkgContentType).to.equal(externalResource.reference_object.packageData.contentType);
          });
        } else {
          it('should render \'-\'', () => {
            expect(interactor.activeFrom).to.equal('-');
          });
        }

        it('should render parent package holdings status', () => {
          if (externalResource?.reference_object?.packageData?.isSelected) {
            expect(interactor.pkgHoldingStatus).to.equal('Selected');
          } else {
            expect(interactor.pkgHoldingStatus).to.equal('Not selected');
          }
        });

        if (externalResource?.reference_object?.packageData.accessStatusType) {
          it('should render parent package access status type', () => {
            expect(interactor.pkgAccessStatusType).to.equal(externalResource.reference_object.packageData.accessStatusType);
          });
        } else {
          it('should render \'-\'', () => {
            expect(interactor.activeFrom).to.equal('-');
          });
        }

        if (externalResource?.reference_object?.packageData.providerName) {
          it('should render parent package provider', () => {
            expect(interactor.pkgProvider).to.equal(externalResource.reference_object.packageData.providerName);
          });
        } else {
          it('should render \'-\'', () => {
            expect(interactor.activeFrom).to.equal('-');
          });
        }

        it('should render parent package count', () => {
          expect(interactor.pkgCount).to.have.string(externalResource.reference_object.packageData.selectedCount + ' / ' + externalResource.reference_object.packageData.titleCount);
        });
      }
    });

    describe(`agreement line info of external resource of type '${externalResource?.reference_object?.type}' '${externalResource?.reference_object?.label}', index ${i} (SuppressFromDisplay setting OFF)`, () => {
      beforeEach(async () => {
        await mountWithContext(
          <Router context={{}}>
            <Info isSuppressFromDiscoveryEnabled={isSuppressFromDiscoveryEnabledFalse} line={externalResource} resource={externalResource} />
          </Router>
        );
      });

      it('should have called isSuppressFromDiscoveryEnabled with string "agreementLine"', () => {
        expect(isSuppressFromDiscoveryEnabled).to.have.been.called.with('agreementLine');
      });

      it('should not render parent agreements suppress from discovery', () => {
        expect(interactor.isSuppressFromDiscoveryPresent).to.be.false;
      });
    });
  });
});
