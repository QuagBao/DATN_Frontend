import { z } from 'zod'

export const PermissionBaseSchema = z.object({
  id: z.number(),
  action: z.string(),
  description: z.string(),
  permissions: z.array(z.number()),
  createdAt: z.string(),
  updatedAt: z.string()
})

export const PermissionsIdsSchema = z.object({
  permissionIds: z.array(z.number())
})

export const PermissionsReqSchema = z.object({
  roleId: z.string(),
  permissionIds: PermissionsIdsSchema.shape.permissionIds
})

export type TPermissionsIds = z.infer<typeof PermissionsIdsSchema>

export type TPermissionsReq = z.infer<typeof PermissionsReqSchema>

export type TPermissionRes = z.infer<typeof PermissionBaseSchema>

export const ResourcePermissionsSchema = z.array(z.string())

export type TResourcePermissions = z.infer<typeof ResourcePermissionsSchema>

export const ActionPermissionsSchema = z.record(z.array(z.string()))

export const ActionPermissionsArraySchema = z.array(ActionPermissionsSchema)

export type TActionPermissions = z.infer<typeof ActionPermissionsSchema>
