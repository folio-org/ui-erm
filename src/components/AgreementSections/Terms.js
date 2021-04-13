import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Accordion } from '@folio/stripes/components';
import { CustomPropertiesList } from '@folio/stripes-erm-components';

export default class Terms extends React.Component {
  static propTypes = {
    agreement: PropTypes.shape({
      linkedLicenses: PropTypes.arrayOf(PropTypes.shape({
        remoteId_object: PropTypes.object.isRequired,
        status: PropTypes.shape({
          value: PropTypes.string,
        }).isRequired,
      })),
    }),
    data: PropTypes.shape({
      terms: PropTypes.arrayOf(PropTypes.object),
    }),
    id: PropTypes.string,
  }

  renderTermsList = (controllingLicense) => {
    const license = controllingLicense.remoteId_object;
    return (
      <CustomPropertiesList
        customProperties={this.props.data.terms}
        resource={license}
      />
    );
  }

  render() {
    const {
      agreement: { linkedLicenses = [] },
      id,
    } = this.props;

    const controllingLicense = linkedLicenses.find(l => l.status.value === 'controlling');

    return (
      <Accordion
        id={id}
        label={<FormattedMessage id="ui-agreements.agreements.licenseAndBusTerms" />}
      >
        {controllingLicense ?
          this.renderTermsList(controllingLicense) :
          <FormattedMessage id="ui-agreements.emptyAccordion.licenseAndBusinessTerms" />
        }
      </Accordion>
    );
  }
}
