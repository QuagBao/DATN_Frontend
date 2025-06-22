import { type NextRequest, NextResponse } from 'next/server'

import { APP_ROUTES, RESOURCES_ROUTES } from './config/routes'
import { isTokenExpired, normalizePath } from './shared/utils'

export async function middleware(request: NextRequest) {
  const pathname = normalizePath(request.nextUrl.pathname)
  const accessToken = request.cookies.get('accessToken')?.value

  const isValidAccessToken = accessToken && !isTokenExpired(accessToken)

  if ([...RESOURCES_ROUTES].includes(pathname) && !isValidAccessToken) {
    return NextResponse.redirect(new URL(APP_ROUTES.AUTH.LOGIN_ADMIN, request.nextUrl.origin))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/', '/((?!.+\\.[\\w]+$|_next|api).*)', '/(trpc)(.*)']
}
