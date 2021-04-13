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
import PlatformFormInfo from './PlatformFormInfo';

const PlatformForm = ({
  handlers,
  handleSubmit,
  pristine,
  submitting,
  values: { name }
}) => {
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
          appIcon={<AppIcon app="agreements" iconKey="platform" />}
          centerContent
          defaultWidth="100%"
          firstMenu={
            <PaneMenu>
              <FormattedMessage id="ui-agreements.platform.closeEdit">
                {ariaLabel => (
                  <IconButton
                    aria-label={ariaLabel}
                    icon="times"
                    id="close-platform-form-button"
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
                  id="clickable-update-platform"
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
          id="pane-platform-form"
          paneTitle={<FormattedMessage id="ui-agreements.platform.editPlatform" values={{ name }} />}
        >
          <TitleManager record={name}>
            <form id="form-platform">
              <PlatformFormInfo name={name} />
            </form>
          </TitleManager>
        </Pane>
      </Paneset>
    </HasCommand>
  );
};

PlatformForm.propTypes = {
  handlers: PropTypes.PropTypes.shape({
    onClose: PropTypes.func.isRequired,
  }),
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
})(PlatformForm);
