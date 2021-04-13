import React from 'react';
import PropTypes from 'prop-types';
import PackageCard from '../PackageCard';
import PackageCardExternal from '../PackageCardExternal';
import TitleCard from '../TitleCard';
import TitleCardExternal from '../TitleCardExternal';

const propTypes = {
  headerEnd: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  resource: PropTypes.object,
};

const isExternal = (resource) => {
  return resource.type === 'external' || resource.type === 'packages' || resource.type === 'resources';
};

const isPackage = (resource) => {
  return (
    resource.class === 'org.olf.kb.Pkg' ||
    resource.reference_object?.type === 'Package' ||
    resource.type === 'packages'
  );
};

const FormEresourceCard = ({
  headerEnd,
  resource,
}) => {
  return (
    <>
      { isExternal(resource) ?
        isPackage(resource) ?
          <PackageCardExternal
            component={PackageCardExternal}
            headerEnd={headerEnd}
            packageData={resource}
          />
          :
          <TitleCardExternal
            component={TitleCardExternal}
            headerEnd={headerEnd}
            title={resource}
          />
        :
        isPackage(resource) ?
          <PackageCard
            component={PackageCard}
            headerEnd={headerEnd}
            pkg={resource}
          />
          :
          <TitleCard
            component={TitleCard}
            headerEnd={headerEnd}
            title={resource}
          />
    }
    </>
  );
};

FormEresourceCard.propTypes = propTypes;
export default FormEresourceCard;
