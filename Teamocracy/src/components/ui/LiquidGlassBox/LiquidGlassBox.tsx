import type { ReactNode } from "react";
import "./LiquidGlassBox.css";

export interface LiquidGlassBoxProps {
  /** ID SVG-фильтра стекла (например #static-glass-section8) */
  filterId: string;
  /** Контент поверх стекла */
  children: ReactNode;
  /** Содержимое слоя рефракции (копия фона). По умолчанию пустой div. */
  refractionContent?: ReactNode;
  /** Дополнительный класс для контейнера стекла */
  className?: string;
  /** Класс для обёртки контента */
  contentClassName?: string;
  /** Скругление углов (px). По умолчанию 24. */
  borderRadius?: number;
}

/**
 * Стеклянный блок на основе секции 8: слой рефракции с filter (без backdrop-filter),
 * поверх контент. Требует в документе SVG с filter id={filterId} и #glass-noise для шума.
 */
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
