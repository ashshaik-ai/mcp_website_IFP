/* PWA and favicon assets.

   The manifest used to point its 192px and 512px slots at the full-resolution
   source art: 170 KB and 1.08 MB respectively. Browsers fetch a manifest icon
   during page load, so that put 170 KB on the critical path of every visit for
   an image displayed at 192 pixels. These are the resized versions.

   Run after changing the source emblem: node scripts/generate-icons.mjs */
import sharp from "sharp";
import { mkdir } from "node:fs/promises";

const SOURCE = "public/assets/logo-emblem.png";
const OUT = "public/assets/icons";

await mkdir(OUT, { recursive: true });

const sizes = [
  { size: 192, name: "icon-192.png" },
  { size: 512, name: "icon-512.png" },
  { size: 180, name: "apple-touch-icon.png" },
];

for (const { size, name } of sizes) {
  const info = await sharp(SOURCE)
    .resize(size, size, { fit: "contain", background: { r: 13, g: 59, b: 30, alpha: 1 } })
    .png({ compressionLevel: 9, palette: true })
    .toFile(`${OUT}/${name}`);
  console.log(`${name.padEnd(22)} ${size}x${size}  ${(info.size / 1024).toFixed(1)} KB`);
}

/* A maskable icon needs its art inside the safe zone, or Android crops it
   into the rounded mask. 80% of the canvas with the brand green behind. */
const pad = Math.round(512 * 0.1);
const maskable = await sharp(SOURCE)
  .resize(512 - pad * 2, 512 - pad * 2, { fit: "contain", background: { r: 13, g: 59, b: 30, alpha: 1 } })
  .extend({ top: pad, bottom: pad, left: pad, right: pad, background: { r: 13, g: 59, b: 30, alpha: 1 } })
  .png({ compressionLevel: 9, palette: true })
  .toFile(`${OUT}/icon-maskable-512.png`);
console.log(`icon-maskable-512.png  512x512  ${(maskable.size / 1024).toFixed(1)} KB`);
