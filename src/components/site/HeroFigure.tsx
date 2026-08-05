export function HeroFigure() {
  return (
    <svg
      viewBox="0 0 640 520"
      role="img"
      aria-label="Абстрактная схема: архитектурная сетка и слои данных"
      className="h-auto w-full"
    >
      <defs>
        <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
          <path d="M32 0H0v32" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-border" />
        </pattern>
      </defs>

      <rect x="0" y="0" width="640" height="520" fill="url(#grid)" />

      {/* topographic layers */}
      <g fill="none" stroke="currentColor" className="text-primary">
        <path d="M40 400C140 330 200 380 300 320S470 240 600 300" strokeWidth="1" opacity="0.25" />
        <path d="M40 360C140 290 200 340 300 280S470 200 600 260" strokeWidth="1" opacity="0.35" />
        <path d="M40 320C140 250 200 300 300 240S470 160 600 220" strokeWidth="1.25" opacity="0.5" />
      </g>

      {/* geometric layers */}
      <g className="text-primary">
        <rect x="96" y="96" width="336" height="176" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.35" />
        <rect x="160" y="140" width="336" height="176" fill="none" stroke="currentColor" strokeWidth="1.25" opacity="0.6" />
        <rect x="224" y="184" width="336" height="176" fill="none" stroke="currentColor" strokeWidth="1.5" />
      </g>

      {/* data network */}
      <g className="text-primary">
        {[
          [160, 140],
          [496, 140],
          [224, 184],
          [560, 360],
          [224, 360],
          [392, 272],
        ].map(([cx, cy]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="4" fill="currentColor" />
        ))}
        <path
          d="M160 140L392 272L496 140M224 184L392 272L560 360M224 360L392 272"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.75"
          opacity="0.5"
        />
      </g>

      {/* blueprint ticks */}
      <g stroke="currentColor" strokeWidth="1" className="text-border">
        <path d="M96 440h464" />
        {[96, 212, 328, 444, 560].map((x) => (
          <path key={x} d={`M${x} 432v16`} />
        ))}
      </g>
    </svg>
  );
}
