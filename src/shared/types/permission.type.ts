export interface IGetAllPermissionsRes {
  id: number
  name: string
  permissions: { id: number; action: string }[]
}

export interface IGetPermissionsRes {
  id: number
  name: string
  actions: { id: number; name: string }[]
  idPermission: number[]
}

export interface IAction {
  id: number
  name: string
  createdAt: string
}
