import "./HeroSection.css";
import LiquidGlassBox from "../../ui/LiquidGlassBox/LiquidGlassBox";
import type { Lang } from "../../../i18n/types";
import { DICTIONARY } from "../../../i18n/dictionary";
import { renderMultiline } from "../../../i18n/renderMultiline";

export default function HeroSection({
  lang,
  setLang,
}: {
  lang: Lang;
  setLang: (next: Lang) => void;
}) {
  return (
    <div className="hero-wrapper">
      <section className="hero">
        <div className="hero__bg" aria-hidden="true">
          <div
            className="hero__ellipse hero__ellipse--one"
            aria-hidden="true"
          />
          <div
            className="hero__ellipse hero__ellipse--two"
            aria-hidden="true"
          />
        </div>
        <div className="hero__content">
          <h1 className="hero__title">TEAMOCRACY</h1>
          <div className="hero__lang-switch" role="group" aria-label="Language">
            <button
              type="button"
              className={`hero__lang-btn ${lang === "ua" ? "is-active" : ""}`}
              aria-pressed={lang === "ua"}
              onClick={() => setLang("ua")}
            >
              UA
            </button>
            <button
              type="button"
              className={`hero__lang-btn ${lang === "en" ? "is-active" : ""}`}
              aria-pressed={lang === "en"}
              onClick={() => setLang("en")}
            >
              EN
            </button>
          </div>
          <div className="hero__quote-wrap">
            <div className="hero__quote-reveal">
              <LiquidGlassBox
                className="hero__quote-glass"
                filterId="static-glass-hero"
                borderRadius={20}
                contentClassName="hero__quote-content"
              >
                <p className="hero__quote-text">
                  {renderMultiline(DICTIONARY[lang].hero.quote)}
                </p>
              </LiquidGlassBox>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
