import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import { FormattedMessage } from 'react-intl';
import { Button } from '@folio/stripes/components';
import { Field } from 'react-final-form';
import { isDetached, isExternal } from '../utilities';

import FormEresourceCard from './FormEresourceCard';
import BasketSelector from '../BasketSelector';
import EresourceSelector from './EresourceSelector';


const propTypes = {
  agreementLineSource: PropTypes.string,
  basket: PropTypes.arrayOf(PropTypes.object),
  line: PropTypes.shape({
    poLines: PropTypes.arrayOf(PropTypes.object),
  }),
  lineId: PropTypes.string,
  setFieldData: PropTypes.func,
  values: PropTypes.shape({
    coverage: PropTypes.arrayOf(PropTypes.object),
  }),
};

const FormEresource = ({
  agreementLineSource,
  basket,
  line,
  lineId,
  setFieldData,
  values,
}) => {
  const setCovergeFieldWarnings = (warn) => {
    const warnFields = ['startDate', 'startVolume', 'startIssue', 'endDate', 'endVolume', 'endIssue'];
    return values.coverage?.forEach((_, index) => {
      warnFields.forEach((field) => (
        warn ?
          setFieldData(`coverage[${index}].${field}`, { warning: <FormattedMessage id={`ui-agreements.customCoverage.warn.${field}`} /> })
          :
          setFieldData(`coverage[${index}].${field}`, { warning: '' })
      ));
    });
  };

  const renderHandleUnLinkEresourceButton = (onChange) => {
    // dont render the button on the edit pane when the line type is non-detached and line is non-empty.
    if (!isDetached(line) && lineId && !isEmpty(line)) return null;

    return (
      <Button
        buttonStyle="default"
        marginBottom0
        onClick={() => {
          onChange({});
          if (!isEmpty(values.coverage)) setCovergeFieldWarnings(true);
        }}
      >
        <FormattedMessage id="ui-agreements.agreementLine.unlinkEresource" />
      </Button>
    );
  };

  // validation fires when there is no description and no eresource
  const required = (val, allValues) => {
    if (allValues.description?.length > 0 || (!isEmpty(val) && !isDetached(val))) {
      return undefined;
    }
    return <FormattedMessage id="ui-agreements.agreementLine.provideEresource" />;
  };

  return (
    <Field name="linkedResource" validate={required}>
      {({ input, meta }) => {
        const res = isExternal(input.value) ? input.value : (input.value.resource?._object ?? {});
        if (!isEmpty(input.value) && !isDetached(input.value)) {
          return (
            <FormEresourceCard
              component={FormEresourceCard}
              headerEnd={renderHandleUnLinkEresourceButton(input.onChange)}
              resource={!isDetached(line) && lineId && !isEmpty(line) ? res : input.value}
            />
          );
        } else if (agreementLineSource === '') { // when neither the eholdings permission / ifEresourcesEnabled perm is on the user
          return null;
        } else if (agreementLineSource === 'basket') {
          return (
            <BasketSelector
              addButtonLabel={<FormattedMessage id="ui-agreements.agreementLine.linkSelectedEresource" />}
              basket={basket}
              component={BasketSelector}
              error={meta.touched && meta.error}
              label={<FormattedMessage id="ui-agreements.eresource" />}
              name={input.name}
              onAdd={resource => {
                input.onChange(resource);
                setCovergeFieldWarnings(false);
              }}
              value={input.value}
            />
          );
        } else {
          return (
            <EresourceSelector
              component={EresourceSelector}
              error={meta.touched && meta.error}
              name={input.name}
              onAdd={resource => {
                input.onChange(resource);
                setCovergeFieldWarnings(false);
              }}
              value={input.value}
            />
          );
        }
      }}
    </Field>
  );
};

FormEresource.propTypes = propTypes;
export default FormEresource;
