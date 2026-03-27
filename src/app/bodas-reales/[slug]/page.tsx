import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import remarkUnwrapImages from 'remark-unwrap-images';
import { getAllBodasReales, getBodaRealBySlug } from '@/lib/bodas-reales';
import { mdxComponents } from '@/components/mdx/MdxComponents';
import PostLightboxProvider from '@/components/mdx/PostLightboxProvider';
import BodaRealShell from './BodaRealShell';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllBodasReales().map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const boda = getBodaRealBySlug(slug);

  if (!boda) return {};

  const ogImage = boda.coverImage
    ? [{ url: boda.coverImage, width: 1200, height: 630, alt: boda.title }]
    : [];

  return {
    title: `${boda.title} | Bodas Reales | Luis Benítez Photography`,
    description: boda.description,
    openGraph: {
      title: boda.title,
      description: boda.description,
      type: 'article',
      publishedTime: boda.date,
      images: ogImage,
    },
    twitter: {
      card: 'summary_large_image',
      title: boda.title,
      description: boda.description,
      images: boda.coverImage ? [boda.coverImage] : [],
    },
  };
}

export default async function BodaRealPage({ params }: Props) {
  const { slug } = await params;

  let boda;
  try {
    boda = getBodaRealBySlug(slug);
  } catch {
    notFound();
  }

  const allBodas = getAllBodasReales();
  const index = allBodas.findIndex((b) => b.slug === slug);

  // Resolve relative image paths (e.g. ![](Gallery-022.webp)) to absolute
  const resolvedContent = boda.content.replace(
    /!\[([^\]]*)\]\((?!\/|https?:\/\/)([^)]+)\)/g,
    (_: string, alt: string, path: string) => `![${alt}](/bodas-reales/${slug}/${path})`,
  );

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: boda.title,
    description: boda.description,
    image: boda.coverImage,
    publisher: {
      '@type': 'Organization',
      name: 'Luis Benítez Photography',
    },
    datePublished: boda.date,
    dateModified: boda.date,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://luisbenitezphoto.com/bodas-reales/${boda.slug}`,
    },
    keywords: boda.tags?.join(', '),
    location: boda.location,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BodaRealShell boda={boda} index={index}>
        <PostLightboxProvider>
          <MDXRemote
            source={resolvedContent}
            components={mdxComponents}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm, remarkUnwrapImages],
              },
            }}
          />
        </PostLightboxProvider>
      </BodaRealShell>
    </>
  );
}
