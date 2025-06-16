import { z } from 'zod'

export const TimeObjectSchema = z.object({
  hour: z.number().min(0).max(23),
  minute: z.number().min(0).max(59),
  second: z.number().min(0).max(59),
  millisecond: z.number().min(0).max(999)
})

/**
 * Định nghĩa schema cho string time (HH:mm)
 */
export const TimeStringSchema = z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Invalid time format. Use HH:mm')

export const TimeSchema = z.union([TimeObjectSchema, TimeStringSchema])

export const HourNumberSchema = z
  .union([
    z.number().min(0).max(8).step(0.1),
    z.string().refine(
      (val) => {
        const num = parseFloat(val)
        return !Number.isNaN(num) && num >= 0 && num <= 8 && Number(num.toFixed(1)) === num
      },
      { message: 'Must be a valid number between 0 and 8 hours, with at most one decimal place' }
    )
  ])
  .transform((val) => (typeof val === 'string' ? parseFloat(val) : val))
  .optional()

//* ---------------------------------- Types ----------------------------------
export type TTimeObject = z.infer<typeof TimeObjectSchema>
export type TTimeString = z.infer<typeof TimeStringSchema>
export type TTime = z.infer<typeof TimeSchema>
export type THourNumber = z.infer<typeof HourNumberSchema>
