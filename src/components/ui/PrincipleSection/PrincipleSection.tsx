import "./PrincipleSection.css";
import SectionTopBadge from "../SectionTopBadge/SectionTopBadge";
import SectionTitle from "../SectionTitle/SectionTitle";
import SectionSubtitle from "../SectionSubtitle/SectionSubtitle";
import Badge from "../Badge/Badge";
import PrincipleCard from "../PrincipleCard/PrincipleCard";
import { useInView } from "../../../hooks/useInView";

export type PrincipleSectionCard = {
  icon: React.ReactNode;
  title: React.ReactNode;
  /** Description text: plain string (with optional \n) or JSX */
  description: React.ReactNode;
  /** Optional custom padding-top for the card ("42px" or 42) */
  paddingTop?: string | number;
  /** Optional padding-top on mobile (in pixels) */
  paddingTopMobile?: number;
  /** Optional gap between title and description ("26px" or 26) */
  descriptionMarginTop?: string | number;
  /** Optional initial angle for the animated strip (0–360) */
  stripStartDeg?: number;
};

export type PrincipleSectionProps = {
  /** Text in the top badge (e.g. "Principle 01") */
  topBadge: React.ReactNode;
  /** Section title */
  title: React.ReactNode;
  /** Subtitle under the title (JSX with <br /> or string with \n) */
  subtitle: React.ReactNode;
  /** Text in the center badge */
  centerBadge: React.ReactNode;
  /** Array of three cards: icon, title, description */
  cards: PrincipleSectionCard[];
  /** Optional extra className for the section */
  className?: string;
};

export default function PrincipleSection({
  topBadge,
  title,
  subtitle,
  centerBadge,
  cards,
  className,
}: PrincipleSectionProps) {
  const subtitleContent =
    typeof subtitle === "string" && subtitle.includes("\n")
      ? subtitle.split("\n").map((line, i) => (
          <span key={i}>
            {i > 0 && <br />}
            {line}
          </span>
        ))
      : subtitle;

  const { ref, inView } = useInView(0.1);
  const viewClass = inView ? "reveal in-view" : "reveal";

  return (
    <section
      ref={ref}
      className={["principle-section", className].filter(Boolean).join(" ")}
    >
      <div className={viewClass} style={{ transitionDelay: inView ? "0s" : undefined }}>
        <SectionTopBadge>{topBadge}</SectionTopBadge>
      </div>
      <SectionTitle
        className={`principle-section__title ${viewClass}`}
        style={{ transitionDelay: inView ? "0.06s" : undefined }}
      >
        {title}
      </SectionTitle>
      <SectionSubtitle
        className={`principle-section__subtitle ${viewClass}`}
        styles={{
          ...(inView && { transitionDelay: "0.12s" }),
        }}
      >
        {subtitleContent}
      </SectionSubtitle>
      <div
        className={`principle-section__badge-wrap ${viewClass}`}
        style={{ transitionDelay: inView ? "0.18s" : undefined }}
      >
        <Badge>{centerBadge}</Badge>
      </div>
      <div className="principle-section__cards">
        {cards.map((card, i) => (
          <div
            key={i}
            className={viewClass}
            style={{ transitionDelay: inView ? `${0.25 + i * 0.1}s` : undefined }}
          >
            <PrincipleCard
              icon={card.icon}
              title={card.title}
              description={card.description}
              paddingTop={card.paddingTop}
              paddingTopMobile={card.paddingTopMobile}
              descriptionMarginTop={card.descriptionMarginTop}
              stripStartDeg={card.stripStartDeg}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
