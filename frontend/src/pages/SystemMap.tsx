import { agents } from "../data/agents";
import SystemHeader from "../components/layout/SystemHeader";
import SystemTelemetry from "../components/layout/SystemTelemetry";
import FirewallCore from "../components/map/FirewallCore";
import AgentNode from "../components/map/AgentNode";
import ConnectionLines from "../components/map/ConnectionLines";

export default function SystemMap() {
  return (
    <main className="zenith-screen">
      <div className="system-frame" />

      <SystemHeader moduleIdentifier="SYS_MAP_00" />

      <section className="relative flex min-h-screen items-center justify-center">
        <ConnectionLines />

        {/* ZENITH CORE */}
        <div className="absolute left-[50%] top-[52%] z-10 -translate-x-1/2 -translate-y-1/2">
          <FirewallCore />
        </div>

        {/* SENSITIVE DATA DETECTOR */}
        <AgentNode
          agent={agents[0]}
          x="18%"
          y="58%"
        />

        {/* TASK UNDERSTANDING */}
        <AgentNode
          agent={agents[1]}
          x="60%"
          y="25%"
        />

        {/* DETERMINISTIC POLICY ENGINE */}
        <AgentNode
          agent={agents[2]}
          x="28%"
          y="76%"
        />

        {/* TRANSFORMATION ENGINE */}
        <AgentNode
          agent={agents[3]}
          x="76%"
          y="46%"
        />

        {/* OUTPUT GUARD */}
        <AgentNode
          agent={agents[4]}
          x="50%"
          y="76%"
        />

        {/* LIVE AGENT EXECUTION STREAM */}
        <div className="absolute bottom-28 left-12 max-w-xs max-md:hidden">
          <p className="text-[8px] tracking-[0.15em] text-slate-600">
            LIVE AGENT EXECUTION STREAM
          </p>

          <div className="mt-3 space-y-1 text-[8px] text-cyan-400/60">
            <p>14:27:01 // INPUT CHANNEL READY</p>
            <p>14:27:02 // POLICY ENGINE SYNCED</p>
            <p>14:27:03 // OUTPUT GUARD STANDBY</p>
          </div>
        </div>

        {/* REALTIME FIREWALL PERFORMANCE */}
        <div className="absolute bottom-28 right-12 text-right max-md:hidden">
          <p className="text-[8px] tracking-[0.15em] text-slate-600">
            REALTIME FIREWALL PERFORMANCE
          </p>

          <div className="mt-3 flex justify-end gap-4 text-[9px]">
            <span className="text-cyan-400">UPTIME 99.9%</span>
            <span className="text-emerald-400">SECURE</span>
          </div>
        </div>
      </section>

      <SystemTelemetry text="SYSTEM_MAP // ALL AGENTS CONNECTED" />
    </main>
  );
}