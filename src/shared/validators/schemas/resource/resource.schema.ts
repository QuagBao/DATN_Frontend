import { z } from 'zod'

import { PermissionBaseSchema } from '../permission/permission.schema'

export const ResourceBaseSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  permissions: z.array(PermissionBaseSchema)
})
