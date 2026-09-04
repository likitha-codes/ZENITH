import type { Agent } from "../types";

export const agents: Agent[] = [
  {
    id: "detector",
    number: "AGENT_01",
    moduleIdentifier: "MOD_SSD_01",
    title: "Sensitive Data Detector",
    subtitle:
      "Scans incoming information and identifies sensitive data before it moves deeper into the system.",
    accent: "#f59e0b",
    accentRgb: "245, 158, 11",
    icon: "scan",
    stats: [
      {
        label: "SCAN RATE",
        value: "4.2 GB/S",
      },
      {
        label: "SET PATTERNS",
        value: "142 ACTIVE",
      },
    ],
  },
  {
    id: "task",
    number: "AGENT_02",
    moduleIdentifier: "MOD_TSK_02",
    title: "Task Understanding",
    subtitle:
      "Understands the request and determines what information is actually necessary for the task.",
    accent: "#22d3ee",
    accentRgb: "34, 211, 238",
    icon: "brain",
    stats: [
      {
        label: "INTENT RESOLUTION",
        value: "98.4% NOMINAL",
      },
      {
        label: "REDUNDANT DATA FILTERED",
        value: "34.8% AVG",
      },
    ],
  },
  {
    id: "policy",
    number: "AGENT_03",
    moduleIdentifier: "MOD_POL_03",
    title: "Deterministic Policy Engine",
    subtitle:
      "Applies deterministic rules to decide how each detected field should be handled.",
    accent: "#2563eb",
    accentRgb: "37, 99, 235",
    icon: "shield",
    stats: [
      {
        label: "POLICY ACTIONS",
        value: "6 ACTIVE",
      },
      {
        label: "RULE STATUS",
        value: "ENFORCED",
      },
    ],
  },
  {
    id: "transformation",
    number: "AGENT_04",
    moduleIdentifier: "MOD_TRN_04",
    title: "Transformation Engine",
    subtitle:
      "Transforms information using precise actions while preserving only what is required.",
    accent: "#14b8a6",
    accentRgb: "20, 184, 166",
    icon: "transform",
    stats: [
      {
        label: "TRANSFORMATIONS",
        value: "6 CORE NODES",
      },
      {
        label: "EXECUTION TIME",
        value: "< 0.12 MS",
      },
    ],
  },
  {
    id: "output",
    number: "AGENT_05",
    moduleIdentifier: "MOD_GRD_05",
    title: "Output Guard",
    subtitle:
      "Performs a final inspection before the processed information is returned to the user.",
    accent: "#22c55e",
    accentRgb: "34, 197, 94",
    icon: "guard",
    stats: [
      {
        label: "LEAK PREVENTION",
        value: "100% SECURE",
      },
      {
        label: "FINAL GUARD",
        value: "STANDBY ACTIVE",
      },
    ],
  },
];

export const getAgentById = (id: string) =>
  agents.find((agent) => agent.id === id);