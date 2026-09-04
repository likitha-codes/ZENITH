export interface NecessityResult {
  entityType: string;
  necessary: boolean;
}

export function checkNecessity(
  entityType: string,
  requiredData: string[]
): NecessityResult {
  const normalizedType = entityType.toLowerCase();

  const necessary = requiredData.some(
    (data) => data.toLowerCase() === normalizedType
  );

  return {
    entityType,
    necessary,
  };
}