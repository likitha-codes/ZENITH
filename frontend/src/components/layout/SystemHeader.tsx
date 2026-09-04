import { useNavigate } from "react-router-dom";

interface SystemHeaderProps {
  moduleIdentifier?: string;
}

export default function SystemHeader({
  moduleIdentifier = "SYS_MAP_00",
}: SystemHeaderProps) {
  const navigate = useNavigate();

  return (
    <header className="absolute left-0 right-0 top-0 z-20 flex items-start justify-between px-7 py-6 max-md:px-5 max-md:py-5">

      <div className="flex items-center gap-3">

        <button
          onClick={() => navigate("/")}
          className="border border-slate-500/50 bg-white/[0.025] px-2 py-1 text-[6px] font-medium tracking-[0.13em] text-slate-200 shadow-[0_0_8px_rgba(255,255,255,0.08)] transition hover:border-slate-300/70 hover:bg-white/[0.06] hover:text-white"
        >
          RETURN // SYS_MAP
        </button>

        <div>
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-sm bg-slate-200 shadow-[0_0_7px_rgba(255,255,255,0.65)]" />

            <span className="text-[10px] font-semibold tracking-wide text-slate-100">
              ZENITH
            </span>
          </div>

          <p className="mt-1 text-[7px] tracking-[0.12em] text-slate-500">
            STATUS: ACTIVE_NODE // SECURE_TUNNEL_ESTABLISHED
          </p>
        </div>
      </div>

      <div className="hidden text-center md:block">
        <p className="text-[7px] tracking-[0.18em] text-slate-600">
          AGENT_MODULE_IDENTIFIER
        </p>

        <p className="mt-1 text-[9px] tracking-[0.12em] text-slate-200">
          {moduleIdentifier}
        </p>
      </div>

      <div className="flex gap-5 text-right max-md:hidden">
        <div>
          <p className="text-[7px] tracking-[0.15em] text-slate-600">
            PROXY LOAD
          </p>

          <p className="mt-1 text-[9px] text-slate-300">
            0.04 MS
          </p>
        </div>

        <div>
          <p className="text-[7px] tracking-[0.15em] text-slate-600">
            SYSTEM INTEGRITY
          </p>

          <p className="mt-1 text-[9px] text-emerald-400">
            99.98%
          </p>
        </div>
      </div>

    </header>
  );
}