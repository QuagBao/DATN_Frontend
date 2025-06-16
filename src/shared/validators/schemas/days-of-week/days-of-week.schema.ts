import { z } from 'zod'

import { EDaysOfWeek } from '~/shared/enums/days-of-week.enum'

export const BaseDaysOfWeekSchema = z.object({
  id: z.number(),
  dayName: z.string(),
  dayNumber: z.nativeEnum(EDaysOfWeek)
})

export const DaysOfWeekResSchema = z.array(BaseDaysOfWeekSchema)

export type TDaysOfWeekRes = z.infer<typeof BaseDaysOfWeekSchema>
