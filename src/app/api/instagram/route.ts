// src/app/api/instagram/route.ts
export const runtime = 'nodejs';

type IGItem = {
  id: string;
  media_type: 'IMAGE' | 'CAROUSEL_ALBUM' | 'VIDEO';
  media_url?: string;
  thumbnail_url?: string;
  permalink: string;
  caption?: string;
  timestamp?: string;
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = Number(searchParams.get('limit') || 4);

  const token = process.env.IG_ACCESS_TOKEN;
  const userId = process.env.IG_USER_ID;

  // Si no hay credenciales, responde 200 con array vacío (el cliente mostrará fallback)
  if (!token || !userId) {
    return new Response(JSON.stringify({ items: [] }), {
      status: 200,
      headers: {
        'content-type': 'application/json',
        'cache-control': 'public, max-age=60',
      },
    });
  }

  const url = `https://graph.instagram.com/${userId}/media?fields=id,media_type,media_url,permalink,thumbnail_url,caption,timestamp&access_token=${token}&limit=${limit}`;

  try {
    const res = await fetch(url, {
      // cache en el edge/CDN
      next: { revalidate: 60 * 60 }, // 1h
    });

    if (!res.ok) {
      const text = await res.text();
      console.error('[api/instagram] HTTP', res.status, text);
      return new Response(JSON.stringify({ items: [] }), {
        status: 200,
        headers: {
          'content-type': 'application/json',
          'cache-control': 'public, s-maxage=300, stale-while-revalidate=600',
        },
      });
    }

    const json = await res.json();
    const data: IGItem[] = (json?.data || []).slice(0, limit);

    // Normaliza: para VIDEO usa thumbnail_url como imagen
    const items = data
      .map((i) => ({
        id: i.id,
        href: i.permalink,
        src: i.media_type === 'VIDEO' ? i.thumbnail_url : i.media_url,
        caption: i.caption ?? '',
      }))
      .filter((i) => Boolean(i.src));

    return new Response(JSON.stringify({ items }), {
      status: 200,
      headers: {
        'content-type': 'application/json',
        'cache-control': 'public, s-maxage=3600, stale-while-revalidate=600',
      },
    });
  } catch (err) {
    console.error('[api/instagram] error', err);
    return new Response(JSON.stringify({ items: [] }), {
      status: 200,
      headers: {
        'content-type': 'application/json',
        'cache-control': 'public, max-age=60',
      },
    });
  }
}
