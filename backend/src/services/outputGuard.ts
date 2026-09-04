import { detectSensitiveData } from "./detector";

export function guardOutput(response: string) {
  const detected = detectSensitiveData(response);

  return {
    safe: detected.length === 0,
    detected,
    response,
  };
}