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
  /** Рядок (переноси по крапці) або JSX (наприклад з <br />) */
  description: React.ReactNode;
  /** Опційно: кастомний padding-top для картки ("42px" або 42) */
  paddingTop?: string | number;
  /** Опційно: padding-top для картки на мобільному (у пікселях) */
  paddingTopMobile?: number;
  /** Опційно: відступ між заголовком і описом ("26px" або 26) */
  descriptionMarginTop?: string | number;
  /** Опційно: початковий кут полоски анімації (0–360) */
  stripStartDeg?: number;
};

export type PrincipleSectionProps = {
  /** Текст верхнього бейджа (наприклад "Принцип 01") */
  topBadge: React.ReactNode;
  /** Заголовок секції */
  title: React.ReactNode;
  /** Підзаголовок під заголовком (можна передати JSX з <br /> або рядок з \n для переносу) */
  subtitle: React.ReactNode;
  /** Текст центрального бейджа */
  centerBadge: React.ReactNode;
  /** Масив з 3 карток: icon, title, description */
  cards: PrincipleSectionCard[];
  /** Додатковий className для секції */
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
