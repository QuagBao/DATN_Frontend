import { type z } from 'zod'

import { AuthBaseSchema } from '~/shared/validators/schemas/auth/auth-base.schema'

export const ForgotPasswordReqSchema = AuthBaseSchema.pick({ email: true })
export type TForgotPasswordReq = z.infer<typeof ForgotPasswordReqSchema>
