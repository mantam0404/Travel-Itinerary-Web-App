const BASE = import.meta.env.BASE_URL;

type ThemeMode = 'dark' | 'light';

function themeFolder(isDark: boolean): ThemeMode {
  return isDark ? 'dark' : 'light';
}

export function getHeroImage(isDark: boolean): string {
  return `${BASE}images/trip/${themeFolder(isDark)}/hero.jpg`;
}

export function getItineraryDayImage(day: { date: string }, isDark: boolean): string {
  return `${BASE}images/trip/${themeFolder(isDark)}/day-${day.date}.jpg`;
}

export function getAttractionImage(attractionId: string, isDark: boolean): string {
  return `${BASE}images/attractions/${themeFolder(isDark)}/${attractionId}.jpg`;
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
