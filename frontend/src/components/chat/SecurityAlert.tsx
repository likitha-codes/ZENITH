import type { DetectedItem } from "../../types";

interface SecurityAlertProps {
  items: DetectedItem[];
}

export default function SecurityAlert({ items }: SecurityAlertProps) {
  if (!items.length) return null;

  return (
    <div className="border border-amber-400/25 bg-amber-400/6 px-4 py-4">
      <div className="flex items-center gap-3">
        <span className="h-3 w-3 rounded-full bg-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.8)]" />

        <p className="text-[9px] font-semibold tracking-[0.13em] text-amber-300">
          SECURITY ALERT // {items.length} SENSITIVE PATTERN
          {items.length > 1 ? "S" : ""} DETECTED
        </p>
      </div>

      <div className="mt-4 space-y-2">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between border-t border-amber-400/10 pt-2 text-[9px]"
          >
            <span className="text-slate-400">{item.label}</span>

            <span className="font-semibold text-amber-300">
              {item.action}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}