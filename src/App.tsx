import { useState, useEffect } from "react";
import HeroSection from "./components/sections/Hero/HeroSection";
import SectionTwo from "./components/sections/Two/SectionTwo";
import SectionThree from "./components/sections/Three/SectionThree";
import SectionFour from "./components/sections/4-7/SectionFour";
import SectionFive from "./components/sections/4-7/SectionFive";
import SectionSix from "./components/sections/4-7/SectionSix";
import SectionSeven from "./components/sections/4-7/SectionSeven";
import SectionEight from "./components/sections/Eight/SectionEight";
// import GlassMapsExporter from "./components/ui/GlassMapsExporter/GlassMapsExporter";
// import { GLASS_MAPS_PRESETS } from "./components/ui/GlassMapsExporter/glassMapsPresets";
import "./App.css";

function App() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY ?? document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = window.innerHeight;
      const max = scrollHeight - clientHeight;
      setScrollProgress(max <= 0 ? 0 : Math.min(1, scrollTop / max));
    };
    let cancelled = false;
    const runAfterLoad = () => {
      if (cancelled) return;
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
    };
    if (document.readyState === "complete") {
      requestAnimationFrame(() => runAfterLoad());
    } else {
      window.addEventListener("load", () => requestAnimationFrame(() => runAfterLoad()));
    }
    return () => {
      cancelled = true;
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div className="landing">
      <div
        className="scroll-progress"
        role="progressbar"
        aria-valuenow={Math.round(scrollProgress * 100)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Прогрес прокрутки"
      >
        <div
          className="scroll-progress__fill"
          style={{ width: `${scrollProgress * 100}%` }}
        />
      </div>
      <HeroSection />
      <SectionTwo />
      <SectionThree />
      <SectionFour />
      <SectionFive />
      <SectionSix />
      <SectionSeven />
      <SectionEight />
      {/* <GlassMapsExporter
        presets={GLASS_MAPS_PRESETS}
        className="glass-maps-exporter-app"
      /> */}
      <div className="bottom-ellipse-track" aria-hidden>
        <div className="bottom-ellipse" />
        <div className="bottom-ellipse-blur" />
      </div>
    </div>
  );
}

export default App;
