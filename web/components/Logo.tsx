import Image from "next/image";
import clsx from "clsx";

/**
 * Radar logo — letter "R" with a radar dial.
 *
 * Variants:
 *  - mark — square brand mark only (top-bars, bot-avatar)
 *  - full — mark + RADAR / BY ELSESSER & CO. wordmark
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
  const mark = (
    <Image
      src="/radar-logo.png"
      alt="Radar"
      width={size}
      height={size}
      priority
      className={clsx(
        "rounded-md",
        variant === "mark" ? className : undefined,
      )}
    />
  );

  if (variant === "mark") return mark;

  return (
    <span className={clsx("inline-flex items-center gap-3", className)}>
      {mark}
      <span className="flex flex-col leading-none">
        <span
          className="font-serif italic"
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontWeight: 600,
            fontSize: size * 0.55,
            letterSpacing: "0.18em",
            color: "#00736c",
          }}
        >
          RADAR
        </span>
        <span
          style={{
            marginTop: size * 0.12,
            fontFamily: "'Inter', system-ui, sans-serif",
            fontWeight: 500,
            fontSize: size * 0.22,
            letterSpacing: "0.28em",
            color: "#00736c",
            opacity: 0.65,
          }}
        >
          BY ELSESSER &amp; CO.
        </span>
      </span>
    </span>
  );
}
