import { useEffect, useState } from "react";
import "./ManifestoScrollModal.css";
import LiquidGlassBox from "../LiquidGlassBox/LiquidGlassBox";
import ManifestoDownloadButton from "../ManifestoDownloadButton/ManifestoDownloadButton";
import type { Lang } from "../../../i18n/types";
import { DICTIONARY } from "../../../i18n/dictionary";
import manifestoPdfUrl from "../../../assets/Teamocracy_Manifesto.pdf?url";
import { trackEvent } from "../../../utils/analytics";

const MODAL_WIDTH = 957;
const MODAL_HEIGHT = 590;
const MODAL_SCALE = 52;

const MODAL_SCALE_MOBILE = 40;

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

function ModalGlassFilterDefs() {
  return (
    <svg
      aria-hidden
      style={{ position: "absolute", width: 0, height: 0 }}
      colorInterpolationFilters="sRGB"
    >
      <defs>
        <filter
          id="static-glass-manifesto-modal"
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
            width={MODAL_WIDTH}
            height={MODAL_HEIGHT}
            preserveAspectRatio="none"
            result="disp_map"
          />
          <feDisplacementMap
            in="blurred_source"
            in2="disp_map"
            scale={MODAL_SCALE}
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
            width={MODAL_WIDTH}
            height={MODAL_HEIGHT}
            preserveAspectRatio="none"
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
          id="static-glass-manifesto-modal-mobile"
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
            href="/images/glass-displacement.png"
            x="0"
            y="0"
            width="100%"
            height="100%"
            preserveAspectRatio="none"
            result="disp_map"
          />
          <feDisplacementMap
            in="blurred_source"
            in2="disp_map"
            scale={MODAL_SCALE_MOBILE}
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
            width="100%"
            height="100%"
            preserveAspectRatio="none"
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

function CloseIcon() {
  return (
    <svg
      width="60"
      height="60"
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <rect
        className="manifesto-close__ring"
        x="2"
        y="2"
        width="55.8025"
        height="55.8025"
        rx="27.9012"
        stroke="currentColor"
        strokeWidth="4"
      />
      <rect
        className="manifesto-close__bar"
        x="14.3447"
        y="42.629"
        width="40"
        height="4"
        rx="2"
        transform="rotate(-45 14.3447 42.629)"
        fill="currentColor"
      />
      <rect
        className="manifesto-close__bar"
        x="42.629"
        y="45.4574"
        width="40"
        height="4"
        rx="2"
        transform="rotate(-135 42.629 45.4574)"
        fill="currentColor"
      />
    </svg>
  );
}

export default function ManifestoScrollModal({
  lang,
  isOpen,
  onClose,
}: {
  lang: Lang;
  isOpen: boolean;
  onClose: () => void;
}) {
  const t = DICTIONARY[lang].manifestoModal;
  const [isNarrowViewport, setIsNarrowViewport] = useState(false);

  useEffect(() => {
    const update = () => setIsNarrowViewport(window.innerWidth <= 768);
    update();
    window.addEventListener("resize", update, { passive: true });
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) return;
    trackEvent("manifesto_modal_open", { location: "scroll_30pct" });
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="manifesto-scroll-modal__overlay"
      role="presentation"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <ModalGlassFilterDefs />
      <GlassNoiseOverlay />
      <LiquidGlassBox
        className="manifesto-scroll-modal"
        contentClassName="manifesto-scroll-modal__content"
        filterId={
          isNarrowViewport
            ? "static-glass-manifesto-modal-mobile"
            : "static-glass-manifesto-modal"
        }
        borderRadius={isNarrowViewport ? 12 : 20.49}
      >
        <button
          type="button"
          className="manifesto-scroll-modal__close"
          onClick={onClose}
          aria-label={lang === "ua" ? "Закрити" : "Close"}
        >
          <CloseIcon />
        </button>

        <div className="manifesto-scroll-modal__center">
          <div className="manifesto-scroll-modal__title">{t.title}</div>
          <div className="manifesto-scroll-modal__subtitle">{t.subtitle}</div>
          <ManifestoDownloadButton
            className="manifesto-scroll-modal__btn"
            href={manifestoPdfUrl}
            download="Teamocracy_Manifesto.pdf"
            label={t.buttonLabel}
            onClick={() => {
              trackEvent("cta_click", {
                location: "modal",
                channel: "manifesto",
                link_url: manifestoPdfUrl,
              });
            }}
          />
        </div>
      </LiquidGlassBox>
    </div>
  );
}

