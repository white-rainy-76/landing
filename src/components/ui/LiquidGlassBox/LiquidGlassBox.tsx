import type { ReactNode } from "react";
import "./LiquidGlassBox.css";

export interface LiquidGlassBoxProps {
  /** id of the SVG glass filter (for example "static-glass-section8") */
  filterId: string;
  /** Content rendered on top of the glass */
  children: ReactNode;
  /** Optional background content used for refraction */
  refractionContent?: ReactNode;
  /** Extra class name for the outer container */
  className?: string;
  /** Extra class name for the content wrapper */
  contentClassName?: string;
  /** Corner radius in px (defaults to 24) */
  borderRadius?: number;
}

/** Wrapper that applies an SVG‑based glass effect around its children */
export default function LiquidGlassBox({
  filterId,
  children,
  refractionContent,
  className,
  contentClassName,
  borderRadius = 24,
}: LiquidGlassBoxProps) {
  return (
    <div
      className={["liquid-glass-box", className].filter(Boolean).join(" ")}
      style={
        { "--liquid-glass-radius": `${borderRadius}px` } as React.CSSProperties
      }
    >
      <div
        className="liquid-glass-box__refraction"
        aria-hidden
        style={{
          filter: `url(#${filterId})`,
          WebkitFilter: `url(#${filterId})`,
        }}
      >
        <div className="liquid-glass-box__refraction-bg">
          {refractionContent}
        </div>
      </div>
      <div
        className={["liquid-glass-box__content", contentClassName]
          .filter(Boolean)
          .join(" ")}
      >
        {children}
      </div>
    </div>
  );
}
