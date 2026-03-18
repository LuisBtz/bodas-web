import type { Metadata } from 'next';
import { getAllPosts } from '@/lib/blog';
import BlogPageClient from './BlogPageClient';

export const metadata: Metadata = {
  title: 'Blog | Luis Benítez Photography',
  description:
    'Consejos de fotografía de bodas, guías para novios y reflexiones sobre el arte de documentar el amor. Por Luis Benítez, fotógrafo de bodas en Monterrey.',
  openGraph: {
    title: 'Blog | Luis Benítez Photography',
    description:
      'Consejos, guías y reflexiones sobre fotografía de bodas en Monterrey y México.',
    type: 'website',
  },
};

export default function BlogPage() {
  const posts = getAllPosts();
  return <BlogPageClient posts={posts} />;
}
