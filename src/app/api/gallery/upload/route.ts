import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import type { GalleryPhoto } from '@/lib/gallery';

const DATA_FILE = path.join(process.cwd(), 'content', 'galeria', 'index.json');
const UPLOAD_DIR = path.join(process.cwd(), 'public', 'galeria');

function readData(): GalleryPhoto[] {
  if (!fs.existsSync(DATA_FILE)) return [];
  return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8')).photos ?? [];
}

function writeData(photos: GalleryPhoto[]) {
  fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
  fs.writeFileSync(DATA_FILE, JSON.stringify({ photos }, null, 2) + '\n');
}

function detectOrientation(buf: Buffer): 'landscape' | 'portrait' | 'square' {
  let w = 0, h = 0;

  if (buf[0] === 0xff && buf[1] === 0xd8) {
    let offset = 2;
    while (offset < buf.length - 8) {
      if (buf[offset] !== 0xff) break;
      const marker = buf[offset + 1];
      const len = buf.readUInt16BE(offset + 2);
      if (marker >= 0xc0 && marker <= 0xc2) {
        h = buf.readUInt16BE(offset + 5);
        w = buf.readUInt16BE(offset + 7);
        break;
      }
      offset += 2 + len;
    }
  }

  if (buf[0] === 0x89 && buf[1] === 0x50) {
    w = buf.readUInt32BE(16);
    h = buf.readUInt32BE(20);
  }

  if (w === 0 || h === 0) return 'landscape';
  if (w > h) return 'landscape';
  if (h > w) return 'portrait';
  return 'square';
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const files = formData.getAll('files') as File[];
  const photos = readData();

  fs.mkdirSync(UPLOAD_DIR, { recursive: true });

  for (const file of files) {
    if (!file.size) continue;

    const safe = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
    const ext = path.extname(safe).toLowerCase();
    const base = path.basename(safe, ext);
    let filename = safe;

    let counter = 1;
    while (fs.existsSync(path.join(UPLOAD_DIR, filename))) {
      filename = `${base}-${counter}${ext}`;
      counter++;
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    fs.writeFileSync(path.join(UPLOAD_DIR, filename), buffer);

    const orientation = detectOrientation(buffer);

    photos.push({
      image: `/galeria/${filename}`,
      alt: '',
      orientation,
    });
  }

  writeData(photos);
  return NextResponse.json({ ok: true, photos });
}
