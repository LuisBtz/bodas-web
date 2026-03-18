import fs from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'content', 'galeria', 'index.json');

export type Orientation = 'landscape' | 'portrait' | 'square';

export interface GalleryPhoto {
  image: string;
  alt: string;
  orientation: Orientation;
}

export function getGalleryPhotos(): GalleryPhoto[] {
  if (!fs.existsSync(DATA_FILE)) return [];
  const raw = fs.readFileSync(DATA_FILE, 'utf8');
  const data = JSON.parse(raw);
  return (data.photos ?? []) as GalleryPhoto[];
}
