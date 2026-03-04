/**
 * KayaSigil — Sacred geometry mark for KAYA branding.
 *
 * Variants:
 *   "mark"   → sigil only (default)
 *   "avatar" → 24px sigil with circular sage border
 *   "nav"    → 40px mark + KAYA wordmark (horizontal)
 *   "tab"    → 16px sigil for tab bar pill
 *
 * Usage:
 *   <KayaSigil />                     // default mark
 *   <KayaSigil variant="avatar" />    // quiz / chat avatar
 *   <KayaSigil variant="nav" />       // app header
 *   <KayaSigil variant="tab" />       // tab bar button
 */

interface KayaSigilProps {
  variant?: "mark" | "avatar" | "nav" | "tab";
  className?: string;
}

function SigilSVG({ size = 56, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      viewBox="0 0 56 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      className={className}
    >
      {/* Outer mandala ring */}
      <circle cx="28" cy="28" r="26" stroke="rgba(127,182,154,0.3)" strokeWidth="0.5" />
      {/* Inner ring */}
      <circle cx="28" cy="28" r="18" stroke="rgba(127,182,154,0.2)" strokeWidth="0.5" />
      {/* Shiva triangle (upward) */}
      <path
        d="M28 8 L46 40 L10 40 Z"
        stroke="#7FB69A"
        strokeWidth="1"
        fill="none"
        strokeLinejoin="round"
      />
      {/* Shakti triangle (downward) */}
      <path
        d="M28 48 L10 16 L46 16 Z"
        stroke="rgba(127,182,154,0.5)"
        strokeWidth="0.75"
        fill="none"
        strokeLinejoin="round"
      />
      {/* Bindu — center point */}
      <circle cx="28" cy="28" r="2.5" fill="#7FB69A" />
      {/* Tip dots */}
      <circle cx="28" cy="8" r="1.4" fill="rgba(127,182,154,0.6)" />
      <circle cx="46" cy="40" r="1.4" fill="rgba(127,182,154,0.6)" />
      <circle cx="10" cy="40" r="1.4" fill="rgba(127,182,154,0.6)" />
    </svg>
  );
}

export default function KayaSigil({ variant = "mark", className = "" }: KayaSigilProps) {
  switch (variant) {
    /* ── Avatar: 24px sigil + circular sage border ── */
    case "avatar":
      return (
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${className}`}
          style={{
            border: "1.5px solid #7FB69A",
            background: "#111111",
          }}
        >
          <SigilSVG size={24} />
        </div>
      );

    /* ── Nav: 40px mark + wordmark ── */
    case "nav":
      return (
        <div className={`flex items-center gap-3 ${className}`}>
          <SigilSVG size={40} />
          <span
            style={{
              fontFamily: "'Syne', 'Inter', system-ui, sans-serif",
              fontWeight: 700,
              fontSize: "14px",
              letterSpacing: "0.3em",
              color: "#F5F0E8",
            }}
          >
            KAYA
          </span>
        </div>
      );

    /* ── Tab: 16px sigil inside elevated pill ── */
    case "tab":
      return (
        <div
          className={`flex items-center justify-center ${className}`}
          style={{ width: 16, height: 16 }}
        >
          <SigilSVG size={16} />
        </div>
      );

    /* ── Default mark ── */
    default:
      return <SigilSVG size={56} className={className} />;
  }
}
