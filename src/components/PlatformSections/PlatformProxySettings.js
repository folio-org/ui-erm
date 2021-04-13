import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import {
  Accordion,
  Button,
  Tooltip,
  MultiColumnList
} from '@folio/stripes/components';

const PlatformProxySettings = ({
  platform: { id: platformId, name: platformName },
  proxyServers = [],
  id,
  handlers: { onClickProxyServerAction }
}) => {
  const columnMapping = {
    name: <FormattedMessage id="ui-agreements.platform.platformProxySettings.name" />,
    status: <FormattedMessage id="ui-agreements.platform.platformProxySettings.status" />,
    actions: <FormattedMessage id="ui-agreements.platform.platformProxySettings.actions" />,
  };

  const columnWidths = {
    name: 250,
    status: 250
  };

  const formatter = {
    name: ({ name }) => name,
    status: (proxyServerSetting) => {
      const { idScopes } = proxyServerSetting;
      return (idScopes.includes(platformId) ?
        <FormattedMessage id="ui-agreements.platform.platformProxySettings.notUsed" /> :
        <FormattedMessage id="ui-agreements.platform.platformProxySettings.used" />);
    },
    actions: (proxyServerSetting) => {
      const { name, idScopes } = proxyServerSetting;
      const hasPlatformId = idScopes.includes(platformId);
      return (
        <Tooltip
          id="proxy-server-action-button-tooltip"
          placement="top"
          text={hasPlatformId ?
            <FormattedMessage id="ui-agreements.platform.platformProxySettings.useProxyTooltip" values={{ proxyName : name, platformName }} /> :
            <FormattedMessage id="ui-agreements.platform.platformProxySettings.doNotUseProxyTooltip" values={{ proxyName : name, platformName }} />
          }
        >
          {({ ref, ariaIds }) => (
            <div
              ref={ref}
              aria-labelledby={ariaIds.text}
            >
              <Button
                buttonStyle={hasPlatformId ? 'primary' : 'default'}
                marginBottom0
                onClick={() => onClickProxyServerAction(proxyServerSetting, platformId, hasPlatformId)}
              >
                {(hasPlatformId ?
                  <FormattedMessage id="ui-agreements.platform.platformProxySettings.useThisProxy" /> :
                  <FormattedMessage id="ui-agreements.platform.platformProxySettings.doNotUseThisProxy" />
                )}
              </Button>
            </div>
          )}
        </Tooltip>
      );
    },
  };

  const visibleColumns = [
    'name',
    'status',
    'actions'
  ];

  return (
    <Accordion
      id={id}
      label={<FormattedMessage id="ui-agreements.platform.platformProxyServerSettings" />}
    >
      <MultiColumnList
        columnMapping={columnMapping}
        columnWidths={columnWidths}
        contentData={proxyServers}
        formatter={formatter}
        id="url-customization"
        interactive={false}
        isEmptyMessage={<FormattedMessage id="ui-agreements.platform.noplatformProxyServer" />}
        visibleColumns={visibleColumns}
      />
    </Accordion>
  );
};

PlatformProxySettings.propTypes = {
  id: PropTypes.string,
  handlers: PropTypes.shape({
    onClickProxyServerAction: PropTypes.func,
  }),
  platform: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string
  }).isRequired,
  proxyServers: PropTypes.arrayOf(PropTypes.shape({
    idScopes: PropTypes.arrayOf(PropTypes.string)
  }))
};

export default PlatformProxySettings;
