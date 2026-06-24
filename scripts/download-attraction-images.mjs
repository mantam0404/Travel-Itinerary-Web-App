import sharp from 'sharp';
import { mkdir, readFile, writeFile, access } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const outRoot = path.join(root, 'public/images/attractions');
const sourcesPath = path.join(__dirname, 'attraction-sources.json');
const markerSize = 320;
const heroSize = 960;

const BACKGROUNDS = {
  light: { r: 246, g: 247, b: 249, alpha: 1 },
  dark: { r: 18, g: 20, b: 26, alpha: 1 },
};

async function downloadImage(url, retries = 4) {
  for (let attempt = 0; attempt <= retries; attempt += 1) {
    const response = await fetch(url, {
      headers: { 'User-Agent': 'Travel-Itinerary-Web-App/1.0 (educational PWA)' },
    });
    if (response.ok) {
      return Buffer.from(await response.arrayBuffer());
    }
    if (response.status === 429 && attempt < retries) {
      await new Promise((resolve) => setTimeout(resolve, 1500 * (attempt + 1)));
      continue;
    }
    throw new Error(`Failed to download ${url}: ${response.status}`);
  }
  throw new Error(`Failed to download ${url}`);
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function exists(filePath) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

const sources = JSON.parse(await readFile(sourcesPath, 'utf8'));
await mkdir(outRoot, { recursive: true });

for (const [attractionId, meta] of Object.entries(sources)) {
  const heroPath = path.join(outRoot, `${attractionId}-hero.jpg`);
  const lightMarker = path.join(outRoot, 'light', `${attractionId}.jpg`);
  const darkMarker = path.join(outRoot, 'dark', `${attractionId}.jpg`);
  const force = process.env.FORCE_IMAGES === '1';

  if (!force && (await exists(heroPath)) && (await exists(lightMarker)) && (await exists(darkMarker))) {
    console.log(`Skipping ${attractionId} (cached)`);
    continue;
  }

  console.log(`Downloading ${attractionId}…`);
  const buffer = await downloadImage(meta.url);

  for (const theme of ['light', 'dark']) {
    const outDir = path.join(outRoot, theme);
    await mkdir(outDir, { recursive: true });

    let pipeline = sharp(buffer).resize(markerSize, markerSize, {
      fit: 'contain',
      background: BACKGROUNDS[theme],
    });

    if (theme === 'dark') {
      pipeline = pipeline.modulate({ brightness: 0.9, saturation: 0.94 });
    }

    await pipeline.jpeg({ quality: 86 }).toFile(path.join(outDir, `${attractionId}.jpg`));
  }

  await sharp(buffer)
    .resize(heroSize, Math.round(heroSize * 0.62), {
      fit: 'cover',
      position: 'centre',
    })
    .jpeg({ quality: 88 })
    .toFile(path.join(outRoot, `${attractionId}-hero.jpg`));

  await sleep(800);
}

await writeFile(
  path.join(outRoot, 'sources.json'),
  JSON.stringify({ updated: new Date().toISOString(), sources }, null, 2),
);

console.log(`Processed ${Object.keys(sources).length} unique attraction images.`);
