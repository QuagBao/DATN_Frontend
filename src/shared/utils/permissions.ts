import { type TActionPermissions } from '~/shared/validators/schemas/permission/permission.schema'

export const hasPermission = (resourceName: string, action: string, permissions?: TActionPermissions | null) => {
  if (!permissions) return false

  return (permissions[resourceName] as string[] | undefined) ? permissions[resourceName].includes(action) : false
}
