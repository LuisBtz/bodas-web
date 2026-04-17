import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/keystatic/'],
      },
    ],
    sitemap: 'https://www.photography.luisbtz.com/sitemap.xml',
  };
}