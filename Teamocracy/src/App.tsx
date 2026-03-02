import { useState, useEffect } from "react";
import HeroSection from "./components/HeroSection";
import SectionTwo from "./components/SectionTwo";
import SectionThree from "./components/SectionThree";
import SectionFour from "./components/SectionFour";
import SectionFive from "./components/SectionFive";
import SectionSix from "./components/SectionSix";
import SectionSeven from "./components/SectionSeven";
import SectionEight from "./components/SectionEight";
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
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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
