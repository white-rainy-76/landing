import "./SectionTwo.css";
import SectionTitle from "../../ui/SectionTitle/SectionTitle";
import SectionSubtitle from "../../ui/SectionSubtitle/SectionSubtitle";
import { useInView } from "../../../hooks/useInView";
import type { Lang } from "../../../i18n/types";
import { DICTIONARY } from "../../../i18n/dictionary";

export default function SectionTwo({ lang }: { lang: Lang }) {
  const { ref, inView } = useInView(0.1);
  const items = DICTIONARY[lang].sectionTwo.items;

  return (
    <section ref={ref} className="section-two">
      <SectionTitle className={inView ? "reveal in-view" : "reveal"}>
        Teamocracy
      </SectionTitle>
      <SectionSubtitle
        className={inView ? "reveal in-view" : "reveal"}
        styles={{ transitionDelay: inView ? "0.1s" : undefined }}
      >
        {DICTIONARY[lang].sectionTwo.subtitle}
      </SectionSubtitle>
      <ul className="section-two__list">
        {items.map((item, i) => (
          <li
            key={item.num}
            className={`section-two__list-item reveal-left ${inView ? "in-view" : ""}`}
            style={{
              transitionDelay: inView ? `${0.2 + i * 0.12}s` : undefined,
            }}
          >
            <span className="section-two__num">{item.num}</span>
            <span className="section-two__text">{item.text}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
