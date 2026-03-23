import PrincipleSection from "../../ui/PrincipleSection/PrincipleSection";
import {
  IconPrinciple4,
  IconPrinciple5,
  IconPrinciple6,
} from "../../ui/PrincipleCard/PrincipleCardIcons";
import type { Lang } from "../../../i18n/types";
import { DICTIONARY } from "../../../i18n/dictionary";
import { renderMultiline } from "../../../i18n/renderMultiline";

function renderCardDescription(
  description:
    | { type: "text"; value: string }
    | { type: "lines"; lines: string[] },
) {
  if (description.type === "text") return description.value;
  return renderMultiline(description.lines.join("\n"));
}

export default function SectionFive({ lang }: { lang: Lang }) {
  const t = DICTIONARY[lang].sectionFive;

  return (
    <PrincipleSection
      topBadge={t.topBadge}
      title={t.title}
      subtitle={t.subtitle}
      centerBadge={t.centerBadge}
      cards={[
        {
          icon: <IconPrinciple4 />,
          title: renderMultiline(t.cards[0].title),
          description: renderCardDescription(t.cards[0].description),
          paddingTop: 42,
          paddingTopMobile: 8,
          stripStartDeg: 90,
        },
        {
          icon: <IconPrinciple5 />,
          title: renderMultiline(t.cards[1].title),
          description: renderCardDescription(t.cards[1].description),
          paddingTop: 45,
          paddingTopMobile: 0.5,
          stripStartDeg: 120,
        },
        {
          icon: <IconPrinciple6 />,
          title: renderMultiline(t.cards[2].title),
          description: renderCardDescription(t.cards[2].description),
          paddingTop: 48,
          paddingTopMobile: 6,
          stripStartDeg: 150,
        },
      ]}
    />
  );
}
