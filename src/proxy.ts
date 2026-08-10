import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  // Check if the user is trying to access the admin area
  if (request.nextUrl.pathname.startsWith('/admin') && !request.nextUrl.pathname.startsWith('/admin-login')) {
    
    // Check for auth token
    const token = request.cookies.get('admin_token');

    // If there is no token, redirect to login page
    if (!token) {
      return NextResponse.redirect(new URL('/admin-login', request.url));
    }
  }

  // If they are on the login page but already logged in, redirect to admin
  if (request.nextUrl.pathname.startsWith('/admin-login')) {
    const token = request.cookies.get('admin_token');
    if (token) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/admin-login'],
};
