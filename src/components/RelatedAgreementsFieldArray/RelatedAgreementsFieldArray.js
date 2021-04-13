import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { FormattedMessage } from 'react-intl';
import { Field } from 'react-final-form';
import { Button, Layout, MessageBanner, Select, TextArea } from '@folio/stripes/components';
import {
  EditCard,
  composeValidators,
  requiredValidator,
  withKiwtFieldArray
} from '@folio/stripes-erm-components';

import RelatedAgreementField from './RelatedAgreementField';
import { agreementRelationshipTypes } from '../../constants';

class RelatedAgreementsFieldArray extends React.Component {
  static propTypes = {
    currentAgreementId: PropTypes.string,
    currentAgreementName: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.object),
    name: PropTypes.string.isRequired,
    onAddField: PropTypes.func.isRequired,
    onDeleteField: PropTypes.func.isRequired,
    onUpdateField: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.relationshipTypes = [{ label: '', value: '' }];

    agreementRelationshipTypes.forEach(type => {
      this.relationshipTypes.push(type.outward);
      // we should only add the inward relation to the select list
      // if outward and inward relation label is not the same
      if (type.outward.label !== type.inward.label) {
        this.relationshipTypes.push(type.inward);
      }
    });
  }

  handleAgreementSelected = (index, agreement) => {
    this.props.onUpdateField(index, { agreement });
  }

  validateSelfLinking = (value) => {
    if (value && value.id === this.props.currentAgreementId) {
      return <FormattedMessage id="ui-agreements.errors.cannotLinkAgreementToItself" />;
    }

    return undefined;
  };

  renderEmpty = () => (
    <Layout className="padding-bottom-gutter" data-test-ra-empty-message>
      <FormattedMessage id="ui-agreements.relatedAgreements.agreementHasNone" />
    </Layout>
  );

  renderRelationshipSummary = (relatedAgreement) => {
    const { agreement = {}, type } = relatedAgreement;
    if (!agreement.id || !type) return null;

    const source = agreement.name;
    const relationship = this.relationshipTypes.find(t => t.value === type).label;
    const target = this.props.currentAgreementName;

    const translationKey = `ui-agreements.relatedAgreements.${target ? 'relationshipSummary' : 'relationshipSummaryForNewAgreement'}`;

    return (
      <MessageBanner>
        <FormattedMessage id={translationKey} values={{ source, relationship, target }} />
      </MessageBanner>
    );
  }

  renderRelatedAgreements = (items) => {
    return items.map((relatedAgreement, index) => (
      <EditCard
        key={index}
        deleteBtnProps={{
          'id': `ra-delete-${index}`,
          'data-test-delete-field-button': true
        }}
        deleteButtonTooltipText={<FormattedMessage id="ui-agreements.relatedAgreements.remove" values={{ index: index + 1 }} />}
        header={<FormattedMessage id="ui-agreements.relatedAgreements.relatedAgreementIndex" values={{ index: index + 1 }} />}
        id={`edit-ra-card-${index}`}
        onDelete={() => this.props.onDeleteField(index, relatedAgreement)}
      >
        <Field
          agreement={relatedAgreement.agreement}
          component={RelatedAgreementField}
          id={`ra-agreement-${index}`}
          index={index}
          name={`${this.props.name}[${index}].agreement`}
          onAgreementSelected={selectedAgreement => this.handleAgreementSelected(index, selectedAgreement)}
          validate={composeValidators(
            requiredValidator,
            this.validateSelfLinking,
          )}
        />
        <Field
          component={Select}
          dataOptions={this.relationshipTypes}
          disabled={!get(relatedAgreement, 'agreement.id')}
          id={`ra-type-${index}`}
          label={<FormattedMessage id="ui-agreements.relatedAgreements.relationshipToThisAgreement" />}
          name={`${this.props.name}[${index}].type`}
          required
          validate={requiredValidator}
        />
        { this.renderRelationshipSummary(relatedAgreement) }
        <Field
          component={TextArea}
          id={`ra-note-${index}`}
          label={<FormattedMessage id="ui-agreements.note" />}
          name={`${this.props.name}[${index}].note`}
          parse={v => v} // Lets us send an empty string instead of `undefined`
        />
      </EditCard>
    ));
  }

  render() {
    const { items, onAddField } = this.props;
    return (
      <div data-test-ra-fa>
        <div>
          {items.length ? this.renderRelatedAgreements(items) : this.renderEmpty()}
        </div>
        <Button
          data-test-ra-fa-add-button
          id="add-ra-btn"
          onClick={() => onAddField()}
        >
          <FormattedMessage id="ui-agreements.relatedAgreements.addRelatedAgreement" />
        </Button>
      </div>
    );
  }
}

export default withKiwtFieldArray(RelatedAgreementsFieldArray);
