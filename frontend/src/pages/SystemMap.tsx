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

        <div className="absolute left-[51%] top-[51%] z-10 -translate-x-1/2 -translate-y-1/2">
          <FirewallCore />
        </div>

        <AgentNode agent={agents[0]} x="21%" y="29%" />
        <AgentNode agent={agents[1]} x="76%" y="24%" />
        <AgentNode agent={agents[2]} x="18%" y="69%" />
        <AgentNode agent={agents[3]} x="79%" y="61%" />
        <AgentNode agent={agents[4]} x="56%" y="85%" />

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