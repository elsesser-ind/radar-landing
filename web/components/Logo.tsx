import clsx from "clsx";

/**
 * Radar logo: два небоскрёба в cabinet-проекции, объём через сплошные
 * боковые и верхние грани. Два цвета: белый фон + petrol #00736c.
 *
 * Variants:
 *  - mark   — только знак (топ-бары, bot-avatar)
 *  - full   — знак + подпись RADAR + BY ELSESSER & CO.
 */
export function Logo({
  variant = "mark",
  size = 40,
  className,
}: {
  variant?: "mark" | "full";
  size?: number;
  className?: string;
}) {
  const leftCols = [146, 172, 198, 224];
  const leftRows = [192, 220, 248, 276, 304, 332];
  const rightCols = [316, 342, 368];
  const rightRows = [130, 158, 186, 214, 242, 270, 298, 326];

  return (
    <svg
      viewBox="0 0 512 512"
      width={size}
      height={size}
      className={clsx(className)}
      role="img"
      aria-label="Radar"
    >
      <circle cx="256" cy="256" r="256" fill="#ffffff" />

      {/* Правое здание */}
      <polygon points="300,108 395,108 430,86 335,86" fill="#00736c" />
      <polygon points="395,108 395,360 430,338 430,86" fill="#00736c" />
      <rect
        x="300"
        y="108"
        width="95"
        height="252"
        fill="#ffffff"
        stroke="#00736c"
        strokeWidth="6"
        strokeLinejoin="round"
      />

      {/* Левое здание */}
      <polygon points="128,172 256,172 291,150 163,150" fill="#00736c" />
      <polygon points="256,172 256,360 291,338 291,150" fill="#00736c" />
      <rect
        x="128"
        y="172"
        width="128"
        height="188"
        fill="#ffffff"
        stroke="#00736c"
        strokeWidth="6"
        strokeLinejoin="round"
      />

      {/* Depth edges */}
      <g stroke="#00736c" strokeWidth="4" strokeLinecap="round">
        <line x1="128" y1="172" x2="163" y2="150" />
        <line x1="300" y1="108" x2="335" y2="86" />
      </g>

      {/* Окна-точки */}
      <g fill="#00736c">
        {leftRows.flatMap((cy) =>
          leftCols.map((cx) => <circle key={`l-${cx}-${cy}`} cx={cx} cy={cy} r="6" />),
        )}
        {rightRows.flatMap((cy) =>
          rightCols.map((cx) => <circle key={`r-${cx}-${cy}`} cx={cx} cy={cy} r="6" />),
        )}
      </g>

      {/* Земля */}
      <line
        x1="88"
        y1="360"
        x2="444"
        y2="360"
        stroke="#00736c"
        strokeWidth="6"
        strokeLinecap="round"
      />

      {variant === "full" && (
        <>
          <text
            x="256"
            y="422"
            textAnchor="middle"
            fontFamily="'Playfair Display', Georgia, serif"
            fontStyle="italic"
            fontWeight="600"
            fontSize="48"
            fill="#00736c"
            letterSpacing="10"
          >
            RADAR
          </text>
          <text
            x="256"
            y="456"
            textAnchor="middle"
            fontFamily="'Inter', system-ui, sans-serif"
            fontWeight="500"
            fontSize="13"
            fill="#00736c"
            opacity="0.65"
            letterSpacing="4"
          >
            BY ELSESSER &amp; CO.
          </text>
        </>
      )}
    </svg>
  );
}
