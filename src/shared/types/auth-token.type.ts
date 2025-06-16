import { type ETokenType } from '~/shared/enums/token.enum'
import { type TUserProfileRes } from '~/shared/validators'

export interface IAuthTokenPayload {
  exp: number
  iat: number
  id: string
  userInfo: TUserProfileRes
  tokenType: ETokenType
  resourcePermissions: string[]
  actionPermissions: string[]
  [key: string]: unknown
}
