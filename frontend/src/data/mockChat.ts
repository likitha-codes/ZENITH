import type { ChatMessage, DetectedItem } from "../types";

export const initialMessages: ChatMessage[] = [
  {
    id: "system-1",
    role: "system",
    content: "ZENITH secure processing tunnel established.",
    timestamp: "14:48:12",
  },
];

export const mockDetectedItems: DetectedItem[] = [
  {
    id: "1",
    label: "PHONE NUMBER",
    original: "+91 98765 43210",
    action: "MASK",
    transformed: "+91 ******3210",
  },
  {
    id: "2",
    label: "EMAIL ADDRESS",
    original: "nandana@example.com",
    action: "MASK",
    transformed: "n******@example.com",
  },
  {
    id: "3",
    label: "ACCOUNT REFERENCE",
    original: "ACCT-829174-XY",
    action: "DERIVE",
    transformed: "VERIFIED_ACCOUNT_REFERENCE",
  },
];