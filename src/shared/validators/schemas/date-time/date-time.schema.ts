import { z } from 'zod'

export const InputTimeSchema = z
  .object({
    hour: z.number(),
    minute: z.number(),
    second: z.number(),
    millisecond: z.number()
  })
  .partial()
