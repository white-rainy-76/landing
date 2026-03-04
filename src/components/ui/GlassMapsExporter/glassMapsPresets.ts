import type { GlassFilterConfig } from "../../../utils/liquidGlass";
import type { GlassExportPreset } from "./GlassMapsExporter";

/**
 * Presets used to export glass maps.
 * Tune sizes and config here — in dev you'll see Export buttons for each preset.
 * Save the generated PNGs to public/images/ as glass-displacement-{name}.png and glass-specular-{name}.png.
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
  /** Hero: 378×201, borderRadius 20 — export and save as glass-displacement-hero.png / glass-specular-hero.png in public/images/ */
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
  /** Hero mobile: 195×104 — export as glass-displacement-hero-mobile.png / glass-specular-hero-mobile.png */
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
  /** Section 8: 907×716 (1230px down to mobile). Export as glass-displacement-section8-1230.png / glass-specular-section8-1230.png */
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

/** Hero preset for the SVG filter: same size/config as exported maps, used by static-glass-hero */
export const HERO_GLASS_PRESET: GlassExportPreset = GLASS_MAPS_PRESETS.find(
  (p) => p.name === "hero",
)!;

/** Hero mobile preset (195×104) for static-glass-hero-mobile filter */
export const HERO_MOBILE_GLASS_PRESET: GlassExportPreset =
  GLASS_MAPS_PRESETS.find((p) => p.name === "hero-mobile")!;
