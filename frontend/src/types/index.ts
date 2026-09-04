export type TransformationAction =
  | "KEEP"
  | "REMOVE"
  | "MASK"
  | "GENERALIZE"
  | "DERIVE"
  | "BLOCK";

export type AgentId =
  | "detector"
  | "task"
  | "policy"
  | "transformation"
  | "output";

export interface AgentStat {
  label: string;
  value: string;
}

export interface Agent {
  id: AgentId;
  number: string;
  moduleIdentifier: string;
  title: string;
  subtitle: string;
  accent: string;
  accentRgb: string;
  icon: "scan" | "brain" | "shield" | "transform" | "guard";
  stats: AgentStat[];
}

export interface ChatMessage {
  id: string;
  role: "user" | "system" | "assistant";
  content: string;
  timestamp?: string;
}

export interface DetectedItem {
  id: string;
  label: string;
  original: string;
  action: TransformationAction;
  transformed: string;
}