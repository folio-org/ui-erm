import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';

import { FormattedMessage } from 'react-intl';

import {
  AccordionSet,
  AccordionStatus,
  Col,
  ExpandAllButton,
  Row,
} from '@folio/stripes/components';
import { NotesSmartAccordion } from '@folio/stripes/smart-components';

import {
  Agreements,
  PackageContents,
  PackageInfo,
} from '../EResourceSections';

import { urls } from '../utilities';

export default class Package extends React.Component {
  static propTypes = {
    data: PropTypes.object,
    handlers: PropTypes.object,
  }

  getSectionProps = (id) => {
    const { data, handlers } = this.props;

    return {
      eresource: data.eresource,
      data,
      id,
      handlers,
    };
  }

  getInitialAccordionsState = () => {
    const { data: { entitlements } } = this.props;

    return {
      eresourceAgreements: !isEmpty(entitlements),
      notes: true,
      packageContents: true,
    };
  }

  render() {
    const { data, handlers } = this.props;

    return (
      <div id="eresource-package">
        <PackageInfo {...this.getSectionProps('info')} />
        <AccordionStatus>
          <Row end="xs">
            <Col xs>
              <ExpandAllButton />
            </Col>
          </Row>
          <AccordionSet>
            <Agreements
              {...this.getSectionProps('eresourceAgreements')}
              isEmptyMessage={<FormattedMessage id="ui-agreements.emptyAccordion.noAgreementsPackage" />}
              visibleColumns={['name', 'type', 'startDate', 'endDate']}
            />
            <PackageContents
              {...this.getSectionProps('packageContents')}
              onFilterPackageContents={handlers.onFilterPackageContents}
              onNeedMorePackageContents={handlers.onNeedMorePackageContents}
            />
            <NotesSmartAccordion
              {...this.getSectionProps('notes')}
              domainName="agreements"
              entityId={data.eresource.id}
              entityName={data.eresource.name}
              entityType="eresource"
              pathToNoteCreate={urls.noteCreate()}
              pathToNoteDetails={urls.notes()}
            />
          </AccordionSet>
        </AccordionStatus>
      </div>
    );
  }
}
