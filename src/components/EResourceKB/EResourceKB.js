import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import { isPackage } from '@folio/stripes-erm-components';
import { NoValue } from '@folio/stripes/components';

export default class EResourceKB extends React.Component {
  static propTypes = {
    resource: PropTypes.shape({
      class: PropTypes.string,
      _object: PropTypes.shape({
        pkg: PropTypes.shape({
          remoteKb: PropTypes.shape({
            name: PropTypes.string,
          })
        }),
        remoteKb: PropTypes.shape({
          name: PropTypes.string,
        }),
      })
    })
  }

  render() {
    const { resource } = this.props;
    if (isEmpty(resource)) return <NoValue />;

    if (isPackage(resource)) {
      return resource?._object?.remoteKb?.name ?? <NoValue />;
    }

    return resource?._object?.pkg?.remoteKb?.name ?? <NoValue />;
  }
}
