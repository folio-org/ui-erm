import React from 'react';
import { describe, beforeEach, it } from '@bigtest/mocha';
import chai from 'chai';
import spies from 'chai-spies';
import { StaticRouter as Router } from 'react-router-dom';
import { mountWithContext } from '../helpers/mountWithContext';

import AgreementLineForm from '../../../src/components/views/AgreementLineForm';
import AgreementLineFormInteractor from '../interactors/agreement-line-form';
import PackageCardInteractor from '../interactors/package-card';
import TitleCardInteractor from '../interactors/title-card';
import AgreementLineInfoInteractor from '../interactors/agreement-line-external-info';

chai.use(spies);
const { expect, spy } = chai;

const formProps = {
  data: {
    line: {},
  },
  handlers: {
    isSuppressFromDiscoveryEnabled: spy(resource => resource === 'agreementLine'),
    onClose: spy(),
  },
  initialValues: {},
  isLoading: false,
  onSubmit: spy(),
};

describe('AgreementLineForm', () => {
  const interactor = new AgreementLineFormInteractor();
  const packageCardInteractor = new PackageCardInteractor();
  const titleCardInteractor = new TitleCardInteractor();
  const externalInteractor = new AgreementLineInfoInteractor();

  describe('Internal KB Package', () => {
    const line = {
      'id': '2f431e55-68f3-4d98-9794-e418fcb2b6bc',
      'owner': {
        'id': '4fde5ce6-d936-4636-92e5-eb78a8805476',
        'customProperties': {},
        'contacts': [],
        'tags': [{
          'id': 2,
          'normValue': 'asdf',
          'value': 'asdf'
        }],
        'inwardRelationships': [],
        'linkedLicenses': [],
        'docs': [],
        'items': [{
          'id': 'f7c0d204-05db-496f-a253-2f3ba3a84691'
        }, {
          'id': '3bdc551a-767f-41c3-b8d9-16942e4a7a9b'
        }, {
          'id': '2f431e55-68f3-4d98-9794-e418fcb2b6bc'
        }, {
          'id': '035338ab-89d6-4c38-8444-1c653a254103'
        }],
        'periods': [{
          'id': '34d2936d-d1bd-4a0b-90a1-4589be75ad72',
          'startDate': '2020-05-26',
          'owner': {
            'id': '4fde5ce6-d936-4636-92e5-eb78a8805476'
          }
        }],
        'historyLines': [],
        'name': 'Test Agreement',
        'orgs': [],
        'usageDataProviders': [],
        'agreementStatus': {
          'id': '2c9180b2724e9dad01724e9e0aec0011',
          'value': 'active',
          'label': 'Active'
        },
        'supplementaryDocs': [{
          'id': '224a2ca0-92fd-4ba5-8c51-9cb092d88086',
          'dateCreated': '2020-05-26T06:48:27Z',
          'lastUpdated': '2020-05-26T06:59:26Z',
          'atType': {
            'id': '2c9180b2724e9dad01724e9e0b3c0026',
            'value': 'license',
            'label': 'License'
          },
          'fileUpload': {
            'id': '2c978e1b-ed6e-4bcb-8448-717884259c05',
            'contentType': 'text/plain',
            'size': 5,
            'modified': '2020-05-26T06:59:26Z',
            'name': 'test.txt'
          },
          'name': 'Test Doc'
        }],
        'outwardRelationships': [],
        'externalLicenseDocs': [],
        'currentPeriod': {
          'id': '34d2936d-d1bd-4a0b-90a1-4589be75ad72',
          'startDate': '2020-05-26',
          'owner': {
            'id': '4fde5ce6-d936-4636-92e5-eb78a8805476'
          }
        },
        'startDate': '2020-05-26',
        'endDate': null,
        'cancellationDeadline': null,
        'alternateNames': []
      },
      'resource': {
        'id': '728e52e8-68fb-4471-b676-843351830957',
        'class': 'org.olf.kb.Pkg',
        'name': 'Economist Intelligence Unit: EIU Country Reports Archive: Nationallizenz',
        'suppressFromDiscovery': false,
        'customCoverage': false,
        '_object': {
          'id': '728e52e8-68fb-4471-b676-843351830957',
          'dateCreated': '2020-05-26T01:37:18Z',
          'lastUpdated': '2020-05-26T01:37:18Z',
          'vendor': {
            'id': 'edd1611a-8c59-456a-863c-abe230ba2eb0',
            'name': 'Economist Intelligence Unit'
          },
          'coverage': [],
          'source': 'GOKb',
          'remoteKb': {
            'id': '52d175bd-58ab-43dd-9831-bf809f7ae0b4',
            'cursor': '2020-05-25T16:44:26Z',
            'active': true,
            'trustedSourceTI': false,
            'activationEnabled': false,
            'readonly': false,
            'syncStatus': 'idle',
            'lastCheck': 1590514533352,
            'name': 'GOKb_TEST',
            'type': 'org.olf.kb.adapters.GOKbOAIAdapter',
            'fullPrefix': 'gokb',
            'uri': 'http://gokbt.gbv.de/gokb/oai/index/packages',
            'supportsHarvesting': true,
            'rectype': 1
          },
          'entitlements': [{
            'id': '2f431e55-68f3-4d98-9794-e418fcb2b6bc'
          }],
          'name': 'Economist Intelligence Unit: EIU Country Reports Archive: Nationallizenz',
          'suppressFromDiscovery': false,
          'reference': 'Economist_Intelligence_Unit_:_EIU_Country_Reports_Archive',
          'resourceCount': 192,
          'class': 'org.olf.kb.Pkg'
        }
      },
      'coverage': [],
      'poLines': [],
      'suppressFromDiscovery': false,
      'customCoverage': false,
      'explanation': 'Agreement includes a package containing this item',
      'startDate': null,
      'endDate': null,
      'contentUpdated': null,
      'haveAccess': true,
    };

    beforeEach(async () => {
      await mountWithContext(
        <Router context={{}}>
          <AgreementLineForm
            lineId="2f431e55-68f3-4d98-9794-e418fcb2b6bc"
            {...formProps}
            data={{
              line
            }}
            initialValues={{
              linkedResource: line
            }}
          />
        </Router>
      );
      await interactor.whenLoaded();
    });

    it('should render form', () => {
      expect(interactor.isAgreementLineForm).to.be.true;
    });

    it('should render correct package name', () => {
      expect(packageCardInteractor.packageName).to.equal('Economist Intelligence Unit: EIU Country Reports Archive: Nationallizenz');
    });

    it('should render correct number of items in package', () => {
      expect(packageCardInteractor.resourceCount).to.equal('192');
    });

    it('should render correct provider', () => {
      expect(packageCardInteractor.vendorName).to.equal('Economist Intelligence Unit');
    });

    it('should render correct source', () => {
      expect(packageCardInteractor.packageSource).to.equal('GOKb');
    });

    it('should render correct reference', () => {
      expect(packageCardInteractor.packageReference).to.equal('Economist_Intelligence_Unit_:_EIU_Country_Reports_Archive');
    });

    it('should render PO Lines accordion', () => {
      expect(interactor.hasPOLinesAccordion).to.be.true;
    });

    it('should not render Coverage accordion', () => {
      expect(interactor.hasCoverageAccordion).to.be.false;
    });
  });

  describe('Internal KB Title', () => {
    const line = {
      'id': 'f7c0d204-05db-496f-a253-2f3ba3a84691',
      'activeTo': '2020-05-18',
      'owner': {
        'id': '4fde5ce6-d936-4636-92e5-eb78a8805476',
        'customProperties': {},
        'contacts': [],
        'tags': [],
        'inwardRelationships': [],
        'linkedLicenses': [],
        'docs': [],
        'items': [{
          'id': 'f7c0d204-05db-496f-a253-2f3ba3a84691'
        }, {
          'id': '3bdc551a-767f-41c3-b8d9-16942e4a7a9b'
        }, {
          'id': '035338ab-89d6-4c38-8444-1c653a254103'
        }],
        'periods': [{
          'id': '34d2936d-d1bd-4a0b-90a1-4589be75ad72',
          'startDate': '2020-05-26',
          'owner': {
            'id': '4fde5ce6-d936-4636-92e5-eb78a8805476'
          }
        }],
        'historyLines': [],
        'name': 'Test Agreement',
        'orgs': [],
        'usageDataProviders': [],
        'agreementStatus': {
          'id': '2c9180b2724e9dad01724e9e0aec0011',
          'value': 'active',
          'label': 'Active'
        },
        'supplementaryDocs': [{
          'id': '224a2ca0-92fd-4ba5-8c51-9cb092d88086',
          'dateCreated': '2020-05-26T06:48:27Z',
          'lastUpdated': '2020-05-26T06:59:26Z',
          'atType': {
            'id': '2c9180b2724e9dad01724e9e0b3c0026',
            'value': 'license',
            'label': 'License'
          },
          'fileUpload': {
            'id': '2c978e1b-ed6e-4bcb-8448-717884259c05',
            'contentType': 'text/plain',
            'size': 5,
            'modified': '2020-05-26T06:59:26Z',
            'name': 'test.txt'
          },
          'name': 'Test Doc'
        }],
        'outwardRelationships': [],
        'externalLicenseDocs': [],
        'currentPeriod': {
          'id': '34d2936d-d1bd-4a0b-90a1-4589be75ad72',
          'startDate': '2020-05-26',
          'owner': {
            'id': '4fde5ce6-d936-4636-92e5-eb78a8805476'
          }
        },
        'startDate': '2020-05-26',
        'endDate': null,
        'cancellationDeadline': null,
        'alternateNames': []
      },
      'resource': {
        'id': '8a44cb9e-8a07-40fd-9fad-bffe945adfeb',
        'class': 'org.olf.kb.PackageContentItem',
        'name': "'Accounting history review' on Platform 'Taylor & Francis Online' in Package Taylor & Francis: Econ Konsortium Leibniz: 2019",
        'suppressFromDiscovery': false,
        'coverage': [{
          'id': 'c6549185-ae13-4fad-970f-b9900e15fcb6',
          'startDate': '2011-01-01',
          'startVolume': '21',
          'summary': 'v21/i*/2011-01-01 - v*/i*/*'
        }],
        'customCoverage': false,
        '_object': {
          'id': '8a44cb9e-8a07-40fd-9fad-bffe945adfeb',
          'dateCreated': '2020-05-26T01:35:36Z',
          'lastUpdated': '2020-05-26T01:35:36Z',
          'depth': 'Fulltext',
          'coverage': [{
            'id': 'c6549185-ae13-4fad-970f-b9900e15fcb6',
            'startDate': '2011-01-01',
            'startVolume': '21',
            'summary': 'v21/i*/2011-01-01 - v*/i*/*'
          }],
          'pti': {
            'id': 'e5f52fce-d12a-4693-9a02-38429b4ed992',
            'dateCreated': '2020-05-26T01:35:36Z',
            'lastUpdated': '2020-05-26T01:35:36Z',
            'platform': {
              'id': '52ce0cc0-bfe6-494a-9e8f-1d8e24190828',
              'name': 'Taylor & Francis Online'
            },
            'coverage': [{
              'id': '6c552b84-b5e3-4025-899b-431f49afece3',
              'startDate': '2011-01-01',
              'startVolume': '21',
              'summary': 'v21/i*/2011-01-01 - v*/i*/*'
            }, {
              'id': '7dab71dc-993f-4288-bd01-31600a006e65',
              'startDate': '2011-01-01',
              'startVolume': '21',
              'summary': 'v21/i*/2011-01-01 - v*/i*/*'
            }],
            'entitlements': [],
            'titleInstance': {
              'id': 'ed801f4d-1c6f-415b-af71-bd5ecb7310b8',
              'subType': {
                'id': '2c9180b2724e9dad01724e9e0b95003d',
                'value': 'electronic',
                'label': 'Electronic'
              },
              'dateCreated': '2020-05-26T01:35:36Z',
              'lastUpdated': '2020-05-26T01:35:36Z',
              'identifiers': [{
                'title': {
                  'id': 'ed801f4d-1c6f-415b-af71-bd5ecb7310b8'
                },
                'status': {
                  'id': '2c9180b2724e9dad01724e9e1a1e0042',
                  'value': 'approved',
                  'label': 'approved'
                },
                'identifier': {
                  'value': '2466',
                  'ns': {
                    'value': 'ezb'
                  }
                }
              }, {
                'title': {
                  'id': 'ed801f4d-1c6f-415b-af71-bd5ecb7310b8'
                },
                'status': {
                  'id': '2c9180b2724e9dad01724e9e1a1e0042',
                  'value': 'approved',
                  'label': 'approved'
                },
                'identifier': {
                  'value': '2155-286X',
                  'ns': {
                    'value': 'eissn'
                  }
                }
              }, {
                'title': {
                  'id': 'ed801f4d-1c6f-415b-af71-bd5ecb7310b8'
                },
                'status': {
                  'id': '2c9180b2724e9dad01724e9e1a1e0042',
                  'value': 'approved',
                  'label': 'approved'
                },
                'identifier': {
                  'value': '2617761-4',
                  'ns': {
                    'value': 'zdb'
                  }
                }
              }],
              'coverage': [{
                'id': '5f5469e1-373a-4671-b122-8dce3c57c1de',
                'startDate': '2011-01-01',
                'startVolume': '21',
                'summary': 'v21/i*/2011-01-01 - v*/i*/*'
              }],
              'name': 'Accounting history review',
              'publicationType': {
                'id': '2c9180b2724e9dad01724e9e0b9c003f',
                'value': 'journal',
                'label': 'Journal'
              },
              'type': {
                'id': '2c9180b2724e9dad01724e9e0b9c003f',
                'value': 'serial',
                'label': 'Serial'
              },
              'suppressFromDiscovery': false,
              'work': {
                'id': 'db8337d8-ee87-4361-a2a8-3aff8d929dca'
              },
              'platformInstances': [{
                'id': 'e5f52fce-d12a-4693-9a02-38429b4ed992'
              }],
              'class': 'org.olf.kb.TitleInstance',
              'longName': 'Accounting history review',
              'siblingIdentifiers': [{
                'title': {
                  'id': '74e3b062-ad01-49d6-aef6-2e35687a8934'
                },
                'status': {
                  'id': '2c9180b2724e9dad01724e9e1a1e0042',
                  'value': 'approved',
                  'label': 'approved'
                },
                'identifier': {
                  'value': '2155-2851',
                  'ns': {
                    'value': 'issn'
                  }
                }
              }]
            },
            'url': 'https://www.tandfonline.com/loi/rabf21',
            'name': "'Accounting history review' on Platform 'Taylor & Francis Online'",
            'suppressFromDiscovery': false,
            'packageOccurences': [{
              'id': '8a44cb9e-8a07-40fd-9fad-bffe945adfeb'
            }],
            'class': 'org.olf.kb.PlatformTitleInstance',
            'longName': "'Accounting history review' on Platform 'Taylor & Francis Online'"
          },
          'pkg': {
            'id': 'a8f698e5-a2ec-4112-b479-4735442b7809',
            'dateCreated': '2020-05-26T01:35:36Z',
            'lastUpdated': '2020-05-26T01:35:36Z',
            'vendor': {
              'id': '7a47a194-84ec-4896-a5b0-05bcb0b3f9b2',
              'name': 'Taylor & Francis'
            },
            'coverage': [],
            'source': 'GOKb',
            'remoteKb': {
              'id': '52d175bd-58ab-43dd-9831-bf809f7ae0b4',
              'cursor': '2020-05-25T16:44:26Z',
              'active': true,
              'trustedSourceTI': false,
              'activationEnabled': false,
              'readonly': false,
              'syncStatus': 'idle',
              'lastCheck': 1590510933407,
              'name': 'GOKb_TEST',
              'type': 'org.olf.kb.adapters.GOKbOAIAdapter',
              'fullPrefix': 'gokb',
              'uri': 'http://gokbt.gbv.de/gokb/oai/index/packages',
              'supportsHarvesting': true,
              'rectype': 1
            },
            'entitlements': [],
            'name': 'Taylor & Francis: Econ Konsortium Leibniz: 2019',
            'suppressFromDiscovery': false,
            'reference': 'Taylor_&_Francis:_Econ_Konsortium_Leibniz_2',
            'resourceCount': 270,
            'class': 'org.olf.kb.Pkg'
          },
          'addedTimestamp': 1590456936624,
          'entitlements': [{
            'id': 'f7c0d204-05db-496f-a253-2f3ba3a84691'
          }],
          'name': "'Accounting history review' on Platform 'Taylor & Francis Online' in Package Taylor & Francis: Econ Konsortium Leibniz: 2019",
          'lastSeenTimestamp': 1590456936624,
          'suppressFromDiscovery': false,
          'longName': "'Accounting history review' on Platform 'Taylor & Francis Online' in Package Taylor & Francis: Econ Konsortium Leibniz: 2019",
          'class': 'org.olf.kb.PackageContentItem'
        }
      },
      'activeFrom': '2020-05-03',
      'poLines': [],
      'coverage': [{
        'id': '16f8f8a9-b5c2-47e0-b848-7ac73b68e530',
        'startDate': '2020-05-01',
        'endDate': '2020-05-13',
        'startVolume': 'A',
        'startIssue': '1',
        'endVolume': 'B',
        'endIssue': '2',
        'summary': 'vA/i1/2020-05-01 - vB/i2/2020-05-13'
      }],
      'customCoverage': true,
      'explanation': 'Agreement includes this item from a package specifically',
      'startDate': '2020-05-03',
      'endDate': '2020-05-18',
      'contentUpdated': null,
      'haveAccess': false,
      'suppressFromDiscovery': false
    };

    beforeEach(async () => {
      await mountWithContext(
        <Router context={{}}>
          <AgreementLineForm
            lineId="f7c0d204-05db-496f-a253-2f3ba3a84691"
            {...formProps}
            data={{
              line
            }}
            initialValues={{
              'linkedResource': line,
              'coverage': [{
                'id': 'abc',
                'startDate': '2020-05-01',
                'endDate': '2020-05-13',
                'startVolume': 'A',
                'startIssue': '1',
                'endVolume': 'B',
                'endIssue': '2',
                'summary': 'vA/i1/2020-05-01 - vB/i2/2020-05-13'
              }, {
                'id': 'def',
                'startDate': '2030-05-01',
                'endDate': '2030-05-13',
                'startVolume': 'AA',
                'startIssue': '11',
                'endVolume': 'BB',
                'endIssue': '22',
                'summary': 'vAA/i11/2030-05-01 - vBB/i22/2030-05-13'
              }],
            }}
          />
        </Router>
      );
      await interactor.whenLoaded();
    });

    it('should render form', () => {
      expect(interactor.isAgreementLineForm).to.be.true;
    });

    it('should render correct title name', () => {
      expect(titleCardInteractor.titleInstanceName).to.equal('Accounting history review');
    });

    it('should render correct resource type', () => {
      expect(titleCardInteractor.titleInstanceType).to.equal('Journal');
    });

    it('should render correct resource subtype', () => {
      expect(titleCardInteractor.titleInstanceSubType).to.equal('Electronic');
    });

    it('should render correct EZB', () => {
      expect(titleCardInteractor.titleInstanceEZB).to.equal('2466');
    });

    it('should render correct ZDB', () => {
      expect(titleCardInteractor.titleInstanceZDB).to.equal('2617761-4');
    });

    it('should render correct eISSN', () => {
      expect(titleCardInteractor.titleInstanceEISSN).to.equal('2155-286X');
    });

    it('should render PO Lines accordion', () => {
      expect(interactor.hasPOLinesAccordion).to.be.true;
    });

    it('should render Coverage accordion', () => {
      expect(interactor.hasCoverageAccordion).to.be.true;
    });

    it('should render two coverage entries', () => {
      expect(interactor.coverage(0).isCoverageField).to.be.true;
      expect(interactor.coverage(1).isCoverageField).to.be.true;
      expect(interactor.coverage(2).isCoverageField).to.be.false;
    });

    it('should render correct first coverage start date', () => {
      expect(interactor.coverage(0).startDate).to.equal('05/01/2020');
    });

    it('should render correct first coverage start volume', () => {
      expect(interactor.coverage(0).startVolume).to.equal('A');
    });

    it('should render correct first coverage start issue', () => {
      expect(interactor.coverage(0).startIssue).to.equal('1');
    });

    it('should render correct first coverage end date', () => {
      expect(interactor.coverage(0).endDate).to.equal('05/13/2020');
    });

    it('should render correct first coverage end volume', () => {
      expect(interactor.coverage(0).endVolume).to.equal('B');
    });

    it('should render correct first coverage end issue', () => {
      expect(interactor.coverage(0).endIssue).to.equal('2');
    });

    it('should render correct second coverage start date', () => {
      expect(interactor.coverage(1).startDate).to.equal('05/01/2030');
    });

    it('should render correct second coverage start volume', () => {
      expect(interactor.coverage(1).startVolume).to.equal('AA');
    });

    it('should render correct second coverage start issue', () => {
      expect(interactor.coverage(1).startIssue).to.equal('11');
    });

    it('should render correct second coverage end date', () => {
      expect(interactor.coverage(1).endDate).to.equal('05/13/2030');
    });

    it('should render correct second coverage end volume', () => {
      expect(interactor.coverage(1).endVolume).to.equal('BB');
    });

    it('should render correct second coverage end issue', () => {
      expect(interactor.coverage(1).endIssue).to.equal('22');
    });

    describe('adding a custom coverage field', async () => {
      beforeEach(async () => {
        await interactor.addCoverage();
      });

      it('should render three coverage entries', () => {
        expect(interactor.coverage(0).isCoverageField).to.be.true;
        expect(interactor.coverage(1).isCoverageField).to.be.true;
        expect(interactor.coverage(2).isCoverageField).to.be.true;
        expect(interactor.coverage(3).isCoverageField).to.be.false;
      });
    });
  });

  describe('eHoldings Package', () => {
    const line = {
      id: 'f5d265ac-bc9c-4e39-a6bd-381a9c709a5b',
      type: 'external',
      authority: 'EKB-PACKAGE',
      reference: '19-3629',
      explanation: null,
      contentUpdated: null,
      haveAccess: true,
      owner: {
        id: '9b710a4b-1f7e-4e7f-9757-17bb07f9fe91'
      },
      poLines: [],
      customCoverage: false,
      reference_object: {
        label: 'Book Collection Nonfiction: Elementary School Edition',
        publicationType: 'Package',
        type: 'Package',
        provider: 'EBSCO',
        titleCount: 1273,
        selectedCount: 1200,
        contentType: 'E-Book',
        providerName: 'EBSCO',
        isSelected: true
      }
    };

    beforeEach(async () => {
      await mountWithContext(
        <Router context={{}}>
          <AgreementLineForm
            lineId="f5d265ac-bc9c-4e39-a6bd-381a9c709a5b"
            {...formProps}
            data={{ line }}
            initialValues={{
              linkedResource: line,
              activeFrom: '2020-05-01',
              activeTo: '2020-05-30',
              note: 'a test note',
            }}
          />
        </Router>
      );

      await interactor.whenLoaded();
    });

    it('should render form', () => {
      expect(interactor.isAgreementLineForm).to.be.true;
    });

    it('should render package card', () => {
      expect(externalInteractor.isPkgCardPresent).to.be.true;
    });

    it('should render correct package name', () => {
      expect(externalInteractor.pkgName).to.equal('Book Collection Nonfiction: Elementary School Edition');
    });

    it('should render correct package content type', () => {
      expect(externalInteractor.pkgContentType).to.equal('E-Book');
    });

    it('should render correct package holdings status', () => {
      expect(externalInteractor.pkgHoldingStatus).to.equal('Selected');
    });

    it('should render correct package access status type', () => {
      expect(externalInteractor.pkgAccessStatusType).to.equal('-');
    });

    it('should render correct provider', () => {
      expect(externalInteractor.pkgProvider).to.equal('EBSCO');
    });

    it('should render correct number of items in package', () => {
      expect(externalInteractor.pkgCount).to.equal('1200 / 1273');
    });

    it('should have correct "active from" date in field', () => {
      expect(interactor.activeFrom).to.equal('05/01/2020');
    });

    it('should have correct "active to" date in field', () => {
      expect(interactor.activeTo).to.equal('05/30/2020');
    });

    it('should have correct "note" in field', () => {
      expect(interactor.note).to.equal('a test note');
    });

    it('should render PO Lines accordion', () => {
      expect(interactor.hasPOLinesAccordion).to.be.true;
    });

    it('should not render Coverage accordion', () => {
      expect(interactor.hasCoverageAccordion).to.be.false;
    });
  });

  describe('eHoldings Package with 0 titleCount and selectedCount', () => {
    const line = {
      id: 'f5d265ac-bc9c-4e39-a6bd-381a9c709a5b',
      type: 'external',
      authority: 'EKB-PACKAGE',
      reference: '19-3629',
      explanation: null,
      contentUpdated: null,
      haveAccess: true,
      owner: {
        id: '9b710a4b-1f7e-4e7f-9757-17bb07f9fe91'
      },
      poLines: [],
      customCoverage: false,
      reference_object: {
        label: 'Book Collection Nonfiction: Elementary School Edition',
        pulicationType: 'Package',
        type: 'Package',
        provider: 'EBSCO',
        titleCount: 0,
        selectedCount: 0,
        contentType: 'E-Book',
        providerName: 'EBSCO',
        isSelected: true
      }
    };

    beforeEach(async () => {
      await mountWithContext(
        <Router context={{}}>
          <AgreementLineForm
            {...formProps}
            data={{ line }}
            initialValues={{
              activeFrom: '2020-05-01',
              activeTo: '2020-05-30',
              linkedResource: line,
              note: 'a test note',
            }}
            lineId="f5d265ac-bc9c-4e39-a6bd-381a9c709a5b"
          />
        </Router>
      );

      await interactor.whenLoaded();
    });

    it('should render form', () => {
      expect(interactor.isAgreementLineForm).to.be.true;
    });

    it('should render package card', () => {
      expect(externalInteractor.isPkgCardPresent).to.be.true;
    });

    it('should render correct number of items in package', () => {
      expect(externalInteractor.pkgCount).to.equal('0 / 0');
    });
  });

  describe('eHoldings Title', () => {
    const line = {
      id: '035338ab-89d6-4c38-8444-1c653a254103',
      type: 'external',
      authority: 'EKB-TITLE',
      reference: '19-5207-7194938',
      explanation: null,
      startDate: '2020-05-01',
      endDate: '2020-05-31',
      contentUpdated: null,
      haveAccess: true,
      suppressFromDiscovery: false,
      note: 'a note',
      owner: {
        id: '4fde5ce6-d936-4636-92e5-eb78a8805476'
      },
      customCoverage: false,
      coverage: [{
        startDate: '2012-01-01',
        endDate: '2012-12-31',
        summary: 'v*/i*/2012-01-01 - v*/i*/2012-12-31'
      }],
      reference_object: {
        accessStatusType: 'Draft',
        label: 'Murder in the Title',
        type: 'Book',
        provider: 'EBSCO',
        publicationType: 'Book',
        identifiers: [{
          id: '978-1-4483-0008-2',
          type: 'ISBN (Online)'
        }],
        authors: ['Simon Brett'],
        packageData: {
          name: 'EBSCO eBooks',
          titleCount: 2079672,
          selectedCount: 13,
          contentType: 'E-Book',
          providerName: 'EBSCO',
          isSelected: true
        },
        providerName: 'EBSCO'
      }
    };

    beforeEach(async () => {
      await mountWithContext(
        <Router context={{}}>
          <AgreementLineForm
            {...formProps}
            data={{ line }}
            initialValues={{
              linkedResource: line
            }}
            lineId="035338ab-89d6-4c38-8444-1c653a254103"
          />
        </Router>
      );

      await interactor.whenLoaded();
    });

    it('should render form', () => {
      expect(interactor.isAgreementLineForm).to.be.true;
    });

    it('should render title card', () => {
      expect(externalInteractor.isTitleCardPresent).to.be.true;
    });

    it('should render correct title name', () => {
      expect(externalInteractor.titleName).to.equal('Murder in the Title');
    });

    it('should render correct resource type', () => {
      expect(externalInteractor.titleType).to.equal('Book');
    });

    it('should render correct title holdings status', () => {
      expect(externalInteractor.titleHoldingStatus).to.equal('Not selected');
    });

    it('should render correct title access status type', () => {
      expect(externalInteractor.titleAccessStatusType).to.equal('Draft');
    });

    it('should render PO Lines accordion', () => {
      expect(interactor.hasPOLinesAccordion).to.be.true;
    });

    it('should render Coverage accordion', () => {
      expect(interactor.hasCoverageAccordion).to.be.false;
    });
  });
});
