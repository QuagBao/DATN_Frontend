import { type EAccountType } from '../enums/common.enum'

export interface IRole {
  id: number
  name: string
  priority: number
}

export interface IProfile {
  account_id: string
  createdAt: string
  updatedAt: string
  deletedAt: string | null
  fullName: string | null
  isSuperAdmin: boolean
  isSecPassword: boolean
  roles: IRole[]
  full_name: string
  email: string
  phone: string | null
  accountType: EAccountType
  historyQueryLimit: number
  notificationEnabled: boolean
  status: number
  creatorId: string | null
  notes: string | null
  avatar: string | null
  emailConfirmedAt: string | null
  phoneConfirmedAt: string | null
  emailChange: string | null
  phoneChange: string | null
  referrerId: string | null
}

export interface ISession {
  id: string
  notAfter: string
  refreshedAt: null
  ip: string
  location: string
  userAgent: string
  revoked: boolean
  createdAt: string
  account: { id: string; userName: string }
  isCurrent: boolean
}
