export default function formatNoteReferrerEntityData(data) {
  if (data) {
    const {
      entityName: name,
      entityType: type,
      entityId: id,
    } = data;

    return {
      name,
      type,
      id,
    };
  }

  return false;
}
