import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import {
  Button,
  Col,
  ConfirmationModal,
  HasCommand,
  Headline,
  Icon,
  KeyValue,
  LoadingPane,
  NoValue,
  Row,
  Pane,
  checkScope
} from '@folio/stripes/components';
import { TitleManager, useStripes } from '@folio/stripes/core';
import SafeHTMLMessage from '@folio/react-intl-safe-html';

const UrlCustomizer = ({
  data: { urlCustomization },
  isLoading,
  handlers,
}) => {
  const stripes = useStripes();

  const paneProps = {
    defaultWidth: '55%',
    dismissible: true,
    id: 'pane-view-urlcustomizer',
    onClose: handlers.onClose,
  };

  const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] = useState(false);

  if (isLoading) return <LoadingPane data-loading {...paneProps} />;

  const openDeleteConfirmationModal = () => setShowDeleteConfirmationModal(true);

  const closeDeleteConfirmationModal = () => setShowDeleteConfirmationModal(false);

  const shortcuts = [
    {
      name: 'edit',
      handler: handlers.onEdit,
    },
  ];

  return (
    <HasCommand
      commands={shortcuts}
      isWithinScope={checkScope}
      scope={document.body}
    >
      <>
        <Pane
          actionMenu={({ onToggle }) => {
            const buttons = [];

            if (stripes.hasPerm('ui-agreements.platforms.edit')) {
              buttons.push(
                <Button
                  buttonStyle="dropdownItem"
                  id="clickable-dropdown-edit-url-customizer"
                  onClick={handlers.onEdit}
                >
                  <Icon icon="edit">
                    <FormattedMessage id="ui-agreements.platform.urlCustomizer.edit" />
                  </Icon>
                </Button>
              );
              buttons.push(
                <Button
                  buttonStyle="dropdownItem"
                  id="clickable-dropdown-delete-url-customizer"
                  onClick={() => {
                    openDeleteConfirmationModal();
                    onToggle();
                  }}
                >
                  <Icon icon="trash">
                    <FormattedMessage id="ui-agreements.platform.urlCustomizer.delete" />
                  </Icon>
                </Button>
              );
            }

            return buttons.length ? buttons : null;
          }
          }
          paneTitle={<FormattedMessage id="ui-agreements.platform.urlCustomizer.paneTitle" values={{ name: urlCustomization?.name }} />}
          {...paneProps}
        >
          <TitleManager record={urlCustomization?.name}>
            <Row>
              <Col xs={12}>
                <div data-test-platform-name>
                  <Headline
                    size="xx-large"
                    tag="h2"
                  >
                    <FormattedMessage id="ui-agreements.platform.urlCustomizer.paneTitle" values={{ name: urlCustomization?.name }} />
                  </Headline>
                </div>
              </Col>
            </Row>
            <KeyValue label={<FormattedMessage id="ui-agreements.platform.urlCustomization.customizationCode" />}>
              <div data-test-url-customization-code>
                {urlCustomization?.rule ?? <NoValue />}
              </div>
            </KeyValue>
          </TitleManager>
        </Pane>
        <ConfirmationModal
          buttonStyle="danger"
          confirmLabel={<FormattedMessage id="ui-agreements.delete" />}
          data-test-delete-confirmation-modal
          heading={<FormattedMessage id="ui-agreements.platform.urlCustomization.delete" />}
          id="delete-agreement-confirmation"
          message={<SafeHTMLMessage id="ui-agreements.platform.urlCustomization.deleteConfirmMessage" values={{ name: urlCustomization?.name }} />}
          onCancel={closeDeleteConfirmationModal}
          onConfirm={() => {
            handlers.onDelete();
            closeDeleteConfirmationModal();
          }}
          open={showDeleteConfirmationModal}
        />
      </>
    </HasCommand>
  );
};

UrlCustomizer.propTypes = {
  data: PropTypes.shape({
    platform: PropTypes.object.isRequired,
    stringTemplates: PropTypes.arrayOf(PropTypes.object),
    urlCustomization: PropTypes.shape({
      name: PropTypes.string,
      rule: PropTypes.string
    })
  }).isRequired,
  handlers: PropTypes.shape({
    onClose: PropTypes.func,
    onDelete: PropTypes.func,
    onEdit: PropTypes.func,
  }).isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default UrlCustomizer;
