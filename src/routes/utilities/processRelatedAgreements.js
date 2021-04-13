import { agreementRelationshipTypes } from '../../constants';

const identicalRelations = [];
agreementRelationshipTypes.forEach((type) => {
  if (type.outward.label === type.inward.label) {
    identicalRelations.push(type.type);
  }
});

const isOutwardRelationship = type => !!(agreementRelationshipTypes.find(t => t.outward.value === type));

const isInwardRelationship = type => !!(agreementRelationshipTypes.find(t => t.inward.value === type));

const getCorrespondingInwardValue = outwardValue => {
  const relationship = agreementRelationshipTypes.find(t => t.outward.value === outwardValue);
  if (identicalRelations.includes(relationship.type)) {
    return relationship.outward.value;
  }
  return relationship ? relationship.inward.value : undefined;
};

const getCorrespondingOutwardValue = (inwardValue, relationshipTypeValues) => {
  const relationship = agreementRelationshipTypes.find(t => t.inward.value === inwardValue);
  return relationship ? relationshipTypeValues.filter(rt => rt.value === relationship.outward.value)?.[0]?.id : undefined;
};

export function splitRelatedAgreements(agreement, relationshipTypeValues) {
  const {
    inwardRelationships = [],
    relatedAgreements = [],
    outwardRelationships = [],
  } = agreement;

  const outward = relatedAgreements
    .filter(r => {
      if (r.type) return isOutwardRelationship(r.type);

      // Else, there's no `type` so we're deleting this relationship.
      // We need to figure out whether it was originally in `outward` or `inwardRelationships`.
      return !!(outwardRelationships.find(or => or.id === r.id));
    })
    .map(({ agreement:a, type, ...rest }) => ({
      ...rest,
      inward: a ? a.id : undefined,
      type: relationshipTypeValues.filter(rt => rt.value === type)?.[0]?.id
    }));

  const inward = relatedAgreements
    .filter(r => {
      if (r.type) return isInwardRelationship(r.type);

      // Else, there's no `type` so we're deleting this relationship.
      // We need to figure out whether it was originally in `outward` or `inwardRelationships`.
      return !!(inwardRelationships.find(or => or.id === r.id));
    })
    .map(({ agreement:a, type, ...rest }) => ({
      ...rest,
      outward: a ? a.id : undefined,
      type: getCorrespondingOutwardValue(type, relationshipTypeValues),
    }));

  if (outward) agreement.outwardRelationships = outward;
  if (inward) agreement.inwardRelationships = inward;
}

export function joinRelatedAgreements(agreement) {
  const { inwardRelationships = [], outwardRelationships = [] } = agreement;

  const relatedAgreements = [
    ...inwardRelationships
      .map(({ inward:_, outward, type, ...rest }) => ({
        ...rest,
        agreement: outward,
        type: getCorrespondingInwardValue(type.value),
      })),
    ...outwardRelationships
      .map(({ inward, outward:_, type, ...rest }) => ({
        ...rest,
        agreement: inward,
        type: type.value,
      })),
  ];

  agreement.relatedAgreements = relatedAgreements;
}
