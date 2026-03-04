import { useLayoutEffect, useState } from "react";
import "./HeroSection.css";
import LiquidGlassBox from "./ui/LiquidGlassBox/LiquidGlassBox";

export default function HeroSection() {
  const [scale, setScale] = useState(1);

  useLayoutEffect(() => {
    const updateScale = () => {
      const newScale = window.innerWidth / 1920;
      setScale(window.innerWidth > 1920 ? newScale : 1);
    };

    window.addEventListener("resize", updateScale);
    updateScale();
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  return (
    <div
      className="hero-wrapper"
      style={{ "--hero-scale": scale } as React.CSSProperties}
    >
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
