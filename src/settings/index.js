import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Settings } from '@folio/stripes/smart-components';

import GeneralSettings from './GeneralSettings';

import {
  SupplementaryPropertiesConfigRoute,
  PickListSettings,
  PickListValueSettings
} from './routes';

export default class ErmSettings extends React.Component {
  sections = [
    {
      label: <FormattedMessage id="ui-agreements.settings.general" />,
      pages: [
        {
          route: 'general',
          label: <FormattedMessage id="ui-agreements.settings.displaySettings" />,
          perm: 'ui-agreements.generalSettings.manage',
          component: GeneralSettings,
        },
        {
          component: SupplementaryPropertiesConfigRoute,
          label: <FormattedMessage id="ui-agreements.settings.supplementaryProperties" />,
          perm: 'ui-agreements.supplementaryProperties.manage',
          route: 'supplementaryProperties',
        },
      ]
    },
    {
      label: <FormattedMessage id="ui-agreements.settings.supplementaryPropertyPickList" />,
      pages: [
        {
          component: PickListSettings,
          label: <FormattedMessage id="ui-agreements.settings.pickLists" />,
          perm: 'ui-agreements.picklists.manage',
          route: 'pick-lists',
        },
        {
          component: PickListValueSettings,
          label: <FormattedMessage id="ui-agreements.settings.pickListValues" />,
          perm: 'ui-agreements.picklists.manage',
          route: 'pick-list-values',
        },
      ]
    }
  ]

  render() {
    return (
      <Settings
        {...this.props}
        paneTitle={<FormattedMessage id="ui-agreements.meta.title" />}
        sections={this.sections}
      />
    );
  }
}
