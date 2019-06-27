import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { FormattedMessage } from 'react-intl';
import { Headline, MultiColumnList } from '@folio/stripes/components';

import CoverageStatements from '../CoverageStatements';
import CustomCoverageIcon from '../CustomCoverageIcon';
import EResourceLink from '../EResourceLink';
import IfEResourcesEnabled from '../IfEResourcesEnabled';

export default class CoveredEResourcesList extends React.Component {
  static propTypes = {
    agreement: PropTypes.shape({
      eresources: PropTypes.arrayOf(PropTypes.object),
    }).isRequired,
    onNeedMoreEResources: PropTypes.func.isRequired,
    visible: PropTypes.bool,
  };

  columnMapping = {
    name: <FormattedMessage id="ui-agreements.eresources.name" />,
    platform: <FormattedMessage id="ui-agreements.eresources.platform" />,
    package: <FormattedMessage id="ui-agreements.eresources.package" />,
    haveAccess: <FormattedMessage id="ui-agreements.eresources.haveAccess" />,
    accessStart: <FormattedMessage id="ui-agreements.eresources.accessStart" />,
    accessEnd: <FormattedMessage id="ui-agreements.eresources.accessEnd" />,
    coverage: <FormattedMessage id="ui-agreements.eresources.coverage" />,
    isCustomCoverage: ' ',
  }

  columnWidths = {
    name: 250,
    platform: 150,
    package: 150,
    coverage: 225,
    isCustomCoverage: 30,
  }

  formatter = {
    name: e => {
      const titleInstance = get(e._object, 'pti.titleInstance', {});
      return <EResourceLink eresource={titleInstance} />;
    },
    platform: e => get(e._object, 'pti.platform.name', '-'),
    package: e => get(e._object, 'pkg.name', '-'),
    haveAccess: () => 'TBD',
    accessStart: () => 'TBD',
    accessEnd: () => 'TBD',
    coverage: e => <CoverageStatements statements={e.coverage} />,
    isCustomCoverage: e => (e.customCoverage ? <CustomCoverageIcon /> : ''),
  }

  visibleColumns = [
    'name',
    'platform',
    'package',
    'haveAccess',
    'accessStart',
    'accessEnd',
    'coverage',
    'isCustomCoverage'
  ]

  render() {
    const {
      agreement: { eresources },
      onNeedMoreEResources,
      visible,
    } = this.props;

    return (
      <IfEResourcesEnabled>
        <Headline faded margin="none" tag="h4">
          <FormattedMessage id="ui-agreements.agreements.eresourcesCovered" />
        </Headline>
        <MultiColumnList
          columnMapping={this.columnMapping}
          columnWidths={this.columnWidths}
          contentData={visible ? eresources : []}
          formatter={this.formatter}
          height={800}
          id="eresources-covered"
          interactive={false}
          onNeedMoreData={onNeedMoreEResources}
          virtualize
          visibleColumns={this.visibleColumns}
        />
      </IfEResourcesEnabled>
    );
  }
}
