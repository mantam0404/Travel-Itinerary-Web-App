import type { ItineraryDay } from '../data/tripData';

const BASE = import.meta.env.BASE_URL;

type ThemeMode = 'dark' | 'light';

function themeFolder(isDark: boolean): ThemeMode {
  return isDark ? 'dark' : 'light';
}

export function getHeroImage(isDark: boolean): string {
  return `${BASE}images/trip/${themeFolder(isDark)}/hero.jpg`;
}

export function getItineraryDayImage(day: ItineraryDay, isDark: boolean): string {
  return `${BASE}images/trip/${themeFolder(isDark)}/day-${day.date}.jpg`;
}

/** @deprecated Use getHeroImage(isDark) */
export const HERO_IMAGE = `${BASE}images/trip/dark/hero.jpg`;
