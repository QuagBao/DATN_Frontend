import { z } from 'zod'

export const AuthBaseSchema = z.object({
  full_name: z.string().min(1, { message: 'fullNameMinimumRequire' }).max(40, { message: 'fullNameMaxRequire' }).trim(),
  email: z
    .string()
    .email('Không đúng định dạng email')
    .min(1, { message: 'emailMinimumRequire' })
    .max(40, { message: 'emailMaxRequire' })
    .trim(),
  phone: z
    .string()
    .nonempty({ message: 'required' })
    .regex(/^\d{10}$/, { message: 'invalidPhone' }),
  password: z
    .string()
    .min(8, { message: 'passwordMinimumRequire' })
    .max(20, { message: 'passwordMaxRequireMax' })
    .refine((value) => /[A-Z]/.test(value), {
      message: 'passwordMustContainUppercase'
    })
    .refine((value) => /[a-z]/.test(value), {
      message: 'passwordMustContainLowercase'
    })
    .refine((value) => /\d/.test(value), {
      message: 'passwordMustContainNumber'
    })
    .refine((value) => /[^A-Za-z0-9]/.test(value), {
      message: 'passwordMustContainSpecial'
    })
    .refine((value) => !/['"\\<>]/.test(value), {
      message: 'passwordCannotContainSensitiveSpecialCharacters'
    })
    .refine((value) => value.trim() === value, {
      message: 'passwordCannotContainWhitespace'
    }),
  old_password: z.string().min(6, { message: 'passwordMinimumRequire' }),
  new_password: z
    .string()
    .min(6, { message: 'passwordMinimumRequire' })
    .max(40, { message: 'passwordMaxRequire' })
    .refine(
      (value) => {
        const specialChars = /[^A-Za-z0-9]/
        return specialChars.test(value)
      },
      { message: 'passwordMustContain' }
    )
    .refine((value) => value.trim() === value, {
      message: 'passwordCannotContain'
    }),
  confirmPassword: z
    .string()
    .min(6, { message: 'passwordMinimumRequire' })
    .max(40, { message: 'passwordMaxRequire' })
    .refine(
      (value) => {
        const specialChars = /[^A-Za-z0-9]/
        return specialChars.test(value)
      },
      { message: 'passwordMustContain' }
    ),
  confirmSecPassword: z
    .string()
    .nonempty({ message: 'passwordRequired' })
    .length(6, { message: 'passwordMustBe6Digits' })
    .regex(/^\d{6}$/, { message: 'passwordOnlyNumbers' }),

  newSecPassword: z
    .string()
    .nonempty({ message: 'passwordRequired' })
    .length(6, { message: 'passwordMustBe6Digits' })
    .regex(/^\d{6}$/, { message: 'passwordOnlyNumbers' }),

  oldSecPassword: z
    .string()
    .nonempty({ message: 'passwordRequired' })
    .length(6, { message: 'passwordMustBe6Digits' })
    .regex(/^\d{6}$/, { message: 'passwordOnlyNumbers' })
})
