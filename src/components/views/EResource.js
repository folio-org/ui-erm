import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, useIntl } from 'react-intl';

import {
  Button,
  IconButton,
  LoadingPane,
  Pane,
  PaneMenu,
} from '@folio/stripes/components';
import { AppIcon, IfPermission, TitleManager } from '@folio/stripes/core';

import Package from './Package';
import Title from './Title';
import PCI from './PCI';
import { resourceClasses } from '../../constants';

const propTypes = {
  data: PropTypes.shape({
    eresource: PropTypes.shape({
      class: PropTypes.string,
      name: PropTypes.string,
      tags: PropTypes.arrayOf(PropTypes.string),
      type: PropTypes.object,
    }),
  }),
  handlers: PropTypes.shape({
    onClose: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    onToggleTags: PropTypes.func.isRequired
  }).isRequired,
  helperApp: PropTypes.func,
  isLoading: PropTypes.bool,
};

const EResource = ({
  data = {},
  data: { eresource },
  helperApp,
  handlers,
  isLoading,
}) => {
  const intl = useIntl();

  const paneProps = {
    defaultWidth: '55%',
    dismissible: true,
    onClose: handlers.onClose,
  };

  if (isLoading) return <LoadingPane data-loading id="pane-view-eresource" {...paneProps} />;

  let EResourceViewComponent = Package;

  if (eresource.class === resourceClasses.TITLEINSTANCE) {
    EResourceViewComponent = Title;
  } else if (eresource.class === resourceClasses.PCI) {
    EResourceViewComponent = PCI;
  }

  return (
    <>
      <Pane
        appIcon={<AppIcon app="agreements" iconKey="eresource" size="small" />}
        id="pane-view-eresource"
        lastMenu={
          (eresource.class === resourceClasses.PCI || eresource.class === resourceClasses.TITLEINSTANCE) ?
            (
              <IfPermission perm="ui-agreements.resources.edit">
                <PaneMenu>
                  {handlers.onToggleTags &&
                    <IconButton
                      ariaLabel={intl.formatMessage({ id: 'ui-agreements.agreements.showTags' })}
                      badgeCount={eresource?.tags?.length ?? 0}
                      icon="tag"
                      id="clickable-show-tags"
                      onClick={handlers.onToggleTags}
                    />
                  }
                  <Button
                    buttonStyle="primary"
                    id="clickable-edit-eresource"
                    marginBottom0
                    onClick={handlers.onEdit}
                  >
                    <FormattedMessage id="stripes-components.button.edit" />
                  </Button>
                </PaneMenu>
              </IfPermission>
            ) : null
        }
        onClose={handlers.onClose}
        paneTitle={eresource.name}
        {...paneProps}
      >
        <TitleManager record={eresource.name}>
          <EResourceViewComponent data={data} handlers={handlers} />
        </TitleManager>
      </Pane>
      {helperApp(eresource)}
    </>
  );
};

EResource.propTypes = propTypes;
export default EResource;
