export interface AuditLog {
  timestamp: Date;
  task: string;
  detectedTypes: string[];
  policyActions: string[];
  blocked: boolean;
  safe: boolean;
}

export function createAuditLog(
  task: string,
  detectedTypes: string[],
  policyActions: string[],
  blocked: boolean,
  safe: boolean
): AuditLog {
  return {
    timestamp: new Date(),
    task,
    detectedTypes,
    policyActions,
    blocked,
    safe,
  };
}