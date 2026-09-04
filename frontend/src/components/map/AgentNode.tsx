import { useNavigate } from "react-router-dom";
import type { Agent } from "../../types";
import AgentIcon from "../agent/AgentIcon";

interface AgentNodeProps {
  agent: Agent;
  x: string;
  y: string;
  active?: boolean;
}

export default function AgentNode({
  agent,
  x,
  y,
  active = false,
}: AgentNodeProps) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(`/agent/${agent.id}`)}
      className="group absolute z-10 -translate-x-1/2 -translate-y-1/2 text-left"
      style={{
        left: x,
        top: y,
      }}
    >
      <div className="flex items-center gap-3">
        <div
          className={`relative flex h-12 w-12 items-center justify-center rounded-full border transition duration-300 ${
            active ? "scale-110" : "group-hover:scale-110"
          }`}
          style={{
            color: agent.accent,
            borderColor: `${agent.accent}99`,
            backgroundColor: `rgba(${agent.accentRgb}, 0.08)`,
            boxShadow: `0 0 22px rgba(${agent.accentRgb}, 0.16)`,
          }}
        >
          <span
            className="absolute -inset-1.75 rounded-full border opacity-0 transition group-hover:opacity-100"
            style={{
              borderColor: `${agent.accent}55`,
            }}
          />

          <AgentIcon type={agent.icon} />
        </div>

        <div className="whitespace-nowrap">
          <p
            className="text-[9px] font-semibold tracking-[0.12em]"
            style={{
              color: agent.accent,
            }}
          >
            {agent.title.toUpperCase()}
          </p>

          <p className="mt-1 text-[7px] tracking-widest text-slate-600">
            MODULE // ACTIVE
          </p>
        </div>
      </div>
    </button>
  );
}