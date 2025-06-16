import { jwtDecode } from 'jwt-decode'

import { type IAuthTokenPayload } from '~/shared/types'

export const isTokenExpired = (accessToken: string): boolean => {
  try {
    const decodedToken = jwtDecode<IAuthTokenPayload>(accessToken)
    const now = Date.now() / 1000
    return decodedToken.exp < now
  } catch (error) {
    return true
  }
}

export const jwtExpireTimes = (token: string): IAuthTokenPayload => {
  return jwtDecode(token)
}

export const REFRESH_TOKEN_EVENT = 'refreshToken'
