import React from 'react';
import PropTypes from 'prop-types';
import { uniqueId } from 'lodash';
import { FormattedMessage } from 'react-intl';

import {
  Checkbox,
  IconButton,
  MultiColumnList,
  Tooltip,
} from '@folio/stripes/components';

import { EResourceType } from '@folio/stripes-erm-components';
import Coverage from '../Coverage';
import EResourceLink from '../EResourceLink';

class BasketList extends React.Component {
  static propTypes = {
    basket: PropTypes.arrayOf(PropTypes.object),
    onRemoveItem: PropTypes.func,
    onToggleAll: PropTypes.func,
    onToggleItem: PropTypes.func,
    selectedItems: PropTypes.object,
  }

  getName = (eresource) => {
    const pti = eresource?._object?.pti ?? eresource?.pti;
    const name = pti?.titleInstance?.name ?? eresource.name;

    return name;
  }

  render() {
    const { basket, onRemoveItem, selectedItems } = this.props;

    return (
      <MultiColumnList
        columnMapping={{
          selected: (
            <Checkbox
              checked={Object.values(selectedItems).includes(false) !== true}
              name="selected-all"
              onChange={this.props.onToggleAll}
            />
          ),
          name: <FormattedMessage id="ui-agreements.eresources.name" />,
          publicationType: <FormattedMessage id="ui-agreements.eresources.publicationType" />,
          package: <FormattedMessage id="ui-agreements.eresources.parentPackage" />,
          platform: <FormattedMessage id="ui-agreements.eresources.platform" />,
          coverage: <FormattedMessage id="ui-agreements.eresources.coverage" />,
          action: <FormattedMessage id="ui-agreements.action" />,
        }}
        columnWidths={{
          coverage: { min: 250, max: 320 },
          name: 300,
          package: { max: 400 },
        }}
        contentData={basket}
        formatter={{
          selected: resource => (
            <Checkbox
              checked={!!(selectedItems[resource.id])}
              name={`selected-${resource.id}`}
              onChange={() => this.props.onToggleItem(resource)}
            />
          ),
          name: resource => <EResourceLink eresource={resource} />,
          publicationType: resource => <EResourceType resource={resource} />,
          package: resource => {
            const pkg = resource?._object?.pkg;
            if (!pkg) return null;

            return <EResourceLink eresource={pkg} />;
          },
          platform: resource => (
            resource?._object?.pti?.platform?.name ||
            resource?._object?.nominalPlatform?.name || null
          ),
          // The resource below fits the same shape as the eresources in an agreement line, so we pass them in the eResource prop.
          coverage: resource => <Coverage eResource={resource} />,
          action: resource => (
            <Tooltip
              id={uniqueId('removeBasketItemBtn')}
              text={<FormattedMessage id="ui-agreements.basket.removeFromBasket" values={{ publicationType: <EResourceType resource={resource} />, name: this.getName(resource) }} />}
            >
              {({ ariaIds, ref }) => (
                <IconButton
                  ref={ref}
                  aria-labelledby={ariaIds.text}
                  icon="trash"
                  onClick={() => onRemoveItem(resource)}
                />
              )}
            </Tooltip>
          )
        }}
        interactive={false}
        maxHeight={400}
        rowUpdater={resource => selectedItems[resource.id]}
        visibleColumns={[
          'selected',
          'name',
          'publicationType',
          'package',
          'platform',
          'coverage',
          'action'
        ]}
      />
    );
  }
}

export default BasketList;
