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
import type { Lang } from "./i18n/types";

function getInitialLang(): Lang {
  const params = new URLSearchParams(window.location.search);
  const q = params.get("lang");
  if (q === "ua" || q === "en") return q;

  try {
    const stored = window.localStorage.getItem("teamocracy_lang");
    if (stored === "ua" || stored === "en") return stored;
  } catch {
    // Ignore storage errors (e.g., privacy mode)
  }

  const nav = (navigator.language || "").toLowerCase();
  if (nav.startsWith("uk")) return "ua";
  if (nav.startsWith("en")) return "en";
  // Fallback to the site's current default language.
  return "ua";
}

function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [lang, setLang] = useState<Lang>(() => getInitialLang());

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

  useEffect(() => {
    try {
      window.localStorage.setItem("teamocracy_lang", lang);
    } catch {
      // Ignore storage errors
    }
    document.documentElement.lang = lang === "ua" ? "uk" : "en";
  }, [lang]);

  return (
    <div className="landing">
      <div
        className="scroll-progress"
        role="progressbar"
        aria-valuenow={Math.round(scrollProgress * 100)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={lang === "ua" ? "Прогрес прокрутки" : "Scroll progress"}
      >
        <div
          className="scroll-progress__fill"
          style={{ width: `${scrollProgress * 100}%` }}
        />
      </div>
      <HeroSection
        lang={lang}
        setLang={(nextLang) => {
          setLang(nextLang);
          try {
            const url = new URL(window.location.href);
            url.searchParams.set("lang", nextLang);
            window.history.replaceState({}, "", url.toString());
          } catch {
            // Ignore URL update failures.
          }
        }}
      />
      <SectionTwo lang={lang} />
      <SectionThree lang={lang} />
      <SectionFour lang={lang} />
      <SectionFive lang={lang} />
      <SectionSix lang={lang} />
      <SectionSeven lang={lang} />
      <SectionEight lang={lang} />
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
