import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { FormattedMessage } from 'react-intl';
import { Accordion, Badge, Layout } from '@folio/stripes/components';
import { DocumentCard } from '@folio/stripes-erm-components';

export default class ExternalLicenses extends React.Component {
  static propTypes = {
    agreement: PropTypes.shape({
      externalLicenseDocs: PropTypes.arrayOf(
        PropTypes.shape({
          dateCreated: PropTypes.string,
          lastUpdated: PropTypes.string,
          location: PropTypes.string,
          name: PropTypes.string.isRequired,
          note: PropTypes.string,
          url: PropTypes.string,
        }),
      ),
    }),
    handlers: PropTypes.shape({
      onDownloadFile: PropTypes.func,
    }).isRequired,
    id: PropTypes.string,
  };

  renderExternalLicense = license => (
    <DocumentCard
      key={license.id}
      onDownloadFile={this.props.handlers.onDownloadFile}
      {...license}
    />
  )

  renderEmpty = () => (
    <Layout className="padding-bottom-gutter">
      <FormattedMessage id="ui-agreements.emptyAccordion.externalLicenses" />
    </Layout>
  )

  render() {
    const { id } = this.props;
    const externalLicenses = get(this.props, 'agreement.externalLicenseDocs', []);

    return (
      <Accordion
        displayWhenClosed={<Badge>{externalLicenses.length}</Badge>}
        displayWhenOpen={<Badge>{externalLicenses.length}</Badge>}
        id={id}
        label={<FormattedMessage id="ui-agreements.license.externalLicenses" />}
      >
        { externalLicenses.length ? externalLicenses.map(this.renderExternalLicense) : this.renderEmpty() }
      </Accordion>
    );
  }
}
