import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Field } from 'react-final-form';

import {
  Button,
  Checkbox,
  Layout,
  List,
  Pane,
} from '@folio/stripes/components';

import stripesFinalForm from '@folio/stripes/final-form';

import { MCLPaginationFields, SuppressFromDiscoveryFields } from './components';

class GeneralSettingsForm extends React.Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    pristine: PropTypes.bool,
    submitting: PropTypes.bool,
    label: PropTypes.string,
  };

  getLastMenu = () => {
    const { pristine, submitting } = this.props;

    return (
      <Button
        buttonStyle="primary"
        disabled={(pristine || submitting)}
        id="clickable-save-agreements-general-settings"
        marginBottom0
        type="submit"
      >
        <FormattedMessage id="stripes-core.button.save" />
      </Button>
    );
  }

  render() {
    const {
      handleSubmit,
      label,
    } = this.props;

    return (
      <form id="agreement-general-settings-form" onSubmit={handleSubmit}>
        <Pane
          defaultWidth="fill"
          fluidContentWidth
          id="pane-agreements-settings-general"
          lastMenu={this.getLastMenu()}
          paneTitle={label}
        >
          <Field
            component={Checkbox}
            id="hideEResourcesFunctionality"
            label={<FormattedMessage id="ui-agreements.settings.general.hideEResourcesFunctionality.title" />}
            name="hideEResourcesFunctionality"
            normalize={v => !!v}
            type="checkbox"
          />
          <Layout className="padding-bottom-gutter padding-top-gutter">
            <FormattedMessage id="ui-agreements.settings.general.hideEResourcesFunctionality.description" />
          </Layout>
          <Layout className="margin-both-gutter">
            <List
              itemFormatter={item => <FormattedMessage id={`ui-agreements.settings.hideEResources.result.${item}`} tagName="li" />}
              items={[1, 2, 3]}
              listStyle="bullets"
            />
          </Layout>
          <MCLPaginationFields />
          <SuppressFromDiscoveryFields name="displaySuppressFromDiscovery" />
        </Pane>
      </form>
    );
  }
}

export default stripesFinalForm({
  navigationCheck: true,
  enableReinitialize: true,
  subscription: {
    values: true,
  },
})(GeneralSettingsForm);
