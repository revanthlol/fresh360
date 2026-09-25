import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { ADMIN_COOKIE_NAME, verifySessionToken, verifyAdminCredentials } from './lib/admin-auth'

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // 1. Protected Admin & Studio Authentication Boundary
  if (pathname.startsWith('/admin') || pathname.startsWith('/studio')) {
    // Allow access to login route and static admin assets without session
    if (pathname === '/admin/login' || pathname.startsWith('/admin/login/')) {
      const sessionCookie = request.cookies.get(ADMIN_COOKIE_NAME)?.value
      if (sessionCookie) {
        const { valid } = await verifySessionToken(sessionCookie)
        if (valid) {
          // Already logged in, redirect to admin dashboard
          const url = request.nextUrl.clone()
          url.pathname = '/admin'
          url.search = ''
          return NextResponse.redirect(url, 307)
        }
      }
      const response = NextResponse.next()
      response.headers.set('X-Robots-Tag', 'noindex, nofollow')
      return response
    }

    // Check for session cookie
    const sessionCookie = request.cookies.get(ADMIN_COOKIE_NAME)?.value
    let isAuthenticated = false

    if (sessionCookie) {
      const { valid } = await verifySessionToken(sessionCookie)
      isAuthenticated = valid
    }

    // Support Basic Auth header as fallback for API/Studio tools (strictly via env vars)
    if (!isAuthenticated) {
      const authHeader = request.headers.get('authorization')
      if (authHeader && authHeader.startsWith('Basic ')) {
        const authValue = authHeader.split(' ')[1]
        try {
          const [user, password] = atob(authValue).split(':')
          if (user && password && verifyAdminCredentials(user, password)) {
            isAuthenticated = true
          }
        } catch {
          // Invalid basic auth format
        }
      }
    }

    // If not authenticated, redirect to /admin/login (or return 401 for studio API calls)
    if (!isAuthenticated) {
      if (pathname.startsWith('/studio') || pathname.includes('/api/')) {
        // If visiting legacy /studio without credentials, redirect to login
        const url = request.nextUrl.clone()
        url.pathname = '/admin/login'
        url.searchParams.set('redirect', pathname)
        return NextResponse.redirect(url, 307)
      }

      const loginUrl = request.nextUrl.clone()
      loginUrl.pathname = '/admin/login'
      if (pathname !== '/admin') {
        loginUrl.searchParams.set('redirect', pathname)
      }
      return NextResponse.redirect(loginUrl, 307)
    }

    // Legacy /studio route redirected to /admin/studio for authenticated sessions
    if (pathname === '/studio' || pathname.startsWith('/studio/')) {
      const studioUrl = request.nextUrl.clone()
      studioUrl.pathname = pathname.replace('/studio', '/admin/studio')
      return NextResponse.redirect(studioUrl, 307)
    }

    const response = NextResponse.next()
    response.headers.set('X-Robots-Tag', 'noindex, nofollow')
    return response
  }

  // 2. Temporary Single-Page Mode Route Blocking & Redirects
  const isSinglePage =
    process.env.NEXT_PUBLIC_SINGLE_PAGE_MODE === 'true' ||
    process.env.SINGLE_PAGE_MODE === 'true'

  if (isSinglePage) {
    const blockedPrefixes = [
      '/about',
      '/products',
      '/brands',
      '/process',
      '/certifications',
      '/contact',
      '/legal',
      '/grill-me',
    ]

    const isBlocked = blockedPrefixes.some(
      (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
    )

    if (isBlocked) {
      const url = request.nextUrl.clone()
      url.pathname = '/'
      url.search = ''
      return NextResponse.redirect(url, 307)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes, except admin if applicable)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     * - static file extensions (png, jpg, svg, mp4, etc.)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|mp4|webm|woff2?)).*)',
  ],
}
