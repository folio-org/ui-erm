import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Button, Card, Layout } from '@folio/stripes/components';
import { AppIcon, Pluggable } from '@folio/stripes/core';

import css from './EresourceSelector.css';

const propTypes = {
  error: PropTypes.node,
  line: PropTypes.shape({
    poLines: PropTypes.arrayOf(PropTypes.object),
  }),
  onAdd: PropTypes.func,
};

const renderError = (error) => (
  <Layout className={`textCentered ${css.error}`} data-test-user-error>
    <strong>
      {error}
    </strong>
  </Layout>
);

const renderEmpty = () => (
  <div data-test-user-empty>
    <Layout className="textCentered">
      <strong>
        <FormattedMessage id="ui-agreements.agreementLine.noEresourceLinked" />
      </strong>
    </Layout>
    <Layout className="textCentered">
      <FormattedMessage id="ui-agreements.agreementLine.linkEresourceToStart" />
    </Layout>
  </div>
);

const EresourceSelector = ({ error, onAdd }) => {
  const buttonProps = {
    'aria-haspopup': 'true',
    'buttonStyle': 'primary',
    'marginBottom0': true
  };

  const renderLinkPackageButton = () => {
    return (
      <Pluggable
        dataKey="package"
        onRecordChosen={res => onAdd(res)}
        renderCustomTrigger={props => (
          <Button
            {...buttonProps}
            {...props}
            data-test-custom-trigger
          >
            <FormattedMessage id="ui-agreements.agreementLine.linkEresource" />
          </Button>
        )}
        type="find-package-title"
      >
        <FormattedMessage id="ui-erm-comparisons.newComparison.noPackagePlugin" />
      </Pluggable>
    );
  };

  return (
    <Card
      cardStyle="negative"
      headerEnd={renderLinkPackageButton()}
      headerStart={(
        <AppIcon app="eholdings" size="small">
          <FormattedMessage id="ui-agreements.agreementLine.eholdings" />
        </AppIcon>
    )}
      roundedBorder
    >
      {renderEmpty()}
      {error ? renderError(error) : null}
    </Card>
  );
};

EresourceSelector.propTypes = propTypes;
export default EresourceSelector;
