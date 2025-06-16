import { z } from 'zod'

import { EUserRequestType } from '~/shared/enums'

export const BaseRequestTypeSchema = z.object({
  id: z.number(),
  name: z.string(),
  typeId: z.nativeEnum(EUserRequestType)
})

export const RequestTypesResSchema = z.array(BaseRequestTypeSchema)

export type TRequestTypeRes = z.infer<typeof BaseRequestTypeSchema>
