import { type EResources } from '~/shared/enums/resources.enum'

export type TResources = keyof typeof EResources

export interface TResourcesParams {
  resourceName: string | null
}

export interface IResource {
  id: number
  name: string
  createdAt: string
}

export interface IPermission {
  id: number
  action: string
}
