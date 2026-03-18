import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const CONTENT_DIR = path.join(process.cwd(), 'content', 'bodas-reales');

export interface BodaRealMeta {
  slug: string;
  title: string;
  status: 'draft' | 'published';
  date: string;
  location: string;
  description: string;
  coverImage: string;
  tags: string[];
  featured: boolean;
}

export interface BodaReal extends BodaRealMeta {
  content: string;
}

function getMdxFiles(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith('.mdx'));
}

export function getAllBodasReales(): BodaRealMeta[] {
  return getMdxFiles()
    .map((filename) => {
      const slug = filename.replace(/\.mdx$/, '');
      const raw = fs.readFileSync(path.join(CONTENT_DIR, filename), 'utf8');
      const { data } = matter(raw);
      return { slug, status: 'published', ...data } as BodaRealMeta;
    })
    .filter((boda) => boda.status === 'published')
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getBodaRealBySlug(slug: string): BodaReal {
  const filepath = path.join(CONTENT_DIR, `${slug}.mdx`);
  const raw = fs.readFileSync(filepath, 'utf8');
  const { data, content } = matter(raw);
  return { slug, status: 'published', content, ...data } as BodaReal;
}
