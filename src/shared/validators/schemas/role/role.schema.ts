import { z } from 'zod'

import { ResourceBaseSchema } from '../resource/resource.schema'

export const RoleBaseSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, "Role name can't be empty").optional(),
  resources: z.array(ResourceBaseSchema).optional()
})

export const PermissionSchema = z.object({
  id: z.number(),
  action: z.string()
})

export const ResourceSchema = z.object({
  id: z.number(),
  name: z.string(),
  permissions: z.array(PermissionSchema)
})

export const RoleSchema = z.object({
  id: z.string(),
  name: z.string(),
  priority: z.number(),
  resources: z.array(ResourceSchema),
  createdAt: z.string(),
  updatedAt: z.string(),
  deletedAt: z.nullable(z.string()),
  totalAccounts: z.number()
})

export const PriorityRangeSchema = z.object({
  min: z.number(),
  max: z.number()
})

export const RoleDataBaseSchema = z.object({
  roles: z.array(RoleSchema),
  priorityRange: PriorityRangeSchema
})

export type TRoleSchema = z.infer<typeof RoleSchema>
// export type TRoleDataBaseRes = z.infer<typeof RoleDataBaseSchema>

export const RolesBaseSchema = z.array(RoleBaseSchema)

export const CreateRoleSchema = RoleBaseSchema.omit({ id: true, resources: true })

export const EditRoleSchema = (min: number, max: number) => {
  return z.object({
    name: z.string().min(1, "Role name can't be empty"),
    priority: z.coerce
      .number()
      .min(min, `Priority must be greater than or equal to ${min}`)
      .max(max, `Priority must be less than or equal to ${max}`)
  })
}
export type TCreateRoleReq = z.infer<typeof CreateRoleSchema>

export type TEditRoleReq = z.infer<ReturnType<typeof EditRoleSchema>>

export type TRoleRes = z.infer<typeof RoleBaseSchema>
