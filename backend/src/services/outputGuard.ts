import { detectSensitiveData } from "./detector";

export function guardOutput(response: string) {
  const detected = detectSensitiveData(response);

  if (detected.length > 0) {
    return {
      safe: false,
      detected,
      response: "[RESPONSE BLOCKED // SENSITIVE DATA DETECTED]",
    };
  }

  return {
    safe: true,
    detected: [],
    response,
  };
}