const dots = [
  { cx: 382, cy: 270, color: "#f59e0b", delay: "0s" },
  { cx: 330, cy: 238, color: "#f59e0b", delay: "0.7s" },

  { cx: 610, cy: 255, color: "#22d3ee", delay: "0.2s" },
  { cx: 665, cy: 215, color: "#22d3ee", delay: "1s" },

  { cx: 382, cy: 432, color: "#2563eb", delay: "0.4s" },
  { cx: 318, cy: 482, color: "#2563eb", delay: "1.2s" },

  { cx: 610, cy: 415, color: "#14b8a6", delay: "0.6s" },
  { cx: 675, cy: 455, color: "#14b8a6", delay: "1.4s" },

  { cx: 485, cy: 475, color: "#22c55e", delay: "0.3s" },
  { cx: 515, cy: 555, color: "#22c55e", delay: "1.1s" },
];

export default function ConnectionLines() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 1000 700"
      preserveAspectRatio="none"
    >
      <line
        x1="510"
        y1="357"
        x2="215"
        y2="205"
        stroke="rgba(100,116,139,0.38)"
        strokeWidth="1"
      />

      <line
        x1="510"
        y1="357"
        x2="760"
        y2="170"
        stroke="rgba(100,116,139,0.38)"
        strokeWidth="1"
      />

      <line
        x1="510"
        y1="357"
        x2="180"
        y2="485"
        stroke="rgba(100,116,139,0.38)"
        strokeWidth="1"
      />

      <line
        x1="510"
        y1="357"
        x2="790"
        y2="430"
        stroke="rgba(100,116,139,0.38)"
        strokeWidth="1"
      />

      <line
        x1="510"
        y1="357"
        x2="560"
        y2="595"
        stroke="rgba(100,116,139,0.38)"
        strokeWidth="1"
      />

      {dots.map((dot, index) => (
        <circle
          key={`${dot.cx}-${dot.cy}-${index}`}
          cx={dot.cx}
          cy={dot.cy}
          r="2.8"
          fill={dot.color}
          opacity="0.75"
          style={{
            animation: `processing-dot-pulse 3.2s ease-in-out ${dot.delay} infinite`,
            transformOrigin: `${dot.cx}px ${dot.cy}px`,
          }}
        />
      ))}
    </svg>
  );
}