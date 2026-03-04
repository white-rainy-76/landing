# Генератор стекляних карт (Glass Maps Exporter)

Компонент для експорту **displacement** та **specular** карт у PNG. Ці картинки потрібні для статичних SVG-фільтрів ефекту «рідкого скла» на лендингу.

## Коли використовувати

- Потрібно змінити розмір або форму скляного блоку (новий breakpoint, інший radius).
- Потрібно оновити текстури після зміни параметрів у `liquidGlass.ts` (наприклад, профіль поверхні, товщина скла).
- Додається новий блок з ефектом скла з іншими розмірами.

## Увімкнення генератора

Генератор **показується тільки в режимі розробки** (`npm run dev`). У продакшен-білді він не рендериться.

1. Відкрийте `src/App.tsx`.
2. Розкоментуйте імпорт і компонент:

```tsx
import GlassMapsExporter from "./components/ui/GlassMapsExporter/GlassMapsExporter";
import { GLASS_MAPS_PRESETS } from "./components/ui/GlassMapsExporter/glassMapsPresets";

// У JSX, наприклад після SectionEight:
<GlassMapsExporter
  presets={GLASS_MAPS_PRESETS}
  className="glass-maps-exporter-app"
/>
```

3. Запустіть `npm run dev` і відкрийте сторінку — внизу з’являться кнопки типу **Export hero (378×201)**.

## Як користуватися

1. **Запустіть проект у dev:** `npm run dev`.
2. Прокрутіть сторінку вниз до блоку з кнопками експорту.
3. Натисніть потрібну кнопку, наприклад **Export hero (378×201)**.
4. У браузері завантажаться два файли:
   - `glass-displacement-{name}.png`
   - `glass-specular-{name}.png`
5. **Збережіть їх у проєкт:** скопіюйте обидва файли в `public/images/`, зберігаючи імена (наприклад `glass-displacement-hero.png`, `glass-specular-hero.png`).
6. Після цього статичні SVG-фільтри (які посилаються на ці PNG з `public/images/`) почнуть використовувати нові картинки. Оновлення сторінки достатньо.

Після експорту можна знову закоментувати `GlassMapsExporter` у `App.tsx`, щоб кнопки не займали місце на сторінці.

## Пресети

Пресети описані в `src/components/ui/GlassMapsExporter/glassMapsPresets.ts`.

| Preset          | Розмір (width×height) | Призначення |
|-----------------|------------------------|-------------|
| `desktop`       | 1500×518               | Секція 8, десктоп |
| `tablet`        | 1500×718               | Секція 8, планшет |
| `section8-1230` | 907×716                | Секція 8, ширина ≤1230px |
| `hero`          | 378×201                | Hero, цитата (desktop) |
| `hero-mobile`   | 195×104                | Hero, цитата (mobile) |
| `mobile`        | 378×201                | Загальний mobile |

Після експорту файли потрібно зберегти під такими іменами в `public/images/`:

- `glass-displacement-{name}.png` / `glass-specular-{name}.png`  
  наприклад: `glass-displacement-hero.png`, `glass-specular-hero.png`.

Якщо ім’я пресету змінити або додати новий — відповідно змінюються імена файлів, які генеруються (і куди їх потрібно класти в `public/images/`).

## Додавання нового пресету

У `glassMapsPresets.ts` додайте об’єкт у масив `GLASS_MAPS_PRESETS`:

```ts
{
  name: "my-block",       // суфікс у іменах файлів: glass-displacement-my-block.png
  width: 400,
  height: 220,
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
  },
}
```

Параметри `config` (опційно, решта береться з дефолтів у `liquidGlass.ts`):

| Параметр           | Опис |
|--------------------|------|
| `borderRadius`      | Радіус скруглення кута (px). |
| `glassThickness`    | Товщина «скла». |
| `bezelWidth`        | Ширина фаски/безеля. |
| `refractiveIndex`   | Коефіцієнт заломлення. |
| `scaleRatio`        | Множник для сили displacement. |
| `blurAmount`        | Сила розмиття під стеклом (у SVG). |
| `specularOpacity`   | Прозорість блику. |
| `specularSaturation`| Насиченість після displacement. |
| `surfaceKey`        | Профіль поверхні: `"convex_squircle"`, `"convex_circle"`, `"lip"`. |

Після експорту збережіть `glass-displacement-my-block.png` та `glass-specular-my-block.png` у `public/images/` і підключіть їх у своєму SVG-фільтрі (за аналогією з існуючими статичними фільтрами у секціях Hero / SectionEight).

## Де використовуються згенеровані PNG

- **Hero:** `glass-displacement-hero.png`, `glass-specular-hero.png` (і mobile-варіанти) — підключаються в статичних SVG-фільтрах у Hero та в SectionEight.
- **Секція 8:** різні розміри (desktop, tablet, section8-1230, mobile) — у відповідних статичних фільтрах у `SectionEight.tsx` / пов’язаних компонентах.

У коді шлях до картинок задається як `/images/glass-displacement-{name}.png` (файли лежать у `public/images/`).

## Технічні деталі

- Генерація карт виконується в `src/utils/liquidGlass.ts`: функції `getGlassMapDataUrls()`, `generateDisplacementMap()`, `generateSpecularMap()`.
- Компонент лише викликає `getGlassMapDataUrls(width, height, config)` і ініціює завантаження отриманих Data URL як PNG.
- У продакшені компонент не рендериться (`if (import.meta.env.PROD) return null`), тому кнопки експорту на проді не показуються.
