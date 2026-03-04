import { useRef, useEffect } from "react";
import "./SectionEight.css";
import LiquidGlassBox from "./ui/LiquidGlassBox/LiquidGlassBox";
import CtaIconBox from "./ui/CtaIconBox/CtaIconBox";
import { IconCta1, IconCta2 } from "./ui/CtaIconBox/CtaIcons";
import { getScaleForConfig } from "../utils/liquidGlass";
import { trackEvent } from "../utils/analytics";
import {
  HERO_GLASS_PRESET,
  HERO_MOBILE_GLASS_PRESET,
} from "./ui/GlassMapsExporter/glassMapsPresets";

const GLASS_WIDTH = 1500;
const GLASS_HEIGHT = 518;
const GLASS_SCALE = 52;

/** Tablet (≈1224px): height 718px, dedicated PNG maps */
const GLASS_WIDTH_TABLET = 1500;
const GLASS_HEIGHT_TABLET = 718;
const GLASS_SCALE_TABLET = 52;

/** 1230px down to mobile: 907×716, dedicated PNG maps */
const GLASS_WIDTH_1230 = 907;
const GLASS_HEIGHT_1230 = 716;
const GLASS_SCALE_1230 = 52;

const GLASS_WIDTH_MOBILE = 378;
const GLASS_HEIGHT_MOBILE = 201;
const GLASS_SCALE_MOBILE = 48;

/** Single SVG noise filter for all glass elements, used by LiquidGlassBox */
function GlassNoiseOverlay() {
  return (
    <svg aria-hidden style={{ position: "absolute", width: 0, height: 0 }}>
      <defs>
        <filter id="glass-noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves={4}
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
      </defs>
    </svg>
  );
}

/** Static SVG glass filters that use pre-generated PNG maps from public/images/ */
function StaticGlassFilterDefs() {
  return (
    <svg
      aria-hidden
      style={{ position: "absolute", width: 0, height: 0 }}
      colorInterpolationFilters="sRGB"
    >
      <defs>
        <filter
          id="static-glass-section8"
          x="0%"
          y="0%"
          width="100%"
          height="100%"
        >
          <feGaussianBlur
            in="SourceGraphic"
            stdDeviation="10"
            result="blurred_source"
          />
          <feImage
            href="/images/glass-displacement.png"
            x="0"
            y="0"
            width={GLASS_WIDTH}
            height={GLASS_HEIGHT}
            result="disp_map"
          />
          <feDisplacementMap
            in="blurred_source"
            in2="disp_map"
            scale={GLASS_SCALE}
            xChannelSelector="R"
            yChannelSelector="G"
            result="displaced"
          />
          <feColorMatrix
            in="displaced"
            type="saturate"
            values="2"
            result="displaced_sat"
          />
          <feImage
            href="/images/glass-specular.png"
            x="0"
            y="0"
            width={GLASS_WIDTH}
            height={GLASS_HEIGHT}
            result="spec_layer"
          />
          <feComposite
            in="displaced_sat"
            in2="spec_layer"
            operator="in"
            result="spec_masked"
          />
          <feComponentTransfer in="spec_layer" result="spec_faded">
            <feFuncA type="linear" slope="1" />
          </feComponentTransfer>
          <feBlend
            in="spec_masked"
            in2="displaced"
            mode="normal"
            result="with_sat"
          />
          <feBlend in="spec_faded" in2="with_sat" mode="normal" />
        </filter>
        {/* Tablet (1224px): maps 1500×718, glass fills full height */}
        <filter
          id="static-glass-section8-tablet"
          x="0%"
          y="0%"
          width="100%"
          height="100%"
        >
          <feGaussianBlur
            in="SourceGraphic"
            stdDeviation="10"
            result="blurred_source"
          />
          <feImage
            href="/images/glass-displacement-tablet.png"
            x="0"
            y="0"
            width={GLASS_WIDTH_TABLET}
            height={GLASS_HEIGHT_TABLET}
            result="disp_map"
          />
          <feDisplacementMap
            in="blurred_source"
            in2="disp_map"
            scale={GLASS_SCALE_TABLET}
            xChannelSelector="R"
            yChannelSelector="G"
            result="displaced"
          />
          <feColorMatrix
            in="displaced"
            type="saturate"
            values="2"
            result="displaced_sat"
          />
          <feImage
            href="/images/glass-specular-tablet.png"
            x="0"
            y="0"
            width={GLASS_WIDTH_TABLET}
            height={GLASS_HEIGHT_TABLET}
            result="spec_layer"
          />
          <feComposite
            in="displaced_sat"
            in2="spec_layer"
            operator="in"
            result="spec_masked"
          />
          <feComponentTransfer in="spec_layer" result="spec_faded">
            <feFuncA type="linear" slope="1" />
          </feComponentTransfer>
          <feBlend
            in="spec_masked"
            in2="displaced"
            mode="normal"
            result="with_sat"
          />
          <feBlend in="spec_faded" in2="with_sat" mode="normal" />
        </filter>
        {/* 1230px down to mobile: maps 907×716 */}
        <filter
          id="static-glass-section8-1230"
          x="0%"
          y="0%"
          width="100%"
          height="100%"
        >
          <feGaussianBlur
            in="SourceGraphic"
            stdDeviation="10"
            result="blurred_source"
          />
          <feImage
            href="/images/glass-displacement-section8-1230.png"
            x="0"
            y="0"
            width={GLASS_WIDTH_1230}
            height={GLASS_HEIGHT_1230}
            result="disp_map"
          />
          <feDisplacementMap
            in="blurred_source"
            in2="disp_map"
            scale={GLASS_SCALE_1230}
            xChannelSelector="R"
            yChannelSelector="G"
            result="displaced"
          />
          <feColorMatrix
            in="displaced"
            type="saturate"
            values="2"
            result="displaced_sat"
          />
          <feImage
            href="/images/glass-specular-section8-1230.png"
            x="0"
            y="0"
            width={GLASS_WIDTH_1230}
            height={GLASS_HEIGHT_1230}
            result="spec_layer"
          />
          <feComposite
            in="displaced_sat"
            in2="spec_layer"
            operator="in"
            result="spec_masked"
          />
          <feComponentTransfer in="spec_layer" result="spec_faded">
            <feFuncA type="linear" slope="1" />
          </feComponentTransfer>
          <feBlend
            in="spec_masked"
            in2="displaced"
            mode="normal"
            result="with_sat"
          />
          <feBlend in="spec_faded" in2="with_sat" mode="normal" />
        </filter>
        <filter
          id="static-glass-section8-mobile"
          x="0%"
          y="0%"
          width="100%"
          height="100%"
        >
          <feGaussianBlur
            in="SourceGraphic"
            stdDeviation="8"
            result="blurred_source"
          />
          <feImage
            href="/images/glass-displacement-mobile.png"
            x="0"
            y="0"
            width={GLASS_WIDTH_MOBILE}
            height={GLASS_HEIGHT_MOBILE}
            result="disp_map"
          />
          <feDisplacementMap
            in="blurred_source"
            in2="disp_map"
            scale={GLASS_SCALE_MOBILE}
            xChannelSelector="R"
            yChannelSelector="G"
            result="displaced"
          />
          <feColorMatrix
            in="displaced"
            type="saturate"
            values="2"
            result="displaced_sat"
          />
          <feImage
            href="/images/glass-specular-mobile.png"
            x="0"
            y="0"
            width={GLASS_WIDTH_MOBILE}
            height={GLASS_HEIGHT_MOBILE}
            result="spec_layer"
          />
          <feComposite
            in="displaced_sat"
            in2="spec_layer"
            operator="in"
            result="spec_masked"
          />
          <feComponentTransfer in="spec_layer" result="spec_faded">
            <feFuncA type="linear" slope="1" />
          </feComponentTransfer>
          <feBlend
            in="spec_masked"
            in2="displaced"
            mode="normal"
            result="with_sat"
          />
          <feBlend in="spec_faded" in2="with_sat" mode="normal" />
        </filter>
        {/* Hero: uses maps exported via GlassMapsExporter (glass-displacement-hero.png / glass-specular-hero.png) */}
        <filter id="static-glass-hero" x="0%" y="0%" width="100%" height="100%">
          <feGaussianBlur
            in="SourceGraphic"
            stdDeviation="8"
            result="blurred_source"
          />
          <feImage
            href="/images/glass-displacement-hero.png"
            x="0"
            y="0"
            width={HERO_GLASS_PRESET.width}
            height={HERO_GLASS_PRESET.height}
            result="disp_map"
          />
          <feDisplacementMap
            in="blurred_source"
            in2="disp_map"
            scale={getScaleForConfig(HERO_GLASS_PRESET.config ?? {})}
            xChannelSelector="R"
            yChannelSelector="G"
            result="displaced"
          />
          <feColorMatrix
            in="displaced"
            type="saturate"
            values="2"
            result="displaced_sat"
          />
          <feImage
            href="/images/glass-specular-hero.png"
            x="0"
            y="0"
            width={HERO_GLASS_PRESET.width}
            height={HERO_GLASS_PRESET.height}
            result="spec_layer"
          />
          <feComposite
            in="displaced_sat"
            in2="spec_layer"
            operator="in"
            result="spec_masked"
          />
          <feComponentTransfer in="spec_layer" result="spec_faded">
            <feFuncA type="linear" slope="1" />
          </feComponentTransfer>
          <feBlend
            in="spec_masked"
            in2="displaced"
            mode="normal"
            result="with_sat"
          />
          <feBlend in="spec_faded" in2="with_sat" mode="normal" />
        </filter>
        {/* Hero mobile: 195×104 — maps glass-displacement-hero-mobile.png / glass-specular-hero-mobile.png */}
        <filter
          id="static-glass-hero-mobile"
          x="0%"
          y="0%"
          width="100%"
          height="100%"
        >
          <feGaussianBlur
            in="SourceGraphic"
            stdDeviation="6"
            result="blurred_source"
          />
          <feImage
            href="/images/glass-displacement-hero-mobile.png"
            x="0"
            y="0"
            width={HERO_MOBILE_GLASS_PRESET.width}
            height={HERO_MOBILE_GLASS_PRESET.height}
            result="disp_map"
          />
          <feDisplacementMap
            in="blurred_source"
            in2="disp_map"
            scale={getScaleForConfig(HERO_MOBILE_GLASS_PRESET.config ?? {})}
            xChannelSelector="R"
            yChannelSelector="G"
            result="displaced"
          />
          <feColorMatrix
            in="displaced"
            type="saturate"
            values="2"
            result="displaced_sat"
          />
          <feImage
            href="/images/glass-specular-hero-mobile.png"
            x="0"
            y="0"
            width={HERO_MOBILE_GLASS_PRESET.width}
            height={HERO_MOBILE_GLASS_PRESET.height}
            result="spec_layer"
          />
          <feComposite
            in="displaced_sat"
            in2="spec_layer"
            operator="in"
            result="spec_masked"
          />
          <feComponentTransfer in="spec_layer" result="spec_faded">
            <feFuncA type="linear" slope="1" />
          </feComponentTransfer>
          <feBlend
            in="spec_masked"
            in2="displaced"
            mode="normal"
            result="with_sat"
          />
          <feBlend in="spec_faded" in2="with_sat" mode="normal" />
        </filter>
      </defs>
    </svg>
  );
}

export default function SectionEight() {
  const ctasRef = useRef<HTMLDivElement>(null);
  const sentViewRef = useRef(false);

  useEffect(() => {
    const el = ctasRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (!entry?.isIntersecting || sentViewRef.current) return;
        sentViewRef.current = true;
        trackEvent("cta_section_view", { location: "footer" });
      },
      { threshold: 0.25, rootMargin: "0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="section-eight">
      <StaticGlassFilterDefs />
      <div className="section-eight__bg" aria-hidden />
      <LiquidGlassBox
        className="section-eight__glass"
        filterId="static-glass-section8"
      >
        <div className="section-eight__content">
          <h2 className="section-eight__title">
            Teamocracy — це нова культура
            <br />
            командної взаємодії
          </h2>
          <p className="section-eight__text">
            <b>Ніхто не вигадував Teamocracy.</b>
            <br />
            Як і все інше, вона існувала собі у Всесвіті, допоки хтось не
            звернув на неї увагу.
            <br />
            Все, що ми зробили, так це просто дали ім&apos;я принципам, що
            дозволяють краще
            <br />
            співпрацювати командам.
          </p>
          <div ref={ctasRef} className="section-eight__ctas">
            <a
              href="https://t.me/teamocracy_org"
              target="_blank"
              rel="noopener noreferrer"
              className="section-eight__cta"
              onClick={() => {
                trackEvent("cta_click", {
                  location: "footer",
                  channel: "telegram",
                  link_url: "https://t.me/teamocracy_org",
                });
              }}
            >
              <span className="section-eight__cta-label">
                Cлідкуй
                <br />
                за оновленнями
              </span>
              <div className="section-eight__cta-icon">
                <CtaIconBox>
                  <IconCta1 />
                </CtaIconBox>
              </div>
            </a>
            <a
              href="https://www.threads.com/@teamocracy_org?xmt=AQF0uodeJ37d4FpsOMlBNTDKJgTW5Qe39K6BE3CuRn-YfkY"
              target="_blank"
              rel="noopener noreferrer"
              className="section-eight__cta"
              onClick={() => {
                trackEvent("cta_click", {
                  location: "footer",
                  channel: "threads",
                  link_url: "https://www.threads.com/@teamocracy_org",
                });
              }}
            >
              <span className="section-eight__cta-label">
                Долучитись
                <br />
                до обговорення
              </span>
              <div className="section-eight__cta-icon">
                <CtaIconBox>
                  <IconCta2 />
                </CtaIconBox>
              </div>
            </a>
          </div>
        </div>
      </LiquidGlassBox>
      <GlassNoiseOverlay />
    </section>
  );
}
