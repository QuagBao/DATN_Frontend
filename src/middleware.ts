import { type NextRequest, NextResponse } from 'next/server'

import { APP_ROUTES, COMMON_ROUTES, RESOURCES_ROUTES } from './config/routes'
import { EAccountType } from './shared/enums/common.enum'
import { isTokenExpired, normalizePath } from './shared/utils'

export async function middleware(request: NextRequest) {
  const pathname = normalizePath(request.nextUrl.pathname)
  const accessToken = request.cookies.get('accessToken')?.value
  const accountTypeStr = request.cookies.get('accountType')?.value
  const accountType = accountTypeStr ? parseInt(accountTypeStr, 10) : undefined

  const isValidAccessToken = accessToken && !isTokenExpired(accessToken)

  if ([...RESOURCES_ROUTES].includes(pathname) && !isValidAccessToken) {
    return NextResponse.redirect(new URL(APP_ROUTES.AUTH.LOGIN_ADMIN, request.nextUrl.origin))
  }

  // if (COMMON_ROUTES.includes(pathname) && !isValidAccessToken) {
  //   return NextResponse.redirect(new URL(APP_ROUTES.AUTH.LOGIN, request.nextUrl.origin))
  // }

  // if (AUTH_ROUTES.includes(pathname) && isValidAccessToken) {
  //   return NextResponse.redirect(new URL(APP_ROUTES.COMMON.ROOT, request.nextUrl.origin))
  // }

  // if (isValidAccessToken && accountType) {
  //   if ((accountType as EAccountType) === EAccountType.admin) {
  //     if (COMMON_ROUTES.includes(pathname)) {
  //       return NextResponse.redirect(new URL(APP_ROUTES.RESOURCES.STAFFS, request.nextUrl.origin))
  //     }
  //     return NextResponse.next()
  //   } else if ((accountType as EAccountType) === EAccountType.staff) {
  //     if (COMMON_ROUTES.includes(pathname)) {
  //       return NextResponse.redirect(new URL(APP_ROUTES.RESOURCES.USERS, request.nextUrl.origin))
  //     }
  //     return NextResponse.next()
  //   } else {
  //     // User bình thường
  //     if ([...RESOURCES_ROUTES].includes(pathname)) {
  //       return NextResponse.redirect(new URL(APP_ROUTES.COMMON.ROOT, request.nextUrl.origin))
  //     }
  //     return NextResponse.next()
  //   }
  // }

  return NextResponse.next()
}

export const config = {
  matcher: ['/', '/((?!.+\\.[\\w]+$|_next|api).*)', '/(trpc)(.*)']
}
