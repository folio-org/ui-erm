import React from 'react';
import { FormattedMessage } from 'react-intl';
import { get } from 'lodash';

import statuses from '../../constants/statuses';

const amendmentWarning = (amendment) => {
  const statusInAgreement = get(amendment, 'statusForThisAgreement');
  const statusInLicense = get(amendment, 'status');
  const { startDate, endDate } = amendment;

  if (statusInAgreement.value === statuses.CURRENT) {
    if (statusInLicense.value === statuses.EXPIRED || statusInLicense.value === statuses.REJECTED) {
      return <FormattedMessage id="ui-agreements.license.warn.amendmentStatus" values={{ status: statusInLicense.label }} />;
    } else if (startDate && new Date(startDate).getTime() > new Date().getTime()) {
      return <FormattedMessage id="ui-agreements.license.warn.amendmentFuture" />;
    } else if (endDate && new Date(endDate).getTime() < new Date().getTime()) {
      return <FormattedMessage id="ui-agreements.license.warn.amendmentPast" />;
    }
  }
  return null;
};

export default {
  amendmentWarning
};
