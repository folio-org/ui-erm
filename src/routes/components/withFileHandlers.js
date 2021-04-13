import React from 'react';
import PropTypes from 'prop-types';
import { withStripes } from '@folio/stripes/core';

const getDisplayName = (WrappedComponent) => {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
};

export default function withFileHandlers(WrappedComponent) {
  class WithFileHandlers extends React.Component {
    static propTypes = {
      handlers: PropTypes.object,
      stripes: PropTypes.shape({
        okapi: PropTypes.shape({
          tenant: PropTypes.string.isRequired,
          token: PropTypes.string.isRequired,
          url: PropTypes.string,
        }).isRequired,
      }).isRequired,
    };

    static defaultProps = {
      handlers: { },
    }

    handleUploadFile = (file) => {
      const { stripes: { okapi } } = this.props;

      const formData = new FormData();
      formData.append('upload', file);

      return fetch(`${okapi.url}/erm/files`, {
        method: 'POST',
        headers: {
          'X-Okapi-Tenant': okapi.tenant,
          'X-Okapi-Token': okapi.token,
        },
        body: formData,
      });
    }

    handleDeleteFile = (file) => {
      const { stripes: { okapi } } = this.props;

      return fetch(`${okapi.url}/erm/files/${file.id}`, {
        method: 'DELETE',
        headers: {
          'X-Okapi-Tenant': okapi.tenant,
          'X-Okapi-Token': okapi.token,
        },
      });
    }

    handleDownloadFile = (file) => {
      const { stripes: { okapi } } = this.props;

      return fetch(`${okapi.url}/erm/files/${file.id}/raw`, {
        headers: {
          'X-Okapi-Tenant': okapi.tenant,
          'X-Okapi-Token': okapi.token,
        },
      }).then(response => response.blob())
        .then(blob => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = file.name;
          document.body.appendChild(a);
          a.click();
          a.remove();
        });
    }

    render() {
      const { handlers, ...rest } = this.props;

      return (
        <WrappedComponent
          handlers={{
            ...handlers,
            onDownloadFile: this.handleDownloadFile,
            onUploadFile: this.handleUploadFile,
          }}
          {...rest}
        />
      );
    }
  }

  WithFileHandlers.displayName = `WithFileHandlers(${getDisplayName(WrappedComponent)})`;
  return withStripes(WithFileHandlers);
}
