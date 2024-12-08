type MappingItem = { id: string; name: string };

const mapIdsToNames = (ids: string[], mappingArray: MappingItem[]): string[] => {
  const idToNameMap = new Map(mappingArray.map((item) => [item.id, item.name]));
  return ids.map((id) => idToNameMap.get(id) || 'Unknown');
};

export default mapIdsToNames;
