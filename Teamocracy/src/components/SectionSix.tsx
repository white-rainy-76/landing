import PrincipleSection from "./ui/PrincipleSection/PrincipleSection";
import {
  IconPrinciple7,
  IconPrinciple8,
  IconPrinciple9,
} from "./ui/PrincipleCard/PrincipleCardIcons";

const CARDS = [
  {
    icon: <IconPrinciple7 />,
    title: (
      <>
        Правила
        <br />
        застарілі
      </>
    ),
    description:
      "Правила формуються в минулому. Реальність швидко змінюється. Не вписується в правила.",
    paddingTop: 67,
    paddingTopMobile: 20,
    stripStartDeg: 180,
  },
  {
    icon: <IconPrinciple8 />,
    title: (
      <>
        Цінності
        <br />
        дають азімут
      </>
    ),
    description: (
      <>
        Нова ситуація?
        <br />
        Орієнтуйся на цінності.
        <br />
        Приймай рішення.
      </>
    ),
    paddingTop: 65,
    paddingTopMobile: 24,
    stripStartDeg: 210,
  },
  {
    icon: <IconPrinciple9 />,
    title: "Гнучкість",
    description:
      "Нові виклики постійно. Цінності дають автономію. Діяти швидко.",
    paddingTop: 82,
    descriptionMarginTop: 42,
    paddingTopMobile: 32,
    stripStartDeg: 240,
  },
];

export default function SectionSix() {
  return (
    <PrincipleSection
      topBadge="Принцип 03"
      title="Цінності > Правила"
      subtitle={
        "Правила завжди відстають від реальності.\nЦінності — це компас для будь-яких ситуацій."
      }
      centerBadge="3 тижні апрув vs 1 день з цінностями"
      cards={CARDS}
    />
  );
}
