import { get } from 'lodash';
import statuses from '../../constants/statuses';

export default (linkedLicense, status) => {
  const linkedAmendments = linkedLicense.amendments || [];
  const licenseRecord = linkedLicense.remoteId_object || {};
  const licenseAmendments = licenseRecord.amendments || [];

  // We want /all/ the amendments for the license (including
  // those created after this agreement was last edited),
  // so we have to start from the license record's amendments.
  const amendments = licenseAmendments
    .map(a => {
      // Merge the assigned amendment (containing note/status) with the full amendment record.
      const assignedAmendment = linkedAmendments.find(la => la.amendmentId === a.id) || {};
      return {
        ...a,
        note: assignedAmendment.note,
        statusForThisAgreement: assignedAmendment.status,
      };
    });

  if (status !== undefined) {
    return amendments.filter(a => get(a, 'statusForThisAgreement.value', statuses.UNSET) === status);
  }

  return amendments;
};
