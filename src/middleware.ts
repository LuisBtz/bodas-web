import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const COOKIE_NAME = 'admin_session';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Admin tooling (panel, Keystatic, gallery uploads) is localhost-only.
  // Any production request to these routes returns 404.
  if (process.env.NODE_ENV === 'production') {
    return new NextResponse('Not Found', { status: 404 });
  }

  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const session = request.cookies.get(COOKIE_NAME)?.value;
    const secret = process.env.ADMIN_SECRET;

    if (!secret) return NextResponse.next();

    if (session !== secret) {
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('from', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/keystatic/:path*',
    '/api/keystatic/:path*',
    '/api/gallery/:path*',
  ],
};
