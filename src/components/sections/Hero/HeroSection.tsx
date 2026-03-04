import "./HeroSection.css";
import LiquidGlassBox from "../../ui/LiquidGlassBox/LiquidGlassBox";

export default function HeroSection() {
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
          <div className="hero__quote-wrap">
            <div className="hero__quote-reveal">
              <LiquidGlassBox
                className="hero__quote-glass"
                filterId="static-glass-hero"
                borderRadius={20}
                contentClassName="hero__quote-content"
              >
                <p className="hero__quote-text">
                  Команда — це більше,
                  <br />
                  ніж сума навичок.
                  <br />
                  Це культура.
                </p>
              </LiquidGlassBox>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
