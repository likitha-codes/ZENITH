import { Navigate, useParams } from "react-router-dom";
import { getAgentById } from "../data/agents";
import SystemHeader from "../components/layout/SystemHeader";
import SystemTelemetry from "../components/layout/SystemTelemetry";
import AgentIcon from "../components/agent/AgentIcon";

export default function AgentPage() {
  const { agentId } = useParams();

  const agent = getAgentById(agentId ?? "");

  if (!agent) {
    return <Navigate to="/" replace />;
  }

  return (
    <main className="zenith-screen">
      <div className="system-frame" />

      <SystemHeader moduleIdentifier={agent.moduleIdentifier} />

      <section className="relative flex min-h-screen items-center justify-center px-6">
        <div
          className="absolute h-125 w-125 rounded-full opacity-20 blur-3xl"
          style={{
            background: `radial-gradient(circle, rgba(${agent.accentRgb},0.18), transparent 65%)`,
          }}
        />

        <div className="focus-in relative z-10 w-full max-w-3xl text-center">
          <div className="relative mx-auto mb-10 flex h-28 w-28 items-center justify-center">
            <div
              className="pulse-ring absolute h-24 w-24 rounded-full border"
              style={{
                borderColor: `rgba(${agent.accentRgb},0.35)`,
              }}
            />

            <div
              className="absolute h-24 w-24 rounded-full border"
              style={{
                borderColor: `rgba(${agent.accentRgb},0.2)`,
              }}
            />

            <div
              className="agent-glow flex h-16 w-16 items-center justify-center rounded-2xl border"
              style={{
                color: agent.accent,
                borderColor: `rgba(${agent.accentRgb},0.65)`,
                backgroundColor: `rgba(${agent.accentRgb},0.08)`,
              }}
            >
              <AgentIcon type={agent.icon} />
            </div>
          </div>

          <p
            className="text-[10px] font-semibold tracking-[0.2em]"
            style={{
              color: agent.accent,
            }}
          >
            {agent.number} // PROCESSING
          </p>

          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-100 md:text-5xl">
            {agent.title}
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-slate-400 md:text-base">
            {agent.subtitle}
          </p>

          <div className="mt-12 flex justify-center gap-16">
            {agent.stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-[8px] tracking-[0.15em] text-slate-600">
                  {stat.label}
                </p>

                <p
                  className="mt-2 text-[11px] font-semibold tracking-[0.08em]"
                  style={{
                    color: agent.accent,
                  }}
                >
                  {stat.value}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 flex items-center justify-center gap-3">
            <span
              className="h-2 w-2 rounded-full"
              style={{
                backgroundColor: agent.accent,
                boxShadow: `0 0 10px ${agent.accent}`,
              }}
            />

            <span className="text-[9px] tracking-[0.16em] text-slate-500">
              AGENT EXECUTION IN PROGRESS
            </span>
          </div>
        </div>
      </section>

      <SystemTelemetry
        text={`${agent.title.toUpperCase()} // VERIFICATION_OK`}
      />
    </main>
  );
}