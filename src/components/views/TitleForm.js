import React from 'react';
import PropTypes from 'prop-types';
import { isEqual } from 'lodash';
import { FormattedMessage } from 'react-intl';
import { handleSaveKeyCommand } from '@folio/stripes-erm-components';

import {
  Button,
  HasCommand,
  IconButton,
  Pane,
  PaneFooter,
  PaneMenu,
  Paneset,
  checkScope
} from '@folio/stripes/components';

import { AppIcon, TitleManager } from '@folio/stripes/core';
import stripesFinalForm from '@folio/stripes/final-form';
import TitleCardInfo from '../TitleCard/TitleCardInfo';
import TitleFormInfo from './TitleFormInfo';

import css from '../styles.css';

const TitleForm = ({
  eresource,
  form,
  handlers,
  handleSubmit,
  pristine,
  submitting,
  values,
}) => {
  const getSectionProps = () => {
    return {
      form,
      isSuppressFromDiscoveryEnabled: handlers.isSuppressFromDiscoveryEnabled,
      name: values.name,
      title: eresource,
      values,
    };
  };

  const shortcuts = [
    {
      name: 'save',
      handler: (e) => handleSaveKeyCommand(e, { handleSubmit, pristine, submitting }),
    },
  ];

  return (
    <HasCommand
      commands={shortcuts}
      isWithinScope={checkScope}
      scope={document.body}
    >
      <Paneset>
        <Pane
          appIcon={<AppIcon app="agreements" iconKey="eresource" />}
          defaultWidth="100%"
          firstMenu={
            <PaneMenu>
              <FormattedMessage id="ui-agreements.title.closeEdit">
                {ariaLabel => (
                  <IconButton
                    aria-label={ariaLabel}
                    icon="times"
                    id="close-title-form-button"
                    onClick={handlers.onClose}
                  />
                )}
              </FormattedMessage>
            </PaneMenu>
        }
          footer={
            <PaneFooter
              renderEnd={(
                <Button
                  buttonStyle="primary mega"
                  disabled={pristine || submitting}
                  id="clickable-update-title"
                  marginBottom0
                  onClick={handleSubmit}
                  type="submit"
                >
                  <FormattedMessage id="stripes-components.saveAndClose" />
                </Button>
        )}
              renderStart={(
                <Button
                  buttonStyle="default mega"
                  id="clickable-cancel"
                  marginBottom0
                  onClick={handlers.onClose}
                >
                  <FormattedMessage id="stripes-components.cancel" />
                </Button>
        )}
            />
        }
          id="pane-title-form"
          paneTitle={<FormattedMessage id="ui-agreements.editResource" values={{ name: values.name }} />}
        >
          <TitleManager record={values.name}>
            <form id="form-title">
              <TitleCardInfo {...getSectionProps()} />
              <div className={css.separator} />
              <TitleFormInfo {...getSectionProps()} />
            </form>
          </TitleManager>
        </Pane>
      </Paneset>
    </HasCommand>
  );
};

TitleForm.propTypes = {
  eresource: PropTypes.object,
  form: PropTypes.object.isRequired,
  handlers: PropTypes.PropTypes.shape({
    isSuppressFromDiscoveryEnabled: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
  }),
  initialValues: PropTypes.object,
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
  values: PropTypes.object,
};

export default stripesFinalForm({
  initialValuesEqual: (a, b) => isEqual(a, b),
  keepDirtyOnReinitialize: true,
  subscription: {
    values: true,
  },
  navigationCheck: true,
})(TitleForm);
