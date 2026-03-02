import PrincipleSection from "./ui/PrincipleSection/PrincipleSection";
import {
  IconPrinciple1,
  IconPrinciple2,
  IconPrinciple3,
} from "./ui/PrincipleCard/PrincipleCardIcons";

const CARDS = [
  {
    icon: <IconPrinciple1 />,
    title: "Психологічна безпека",
    description:
      'Можна помилятися і вчитися. Можна казати "не знаю". Можна не погоджуватися.',
    paddingTop: 53,
    paddingTopMobile: 19,
    stripStartDeg: 0,
  },
  {
    icon: <IconPrinciple2 />,
    title: (
      <>
        Критикуй ідеї,
        <br />
        підтримуй людей
      </>
    ),
    description: "Ідеї — жорстко. Людей — щиро. Фідбек — це турбота.",
    paddingTop: 55,
    paddingTopMobile: 20,
    stripStartDeg: 30,
  },
  {
    icon: <IconPrinciple3 />,
    title: (
      <>
        Нетерпимість
        <br />
        до токсичності
      </>
    ),
    description: (
      <>
        Хтось руйнує команду? Він йде.
        <br />
        {"Здорова команда > токсичний"}
        <br />
        талант.
      </>
    ),

    paddingTop: 55,
    paddingTopMobile: 20,
    stripStartDeg: 60,
  },
];

export default function SectionFour() {
  return (
    <PrincipleSection
      topBadge="Принцип 01"
      title="Команда > Проєкт"
      subtitle={
        "Проєкти закінчуються, команда залишається. \nЗ хорошою командою ви зробите будь-який проєкт."
      }
      centerBadge="-35% плинність кадрів"
      cards={CARDS}
    />
  );
}
