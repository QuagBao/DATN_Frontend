import { z } from 'zod'

import { AuthBaseSchema } from '~/shared/validators/schemas/auth/auth-base.schema'

export const ChangePasswordSchema = AuthBaseSchema.pick({
  old_password: true,
  new_password: true
})
  .extend({
    token: z.string().optional()
  })
  .refine((values) => values.new_password === values.old_password, {
    message: 'auth.passwordIncorrect',
    path: ['confirmPassword']
  })

export type TChangePasswordReq = z.infer<typeof ChangePasswordSchema>

export type TChangePasswordSchema = z.infer<typeof ChangePasswordSchema>
