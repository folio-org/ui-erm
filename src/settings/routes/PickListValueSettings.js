import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { FormattedMessage } from 'react-intl';
import { ControlledVocab } from '@folio/stripes/smart-components';
import { Select } from '@folio/stripes/components';
import { IntlConsumer } from '@folio/stripes/core';

export default class PickListValueSettings extends React.Component {
  static manifest = {
    categories: {
      type: 'okapi',
      path: 'erm/refdata',
      params: {
        perPage: '100',
        sort: 'desc;asc',
      },
      accumulate: true,
    },
  };

  static propTypes = {
    stripes: PropTypes.shape({
      connect: PropTypes.func.isRequired,
    }).isRequired,
    resources: PropTypes.shape({
      categories: PropTypes.shape({
        records: PropTypes.arrayOf(PropTypes.shape({
          desc: PropTypes.string,
          id: PropTypes.string,
          internal: PropTypes.bool,
          values: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.string,
            value: PropTypes.string,
            label: PropTypes.string,
          })),
        }))
      }),
    }),
    mutator: PropTypes.shape({
      categories: PropTypes.shape({
        GET: PropTypes.func.isRequired,
        reset: PropTypes.func.isRequired,
      }),
    })
  };

  constructor(props) {
    super(props);
    this.connectedControlledVocab = props.stripes.connect(ControlledVocab);

    this.state = {
      selectedCategory: null,
    };
  }

  /**
   * Refresh lookup tables when the component mounts. Fetches in the manifest
   * will only run once (in the constructor) but because this object may be
   * unmounted/remounted without being destroyed/recreated, the lookup tables
   * will be stale if they change between unmounting/remounting.
   */
  componentDidMount() {
    this.props.mutator.categories.reset();
    this.props.mutator.categories.GET();
  }

  onChangeCategory = (e) => {
    const records = this.props?.resources?.categories?.records ?? [];
    const selectedCategory = records.find(item => item.id === e.target.value);
    this.setState({ selectedCategory });
  }

  renderCategories(intl) {
    return [
      { value: 'empty', label: intl.formatMessage({ id: 'ui-agreements.settings.pickListSelect' }) },
      ...get(this.props, 'resources.categories.records', []).map(c => ({ value: c.id, label: c.desc })),
    ];
  }

  renderRowFilter(intl) {
    return (
      <Select
        dataOptions={this.renderCategories(intl)}
        id="categorySelect"
        label={<FormattedMessage id="ui-agreements.settings.pickList" />}
        name="categorySelect"
        onChange={this.onChangeCategory}
      />
    );
  }

  render() {
    const { selectedCategory } = this.state;

    return (
      <IntlConsumer>
        {intl => (
          <this.connectedControlledVocab
            {...this.props}
            actionSuppressor={{ edit: () => false, delete: () => selectedCategory?.internal }}
            actuatorType="refdata"
            baseUrl={`erm/refdata/${selectedCategory?.id}`}
            canCreate={!selectedCategory?.internal}
            columnMapping={{
              label: intl.formatMessage({ id: 'ui-agreements.settings.label' }),
              value: intl.formatMessage({ id: 'ui-agreements.settings.value' }),
              actions: intl.formatMessage({ id: 'ui-agreements.settings.actions' }),
            }}
            // We have to unset the dataKey to prevent the props.resources in
            // <ControlledVocab> from being overwritten by the props.resources here.
            dataKey={undefined}
            hiddenFields={['lastUpdated', 'numberOfObjects']}
            id="pick-list-values"
            label={<FormattedMessage id="ui-agreements.settings.pickListValues" />}
            labelSingular={intl.formatMessage({ id: 'ui-agreements.settings.label' })}
            listSuppressor={() => !selectedCategory?.id}
            nameKey="label"
            objectLabel={<FormattedMessage id="ui-agreements.settings.values" />}
            readOnlyFields={['value']}
            records="values"
            rowFilter={this.renderRowFilter(intl)}
            sortby="label"
            stripes={this.props.stripes}
            visibleFields={['label', 'value']}
          />
        )}
      </IntlConsumer>
    );
  }
}
