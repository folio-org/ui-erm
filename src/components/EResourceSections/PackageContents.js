import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { FormattedMessage } from 'react-intl';

import {
  Accordion,
  Badge,
  Button,
  ButtonGroup,
  FormattedUTCDate,
  Layout,
  MultiColumnList,
  Spinner,
} from '@folio/stripes/components';

import CoverageStatements from '../CoverageStatements';
import CoverageStatementsMonograph from '../CoverageStatementsMonograph';
import EResourceLink from '../EResourceLink';
import { resultCount } from '../../constants';

export default class PackageContents extends React.Component {
  static propTypes = {
    data: PropTypes.shape({
      packageContents: PropTypes.array,
      packageContentsFilter: PropTypes.string,
    }),
    id: PropTypes.string,
    onFilterPackageContents: PropTypes.func.isRequired,
    onNeedMorePackageContents: PropTypes.func.isRequired,
    onToggle: PropTypes.func,
    open: PropTypes.bool,
  };

  columnMapping = {
    name: <FormattedMessage id="ui-agreements.eresources.name" />,
    platform: <FormattedMessage id="ui-agreements.eresources.platform" />,
    coverage: <FormattedMessage id="ui-agreements.eresources.coverage" />,
    accessStart: <FormattedMessage id="ui-agreements.eresources.accessStart" />,
    accessEnd: <FormattedMessage id="ui-agreements.eresources.accessEnd" />,
  }

  renderEdition = (edition) => {
    if (!edition) return null;

    return (
      <React.Fragment>
        <FormattedMessage id="ui-agreements.coverage.editionShort" />
        {edition}
      </React.Fragment>
    );
  }

  renderVolume = (volume) => {
    if (!volume) return null;

    return (
      <React.Fragment>
        <FormattedMessage id="ui-agreements.coverage.volumeShort" />
        {volume}
      </React.Fragment>
    );
  }

  coverageFormatter = (pci) => {
    if (get(pci, 'pti.titleInstance.type.value') === 'monograph') {
      return (
        <CoverageStatementsMonograph pci={pci} />
      );
    } else {
      return (
        <CoverageStatements statements={pci.coverage} />
      );
    }
  }

  formatter = {
    name: pci => <EResourceLink eresource={pci.pti.titleInstance} />,
    platform: pci => get(pci, 'pti.platform.name', ''),
    coverage: pci => this.coverageFormatter(pci),
    accessStart: pci => this.renderDate(pci.accessStart),
    accessEnd: pci => this.renderDate(pci.accessEnd),
  }

  visibleColumns = [
    'name',
    'platform',
    'coverage',
    'accessStart',
    'accessEnd',
  ]

  renderList = (packageContents, packageContentsCount) => {
    return (
      <MultiColumnList
        columnMapping={this.columnMapping}
        contentData={packageContents}
        formatter={this.formatter}
        id="package-contents-list"
        maxHeight={800}
        onNeedMoreData={this.props.onNeedMorePackageContents}
        pageAmount={resultCount.RESULT_COUNT_INCREMENT}
        pagingType="click"
        totalCount={packageContentsCount}
        virtualize
        visibleColumns={this.visibleColumns}
      />
    );
  }

  renderDate = date => (
    date ? <FormattedUTCDate value={date} /> : '-'
  )

  renderBadge = () => {
    const count = get(this.props.data, 'packageContentsCount');
    return count !== undefined ? <Badge>{count}</Badge> : <Spinner />;
  }

  renderFilterButton = (filter) => (
    <Button
      buttonStyle={this.props.data.packageContentsFilter === filter ? 'primary' : 'default'}
      id={`clickable-pci-${filter}`}
      onClick={() => this.props.onFilterPackageContents(filter)}
    >
      <FormattedMessage id={`ui-agreements.content.${filter}`} />
    </Button>
  )

  renderFilterButtons = () => (
    <Layout className="textCentered">
      <ButtonGroup>
        {this.renderFilterButton('current')}
        {this.renderFilterButton('future')}
        {this.renderFilterButton('dropped')}
        {this.renderFilterButton('all')}
      </ButtonGroup>
    </Layout>
  )

  render() {
    const {
      data: { packageContents, packageContentsCount },
      id,
      onToggle,
      open
    } = this.props;

    return (
      <Accordion
        displayWhenClosed={this.renderBadge()}
        displayWhenOpen={this.renderBadge()}
        id={id}
        label={<FormattedMessage id="ui-agreements.eresources.packageResources" />}
        onToggle={onToggle}
        open={open}
      >
        {this.renderFilterButtons()}
        {packageContents ? this.renderList(packageContents, packageContentsCount) : <Spinner />}
      </Accordion>
    );
  }
}
