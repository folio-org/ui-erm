import React from 'react';
import PropTypes from 'prop-types';
import { ControlledVocab } from '@folio/stripes/smart-components';
import { FormattedMessage } from 'react-intl';

export default class OrgRoleSettings extends React.Component {
  static propTypes = {
    stripes: PropTypes.shape({
      connect: PropTypes.func.isRequired,
    }),
  };

  constructor(props) {
    super(props);
    this.connectedControlledVocab = props.stripes.connect(ControlledVocab);
  }

  render() {
    return (
      <FormattedMessage id="ui-agreements.settings.orgRoles.orgRole">
        { labelSingular => (
          <this.connectedControlledVocab
            {...this.props}
            baseUrl="erm/refdata/SubscriptionAgreementOrg/role"
            columnMapping={{
              label: <FormattedMessage id="ui-agreements.settings.orgRoles.role" />
            }}
            dataKey={undefined}
            hiddenFields={['numberOfObjects']}
            id="cv-org-roles"
            label={<FormattedMessage id="ui-agreements.settings.orgRoles" />}
            labelSingular={labelSingular}
            nameKey="label"
            sortby="label"
            visibleFields={['label']}
          />
        )}
      </FormattedMessage>
    );
  }
}
