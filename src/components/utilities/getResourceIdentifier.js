export default function (eresource = {}, type) {
  const identifiers = eresource?.identifiers || [];
  // find first identifiers value of namespace 'type'
  const value = identifiers.find(i => i.identifier?.ns.value === type)?.identifier?.value;

  return value;
}
