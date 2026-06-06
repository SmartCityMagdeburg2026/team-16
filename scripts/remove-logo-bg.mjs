import sharp from "sharp";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const logoPath = path.join(__dirname, "../public/logo.png");

const THRESHOLD = 42;

const { data, info } = await sharp(logoPath)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

for (let i = 0; i < data.length; i += 4) {
  const r = data[i];
  const g = data[i + 1];
  const b = data[i + 2];
  if (r <= THRESHOLD && g <= THRESHOLD && b <= THRESHOLD) {
    data[i + 3] = 0;
  }
}

await sharp(data, {
  raw: { width: info.width, height: info.height, channels: 4 },
})
  .png()
  .toFile(logoPath);

console.log(`Updated ${logoPath} — black pixels below RGB ${THRESHOLD} are now transparent.`);
