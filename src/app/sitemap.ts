import type { MetadataRoute } from 'next';
import { getAllBodasReales } from '@/lib/bodas-reales';
import { getAllPosts } from '@/lib/blog';

const BASE = 'https://www.photography.luisbtz.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE}/sobre-mi`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/servicios`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/fotografias`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/bodas-reales`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE}/contacto`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  ];

  const bodasRoutes: MetadataRoute.Sitemap = getAllBodasReales()
    .filter((b) => b.status === 'published')
    .map((b) => ({
      url: `${BASE}/bodas-reales/${b.slug}`,
      lastModified: new Date(b.date),
      changeFrequency: 'monthly',
      priority: 0.7,
    }));

  const blogRoutes: MetadataRoute.Sitemap = getAllPosts()
    .filter((p) => p.status === 'published')
    .map((p) => ({
      url: `${BASE}/blog/${p.slug}`,
      lastModified: new Date(p.date),
      changeFrequency: 'monthly',
      priority: 0.6,
    }));

  return [...staticRoutes, ...bodasRoutes, ...blogRoutes];
}
