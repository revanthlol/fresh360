import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/studio')) {
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
    const [user, password] = atob(authValue).split(':')

    // Using credentials from environment variables with fallbacks
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
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/studio/:path*',
}
