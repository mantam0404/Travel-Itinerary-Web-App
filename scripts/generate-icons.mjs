import sharp from 'sharp';
import { mkdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const svgPath = path.join(root, 'public/favicon.svg');
const outDir = path.join(root, 'public/icons');

const svg = await readFile(svgPath);
await mkdir(outDir, { recursive: true });

for (const size of [192, 512]) {
  await sharp(svg).resize(size, size).png().toFile(path.join(outDir, `icon-${size}.png`));
}

console.log('Generated PWA icons in public/icons/');
