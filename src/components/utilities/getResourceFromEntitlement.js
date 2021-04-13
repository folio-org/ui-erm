import { get } from 'lodash';
import isExternal from './isExternal';
import isDetached from './isDetached';

export default function getResourceFromEntitlement(line = {}) {
  if (isExternal(line) || isDetached(line)) return line;

  const resource = get(line, 'resource._object.pti.titleInstance', line.resource);
  if (resource) return resource;

  return { error: 'getResourceFromEntitlement: Failed to find resource' };
}
