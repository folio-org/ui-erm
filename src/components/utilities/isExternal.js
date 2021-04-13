const EXTERNAL_TYPE = 'external';

export default function isExternal(line) {
  return line.type === EXTERNAL_TYPE;
}
