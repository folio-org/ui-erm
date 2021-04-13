import React from 'react';
import PropTypes from 'prop-types';
import { get, isEqual } from 'lodash';
import { FormattedMessage } from 'react-intl';
import setFieldData from 'final-form-set-field-data';
import { handleSaveKeyCommand } from '@folio/stripes-erm-components';
import { AppIcon, IfPermission, TitleManager } from '@folio/stripes/core';

import {
  AccordionSet,
  AccordionStatus,
  Button,
  Col,
  ExpandAllButton,
  HasCommand,
  IconButton,
  Pane,
  PaneFooter,
  PaneMenu,
  Paneset,
  Row,
  checkScope,
  collapseAllSections,
  expandAllSections
} from '@folio/stripes/components';

import stripesFinalForm from '@folio/stripes/final-form';

import {
  FormInfo,
  FormInternalContacts,
  FormLicenses,
  FormLines,
  FormOrganizations,
  FormRelatedAgreements,
  FormSupplementaryDocuments,
  FormSupplementaryProperties,
  FormUsageData,
} from '../AgreementSections';

class AgreementForm extends React.Component {
  static propTypes = {
    data: PropTypes.shape({
      agreementLines: PropTypes.arrayOf(PropTypes.object).isRequired,
      agreementLinesToAdd: PropTypes.arrayOf(PropTypes.object).isRequired,
      supplementaryProperties: PropTypes.arrayOf(PropTypes.object).isRequired,
    }).isRequired,
    form: PropTypes.shape({
      change: PropTypes.func.isRequired,
      getRegisteredFields: PropTypes.func.isRequired,
      getState: PropTypes.func.isRequired,
    }).isRequired,
    handlers: PropTypes.PropTypes.shape({
      onBasketLinesAdded: PropTypes.func.isRequired,
      onClose: PropTypes.func.isRequired,
    }),
    initialValues: PropTypes.object,
    handleSubmit: PropTypes.func.isRequired,
    isLoading: PropTypes.bool,
    onSubmit: PropTypes.func.isRequired,
    invalid: PropTypes.bool,
    pristine: PropTypes.bool,
    submitting: PropTypes.bool,
    values: PropTypes.object,
  }

  static defaultProps = {
    initialValues: {},
  }

  constructor(props) {
    super(props);
    this.accordionStatusRef = React.createRef();
  }

  state = {
    addedLinesToAdd: false, // eslint-disable-line react/no-unused-state
  }

  // The `agreementLinesToAdd` must be added here rather than in the parent route
  // handler because we don't want them to be part of the initialValues.
  // After all, they're being _added_, so their presence must dirty the form.
  static getDerivedStateFromProps(props, state) {
    const formState = props.form.getState();

    if (
      props.data.agreementLinesToAdd.length &&
      state.addedLinesToAdd === false &&
      props.form.getRegisteredFields().includes('items')
    ) {
      props.form.change('items', [
        ...get(formState, 'initialValues.items', []),
        ...props.data.agreementLinesToAdd,
      ]);

      props.handlers.onBasketLinesAdded();

      return { addedLinesToAdd: true };
    }

    return null;
  }

  getInitialAccordionsState = () => {
    return {
      formInternalContacts: true,
      formLines: true,
      formLicenses: true,
      formOrganizations: true,
      formSupplementaryProperties: true,
      formSupplementaryDocs: true,
      formUsageProviders: true,
      formRelatedAgreements: true,
    };
  }

  getSectionProps(id) {
    const { data, form, handlers, initialValues, values = {} } = this.props;

    return {
      data,
      form,
      handlers,
      id,
      initialValues,
      values,
    };
  }

  renderPaneFooter() {
    const {
      handlers,
      handleSubmit,
      pristine,
      submitting,
      values,
    } = this.props;

    return (
      <PaneFooter
        renderEnd={(
          <Button
            buttonStyle="primary mega"
            disabled={pristine || submitting}
            id={values.id ? 'clickable-update-agreement' : 'clickable-create-agreement'}
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
    );
  }

  renderFirstMenu() {
    return (
      <PaneMenu>
        <FormattedMessage id="ui-agreements.agreements.closeEdit">
          {ariaLabel => (
            <IconButton
              aria-label={ariaLabel}
              icon="times"
              id="close-agreement-form-button"
              onClick={this.props.handlers.onClose}
            />
          )}
        </FormattedMessage>
      </PaneMenu>
    );
  }

  shortcuts = [
    {
      name: 'save',
      handler: (e) => handleSaveKeyCommand(e, this.props),
    },
    {
      name: 'expandAllSections',
      handler: (e) => expandAllSections(e, this.accordionStatusRef),
    },
    {
      name: 'collapseAllSections',
      handler: (e) => collapseAllSections(e, this.accordionStatusRef),
    }
  ];

  render() {
    const { data, form, values: { id, name } } = this.props;

    const hasLoaded = form.getRegisteredFields().length > 0;

    return (
      <HasCommand
        commands={this.shortcuts}
        isWithinScope={checkScope}
        scope={document.body}
      >
        <Paneset>
          <FormattedMessage id="ui-agreements.create">
            {create => (
              <Pane
                appIcon={<AppIcon app="agreements" />}
                centerContent
                defaultWidth="100%"
                firstMenu={this.renderFirstMenu()}
                footer={this.renderPaneFooter()}
                id="pane-agreement-form"
                paneTitle={id ? name : <FormattedMessage id="ui-agreements.agreements.createAgreement" />}
              >
                <TitleManager record={id ? name : create}>
                  <form id="form-agreement">
                    <AccordionStatus ref={this.accordionStatusRef}>
                      {hasLoaded ? <div id="form-loaded" /> : null}
                      <Row end="xs">
                        <Col xs>
                          <ExpandAllButton />
                        </Col>
                      </Row>
                      <AccordionSet initialStatus={this.getInitialAccordionsState()}>
                        <FormInfo {...this.getSectionProps('formInfo')} />
                        <IfPermission perm="users.collection.get">
                          {({ hasPermission }) => (hasPermission ?
                            <FormInternalContacts {...this.getSectionProps('formInternalContacts')} />
                            :
                            null)}
                        </IfPermission>
                        <FormLines {...this.getSectionProps('formLines')} />
                        <FormLicenses {...this.getSectionProps('formLicenses')} />
                        <FormOrganizations {...this.getSectionProps('formOrganizations')} />
                        {data.supplementaryProperties?.length > 0 ?
                          <FormSupplementaryProperties {...this.getSectionProps('formSupplementaryProperties')} />
                          :
                          null
                    }
                        <FormSupplementaryDocuments {...this.getSectionProps('formSupplementaryDocs')} />
                        <FormUsageData {...this.getSectionProps('formUsageProviders')} />
                        <FormRelatedAgreements {...this.getSectionProps('formRelatedAgreements')} />
                      </AccordionSet>
                    </AccordionStatus>
                  </form>
                </TitleManager>
              </Pane>
            )}
          </FormattedMessage>
        </Paneset>
      </HasCommand>
    );
  }
}

export default stripesFinalForm({
  initialValuesEqual: (a, b) => isEqual(a, b),
  keepDirtyOnReinitialize: true,
  subscription: {
    values: true,
  },
  mutators: { setFieldData },
  navigationCheck: true,
})(AgreementForm);
