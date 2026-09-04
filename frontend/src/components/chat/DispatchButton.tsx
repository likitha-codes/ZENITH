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
      className="h-10 min-w-20 self-center rounded-md border border-slate-400/70 bg-slate-200 px-4 text-[8px] font-bold tracking-[0.13em] text-black shadow-[0_0_10px_rgba(255,255,255,0.12)] transition hover:border-white hover:bg-white hover:shadow-[0_0_14px_rgba(255,255,255,0.2)] disabled:cursor-not-allowed disabled:opacity-30"
    >
      {loading ? "..." : "SEND"}
    </button>
  );
}