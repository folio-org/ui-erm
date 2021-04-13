import React from 'react';
import PropTypes from 'prop-types';
import { Card } from '@folio/stripes/components';

import { AppIcon } from '@folio/stripes/core';
import TitleCardInfo from './TitleCardInfo';
import EResourceLink from '../EResourceLink';

const propTypes = {
  headerEnd: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  searchString: PropTypes.string,
  title: PropTypes.object,
};

const TitleCard = ({
  headerEnd,
  searchString = '',
  title,
}) => {
  const titleObject = title._object ?? title;

  return (
    <Card
      cardStyle="positive"
      data-test-title-card
      headerEnd={headerEnd}
      headerStart={(
        <AppIcon app="agreements" iconKey="eresource" size="small">
          <strong data-test-title-instance-name>
            <EResourceLink eresource={title} searchString={searchString} />
          </strong>
        </AppIcon>
        )}
      roundedBorder
    >
      <TitleCardInfo title={titleObject} />
    </Card>
  );
};

TitleCard.propTypes = propTypes;
export default TitleCard;
