import { useRef, useState, useEffect } from "react";
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
import ManifestoScrollModal from "./components/ui/ManifestoScrollModal/ManifestoScrollModal";

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
  const [isManifestoModalOpen, setIsManifestoModalOpen] = useState(false);
  const afterSectionTwoRef = useRef<HTMLDivElement | null>(null);

  const handleLangChange = (nextLang: Lang) => {
    setLang(nextLang);
    try {
      const url = new URL(window.location.href);
      url.searchParams.set("lang", nextLang);
      window.history.replaceState({}, "", url.toString());
    } catch {
      // Ignore URL update failures.
    }
  };

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
    const el = afterSectionTwoRef.current;
    if (!el) return;

    const alreadyShownThisSession = () => {
      try {
        return (
          window.sessionStorage.getItem("teamocracy_manifesto_modal_shown") ===
          "1"
        );
      } catch {
        return false;
      }
    };

    const markShownThisSession = () => {
      try {
        window.sessionStorage.setItem("teamocracy_manifesto_modal_shown", "1");
      } catch {
        // Ignore storage errors
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (!entry?.isIntersecting) return;
        if (isManifestoModalOpen) return;
        if (alreadyShownThisSession()) return;
        markShownThisSession();
        setIsManifestoModalOpen(true);
      },
      { threshold: 0.1, rootMargin: "0px 0px -20% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [isManifestoModalOpen]);

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
      <div className="app-lang-switch" role="group" aria-label="Language">
        <button
          type="button"
          className={`app-lang-btn ${lang === "ua" ? "is-active" : ""}`}
          aria-pressed={lang === "ua"}
          onClick={() => handleLangChange("ua")}
        >
          UA
        </button>
        <button
          type="button"
          className={`app-lang-btn ${lang === "en" ? "is-active" : ""}`}
          aria-pressed={lang === "en"}
          onClick={() => handleLangChange("en")}
        >
          EN
        </button>
      </div>
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
      <HeroSection lang={lang} />
      <SectionTwo lang={lang} />
      <div ref={afterSectionTwoRef} aria-hidden />
      <SectionThree lang={lang} />
      <SectionFour lang={lang} />
      <SectionFive lang={lang} />
      <SectionSix lang={lang} />
      <SectionSeven lang={lang} />
      <SectionEight lang={lang} />
      <ManifestoScrollModal
        lang={lang}
        isOpen={isManifestoModalOpen}
        onClose={() => {
          setIsManifestoModalOpen(false);
        }}
      />
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
