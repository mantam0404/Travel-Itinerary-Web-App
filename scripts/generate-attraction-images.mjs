import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const tripDir = path.join(root, 'public/images/trip');
const outRoot = path.join(root, 'public/images/attractions');
const size = 320;

/** attraction id → source day date */
const ATTRACTION_DAY_MAP = {
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

const BACKGROUNDS = {
  dark: { r: 18, g: 20, b: 26, alpha: 1 },
  light: { r: 246, g: 247, b: 249, alpha: 1 },
};

for (const theme of ['dark', 'light']) {
  const outDir = path.join(outRoot, theme);
  await mkdir(outDir, { recursive: true });

  for (const [attractionId, day] of Object.entries(ATTRACTION_DAY_MAP)) {
    const sourcePath = path.join(tripDir, theme, `day-${day}.jpg`);

    await sharp(sourcePath)
      .resize(size, size, {
        fit: 'contain',
        background: BACKGROUNDS[theme],
      })
      .jpeg({ quality: 85 })
      .toFile(path.join(outDir, `${attractionId}.jpg`));
  }
}

console.log(`Generated ${Object.keys(ATTRACTION_DAY_MAP).length * 2} attraction thumbnails.`);
