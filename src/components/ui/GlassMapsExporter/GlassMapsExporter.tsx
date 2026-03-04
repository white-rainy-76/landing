import { getGlassMapDataUrls } from "../../../utils/liquidGlass";
import type { GlassFilterConfig } from "../../../utils/liquidGlass";
import "./GlassMapsExporter.css";

function downloadDataUrl(filename: string, dataUrl: string) {
  const a = document.createElement("a");
  a.href = dataUrl;
  a.download = filename;
  a.click();
}

export interface GlassExportPreset {
  /** Label for the button and suffix in filenames (e.g. "desktop" → glass-displacement-desktop.png) */
  name: string;
  width: number;
  height: number;
  /** Optional glass config (radius, bezel, etc.) */
  config?: Partial<GlassFilterConfig>;
}

export interface GlassMapsExporterProps {
  /** Presets to export; each becomes a button "Export {name} (width×height)" */
  presets: GlassExportPreset[];
  className?: string;
}

/**
 * Helper component to export displacement/specular maps to PNG.
 * Renders only in dev (import.meta.env.DEV) when you need to regenerate static glass maps.
 */
export default function GlassMapsExporter({
  presets,
  className,
}: GlassMapsExporterProps) {
  if (import.meta.env.PROD) return null;

  const handleExport = (preset: GlassExportPreset) => {
    const { displacementDataUrl, specularDataUrl } = getGlassMapDataUrls(
      preset.width,
      preset.height,
      preset.config,
    );
    const suffix = preset.name ? `-${preset.name}` : "";
    downloadDataUrl(`glass-displacement${suffix}.png`, displacementDataUrl);
    setTimeout(
      () => downloadDataUrl(`glass-specular${suffix}.png`, specularDataUrl),
      300,
    );
  };

  return (
    <div
      className={["glass-maps-exporter", className].filter(Boolean).join(" ")}
    >
      {presets.map((preset) => (
        <button
          key={preset.name}
          type="button"
          onClick={() => handleExport(preset)}
        >
          Export {preset.name} ({preset.width}×{preset.height})
        </button>
      ))}
    </div>
  );
}
