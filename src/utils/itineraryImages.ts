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

/** @deprecated Use getHeroImage(isDark) */
export const HERO_IMAGE = `${BASE}images/trip/dark/hero.jpg`;
