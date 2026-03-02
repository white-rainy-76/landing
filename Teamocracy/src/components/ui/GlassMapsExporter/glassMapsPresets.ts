import type { GlassFilterConfig } from "../../../utils/liquidGlass";
import type { GlassExportPreset } from "./GlassMapsExporter";

/**
 * Пресеты для экспорта карт стекла.
 * Меняй размеры и конфиг здесь — в dev внизу страницы появятся кнопки Export.
 * Сохраняй скачанные PNG в public/images/ (glass-displacement-{name}.png, glass-specular-{name}.png).
 */
export const GLASS_MAPS_PRESETS: GlassExportPreset[] = [
  {
    name: "desktop",
    width: 1500,
    height: 518,
    config: {
      borderRadius: 24,
      glassThickness: 80,
      bezelWidth: 36,
      refractiveIndex: 2.2,
      scaleRatio: 1.0,
      blurAmount: 0.5,
      specularOpacity: 1.0,
      specularSaturation: 2,
      surfaceKey: "convex_squircle",
    } as Partial<GlassFilterConfig>,
  },
  {
    name: "mobile",
    width: 378,
    height: 201,
    config: {
      borderRadius: 16,
      glassThickness: 60,
      bezelWidth: 24,
      refractiveIndex: 2.2,
      scaleRatio: 1.0,
      blurAmount: 0.5,
      specularOpacity: 1.0,
      specularSaturation: 2,
      surfaceKey: "convex_squircle",
    } as Partial<GlassFilterConfig>,
  },
  /** Hero: 378×201, borderRadius 20 — экспортируй и сохрани в public/images/ как glass-displacement-hero.png, glass-specular-hero.png */
  {
    name: "hero",
    width: 378,
    height: 201,
    config: {
      borderRadius: 20,
      glassThickness: 60,
      bezelWidth: 24,
      refractiveIndex: 2.2,
      scaleRatio: 1.0,
      blurAmount: 0.5,
      specularOpacity: 1.0,
      specularSaturation: 2,
      surfaceKey: "convex_squircle",
    } as Partial<GlassFilterConfig>,
  },
  /** Hero mobile: 195×104 — экспортируй и сохрани как glass-displacement-hero-mobile.png, glass-specular-hero-mobile.png */
  {
    name: "hero-mobile",
    width: 195,
    height: 104,
    config: {
      borderRadius: 10.34,
      glassThickness: 40,
      bezelWidth: 16,
      refractiveIndex: 2.2,
      scaleRatio: 1.0,
      blurAmount: 0.5,
      specularOpacity: 1.0,
      specularSaturation: 2,
      surfaceKey: "convex_squircle",
    } as Partial<GlassFilterConfig>,
  },
  {
    name: "tablet",
    width: 1500,
    height: 718,
    config: {
      borderRadius: 24,
      glassThickness: 80,
      bezelWidth: 36,
      refractiveIndex: 2.2,
      scaleRatio: 1.0,
      blurAmount: 0.5,
      specularOpacity: 1.0,
      specularSaturation: 2,
      surfaceKey: "convex_squircle",
    } as Partial<GlassFilterConfig>,
  },
  /** Секция 8: 907×716 — с 1230px до мобилы. Экспорт → glass-displacement-section8-1230.png, glass-specular-section8-1230.png */
  {
    name: "section8-1230",
    width: 907,
    height: 716,
    config: {
      borderRadius: 24,
      glassThickness: 80,
      bezelWidth: 36,
      refractiveIndex: 2.2,
      scaleRatio: 1.0,
      blurAmount: 0.5,
      specularOpacity: 1.0,
      specularSaturation: 2,
      surfaceKey: "convex_squircle",
    } as Partial<GlassFilterConfig>,
  },
];

/** Пресет hero для фильтра: те же размеры и конфиг, что при экспорте. Используется в static-glass-hero. */
export const HERO_GLASS_PRESET: GlassExportPreset = GLASS_MAPS_PRESETS.find(
  (p) => p.name === "hero",
)!;

/** Пресет hero mobile (195×104) для фильтра static-glass-hero-mobile. */
export const HERO_MOBILE_GLASS_PRESET: GlassExportPreset =
  GLASS_MAPS_PRESETS.find((p) => p.name === "hero-mobile")!;
