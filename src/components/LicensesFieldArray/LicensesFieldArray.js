import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Field } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';
import { Button, Col, Layout, Row, Select, TextArea } from '@folio/stripes/components';
import { composeValidators, requiredValidator, EditCard, withKiwtFieldArray } from '@folio/stripes-erm-components';

import AmendmentsFieldArray from './AmendmentsFieldArray';
import LicenseField from './LicenseField';

const CONTROLLING_STATUS = 'controlling';

class LicensesFieldArray extends React.Component {
  static propTypes = {
    amendmentStatusValues: PropTypes.arrayOf(PropTypes.object),
    form: PropTypes.object,
    items: PropTypes.arrayOf(PropTypes.object),
    name: PropTypes.string.isRequired,
    onAddField: PropTypes.func.isRequired,
    onDeleteField: PropTypes.func.isRequired,
    onUpdateField: PropTypes.func.isRequired,
    licenseStatusValues: PropTypes.arrayOf(PropTypes.object),
  };

  handleLicenseSelected = (index, license = {}) => {
    const amendments = (license.amendments || []).map(a => ({
      amendmentId: a.id,
    }));

    this.props.onUpdateField(index, {
      amendments,
      remoteId: license.id,
      remoteId_object: license,
    });
  }

  renderEmpty = () => (
    <Layout className="padding-bottom-gutter" data-test-license-empty-message>
      <FormattedMessage id="ui-agreements.license.agreementHasNone" />
    </Layout>
  )

  validateOnlyOneControllingLicense = (value, allValues) => {
    const { name } = this.props;

    if (value === CONTROLLING_STATUS) {
      const controllingLicenses = allValues[name].filter(l => l.status === CONTROLLING_STATUS);
      if (controllingLicenses.length > 1) {
        return <FormattedMessage id="ui-agreements.license.error.multipleControllingLicenses" />;
      }
    }

    return undefined;
  }

  renderLicenseFields = () => {
    const {
      amendmentStatusValues,
      form,
      items,
      licenseStatusValues,
      name,
      onDeleteField
    } = this.props;

    return items.map((license, index) => (
      <EditCard
        key={index}
        deleteBtnProps={{
          'id': `license-delete-${index}`,
          'data-test-delete-field-button': true
        }}
        deleteButtonTooltipText={<FormattedMessage id="ui-agreements.license.removeLicense" values={{ index: index + 1 }} />}
        header={<FormattedMessage id="ui-agreements.license.licenseIndex" values={{ index: index + 1 }} />}
        id={`${name}-remoteId-${index}-license-card`}
        onDelete={() => onDeleteField(index, license)}
      >
        <Field
          component={LicenseField}
          id={`${name}-remoteId-${index}`}
          index={index}
          license={license.remoteId_object}
          name={`${name}[${index}].remoteId`}
          onLicenseSelected={selectedLicense => this.handleLicenseSelected(index, selectedLicense)}
          validate={requiredValidator}
        />
        <Row>
          <Col md={4} xs={12}>
            <Field
              key={index}
              component={Select}
              dataOptions={licenseStatusValues}
              id={`${name}-status-${index}`}
              label={<FormattedMessage id="ui-agreements.license.prop.status" />}
              name={`${name}[${index}].status`}
              placeholder=" "
              required
              validate={composeValidators(
                this.validateOnlyOneControllingLicense,
                requiredValidator,
              )}
            />
          </Col>
          <Col md={8} xs={12}>
            <Field
              component={TextArea}
              id={`${name}-note-${index}`}
              label={<FormattedMessage id="ui-agreements.license.prop.note" />}
              name={`${name}[${index}].note`}
              parse={v => v} // Lets us send an empty string instead of `undefined`
            />
          </Col>
        </Row>
        <FieldArray
          amendmentStatusValues={amendmentStatusValues}
          component={AmendmentsFieldArray}
          form={form}
          license={license.remoteId_object}
          name={`${name}[${index}].amendments`}
        />
      </EditCard>
    ));
  }

  render() {
    const { items, onAddField } = this.props;
    return (
      <div data-test-license-fa>
        <div>
          {items.length ? this.renderLicenseFields() : this.renderEmpty()}
        </div>
        <Button
          data-test-license-fa-add-button
          id="add-license-btn"
          onClick={() => onAddField()}
        >
          <FormattedMessage id="ui-agreements.license.addLicense" />
        </Button>
      </div>
    );
  }
}

export default withKiwtFieldArray(LicensesFieldArray);
