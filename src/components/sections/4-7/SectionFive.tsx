import PrincipleSection from "../../ui/PrincipleSection/PrincipleSection";
import {
  IconPrinciple4,
  IconPrinciple5,
  IconPrinciple6,
} from "../../ui/PrincipleCard/PrincipleCardIcons";

const CARDS = [
  {
    icon: <IconPrinciple4 />,
    title: (
      <>
        Контроль
        <br />
        породжує
        <br />
        саботаж
      </>
    ),
    description: (
      <>
        Постійний контроль = втрата мотивації.
        <br />
        "Навіщо намагатися?"
        <br />
        Результат: плинність.
      </>
    ),
    paddingTop: 42,
    paddingTopMobile: 8,
    stripStartDeg: 90,
  },
  {
    icon: <IconPrinciple5 />,
    title: (
      <>
        Довіра
        <br />
        породжує відповідальність
      </>
    ),
    description:
      "Довіра = відповідальність. Не треба чекати підтвердження. Результат: швидше, якісніше.",
    paddingTop: 45,
    paddingTopMobile: 0.5,
    stripStartDeg: 120,
  },
  {
    icon: <IconPrinciple6 />,
    title: (
      <>
        Комунікація
        <br />
        =
        <br />
        повніша картина
      </>
    ),
    description:
      "Команда бачить нюанси. Обговорення = повна картина. Менше ітерацій.",
    paddingTop: 48,
    paddingTopMobile: 6,
    stripStartDeg: 150,
  },
];

export default function SectionFive() {
  return (
    <PrincipleSection
      topBadge="Принцип 02"
      title="Довіра > Контроль"
      subtitle={
        "Коли команді довіряють — вона доставляє кращі результати. \nКоли контролюють — втрачає мотивацію."
      }
      centerBadge=" +25% швидкість доставки"
      cards={CARDS}
    />
  );
}
