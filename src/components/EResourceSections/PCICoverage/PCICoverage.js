import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import {
  Accordion,
  Badge,
  FormattedUTCDate,
  KeyValue,
  MultiColumnList,
  NoValue,
} from '@folio/stripes/components';
import { Embargo } from '@folio/stripes-erm-components';

export default class PCICoverage extends React.Component {
  static propTypes = {
    data: PropTypes.shape({
      eresource: PropTypes.shape({
        coverage: PropTypes.arrayOf(PropTypes.object),
        embargo: PropTypes.shape({
          movingWallStart: PropTypes.shape({
            length: PropTypes.number,
            unit: PropTypes.string
          }),
          movingWallEnd: PropTypes.shape({
            length: PropTypes.number,
            unit: PropTypes.string
          })
        }),
      }),
    }),
  }

  columnMapping = {
    startDate: <FormattedMessage id="ui-agreements.pci.coverage.startDate" />,
    startVolume: <FormattedMessage id="ui-agreements.pci.coverage.startVolume" />,
    startIssue: <FormattedMessage id="ui-agreements.pci.coverage.startIssue" />,
    endDate: <FormattedMessage id="ui-agreements.pci.coverage.endDate" />,
    endVolume: <FormattedMessage id="ui-agreements.pci.coverage.endVolume" />,
    endIssue: <FormattedMessage id="ui-agreements.pci.coverage.endIssue" />,
  }

  formatter = {
    startDate: coverage => <div data-test-start-date>{this.renderDate(coverage.startDate)}</div>,
    startVolume: coverage => <div data-test-start-volume>{coverage?.startVolume ?? <NoValue />}</div>,
    startIssue: coverage => <div data-test-start-issue>{coverage?.startIssue ?? <NoValue />}</div>,
    endDate: coverage => <div data-test-end-date>{this.renderDate(coverage?.endDate)}</div>,
    endVolume: coverage => <div data-test-end-volume>{coverage?.endVolume ?? <NoValue />}</div>,
    endIssue: coverage => <div data-test-end-issue>{coverage?.endIssue ?? <NoValue />}</div>,
  }

  visibleColumns = [
    'startDate',
    'startVolume',
    'startIssue',
    'endDate',
    'endVolume',
    'endIssue',
  ];

  renderBadge = () => {
    const count = this.props.data.eresource?.coverage?.length ?? 0;
    return <Badge>{count}</Badge>;
  }

  renderCoverage = (pci) => (
    <MultiColumnList
      columnMapping={this.columnMapping}
      contentData={pci.coverage}
      formatter={this.formatter}
      id="pci-coverage-list"
      interactive={false}
      isEmptyMessage={<FormattedMessage id="ui-agreements.emptyAccordion.pciCoverage" />}
      visibleColumns={this.visibleColumns}
    />
  );

  renderDate = date => (
    date ? <FormattedUTCDate value={date} /> : <NoValue />
  );

  renderEmbargo = (pci) => {
    return pci.embargo ? (
      <KeyValue label={<FormattedMessage id="ui-agreements.embargo" />}>
        <Embargo alignment="left" embargo={pci?.embargo} />
      </KeyValue>
    ) : null;
  }

  render() {
    const { eresource = {} } = this.props.data;

    return (
      <Accordion
        displayWhenClosed={this.renderBadge()}
        displayWhenOpen={this.renderBadge()}
        id="pci-coverage"
        label={<FormattedMessage id="ui-agreements.eresources.coverage" />}
      >
        {this.renderEmbargo(eresource)}
        {this.renderCoverage(eresource)}
      </Accordion>
    );
  }
}
