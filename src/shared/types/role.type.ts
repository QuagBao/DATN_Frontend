import { type IPermission } from './resources.type'

export interface IGetRolesRes {
  roles: IRole[]
  priorityRange: { min: number; max: number }
}

export interface IRole {
  id: string
  name: string
  priority: number
  resources: {
    id: number
    name: string
    permissions: IPermission[]
  }[]
  createdAt: string
  updatedAt: string
  deletedAt: string | null
  totalAccounts: number
}
