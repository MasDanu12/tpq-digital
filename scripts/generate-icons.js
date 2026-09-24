/* =====================================================
   Generator ikon PWA — Node murni (tanpa dependensi).
   Menghasilkan public/icon-192.png & public/icon-512.png:
   siluet masjid putih di atas latar teal (#0f766e).
   Jalankan: node scripts/generate-icons.js
   ===================================================== */
const zlib = require("zlib");
const fs = require("fs");
const path = require("path");

/* ---------- PNG writer ---------- */
function crc32(buf) {
  if (!crc32.table) {
    crc32.table = new Int32Array(256);
    for (let n = 0; n < 256; n++) {
      let c = n;
      for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
      crc32.table[n] = c;
    }
  }
  let crc = -1;
  for (let i = 0; i < buf.length; i++) crc = (crc >>> 8) ^ crc32.table[(crc ^ buf[i]) & 0xff];
  return (crc ^ -1) >>> 0;
}

function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const typeBuf = Buffer.from(type, "ascii");
  const crcBuf = Buffer.alloc(4);
  crcBuf.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])), 0);
  return Buffer.concat([len, typeBuf, data, crcBuf]);
}

function png(width, height, rgba) {
  const sig = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;  // bit depth
  ihdr[9] = 6;  // color type RGBA
  const stride = width * 4 + 1;
  const raw = Buffer.alloc(stride * height);
  for (let y = 0; y < height; y++) {
    raw[y * stride] = 0; // filter: none
    rgba.copy(raw, y * stride + 1, y * width * 4, (y + 1) * width * 4);
  }
  const idat = zlib.deflateSync(raw, { level: 9 });
  return Buffer.concat([sig, chunk("IHDR", ihdr), chunk("IDAT", idat), chunk("IEND", Buffer.alloc(0))]);
}

/* ---------- gambar masjid ---------- */
function draw(N) {
  const buf = Buffer.alloc(N * N * 4);
  const BG = [15, 118, 110];    // teal  #0f766e
  const FG = [255, 255, 255];   // putih
  const DOOR = [13, 84, 79];    // pintu (teal gelap)
  for (let y = 0; y < N; y++) {
    for (let x = 0; x < N; x++) {
      const u = x / N, v = y / N;
      const inRect = (x0, y0, x1, y1) => u >= x0 && u <= x1 && v >= y0 && v <= y1;
      const inCircle = (cx, cy, r) => (u - cx) ** 2 + (v - cy) ** 2 <= r * r;

      const dome    = v <= 0.55 && inCircle(0.5, 0.55, 0.12);
      const body    = inRect(0.34, 0.55, 0.66, 0.74);
      const base    = inRect(0.26, 0.74, 0.74, 0.80);
      const finial  = inRect(0.49, 0.39, 0.51, 0.44);
      const minL    = inRect(0.27, 0.50, 0.305, 0.74) || (v <= 0.50 && inCircle(0.2875, 0.50, 0.025));
      const minR    = inRect(0.695, 0.50, 0.73, 0.74) || (v <= 0.50 && inCircle(0.7125, 0.50, 0.025));

      let c = BG;
      if (dome || body || base || finial || minL || minR) {
        c = FG;
        const door = inRect(0.46, 0.62, 0.54, 0.735) || (v <= 0.62 && inCircle(0.5, 0.62, 0.04));
        if (door) c = DOOR;
      }
      const i = (y * N + x) * 4;
      buf[i] = c[0]; buf[i + 1] = c[1]; buf[i + 2] = c[2]; buf[i + 3] = 255;
    }
  }
  return buf;
}

/* ---------- tulis file ---------- */
const outDir = path.join(__dirname, "..", "public");
for (const size of [192, 512]) {
  const file = path.join(outDir, `icon-${size}.png`);
  fs.writeFileSync(file, png(size, size, draw(size)));
  console.log(`OK  ${file}  (${fs.statSync(file).size} bytes)`);
}
