import type { ItineraryDay } from '../data/tripData';

/** Stable picsum seeds per itinerary day for consistent preview images */
const DAY_IMAGE_SEEDS: Record<string, string> = {
  '2026-10-15': 'linear-hkg-departure',
  '2026-10-16': 'linear-barcelona-gothic',
  '2026-10-17': 'linear-sagrada-familia',
  '2026-10-18': 'linear-park-guell',
  '2026-10-19': 'linear-montjuic-night',
  '2026-10-20': 'linear-ave-madrid',
  '2026-10-21': 'linear-prado-madrid',
  '2026-10-22': 'linear-madrid-return',
  '2026-10-23': 'linear-el-born',
  '2026-10-24': 'linear-bcn-return',
};

export function getItineraryDayImage(day: ItineraryDay): string {
  const seed = DAY_IMAGE_SEEDS[day.date] ?? `linear-${day.city.replace(/\s+/g, '-').toLowerCase()}`;
  return `https://picsum.photos/seed/${seed}/640/400`;
}

export const HERO_IMAGE = 'https://picsum.photos/seed/linear-spain-hero-full/1200/800';
