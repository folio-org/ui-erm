import React from 'react';
import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';
import { ControlledVocab } from '@folio/stripes/smart-components';
import { IntlConsumer } from '@folio/stripes/core';
import { NoValue } from '@folio/stripes/components';

export default class PickListSettings extends React.Component {
  static propTypes = {
    stripes: PropTypes.shape({
      connect: PropTypes.func.isRequired,
    }).isRequired,
  };

  constructor(props) {
    super(props);
    this.connectedControlledVocab = props.stripes.connect(ControlledVocab);
  }

  suppressDelete = (category) => {
    const { internal, values = [] } = category;

    return internal || values.length;
  }

  render() {
    const { stripes } = this.props;

    return (
      <IntlConsumer>
        {intl => (
          <this.connectedControlledVocab
            actionSuppressor={{ edit: () => true, delete: this.suppressDelete }}
            baseUrl="erm/refdata"
            columnMapping={{
              desc: intl.formatMessage({ id: 'ui-agreements.settings.pickList' }),
              actions: intl.formatMessage({ id: 'ui-agreements.settings.actions' }),
            }}
            formatter={{ numberOfObjects: (item) => item.values?.length ?? <NoValue /> }}
            hiddenFields={['lastUpdated']}
            id="pick-lists"
            itemTemplate={{ desc: this.desc, values: [] }}
            label={<FormattedMessage id="ui-agreements.settings.pickLists" />}
            labelSingular={intl.formatMessage({ id: 'ui-agreements.settings.pickList' })}
            limitParam="perPage"
            nameKey="desc"
            objectLabel={<FormattedMessage id="ui-agreements.settings.values" />}
            sortby="desc"
            stripes={stripes}
            visibleFields={['desc']}
          />
        )}
      </IntlConsumer>
    );
  }
}
