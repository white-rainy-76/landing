import "./PrincipleCard.css";

type PrincipleCardProps = {
  icon: React.ReactNode;
  title: React.ReactNode;
  /** Description text: plain string (split by ". ") or JSX */
  description: React.ReactNode;
  /** Optional custom padding-top for the card ("42px" or 42) */
  paddingTop?: string | number;
  /** Optional padding-top on mobile (px), used in @media (max-width: 768px) */
  paddingTopMobile?: number;
  /** Optional gap between title and description ("26px" or 26), defaults to 26px */
  descriptionMarginTop?: string | number;
  /** Initial angle of the animated strip in degrees (0–360) so cards differ slightly */
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
