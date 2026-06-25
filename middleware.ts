import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// "Coming soon" mode: every route except the home page is redirected to "/".
// Delete this file to restore normal routing.
export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname !== '/') {
    return NextResponse.redirect(new URL('/', request.url));
  }
  return NextResponse.next();
}

export const config = {
  // Run on all paths except Next internals, API routes, and static assets.
  matcher: ['/((?!_next/static|_next/image|api|favicon.ico|icon.png).*)'],
};
