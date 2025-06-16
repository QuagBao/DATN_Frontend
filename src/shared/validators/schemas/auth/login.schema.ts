import z from 'zod'

import { AuthBaseSchema } from '~/shared/validators/schemas/auth/auth-base.schema'
import { AuthTokenSchema } from '~/shared/validators/schemas/token/token.schema'

export const LoginSchema = AuthBaseSchema.pick({ email: true, password: true })

export type TLoginReq = z.infer<typeof LoginSchema>

export const LoginRes = z.object({
  tokens: AuthTokenSchema
})

export interface ILoginRes {
  tokens?: { access_token: string }
  user?: { email: string }
}

export interface TUser {
  id_account: string
  email: string
  phone?: string
  full_name?: string
  status?: string
  role: {
    id_role?: string
    name?: string
  }
}

export type TLoginRes = z.TypeOf<typeof LoginRes>
