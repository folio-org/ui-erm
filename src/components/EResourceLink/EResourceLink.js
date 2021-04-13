import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { NoValue } from '@folio/stripes/components';
import { isExternal, urls } from '../utilities';

class EResourceLink extends React.Component {
  static propTypes = {
    eresource: PropTypes.shape({
      authority: PropTypes.string,
      id: PropTypes.string,
      name: PropTypes.string,
      reference: PropTypes.string,
    }).isRequired,
    searchString: PropTypes.string,
  }

  getName = (eresource) => {
    if (isExternal(eresource)) {
      return eresource.reference_object.label;
    }

    const pti = eresource?._object?.pti ?? eresource?.pti;
    const name = pti?.titleInstance?.name ?? eresource.name;

    return name;
  }

  getPath = (eresource) => {
    const { authority, reference } = eresource;

    if (authority === 'EKB-PACKAGE') return urls.eholdingsPackageView(reference);
    if (authority === 'EKB-TITLE') return urls.eholdingsResourceView(reference);

    const pti = eresource?._object?.pti ?? eresource?.pti;
    const id = pti?.titleInstance?.id ?? eresource.id;

    return id ? urls.eresourceView(id) : undefined;
  }

  render() {
    const { eresource, searchString = '', ...rest } = this.props;

    const name = this.getName(eresource);
    const path = this.getPath(eresource);
    if (!path) return name || <NoValue />;

    return (
      <Link {...rest} data-test-eresource-name to={`${this.getPath(eresource)}${searchString}`}>
        {name}
      </Link>
    );
  }
}

export default EResourceLink;
