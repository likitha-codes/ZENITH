import { useNavigate } from "react-router-dom";

export default function FirewallCore() {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={() => navigate("/chat")}
      className="group relative flex h-44 w-44 items-center justify-center"
      aria-label="Open ZENITH secure session"
    >
      <div className="pulse-ring absolute h-28 w-28 rounded-full border border-cyan-400/25" />

      <div className="absolute h-28 w-28 rounded-full border border-cyan-400/12 transition group-hover:border-cyan-400/30" />

      <div className="absolute h-20 w-20 rounded-full border border-cyan-400/25 shadow-[0_0_30px_rgba(34,211,238,0.08)] transition group-hover:scale-105 group-hover:border-cyan-400/50" />

      <div className="agent-glow relative z-10 flex h-14 w-14 items-center justify-center rounded-full border border-cyan-300/55 bg-cyan-400/[0.08] text-cyan-300 transition duration-300 group-hover:scale-110 group-hover:bg-cyan-400/[0.14]">
        <svg
          viewBox="0 0 24 24"
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
        >
          <path d="M12 3 19 6v5c0 4.5-3 7.6-7 10-4-2.4-7-5.5-7-10V6l7-3Z" />
          <path d="M9.5 12.2 11.2 14l3.6-4" />
        </svg>
      </div>

      <div className="absolute -bottom-4 whitespace-nowrap text-center">
        <p className="text-[10px] font-semibold tracking-[0.12em] text-slate-200">
          ZENITH CORE
        </p>

        <p className="mt-1 text-[8px] tracking-[0.12em] text-cyan-400/70">
          CLICK TO INITIALIZE
        </p>
      </div>
    </button>
  );
}