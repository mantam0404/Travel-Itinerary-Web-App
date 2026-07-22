const BASE = import.meta.env.BASE_URL;

type ThemeMode = 'dark' | 'light';

function themeFolder(isDark: boolean): ThemeMode {
  return isDark ? 'dark' : 'light';
}

export function getHeroImage(isDark: boolean): string {
  return `${BASE}images/trip/${themeFolder(isDark)}/hero.jpg`;
}

export function getItineraryDayImage(
  day: { date: string; activities?: { attractionId?: string }[] },
  isDark: boolean,
): string {
  return `${BASE}images/trip/${themeFolder(isDark)}/day-${day.date}.jpg`;
}

/** Fallback when a per-day trip image is missing from the bundle. */
export function getItineraryDayImageFallback(
  day: { date: string; activities?: { attractionId?: string }[] },
  isDark: boolean,
): string {
  if (day.date === '2026-07-25') {
    return `${BASE}images/attractions/day-2026-07-25-cover.jpg`;
  }
  if (day.date === '2026-07-26') {
    return `${BASE}images/attractions/day-2026-07-26-cover.jpg`;
  }
  const attractionId = day.activities?.find((a) => a.attractionId)?.attractionId;
  if (attractionId) return getAttractionHeroImage(attractionId);
  return getHeroImage(isDark);
}

export function getAttractionImage(attractionId: string, isDark: boolean): string {
  return `${BASE}images/attractions/${themeFolder(isDark)}/${attractionId}.jpg`;
}

export function getAttractionHeroImage(attractionId: string): string {
  return `${BASE}images/attractions/${attractionId}-hero.jpg`;
}

export const MAP_TILES = {
  light: {
    url: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
  },
  dark: {
    url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
  },
} as const;

/** @deprecated Use getHeroImage(isDark) */
export const HERO_IMAGE = `${BASE}images/trip/dark/hero.jpg`;
