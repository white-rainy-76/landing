import PrincipleSection from "../../ui/PrincipleSection/PrincipleSection";
import {
  IconPrinciple10,
  IconPrinciple11,
  IconPrinciple12,
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

export default function SectionSeven({ lang }: { lang: Lang }) {
  const t = DICTIONARY[lang].sectionSeven;

  return (
    <PrincipleSection
      topBadge={t.topBadge}
      title={t.title}
      subtitle={t.subtitle}
      centerBadge={t.centerBadge}
      cards={[
        {
          icon: <IconPrinciple10 />,
          title: renderMultiline(t.cards[0].title),
          description: renderCardDescription(t.cards[0].description),
          paddingTop: 56,
          paddingTopMobile: 20,
          stripStartDeg: 270,
        },
        {
          icon: <IconPrinciple11 />,
          title: renderMultiline(t.cards[1].title),
          description: renderCardDescription(t.cards[1].description),
          paddingTop: 57,
          paddingTopMobile: 20,
          stripStartDeg: 300,
        },
        {
          icon: <IconPrinciple12 />,
          title: renderMultiline(t.cards[2].title),
          description: renderCardDescription(t.cards[2].description),
          paddingTop: 54,
          paddingTopMobile: 25,
          stripStartDeg: 330,
        },
      ]}
    />
  );
}
