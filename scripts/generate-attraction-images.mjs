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

function cropOffset(id, width, height) {
  const hash = [...id].reduce((sum, char) => sum + char.charCodeAt(0), 0);
  const maxLeft = Math.max(0, width - size);
  const maxTop = Math.max(0, height - size);
  return {
    left: Math.floor(((hash * 37) % 997) / 997 * maxLeft),
    top: Math.floor(((hash * 53) % 991) / 991 * maxTop),
  };
}

for (const theme of ['dark', 'light']) {
  const outDir = path.join(outRoot, theme);
  await mkdir(outDir, { recursive: true });

  for (const [attractionId, day] of Object.entries(ATTRACTION_DAY_MAP)) {
    const sourcePath = path.join(tripDir, theme, `day-${day}.jpg`);
    const meta = await sharp(sourcePath).metadata();
    const srcWidth = meta.width ?? size;
    const srcHeight = meta.height ?? size;
    const cropWidth = Math.min(size, srcWidth);
    const cropHeight = Math.min(size, srcHeight);
    const { left, top } = cropOffset(attractionId, srcWidth - cropWidth + 1, srcHeight - cropHeight + 1);

    await sharp(sourcePath)
      .extract({ left, top, width: cropWidth, height: cropHeight })
      .resize(size, size, { fit: 'cover' })
      .jpeg({ quality: 82 })
      .toFile(path.join(outDir, `${attractionId}.jpg`));
  }
}

console.log(`Generated ${Object.keys(ATTRACTION_DAY_MAP).length * 2} attraction thumbnails.`);
