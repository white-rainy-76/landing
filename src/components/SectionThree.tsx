import React from "react";
import "./SectionThree.css";
import SectionTitle from "./ui/SectionTitle/SectionTitle";
import SectionSubtitle from "./ui/SectionSubtitle/SectionSubtitle";
import Badge from "./ui/Badge/Badge";
import { useInView } from "../hooks/useInView";

const SectionThree: React.FC = () => {
  const { ref, inView } = useInView(0.1);
  const viewClass = inView ? "reveal in-view" : "reveal";

  return (
    <section ref={ref} className="section-three">
      <SectionTitle className={viewClass}>Проблематика</SectionTitle>
      <SectionSubtitle
        className={viewClass}
        styles={{
          maxWidth: "300px",
          transitionDelay: inView ? "0.08s" : undefined,
        }}
      >
        Більшість інструментів створені для вертикального <br />
        управління:
      </SectionSubtitle>

      <div className="section-three__visual">
        {/* Общий контейнер для линии, который идет за всеми точками */}
        <div className="section-three__main-line">
          <div className="section-three__main-pulse"></div>
        </div>

        <div className="section-three__node node-1">
          <span className="section-three__text text-left">Керівник</span>
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
          <span className="section-three__text text-right">Виконавець</span>
        </div>

        <div className="section-three__path path-2"></div>

        <div className="section-three__node node-3">
          <span className="section-three__text text-left">Контроль</span>
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
          Але є команди, яким ефективніше працювати по-іншому
        </p>
        <p className="section-three__lead-secondary">
          Горизонтально.
          <br />З довірою, автономністю та поразумінням.
        </p>
        <div className="section-three__badges">
          <Badge>-32% плинність</Badge>
          <Badge>+140% залученість</Badge>
          <Badge>+25% швидкість</Badge>
        </div>
      </div>
    </section>
  );
};

export default SectionThree;
