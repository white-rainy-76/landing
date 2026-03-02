/**
 * Liquid Glass — подход из конструктора с physics-based refraction.
 * Настройки задаются через конфиг, фильтр пересобирается при изменении размеров/конфига.
 * SVG backdrop-filter поддерживается в Chrome/Chromium.
 */

const SURFACE_FNS: Record<string, (x: number) => number> = {
  convex_squircle: (x) => Math.pow(1 - Math.pow(1 - x, 4), 0.25),
  convex_circle: (x) => Math.sqrt(1 - (1 - x) * (1 - x)),
  lip: (x) => {
    const convex = Math.pow(1 - Math.pow(1 - Math.min(x * 2, 1), 4), 0.25);
    const concave = 1 - Math.sqrt(1 - (1 - x) * (1 - x)) + 0.1;
    const t = 6 * x ** 5 - 15 * x ** 4 + 10 * x ** 3;
    return convex * (1 - t) + concave * t;
  },
};

function calculateRefractionProfile(
  glassThickness: number,
  bezelWidth: number,
  heightFn: (x: number) => number,
  ior: number,
  samples: number = 128
): Float64Array {
  const eta = 1 / ior;
  function refract(nx: number, ny: number): [number, number] | null {
    const dot = ny;
    const k = 1 - eta * eta * (1 - dot * dot);
    if (k < 0) return null;
    const sq = Math.sqrt(k);
    return [-(eta * dot + sq) * nx, eta - (eta * dot + sq) * ny];
  }
  const profile = new Float64Array(samples);
  for (let i = 0; i < samples; i++) {
    const x = i / samples;
    const y = heightFn(x);
    const dx = x < 1 ? 0.0001 : -0.0001;
    const y2 = heightFn(x + dx);
    const deriv = (y2 - y) / dx;
    const mag = Math.sqrt(deriv * deriv + 1);
    const ref = refract(-deriv / mag, -1 / mag);
    if (!ref) {
      profile[i] = 0;
      continue;
    }
    profile[i] = ref[0] * ((y * bezelWidth + glassThickness) / ref[1]);
  }
  return profile;
}

/** Экспорт: вычисляет scale для feDisplacementMap по конфигу (без генерации карт). */
export function getScaleForConfig(config: Partial<GlassFilterConfig>): number {
  const {
    borderRadius: radius,
    glassThickness: glassThick,
    bezelWidth: bezelW,
    refractiveIndex: ior,
    scaleRatio,
    surfaceKey = "convex_squircle",
  } = { ...DEFAULT_GLASS_CONFIG, ...config };
  const heightFn = SURFACE_FNS[surfaceKey] ?? SURFACE_FNS.convex_squircle;
  const clampedBezel = Math.min(
    bezelW,
    radius - 1,
    10000
  );
  const profile = calculateRefractionProfile(
    glassThick,
    clampedBezel,
    heightFn,
    ior,
    128
  );
  const maxDisp = Math.max(...Array.from(profile).map(Math.abs)) || 1;
  return maxDisp * scaleRatio;
}

/** Экспорт: генерирует data URL карт для заданных размеров (для однократного экспорта в PNG). */
export function getGlassMapDataUrls(
  w: number,
  h: number,
  config: Partial<GlassFilterConfig> = {}
): { displacementDataUrl: string; specularDataUrl: string; scale: number } {
  const {
    borderRadius: radius,
    glassThickness: glassThick,
    bezelWidth: bezelW,
    refractiveIndex: ior,
    scaleRatio,
    surfaceKey = "convex_squircle",
  } = { ...DEFAULT_GLASS_CONFIG, ...config };
  const heightFn = SURFACE_FNS[surfaceKey] ?? SURFACE_FNS.convex_squircle;
  const clampedBezel = Math.min(bezelW, radius - 1, Math.min(w, h) / 2 - 1);
  const profile = calculateRefractionProfile(
    glassThick,
    clampedBezel,
    heightFn,
    ior,
    128
  );
  const maxDisp = Math.max(...Array.from(profile).map(Math.abs)) || 1;
  const scale = maxDisp * scaleRatio;
  const radiusLow = radius;
  const bezelLow = Math.min(
    bezelW,
    radiusLow - 1,
    Math.min(w, h) / 2 - 1
  );
  const dispUrl = generateDisplacementMap(
    w,
    h,
    radiusLow,
    bezelLow,
    profile,
    maxDisp
  );
  const specUrl = generateSpecularMap(w, h, radiusLow, bezelLow * 2.5);
  return { displacementDataUrl: dispUrl, specularDataUrl: specUrl, scale };
}

function generateDisplacementMap(
  w: number,
  h: number,
  radius: number,
  bezelWidth: number,
  profile: Float64Array,
  maxDisp: number
): string {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const ctx = c.getContext("2d")!;
  const img = ctx.createImageData(w, h);
  const d = img.data;
  for (let i = 0; i < d.length; i += 4) {
    d[i] = 128;
    d[i + 1] = 128;
    d[i + 2] = 0;
    d[i + 3] = 255;
  }
  const r = radius;
  const rSq = r * r;
  const r1Sq = (r + 1) ** 2;
  const rBSq = Math.max(r - bezelWidth, 0) ** 2;
  const wB = w - r * 2;
  const hB = h - r * 2;
  const S = profile.length;

  for (let y1 = 0; y1 < h; y1++) {
    for (let x1 = 0; x1 < w; x1++) {
      const x =
        x1 < r ? x1 - r : x1 >= w - r ? x1 - r - wB : 0;
      const y =
        y1 < r ? y1 - r : y1 >= h - r ? y1 - r - hB : 0;
      const dSq = x * x + y * y;
      if (dSq > r1Sq || dSq < rBSq) continue;
      const dist = Math.sqrt(dSq);
      const fromSide = r - dist;
      const op =
        dSq < rSq
          ? 1
          : 1 -
            (dist - Math.sqrt(rSq)) /
              (Math.sqrt(r1Sq) - Math.sqrt(rSq));
      if (op <= 0 || dist === 0) continue;
      const cos = x / dist;
      const sin = y / dist;
      const bi = Math.min(
        ((fromSide / bezelWidth) * S) | 0,
        S - 1
      );
      const disp = profile[bi] || 0;
      const dX = (-cos * disp) / maxDisp;
      const dY = (-sin * disp) / maxDisp;
      const idx = (y1 * w + x1) * 4;
      d[idx] = (128 + dX * 127 * op + 0.5) | 0;
      d[idx + 1] = (128 + dY * 127 * op + 0.5) | 0;
    }
  }
  ctx.putImageData(img, 0, 0);
  return c.toDataURL();
}

function generateSpecularMap(
  w: number,
  h: number,
  radius: number,
  bezelWidth: number,
  angle: number = Math.PI / 3
): string {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const ctx = c.getContext("2d")!;
  const img = ctx.createImageData(w, h);
  const d = img.data;
  d.fill(0);

  const r = radius;
  const rSq = r * r;
  const r1Sq = (r + 1) ** 2;
  const rBSq = Math.max(r - bezelWidth, 0) ** 2;
  const wB = w - r * 2;
  const hB = h - r * 2;
  const sv = [Math.cos(angle), Math.sin(angle)];

  for (let y1 = 0; y1 < h; y1++) {
    for (let x1 = 0; x1 < w; x1++) {
      const x =
        x1 < r ? x1 - r : x1 >= w - r ? x1 - r - wB : 0;
      const y =
        y1 < r ? y1 - r : y1 >= h - r ? y1 - r - hB : 0;
      const dSq = x * x + y * y;
      if (dSq > r1Sq || dSq < rBSq) continue;
      const dist = Math.sqrt(dSq);
      const fromSide = r - dist;
      const op =
        dSq < rSq
          ? 1
          : 1 -
            (dist - Math.sqrt(rSq)) /
              (Math.sqrt(r1Sq) - Math.sqrt(rSq));
      if (op <= 0 || dist === 0) continue;
      const cos = x / dist;
      const sin = -y / dist;
      const dot = Math.abs(cos * sv[0] + sin * sv[1]);
      const edge = Math.sqrt(Math.max(0, 1 - (1 - fromSide) ** 2));
      const coeff = dot * edge;
      const col = (255 * coeff) | 0;
      const alpha = (col * coeff * op) | 0;
      const idx = (y1 * w + x1) * 4;
      d[idx] = col;
      d[idx + 1] = col;
      d[idx + 2] = col;
      d[idx + 3] = alpha;
    }
  }
  ctx.putImageData(img, 0, 0);
  return c.toDataURL();
}

export interface GlassFilterConfig {
  /** Радиус скругления (px) */
  borderRadius: number;
  /** Толщина стекла */
  glassThickness: number;
  /** Ширина фаски (bezel) */
  bezelWidth: number;
  /** Показатель преломления */
  refractiveIndex: number;
  /** Множитель масштаба смещения */
  scaleRatio: number;
  /** Размытие фона */
  blurAmount: number;
  /** Непрозрачность блика */
  specularOpacity: number;
  /** Насыщенность после смещения */
  specularSaturation: number;
  /** Профиль поверхности: convex_squircle | lip */
  surfaceKey?: keyof typeof SURFACE_FNS;
  /** ID фильтра в SVG (уникальный при нескольких стеклах на странице) */
  filterId?: string;
  /** Понижение разрешения карт смещения/блика (0.25–1). Меньше = быстрее, чуть менее чётко. */
  mapScaleDown?: number;
}

export const DEFAULT_GLASS_CONFIG: GlassFilterConfig = {
  borderRadius: 20,
  glassThickness: 80,
  bezelWidth: 60,
  refractiveIndex: 3.0,
  scaleRatio: 1.0,
  blurAmount: 0.3,
  specularOpacity: 0.5,
  specularSaturation: 4,
  surfaceKey: "convex_squircle",
};

const FILTER_ID = "liquid-glass-filter";

/**
 * Собирает SVG-фильтр для эффекта стекла и возвращает разметку для вставки в <defs>.
 * Размеры w/h — размеры элемента в пикселях (для карт смещения и блика).
 */
export function buildGlassFilter(
  config: Partial<GlassFilterConfig> & { width: number; height: number }
): string {
  const {
    width: w,
    height: h,
    borderRadius: radius,
    glassThickness: glassThick,
    bezelWidth: bezelW,
    refractiveIndex: ior,
    scaleRatio,
    blurAmount: blurAmt,
    specularOpacity: specOpacity,
    specularSaturation: specSat,
    surfaceKey = "convex_squircle",
    filterId = FILTER_ID,
    mapScaleDown = 1,
  } = { ...DEFAULT_GLASS_CONFIG, ...config };

  if (w < 2 || h < 2) return "";

  const scaleDown = Math.max(0.25, Math.min(1, mapScaleDown));
  const lowResW = Math.max(2, Math.floor(w * scaleDown));
  const lowResH = Math.max(2, Math.floor(h * scaleDown));
  const radiusLow = radius * scaleDown;
  const bezelLow = Math.min(
    bezelW * scaleDown,
    radiusLow - 1,
    Math.min(lowResW, lowResH) / 2 - 1
  );

  const heightFn = SURFACE_FNS[surfaceKey] ?? SURFACE_FNS.convex_squircle;
  const clampedBezel = Math.min(
    bezelW,
    radius - 1,
    Math.min(w, h) / 2 - 1
  );

  const profile = calculateRefractionProfile(
    glassThick,
    clampedBezel,
    heightFn,
    ior,
    128
  );
  const maxDisp = Math.max(...Array.from(profile).map(Math.abs)) || 1;
  const dispUrl = generateDisplacementMap(
    lowResW,
    lowResH,
    radiusLow,
    bezelLow,
    profile,
    maxDisp
  );
  const specUrl = generateSpecularMap(
    lowResW,
    lowResH,
    radiusLow,
    bezelLow * 2.5
  );
  const scale = maxDisp * scaleRatio;

  return `
    <filter id="${filterId}" x="0%" y="0%" width="100%" height="100%">
      <feGaussianBlur in="SourceGraphic" stdDeviation="${blurAmt}" result="blurred_source" />
      <feImage href="${dispUrl}" x="0" y="0" width="${w}" height="${h}" result="disp_map" />
      <feDisplacementMap in="blurred_source" in2="disp_map"
        scale="${scale}" xChannelSelector="R" yChannelSelector="G"
        result="displaced" />
      <feColorMatrix in="displaced" type="saturate" values="${specSat}" result="displaced_sat" />
      <feImage href="${specUrl}" x="0" y="0" width="${w}" height="${h}" result="spec_layer" />
      <feComposite in="displaced_sat" in2="spec_layer" operator="in" result="spec_masked" />
      <feComponentTransfer in="spec_layer" result="spec_faded">
        <feFuncA type="linear" slope="${specOpacity}" />
      </feComponentTransfer>
      <feBlend in="spec_masked" in2="displaced" mode="normal" result="with_sat" />
      <feBlend in="spec_faded" in2="with_sat" mode="normal" />
    </filter>
  `;
}

export function getGlassFilterId(): string {
  return FILTER_ID;
}
