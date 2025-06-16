'use client'

import { useCookieStore } from '~/shared/hooks'

export const getLoginStatusAndCookies = async () => {
  const [accessToken, accountType, resourcePermissions, actionPermissions] = await Promise.all([
    useCookieStore.getCookie('accessToken'),
    useCookieStore.getCookie('accountType'),
    useCookieStore.getCookie('resourcePermissions'),
    useCookieStore.getCookie('actionPermissions')
  ])

  const isLoggedIn =
    Boolean(accessToken) && Boolean(accountType) && Boolean(resourcePermissions) && Boolean(actionPermissions)

  return { isLoggedIn, accessToken, accountType, resourcePermissions, actionPermissions }
}
