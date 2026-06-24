const BASE = import.meta.env.BASE_URL;

type ThemeMode = 'dark' | 'light';

function themeFolder(isDark: boolean): ThemeMode {
  return isDark ? 'dark' : 'light';
}

/** Map attraction id → itinerary day date for shared trip photography */
const ATTRACTION_DAY_MAP: Record<string, string> = {
  'la-rambla': '2026-10-16',
  'gothic-quarter': '2026-10-16',
  'sagrada-familia': '2026-10-17',
  'casa-batllo': '2026-10-17',
  boqueria: '2026-10-17',
  'park-guell': '2026-10-18',
  barceloneta: '2026-10-18',
  mnac: '2026-10-19',
  'joan-miro': '2026-10-19',
  montjuic: '2026-10-19',
  'casa-mila': '2026-10-20',
  'picasso-museum': '2026-10-20',
  'el-born': '2026-10-23',
  'camp-nou': '2026-10-21',
  macba: '2026-10-21',
  tibidabo: '2026-10-22',
};

export function getHeroImage(isDark: boolean): string {
  return `${BASE}images/trip/${themeFolder(isDark)}/hero.jpg`;
}

export function getItineraryDayImage(day: { date: string }, isDark: boolean): string {
  return `${BASE}images/trip/${themeFolder(isDark)}/day-${day.date}.jpg`;
}

export function getAttractionImage(attractionId: string, isDark: boolean): string {
  const day = ATTRACTION_DAY_MAP[attractionId] ?? '2026-10-17';
  return `${BASE}images/trip/${themeFolder(isDark)}/day-${day}.jpg`;
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
