import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { FieldArray } from 'react-final-form-arrays';

import { Accordion } from '@folio/stripes/components';
import { DocumentsFieldArray } from '@folio/stripes-erm-components';

export default class FormSupplementaryDocuments extends React.Component {
  static propTypes = {
    data: PropTypes.shape({
      documentCategories: PropTypes.arrayOf(PropTypes.object),
    }).isRequired,
    handlers: PropTypes.shape({
      onDownloadFile: PropTypes.func.isRequired,
      onUploadFile: PropTypes.func.isRequired,
    }),
    id: PropTypes.string,
    onToggle: PropTypes.func,
    open: PropTypes.bool,
  };

  render() {
    const { data, handlers, id, onToggle, open } = this.props;
    return (
      <Accordion
        id={id}
        label={<FormattedMessage id="ui-agreements.supplementaryDocuments" />}
        onToggle={onToggle}
        open={open}
      >
        <FieldArray
          addDocBtnLabel={<FormattedMessage id="ui-agreements.supplementaryDocs.addSupplementaryDoc" />}
          component={DocumentsFieldArray}
          deleteBtnTooltipMsgId="ui-agreements.doc.removeSupplementaryInformation"
          documentCategories={data.documentCategories}
          isEmptyMessage={<FormattedMessage id="ui-agreements.supplementaryDocs.agreementHasNone" />}
          name="supplementaryDocs"
          onDownloadFile={handlers.onDownloadFile}
          onUploadFile={handlers.onUploadFile}
        />
      </Accordion>
    );
  }
}
