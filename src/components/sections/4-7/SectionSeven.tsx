import PrincipleSection from "../../ui/PrincipleSection/PrincipleSection";
import {
  IconPrinciple10,
  IconPrinciple11,
  IconPrinciple12,
} from "../../ui/PrincipleCard/PrincipleCardIcons";

const CARDS = [
  {
    icon: <IconPrinciple10 />,
    title: "Підготовка > виконання",
    description:
      "Детальний бриф = правильно з першого разу. Без брифу = переробки. Час витрачено.",
    paddingTop: 56,
    paddingTopMobile: 20,
    stripStartDeg: 270,
  },
  {
    icon: <IconPrinciple11 />,
    title: (
      <>
        Єдина
        <br />
        семантика
      </>
    ),
    description: "Всі на 70% > один на 100%. Спільна мова. Швидша робота.",
    paddingTop: 57,
    paddingTopMobile: 20,
    stripStartDeg: 300,
  },
  {
    icon: <IconPrinciple12 />,
    title: (
      <>
        Культура
        <br />
        фідбеку
      </>
    ),
    description:
      "Фідбек = турбота. Критикуй ідеї жорстко. Підтримуй людей щиро.",
    paddingTop: 54,
    paddingTopMobile: 25,
    stripStartDeg: 330,
  },
];

export default function SectionSeven() {
  return (
    <PrincipleSection
      topBadge="Принцип 04"
      title="Сила команди в порозумінні"
      subtitle="Команда сильна, коли всі на одній хвилі."
      centerBadge="Година підготовки > 4 години доробки"
      cards={CARDS}
    />
  );
}
