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
  /** Подпись на кнопке и суффикс в имени файла (например "desktop" → glass-displacement-desktop.png). */
  name: string;
  width: number;
  height: number;
  /** Опциональный конфиг стекла (radius, bezel и т.д.). */
  config?: Partial<GlassFilterConfig>;
}

export interface GlassMapsExporterProps {
  /** Список пресетов: для каждого будет кнопка "Export {name} (width×height)". */
  presets: GlassExportPreset[];
  className?: string;
}

/**
 * Компонент для однократного экспорта карт смещения и блика в PNG.
 * Рендерится только в dev (import.meta.env.DEV).
 * Подключи в нужном месте, когда нужно сгенерировать/обновить карты для статичного стекла.
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
