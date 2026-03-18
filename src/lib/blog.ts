import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const CONTENT_DIR = path.join(process.cwd(), 'content', 'blog');

export interface PostMeta {
  slug: string;
  title: string;
  status: 'draft' | 'published';
  date: string;
  description: string;
  coverImage: string;
  author: string;
  tags: string[];
  readTime: string;
}

export interface Post extends PostMeta {
  content: string;
}

function getMdxFiles(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith('.mdx'));
}

export function getAllPosts(): PostMeta[] {
  return getMdxFiles()
    .map((filename) => {
      const slug = filename.replace(/\.mdx$/, '');
      const raw = fs.readFileSync(path.join(CONTENT_DIR, filename), 'utf8');
      const { data } = matter(raw);
      // Posts sin campo status (anteriores al CMS) se tratan como publicados
      return { slug, status: 'published', ...data } as PostMeta;
    })
    .filter((post) => post.status === 'published')
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): Post {
  const filepath = path.join(CONTENT_DIR, `${slug}.mdx`);
  const raw = fs.readFileSync(filepath, 'utf8');
  const { data, content } = matter(raw);
  return { slug, status: 'published', content, ...data } as Post;
}
