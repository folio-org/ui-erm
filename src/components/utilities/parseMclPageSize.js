import { defaultMclPageSize } from '../../constants';

export default function parseMclPageSize(settings, mcl) {
  const parsedSettings = JSON.parse(settings?.records?.[0]?.value || '{}');
  return parsedSettings?.pageSize?.[mcl] ?? defaultMclPageSize?.pageSize?.[mcl];
}
