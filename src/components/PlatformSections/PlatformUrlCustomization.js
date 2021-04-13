import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { IfPermission } from '@folio/stripes/core';
import {
  Accordion,
  Badge,
  Button,
  Spinner,
  Tooltip,
  MultiColumnList
} from '@folio/stripes/components';
import { urls } from '../utilities';

const PlatformUrlCustomization = ({
  platform: { id: platformId },
  stringTemplates = [],
  id,
  handlers: { onViewUrlCustomizer }
}) => {
  const urlCustomizerStringTemplates = stringTemplates?.urlCustomisers ?? [];

  const renderAddUrlCustomizationButton = () => {
    return (
      <IfPermission perm="ui-agreements.platforms.edit">
        {urlCustomizerStringTemplates?.length > 0 ? (
          <Tooltip
            id="add-url-customization-button-tooltip"
            placement="top"
            text={<FormattedMessage id="ui-agreements.platform.addUrlCustomization.maxNumber" />}
          >
            {({ ref, ariaIds }) => (
              <div
                ref={ref}
                aria-labelledby={ariaIds.text}
              >
                <Button
                  disabled
                  id="add-url-customization-button"
                >
                  <FormattedMessage id="ui-agreements.platform.addUrlCustomization" />
                </Button>
              </div>
            )}
          </Tooltip>
        ) : (
          <Button
            id="add-url-customization-button"
            to={urls.urlCustomizerCreate(platformId)}
          >
            <FormattedMessage id="ui-agreements.platform.addUrlCustomization" />
          </Button>
        )
        }
      </IfPermission>
    );
  };

  const columnMapping = {
    name: <FormattedMessage id="ui-agreements.platform.urlCustomization.name" />,
    customizationCode: <FormattedMessage id="ui-agreements.platform.urlCustomization.customizationCode" />,
  };

  const columnWidths = {
    name: 250,
  };

  const formatter = {
    name: ({ name }) => name,
    customizationCode: ({ rule }) => rule
  };

  const visibleColumns = [
    'name',
    'customizationCode'
  ];

  const renderBadge = () => {
    const count = urlCustomizerStringTemplates?.length ?? 0;
    return count !== undefined ? <Badge>{count}</Badge> : <Spinner />;
  };

  return (
    <Accordion
      displayWhenClosed={renderBadge()}
      displayWhenOpen={renderAddUrlCustomizationButton()}
      id={id}
      label={<FormattedMessage id="ui-agreements.platform.urlCustomizationSettings" />}
    >
      <MultiColumnList
        columnMapping={columnMapping}
        columnWidths={columnWidths}
        contentData={urlCustomizerStringTemplates}
        formatter={formatter}
        id="url-customization"
        isEmptyMessage={<FormattedMessage id="ui-agreements.platform.noUrlCustomization" />}
        onRowClick={(e, row) => {
          if (e.target.tagName !== 'A') {
            onViewUrlCustomizer(row.id);
          }
        }}
        visibleColumns={visibleColumns}
      />
    </Accordion>
  );
};

PlatformUrlCustomization.propTypes = {
  handlers: PropTypes.shape({
    onViewUrlCustomizer: PropTypes.func
  }),
  id: PropTypes.string,
  platform: PropTypes.shape({
    id: PropTypes.string,
  }),
  stringTemplates: PropTypes.arrayOf(PropTypes.object)
};

export default PlatformUrlCustomization;
