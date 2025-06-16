import { z } from 'zod'

export const VolunteerBaseSchema = z.object({
  id: z.string(),
  volunteer: z.string().min(1, { message: 'volunteerMiniumRequire' }).trim(),
  project: z.string().min(1, { message: 'projectMiniumRequire' }).trim(),
  approve_date: z.union([
    z.date(),
    z.string(),
    z.object({ day: z.number(), month: z.number(), year: z.number() }),
    z.object({})
  ])
})

export type TVolunteerRes = z.infer<typeof VolunteerBaseSchema>
