import { type IAuthTokenPayload } from '~/shared/types'

interface TokenTimeConstants {
  ACCESS_TOKEN: {
    INTERVAL_MS: number
    EXPIRATION_BUFFER: number
    EXTENDED_COOKIE_LIFE_TIME: number
  }
}

const calculateTokenTimeConstants = (decodedToken: IAuthTokenPayload): TokenTimeConstants => {
  const tokenLifetimeInSeconds = decodedToken.exp - decodedToken.iat
  const tokenLifetimeInMs = tokenLifetimeInSeconds * 1000

  // Tính toán INTERVAL_MS và EXPIRATION_BUFFER dựa trên mili giây
  const INTERVAL_MS = tokenLifetimeInMs / 3 // 1/3 thời gian sống của token tính bằng mili giây
  const EXPIRATION_BUFFER = tokenLifetimeInMs / 3 // 1/3 thời gian sống của token tính bằng giây
  const EXTENDED_COOKIE_LIFE_TIME = tokenLifetimeInSeconds / 3 // 1/3 thời gian sống của token tính bằng giây

  return {
    ACCESS_TOKEN: {
      INTERVAL_MS,
      EXPIRATION_BUFFER,
      EXTENDED_COOKIE_LIFE_TIME
    }
  }
}

export { calculateTokenTimeConstants }
