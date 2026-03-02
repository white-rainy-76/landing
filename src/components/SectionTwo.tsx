import "./SectionTwo.css";
import SectionTitle from "./ui/SectionTitle/SectionTitle";
import SectionSubtitle from "./ui/SectionSubtitle/SectionSubtitle";
import { useInView } from "../hooks/useInView";

const LIST_ITEMS = [
  { num: "01", text: "Команда > Проєкт" },
  { num: "02", text: "Довіра > Контроль" },
  { num: "03", text: "Цінності > Правила" },
  { num: "04", text: "Сила в порозуміні" },
];

export default function SectionTwo() {
  const { ref, inView } = useInView(0.1);

  return (
    <section ref={ref} className="section-two">
      <SectionTitle className={inView ? "reveal in-view" : "reveal"}>
        Teamocracy
      </SectionTitle>
      <SectionSubtitle
        className={inView ? "reveal in-view" : "reveal"}
        styles={{ maxWidth: "240px", transitionDelay: inView ? "0.1s" : undefined }}
      >
        Командрократичні команди здатні на більше, бо:
      </SectionSubtitle>
      <ul className="section-two__list">
        {LIST_ITEMS.map((item, i) => (
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
