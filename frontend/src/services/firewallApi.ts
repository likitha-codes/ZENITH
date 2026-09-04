import { mockDetectedItems } from "../data/mockChat";
import type { DetectedItem } from "../types";

export interface FirewallResponse {
  success: boolean;
  sanitizedData: string;
  detectedItems: DetectedItem[];
}

export async function processFirewallRequest(
  input: string
): Promise<FirewallResponse> {
  /*
    BACKEND INTEGRATION POINT

    Replace the mock delay and response below with:

    const response = await fetch("YOUR_BACKEND_URL", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: input,
      }),
    });

    return response.json();
  */

  await new Promise((resolve) => setTimeout(resolve, 1800));

  return {
    success: true,
    sanitizedData: input
      .replace(/\b\d{10}\b/g, "**********")
      .replace(
        /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi,
        "[MASKED_EMAIL]"
      ),
    detectedItems: mockDetectedItems,
  };
}