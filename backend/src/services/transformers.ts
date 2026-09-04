export type TransformationAction =
  | "KEEP"
  | "REMOVE"
  | "MASK"
  | "GENERALIZE"
  | "DERIVE"
  | "BLOCK";

export function transformValue(
  value: string,
  action: TransformationAction
): string {
  if (action === "REMOVE") {
    return "[REMOVED]";
  }

  if (action === "MASK") {
    return "*".repeat(value.length);
  }

  if (action === "GENERALIZE") {
  const numericValue = Number(value.replace(/,/g, ""));

  if (!Number.isNaN(numericValue)) {
    const lower = Math.floor(numericValue / 50000) * 50000;
    const upper = lower + 50000;

    return `Rs ${lower.toLocaleString("en-IN")}–Rs ${upper.toLocaleString(
      "en-IN"
    )}`;
  }

  return "[GENERALIZED]";
}
  return value;
}