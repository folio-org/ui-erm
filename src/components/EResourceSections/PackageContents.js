import React from 'react';
import PropTypes from 'prop-types';
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
import { AppIcon } from '@folio/stripes/core';

import { TitleOnPlatformLink } from '@folio/stripes-erm-components';
import { Coverage } from '../Coverage';
import EResourceLink from '../EResourceLink';
import { resultCount } from '../../constants';

export default class PackageContents extends React.Component {
  static propTypes = {
    data: PropTypes.shape({
      packageContents: PropTypes.arrayOf(PropTypes.object),
      packageContentsCount: PropTypes.number,
      packageContentsFilter: PropTypes.string,
    }),
    id: PropTypes.string,
    onFilterPackageContents: PropTypes.func.isRequired,
    onNeedMorePackageContents: PropTypes.func.isRequired,
    onToggle: PropTypes.func,
    open: PropTypes.bool,
  };

  state = {
    sortOrder: ['name', 'platform'],
    sortDirection: ['asc', 'desc'],
  };

  columnMapping = {
    name: <FormattedMessage id="ui-agreements.eresources.name" />,
    platform: <FormattedMessage id="ui-agreements.eresources.platform" />,
    coverage: <FormattedMessage id="ui-agreements.eresources.coverage" />,
    accessStart: <FormattedMessage id="ui-agreements.eresources.accessStart" />,
    accessEnd: <FormattedMessage id="ui-agreements.eresources.accessEnd" />,
  };

  columnWidths = {
    name: { min: 200, max: 400 },
    coverage: { min: 250, max: 320 },
  }

  formatter = {
    name: pci => {
      return (
        <AppIcon
          app="agreements"
          iconAlignment="baseline"
          iconKey="eresource"
          size="small"
        >
          <EResourceLink eresource={pci.pti.titleInstance} />
        </AppIcon>
      );
    },
    platform: pci => {
      const pti = pci.pti ?? {};
      const { name, platform, url } = pti;

      return (
        <TitleOnPlatformLink
          id={pci.id}
          name={name}
          platform={platform?.name}
          url={url}
        />
      );
    },
    coverage: pci => <Coverage pci={pci} />,
    accessStart: pci => this.renderDate(pci.accessStart),
    accessEnd: pci => this.renderDate(pci.accessEnd),
  };

  sortMap = {
    name: pci => pci?.pti?.titleInstance?.name,
    platform: pci => pci.pti.name ?? {}
  }

  visibleColumns = ['name', 'platform', 'coverage', 'accessStart', 'accessEnd'];

  onSort = (_, meta) => {
    if (!this.sortMap[meta.name]) return;

    let {
      sortOrder,
      sortDirection,
    } = this.state;

    if (sortOrder[0] !== meta.name) {
      sortOrder = [meta.name, sortOrder[0]];
      sortDirection = ['asc', sortDirection[0]];
    } else {
      const direction = (sortDirection[0] === 'desc') ? 'asc' : 'desc';
      sortDirection = [direction, sortDirection[1]];
    }

    this.setState({ sortOrder, sortDirection });
  }

  renderList = (packageContents, packageContentsCount) => {
    const {
      sortOrder,
      sortDirection,
    } = this.state;

    // eslint-disable-next-line no-undef
    const contentData = _.orderBy(packageContents,
      [this.sortMap[sortOrder[0]], this.sortMap[sortOrder[1]]], sortDirection);

    return (
      <MultiColumnList
        columnMapping={this.columnMapping}
        columnWidths={this.columnWidths}
        contentData={contentData}
        formatter={this.formatter}
        id="package-contents-list"
        interactive={false}
        maxHeight={800}
        onHeaderClick={this.onSort}
        onNeedMoreData={this.props.onNeedMorePackageContents}
        pageAmount={resultCount.RESULT_COUNT_INCREMENT}
        pagingType="click"
        sortDirection={`${sortDirection[0]}ending`}
        sortOrder={sortOrder[0]}
        totalCount={packageContentsCount}
        virtualize
        visibleColumns={this.visibleColumns}
      />
    );
  };

  renderDate = date => (date ? <FormattedUTCDate value={date} /> : null);

  renderBadge = () => {
    const count = this.props.data?.packageContentsCount;
    return count !== undefined ? <Badge>{count}</Badge> : <Spinner />;
  };

  renderFilterButton = filter => (
    <Button
      buttonStyle={
        this.props.data.packageContentsFilter === filter ? 'primary' : 'default'
      }
      id={`clickable-pci-${filter}`}
      onClick={() => this.props.onFilterPackageContents(filter)}
    >
      <FormattedMessage id={`ui-agreements.content.${filter}`} />
    </Button>
  );

  renderFilterButtons = () => (
    <Layout className="textCentered">
      <ButtonGroup>
        {this.renderFilterButton('current')}
        {this.renderFilterButton('future')}
        {this.renderFilterButton('dropped')}
        {this.renderFilterButton('all')}
      </ButtonGroup>
    </Layout>
  );

  render() {
    const {
      data: { packageContents, packageContentsCount },
      id,
      onToggle,
      open,
    } = this.props;

    return (
      <Accordion
        displayWhenClosed={this.renderBadge()}
        displayWhenOpen={this.renderBadge()}
        id={id}
        label={
          <FormattedMessage id="ui-agreements.eresources.packageResources" />
        }
        onToggle={onToggle}
        open={open}
      >
        {this.renderFilterButtons()}
        {packageContents ? (
          this.renderList(packageContents, packageContentsCount)
        ) : (
          <Spinner />
        )}
      </Accordion>
    );
  }
}
