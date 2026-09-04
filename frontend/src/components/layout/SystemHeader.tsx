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
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate("/")}
          className="border border-cyan-400/30 bg-cyan-400/3 px-2 py-1.5 text-[7px] tracking-[0.14em] text-cyan-300 transition hover:bg-cyan-400/8"
        >
          RETURN // SYS_MAP
        </button>

        <div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-sm bg-cyan-400" />

            <span className="text-[10px] font-semibold tracking-wide text-slate-200">
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

        <p className="mt-1 text-[9px] tracking-[0.12em] text-cyan-400">
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