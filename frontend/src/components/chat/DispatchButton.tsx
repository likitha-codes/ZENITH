interface DispatchButtonProps {
  loading: boolean;
  disabled: boolean;
  onClick: () => void;
}

export default function DispatchButton({
  loading,
  disabled,
  onClick,
}: DispatchButtonProps) {
  return (
    <button
      type="button"
      disabled={disabled || loading}
      onClick={onClick}
      className="min-w-22 rounded-xl border border-cyan-300/45 bg-cyan-400 px-4 py-3 text-[8px] font-bold tracking-[0.13em] text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-40"
    >
      {loading ? "..." : "SEND"}
    </button>
  );
}