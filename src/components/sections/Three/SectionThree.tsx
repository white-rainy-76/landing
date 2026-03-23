import "./SectionThree.css";
import SectionTitle from "../../ui/SectionTitle/SectionTitle";
import SectionSubtitle from "../../ui/SectionSubtitle/SectionSubtitle";
import Badge from "../../ui/Badge/Badge";
import { useInView } from "../../../hooks/useInView";
import type { Lang } from "../../../i18n/types";
import { DICTIONARY } from "../../../i18n/dictionary";
import { renderMultiline } from "../../../i18n/renderMultiline";

type SectionThreeProps = { lang: Lang };

export default function SectionThree({ lang }: SectionThreeProps) {
  const { ref, inView } = useInView(0.1);
  const viewClass = inView ? "reveal in-view" : "reveal";

  return (
    <section ref={ref} className="section-three">
      <SectionTitle className={viewClass}>
        {DICTIONARY[lang].sectionThree.title}
      </SectionTitle>
      <SectionSubtitle
        className={viewClass}
        styles={{
          transitionDelay: inView ? "0.08s" : undefined,
        }}
      >
        {renderMultiline(DICTIONARY[lang].sectionThree.subtitle)}
      </SectionSubtitle>

      <div className="section-three__visual">
        {/* Shared container for the vertical line behind all nodes */}
        <div className="section-three__main-line">
          <div className="section-three__main-pulse"></div>
        </div>

        <div className="section-three__node node-1">
          <span className="section-three__text text-left">
            {DICTIONARY[lang].sectionThree.nodes.left}
          </span>
          <div className="section-three__dot-wrapper">
            <div className="section-three__dot-glow"></div>
            <div className="section-three__dot"></div>
          </div>
        </div>

        <div className="section-three__path path-1"></div>

        <div className="section-three__node node-2">
          <div className="section-three__dot-wrapper">
            <div className="section-three__dot-glow"></div>
            <div className="section-three__dot"></div>
          </div>
          <span className="section-three__text text-right">
            {DICTIONARY[lang].sectionThree.nodes.middle}
          </span>
        </div>

        <div className="section-three__path path-2"></div>

        <div className="section-three__node node-3">
          <span className="section-three__text text-left">
            {DICTIONARY[lang].sectionThree.nodes.right}
          </span>
          <div className="section-three__dot-wrapper">
            <div className="section-three__dot-glow"></div>
            <div className="section-three__dot"></div>
          </div>
        </div>
      </div>

      <div
        className={`section-three__block ${viewClass}`}
        style={{ transitionDelay: inView ? "0.15s" : undefined }}
      >
        <p className="section-three__lead">
          {DICTIONARY[lang].sectionThree.block.lead}
        </p>
        <p className="section-three__lead-secondary">
          {renderMultiline(DICTIONARY[lang].sectionThree.block.leadSecondary)}
        </p>
        <div className="section-three__badges">
          {DICTIONARY[lang].sectionThree.block.badges.map((b) => (
            <Badge key={b}>{b}</Badge>
          ))}
        </div>
      </div>
    </section>
  );
}
