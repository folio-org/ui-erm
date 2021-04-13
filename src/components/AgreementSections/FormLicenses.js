import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Field } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';

import { Accordion, Headline, KeyValue, TextArea } from '@folio/stripes/components';
import { DocumentsFieldArray } from '@folio/stripes-erm-components';

import LicensesFieldArray from '../LicensesFieldArray';

export default class FormLicenses extends React.Component {
  static propTypes = {
    data: PropTypes.shape({
      agreement: PropTypes.object,
      amendmentStatusValues: PropTypes.arrayOf(PropTypes.object),
      licenseLinkStatusValues: PropTypes.arrayOf(PropTypes.object),
    }),
    form: PropTypes.object,
    handlers: PropTypes.object,
    id: PropTypes.string,
    onToggle: PropTypes.func,
    open: PropTypes.bool,
  };

  renderNote = () => (
    <Field
      component={TextArea}
      id="edit-agreement-licenseNote"
      label={<FormattedMessage id="ui-agreements.license.generalNotes" />}
      maxLength={255}
      name="licenseNote"
      parse={v => v} // Lets us send an empty string instead of `undefined`
    />
  )

  renderLinkedLicenses = () => (
    <div data-test-licenses-form-all-licenses>
      <KeyValue
        label={
          <Headline margin="x-small" size="large" tag="h4">
            <FormattedMessage id="ui-agreements.license.allLicenses" />
          </Headline>
        }
      >
        <FieldArray
          amendmentStatusValues={this.props.data.amendmentStatusValues}
          component={LicensesFieldArray}
          form={this.props.form}
          licenseStatusValues={this.props.data.licenseLinkStatusValues}
          name="linkedLicenses"
        />
      </KeyValue>
    </div>
  )

  renderExternalLicenses = () => (
    <div data-test-licenses-form-external-licenses>
      <KeyValue
        label={
          <Headline margin="x-small" size="large" tag="h4">
            <FormattedMessage id="ui-agreements.license.externalLicenses" />
          </Headline>
        }
      >
        <FieldArray
          addDocBtnLabel={<FormattedMessage id="ui-agreements.license.addExternalLicense" />}
          component={DocumentsFieldArray}
          deleteBtnTooltipMsgId="ui-agreements.doc.removeExternalLicense"
          isEmptyMessage={<FormattedMessage id="ui-agreements.license.noExternalLicenses" />}
          name="externalLicenseDocs"
          onDownloadFile={this.props.handlers.onDownloadFile}
          onUploadFile={this.props.handlers.onUploadFile}
        />
      </KeyValue>
    </div>
  )

  render() {
    const {
      id,
      onToggle,
      open,
    } = this.props;

    return (
      <Accordion
        id={id}
        label={<FormattedMessage id="ui-agreements.agreements.licenseInfo" />}
        onToggle={onToggle}
        open={open}
      >
        {this.renderNote()}
        {this.renderLinkedLicenses()}
        {this.renderExternalLicenses()}
      </Accordion>
    );
  }
}
