import "./PrincipleCard.css";

type PrincipleCardProps = {
  icon: React.ReactNode;
  title: React.ReactNode;
  /** Рядок (переноси по крапці) або JSX (наприклад з <br />) */
  description: React.ReactNode;
  /** Кастомний padding-top для картки (наприклад "42px" або 42) */
  paddingTop?: string | number;
  /** Padding-top для картки на мобільному (у пікселях), застосовується в @media (max-width: 768px) */
  paddingTopMobile?: number;
  /** Відступ між заголовком і описом (наприклад "26px" або 26), за замовчуванням 26px */
  descriptionMarginTop?: string | number;
  /** Початковий кут полоски анімації в градусах (0–360), щоб картки трохи відрізнялись */
  stripStartDeg?: number;
};

function descriptionWithBreaks(text: string) {
  const parts = text
    .split(/\.\s+/)
    .map((p) => p.trim().replace(/\.$/, ""))
    .filter(Boolean);
  if (parts.length <= 1) return text;
  return (
    <>
      {parts.map((part, i) => (
        <span key={i}>
          {part}.{i < parts.length - 1 && <br />}
        </span>
      ))}
    </>
  );
}

export default function PrincipleCard({
  icon,
  title,
  description,
  paddingTop,
  paddingTopMobile,
  descriptionMarginTop,
  stripStartDeg,
}: PrincipleCardProps) {
  const cardStyle: React.CSSProperties = {
    ...(stripStartDeg !== undefined && {
      ["--strip-start" as string]: `${stripStartDeg}deg`,
    }),
    ...(paddingTop !== undefined && {
      ["--card-padding-top" as string]:
        typeof paddingTop === "number" ? `${paddingTop}px` : paddingTop,
    }),
    ...(paddingTopMobile !== undefined && {
      ["--card-padding-top-mobile" as string]: `${paddingTopMobile}px`,
    }),
  };

  const descriptionStyle =
    descriptionMarginTop !== undefined
      ? {
          marginTop:
            typeof descriptionMarginTop === "number"
              ? `${descriptionMarginTop}px`
              : descriptionMarginTop,
        }
      : undefined;

  const descriptionContent =
    typeof description === "string"
      ? descriptionWithBreaks(description)
      : description;

  return (
    <article className="principle-card" style={cardStyle}>
      <div className="principle-card__inner">
        <div className="principle-card__icon">{icon}</div>
        <h3 className="principle-card__title">{title}</h3>
        <p className="principle-card__description" style={descriptionStyle}>
          {descriptionContent}
        </p>
      </div>
    </article>
  );
}
