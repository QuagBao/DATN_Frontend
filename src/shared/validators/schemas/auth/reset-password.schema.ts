import z from 'zod'

import { AuthBaseSchema } from '~/shared/validators/schemas/auth/auth-base.schema'

export const ResetPasswordSchema = AuthBaseSchema.pick({
  new_password: true,
  confirmPassword: true
})
  .extend({
    otp: z.string().optional(),
    email: z.string().optional()
  })
  .refine((values) => values.new_password === values.confirmPassword, {
    message: 'auth.confirmPasswordNotMatch',
    path: ['confirmPassword']
  })

export type TResetPasswordReq = z.infer<typeof ResetPasswordSchema>
