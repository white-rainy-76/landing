import PrincipleSection from "../../ui/PrincipleSection/PrincipleSection";
import {
  IconPrinciple7,
  IconPrinciple8,
  IconPrinciple9,
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

export default function SectionSix({ lang }: { lang: Lang }) {
  const t = DICTIONARY[lang].sectionSix;

  return (
    <PrincipleSection
      topBadge={t.topBadge}
      title={t.title}
      subtitle={t.subtitle}
      centerBadge={t.centerBadge}
      cards={[
        {
          icon: <IconPrinciple7 />,
          title: renderMultiline(t.cards[0].title),
          description: renderCardDescription(t.cards[0].description),
          paddingTop: 67,
          paddingTopMobile: 20,
          stripStartDeg: 180,
        },
        {
          icon: <IconPrinciple8 />,
          title: renderMultiline(t.cards[1].title),
          description: renderCardDescription(t.cards[1].description),
          paddingTop: 65,
          paddingTopMobile: 24,
          stripStartDeg: 210,
        },
        {
          icon: <IconPrinciple9 />,
          title: renderMultiline(t.cards[2].title),
          description: renderCardDescription(t.cards[2].description),
          paddingTop: 82,
          descriptionMarginTop: 42,
          paddingTopMobile: 32,
          stripStartDeg: 240,
        },
      ]}
    />
  );
}
