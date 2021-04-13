import React from 'react';
import PropTypes from 'prop-types';

export default class EResourceProvider extends React.Component {
  static propTypes = {
    resource: PropTypes.shape({
      _object: PropTypes.shape({
        pkg: PropTypes.shape({
          vendor: PropTypes.shape({
            name: PropTypes.string,
          }),
        }),
        pti: PropTypes.shape({
          platform: PropTypes.shape({
            name: PropTypes.string,
          })
        })
      }),
      reference_object: PropTypes.shape({
        provider: PropTypes.string,
      })
    })
  }

  render() {
    const { resource } = this.props;

    const resourceObject = resource._object ?? resource;

    return (
      resourceObject?.pkg?.vendor?.name ??
      resourceObject?.vendor?.name ??
      resourceObject?.reference_object?.provider ?? // eslint-disable-line camelcase
      null
    );
  }
}
