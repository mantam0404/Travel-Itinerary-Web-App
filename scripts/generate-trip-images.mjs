/**
 * Generates Guangzhou trip hero + per-day images from attraction photos.
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
  '2026-07-25': 'day-2026-07-25-cover.jpg',
  '2026-07-26': 'day-2026-07-26-cover.jpg',
};

const HERO_SOURCE = 'guangzhou-hero.png';

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

console.log('Generated Guangzhou trip hero + day images');
