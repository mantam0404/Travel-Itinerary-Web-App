/**
 * Generates Guangzhou trip hero + per-day images from attraction photos.
 */
import { copyFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const attractions = path.join(root, 'public/images/attractions');
const trip = path.join(root, 'public/images/trip');

const DAY_SOURCES = {
  '2026-07-25': 'yongqing-fang-hero.jpg',
  '2026-07-26': 'canton-tower-hero.jpg',
};

async function copy(src, dest) {
  await mkdir(path.dirname(dest), { recursive: true });
  await copyFile(src, dest);
}

const heroSrc = path.join(attractions, 'canton-tower-hero.jpg');

for (const theme of ['dark', 'light']) {
  const tripDir = path.join(trip, theme);
  await copy(heroSrc, path.join(tripDir, 'hero.jpg'));

  for (const [date, source] of Object.entries(DAY_SOURCES)) {
    await copy(path.join(attractions, source), path.join(tripDir, `day-${date}.jpg`));
  }
}

console.log('Generated Guangzhou trip hero + day images');
