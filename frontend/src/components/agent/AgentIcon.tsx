import type { Agent } from "../../types";

interface AgentIconProps {
  type: Agent["icon"];
}

export default function AgentIcon({ type }: AgentIconProps) {
  const commonProps = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
  };

  if (type === "scan") {
    return (
      <svg {...commonProps} className="h-6 w-6">
        <circle cx="10" cy="10" r="5" />
        <path d="m14 14 6 6" />
        <path d="M10 7v6M7 10h6" />
      </svg>
    );
  }

  if (type === "brain") {
    return (
      <svg {...commonProps} className="h-6 w-6">
        <path d="M9 4a3 3 0 0 0-5 2.2A3.5 3.5 0 0 0 5 13v1a3 3 0 0 0 5 2" />
        <path d="M15 4a3 3 0 0 1 5 2.2A3.5 3.5 0 0 1 19 13v1a3 3 0 0 1-5 2" />
        <path d="M12 3v18" />
      </svg>
    );
  }

  if (type === "shield") {
    return (
      <svg {...commonProps} className="h-6 w-6">
        <path d="M12 3 19 6v5c0 4.5-3 7.6-7 10-4-2.4-7-5.5-7-10V6l7-3Z" />
      </svg>
    );
  }

  if (type === "transform") {
    return (
      <svg {...commonProps} className="h-6 w-6">
        <rect x="5" y="5" width="14" height="14" rx="3" />
        <path d="M8 12h8M14 8l4 4-4 4" />
      </svg>
    );
  }

  return (
    <svg {...commonProps} className="h-6 w-6">
      <path d="M12 3v18" />
      <path d="M5 12h14" />
      <circle cx="12" cy="12" r="8" />
    </svg>
  );
}