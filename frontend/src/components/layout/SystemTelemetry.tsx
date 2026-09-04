interface SystemTelemetryProps {
  text?: string;
}

export default function SystemTelemetry({
  text = "SECURE_TUNNEL_ESTABLISHED",
}: SystemTelemetryProps) {
  return (
    <div className="absolute bottom-10 left-12 right-12 z-20 flex items-center justify-between border-t border-cyan-400/10 pt-4 max-md:left-6 max-md:right-6 max-md:bottom-6">
      <div className="flex gap-5 text-[8px] tracking-[0.12em]">
        <span className="text-slate-600">SYSTEM TELEMETRY</span>

        <span className="text-cyan-400/70">[{text}]</span>
      </div>

      <div className="flex items-center gap-2 text-[8px] tracking-[0.14em] text-slate-500">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(34,197,94,0.8)]" />

        ALL SYSTEMS NOMINAL
      </div>
    </div>
  );
}