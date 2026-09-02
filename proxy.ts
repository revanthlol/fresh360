import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // 1. Sanity Studio Basic Authentication
  if (pathname.startsWith('/studio')) {
    const authHeader = request.headers.get('authorization')

    if (!authHeader) {
      return new NextResponse('Authentication required', {
        status: 401,
        headers: {
          'WWW-Authenticate': 'Basic realm="Sanity Studio"',
        },
      })
    }

    const authValue = authHeader.split(' ')[1]
    if (!authValue) {
      return new NextResponse('Authentication required', {
        status: 401,
        headers: {
          'WWW-Authenticate': 'Basic realm="Sanity Studio"',
        },
      })
    }

    try {
      const [user, password] = atob(authValue).split(':')
      const validUser = process.env.STUDIO_USER || 'fresh360admin'
      const validPassword = process.env.STUDIO_PASSWORD || 'Fresh360@Studio2025'

      if (user !== validUser || password !== validPassword) {
        return new NextResponse('Invalid credentials', {
          status: 401,
          headers: {
            'WWW-Authenticate': 'Basic realm="Sanity Studio"',
          },
        })
      }
    } catch {
      return new NextResponse('Invalid credentials format', {
        status: 401,
        headers: {
          'WWW-Authenticate': 'Basic realm="Sanity Studio"',
        },
      })
    }

    return NextResponse.next()
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
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     * - static file extensions (png, jpg, svg, mp4, etc.)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|mp4|webm|woff2?)).*)',
  ],
}
