import PrincipleSection from "../../ui/PrincipleSection/PrincipleSection";
import {
  IconPrinciple1,
  IconPrinciple2,
  IconPrinciple3,
} from "../../ui/PrincipleCard/PrincipleCardIcons";
import type { Lang } from "../../../i18n/types";
import { DICTIONARY } from "../../../i18n/dictionary";
import { renderMultiline } from "../../../i18n/renderMultiline";
import type { RefObject } from "react";

function renderCardDescription(
  description:
    | { type: "text"; value: string }
    | { type: "lines"; lines: string[] },
) {
  if (description.type === "text") return description.value;
  return renderMultiline(description.lines.join("\n"));
}

export default function SectionFour({
  lang,
  manifestoModalAnchorRef,
}: {
  lang: Lang;
  /** Attached to the Principle 02 card wrapper for scroll-triggered manifesto modal. */
  manifestoModalAnchorRef?: RefObject<HTMLDivElement | null>;
}) {
  const t = DICTIONARY[lang].sectionFour;

  return (
    <PrincipleSection
      topBadge={t.topBadge}
      title={t.title}
      subtitle={t.subtitle}
      centerBadge={t.centerBadge}
      manifestoModalAnchorRef={manifestoModalAnchorRef}
      manifestoModalAnchorCardIndex={1}
      cards={[
        {
          icon: <IconPrinciple1 />,
          title: renderMultiline(t.cards[0].title),
          description: renderCardDescription(t.cards[0].description),
          paddingTop: 53,
          paddingTopMobile: 19,
          stripStartDeg: 0,
        },
        {
          icon: <IconPrinciple2 />,
          title: renderMultiline(t.cards[1].title),
          description: renderCardDescription(t.cards[1].description),
          paddingTop: 55,
          paddingTopMobile: 20,
          stripStartDeg: 30,
        },
        {
          icon: <IconPrinciple3 />,
          title: renderMultiline(t.cards[2].title),
          description: renderCardDescription(t.cards[2].description),
          paddingTop: 55,
          paddingTopMobile: 20,
          stripStartDeg: 60,
        },
      ]}
    />
  );
}
