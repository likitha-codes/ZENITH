export type SensitiveEntityType =
  | "EMAIL"
  | "PHONE"
  | "PAN"
  | "INCOME"
  | "BALANCE";

export interface DetectedEntity {
  type: SensitiveEntityType;
  value: string;
}

const patterns: Record<SensitiveEntityType, RegExp> = {
  EMAIL: /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi,

  PHONE: /\b(?:\+91[-\s]?)?[6-9]\d{9}\b/g,

  PAN: /\b[A-Z]{5}[0-9]{4}[A-Z]\b/g,

  INCOME:
  /\b(?:income|salary)\s*(?:is|:)?\s*(?:Rs\.?|INR)?\s*([\d,]+(?:\.\d+)?)\b/gi,

BALANCE:
  /\b(?:balance|account balance)\s*(?:is|:)?\s*(?:Rs\.?|INR)?\s*([\d,]+(?:\.\d+)?)\b/gi,
};

export function detectSensitiveData(text: string): DetectedEntity[] {
  const entities: DetectedEntity[] = [];

  for (const [type, pattern] of Object.entries(patterns)) {
    let match: RegExpExecArray | null;

    while ((match = pattern.exec(text)) !== null) {
      const value =
        type === "INCOME" || type === "BALANCE"
          ? match[1]
          : match[0];

      entities.push({
        type: type as SensitiveEntityType,
        value,
      });
    }
  }

  return entities;
}