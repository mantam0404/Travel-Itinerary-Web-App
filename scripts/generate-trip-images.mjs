/**
 * Generates Portugal trip hero + per-day images from attraction photos.
 */
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const attractions = path.join(root, 'public/images/attractions');
const trip = path.join(root, 'public/images/trip');

const DAY_SOURCES = {
  '2026-10-15': 'alfama-hero.jpg',
  '2026-10-16': 'belem-tower-hero.jpg',
  '2026-10-17': 'sintra-pena-hero.jpg',
  '2026-10-18': 'lisbon-castle-hero.jpg',
  '2026-10-19': 'porto-ribeira-hero.jpg',
  '2026-10-20': 'lisbon-airport-hero.jpg',
};

const HERO_SOURCE = 'belem-tower-hero.jpg';

const heroSrc = path.join(attractions, HERO_SOURCE);

for (const theme of ['dark', 'light']) {
  const tripDir = path.join(trip, theme);
  await mkdir(tripDir, { recursive: true });
  await sharp(heroSrc)
    .resize(1200, 750, { fit: 'cover', position: 'centre' })
    .jpeg({ quality: 85 })
    .toFile(path.join(tripDir, 'hero.jpg'));

  for (const [date, source] of Object.entries(DAY_SOURCES)) {
    await sharp(path.join(attractions, source))
      .resize(480, 384, { fit: 'cover', position: 'centre' })
      .jpeg({ quality: 85 })
      .toFile(path.join(tripDir, `day-${date}.jpg`));
  }
}

console.log('Generated Portugal trip hero + day images');
