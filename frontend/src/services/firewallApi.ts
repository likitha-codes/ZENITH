import type { DetectedItem, TransformationAction } from "../types";

export interface FirewallResponse {
  success: boolean;
  sanitizedData: string;
  detectedItems: DetectedItem[];
  aiResponse?: {
    safe: boolean;
    response: string;
  };
}

interface BackendEntity {
  type: string;
  value: string;
}

interface BackendPolicyDecision {
  entityType: string;
  action: TransformationAction;
}

interface BackendResponse {
  transformedPrompt: string;
  detectedEntities: BackendEntity[];
  policyDecisions: BackendPolicyDecision[];
  aiResponse?: {
    safe: boolean;
    response: string;
  };
}

export async function processFirewallRequest(
  input: string
): Promise<FirewallResponse> {
  const response = await fetch(
    "http://localhost:5000/api/firewall/analyze",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: input,
      }),
    }
  );

  if (!response.ok) {
    throw new Error("ZENITH backend request failed");
  }

  const data: BackendResponse = await response.json();

  const detectedItems: DetectedItem[] = data.detectedEntities.map(
    (entity, index) => {
      const decision = data.policyDecisions.find(
        (item) => item.entityType === entity.type
      );

      const action = decision?.action ?? "KEEP";

      return {
        id: `${entity.type}-${index}`,
        label: entity.type,
        original: entity.value,
        action,
        transformed: entity.value,
      };
    }
  );

  return {
    success: true,
    sanitizedData: data.transformedPrompt,
    detectedItems,
    aiResponse: data.aiResponse
      ? {
          safe: data.aiResponse.safe,
          response: data.aiResponse.response,
        }
      : undefined,
  };
}