import z from 'zod'

export const OtpSchema = z.object({
  otp: z
    .string()
    .min(1, { message: 'OTP must be at least 1 character' })
    .max(5, { message: 'OTP cannot exceed 6 characters' })
})

export type TOtpReq = z.infer<typeof OtpSchema>
