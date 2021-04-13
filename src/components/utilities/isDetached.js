const DETACHED_TYPE = 'detached';

export default function isDetached(line = {}) {
  return line.type === DETACHED_TYPE;
}
