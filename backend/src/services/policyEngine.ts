export type PolicyAction =
  | "KEEP"
  | "REMOVE"
  | "MASK"
  | "GENERALIZE"
  | "DERIVE"
  | "BLOCK";

export interface PolicyDecision {
  entityType: string;
  action: PolicyAction;
}

export function decidePolicy(
  entityType: string,
  necessary: boolean
): PolicyDecision {
  if (entityType === "PAN") {
    return {
      entityType,
      action: "BLOCK",
    };
  }

  if (entityType === "PHONE") {
    return {
      entityType,
      action: "MASK",
    };
  }

  if (!necessary) {
    return {
      entityType,
      action: "REMOVE",
    };
  }

  if (entityType === "INCOME" || entityType === "BALANCE") {
    return {
      entityType,
      action: "GENERALIZE",
    };
  }

  return {
    entityType,
    action: "KEEP",
  };
}
 