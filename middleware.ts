import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Block access to the Sanity Studio in production
  if (process.env.NODE_ENV === 'production' && request.nextUrl.pathname.startsWith('/studio')) {
    request.nextUrl.pathname = '/404'
    return NextResponse.rewrite(request.nextUrl)
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: '/studio/:path*',
}
