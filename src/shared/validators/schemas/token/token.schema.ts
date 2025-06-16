import z from 'zod'

export const AuthTokenSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string()
})

export const AuthTokenRes = z.object({
  tokens: AuthTokenSchema
})

export type TAuthTokenBody = z.TypeOf<typeof AuthTokenRes>

export type TAuthTokenRes = z.TypeOf<typeof AuthTokenSchema>

export const RefreshAccessTokenRes = z.object({
  tokens: AuthTokenSchema.pick({
    accessToken: true,
    refreshToken: true
  })
})

export type TRefreshAccessTokenRes = z.TypeOf<typeof RefreshAccessTokenRes>
