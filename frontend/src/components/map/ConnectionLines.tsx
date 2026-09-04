const dots = [
  // Detector - amber
  { cx: 425, cy: 355, color: "#f59e0b" },
  { cx: 355, cy: 375, color: "#f59e0b" },
  { cx: 285, cy: 395, color: "#f59e0b" },

  // Task Understanding - cyan
  { cx: 535, cy: 305, color: "#22d3ee" },
  { cx: 565, cy: 250, color: "#22d3ee" },
  { cx: 595, cy: 200, color: "#22d3ee" },

  // Policy - blue
  { cx: 430, cy: 405, color: "#2563eb" },
  { cx: 360, cy: 455, color: "#2563eb" },
  { cx: 295, cy: 500, color: "#2563eb" },

  // Transformation - teal
  { cx: 565, cy: 350, color: "#14b8a6" },
  { cx: 650, cy: 335, color: "#14b8a6" },
  { cx: 720, cy: 325, color: "#14b8a6" },

  // Output Guard - green
  { cx: 505, cy: 410, color: "#22c55e" },
  { cx: 505, cy: 465, color: "#22c55e" },
  { cx: 505, cy: 515, color: "#22c55e" },
];

export default function ConnectionLines() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 1000 700"
      preserveAspectRatio="none"
    >
      {/* Core → Detector */}
      <line
        x1="500"
        y1="364"
        x2="180"
        y2="406"
        stroke="rgba(100,116,139,0.13)"
        strokeWidth="1"
      />

      {/* Core → Task Understanding */}
      <line
        x1="500"
        y1="364"
        x2="600"
        y2="175"
        stroke="rgba(100,116,139,0.13)"
        strokeWidth="1"
      />

      {/* Core → Policy */}
      <line
        x1="500"
        y1="364"
        x2="280"
        y2="532"
        stroke="rgba(100,116,139,0.13)"
        strokeWidth="1"
      />

      {/* Core → Transformation */}
      <line
        x1="500"
        y1="364"
        x2="760"
        y2="322"
        stroke="rgba(100,116,139,0.13)"
        strokeWidth="1"
      />

      {/* Core → Output Guard */}
      <line
        x1="500"
        y1="364"
        x2="500"
        y2="532"
        stroke="rgba(100,116,139,0.13)"
        strokeWidth="1"
      />

      {/* Static colored indicators */}
      {dots.map((dot, index) => (
        <circle
          key={`${dot.cx}-${dot.cy}-${index}`}
          cx={dot.cx}
          cy={dot.cy}
          r="2"
          fill={dot.color}
          opacity="0.8"
          style={{
            filter: `drop-shadow(0 0 2px ${dot.color})`,
          }}
        />
      ))}
    </svg>
  );
}