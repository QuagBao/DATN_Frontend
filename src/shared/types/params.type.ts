import { type DateValue } from '@internationalized/date'

export type TStaffRequestParams = {
  page?: string
  limit?: string
  reason?: string
  status?: number
  typeId?: number
  requesterId?: string
  approverId?: string
  requestTime?: {
    start?: DateValue
    end?: DateValue
  }
}

export type TStaffResourceParams = {
  page?: string
  limit?: string
  fullName?: string
  email?: string
  roleId?: number
  address?: string
  universalSearch?: string
  roleIds?: number[]
  joinDate?: {
    start?: DateValue
    end?: DateValue
  }
  created?: {
    start?: DateValue
    end?: DateValue
  }
  companyIds?: number[]
  status?: number
}

export type TTimeEntriesResourceParams = {
  page?: string
  limit?: string
  fullName?: string
  checkDate?: {
    start?: DateValue
    end?: DateValue
  }
  status?: string
}

export type TAuthSessionParams = {
  page?: string
  limit?: string
  userName?: string
  userAgent?: string
  companyIds?: number[]
  revoked?: boolean | null | string
  ipAddress?: string
  createdTo?: string
  createdFrom?: string
  createdAt?: {
    start?: DateValue | null
    end?: DateValue | null
  } | null
}

export type TUserRequestParams = {
  page?: string
  limit?: string
  reason?: string
  status?: number
  typeId?: number
  requesterId?: string
  approverId?: string
  requestTime?: {
    start?: DateValue
    end?: DateValue
  }
}

export type TUserResourceParams = {
  page?: string
  limit?: string
  fullName?: string
  email?: string
  roleId?: number
  address?: string
  universalSearch?: string
  roleIds?: number[]
  joinDate?: {
    start?: DateValue
    end?: DateValue
  }
  created?: {
    start?: DateValue
    end?: DateValue
  }
  companyIds?: number[]
  status?: string | number
}

export type TProjectParams = {
  page?: string
  limit?: string
  nameProject?: string
  owner?: string
  dateRange?: {
    from?: DateValue
    to?: DateValue
  }
  status?: number
}

export type TCollaboratorParams = {
  page?: string
  limit?: string
  nameProject?: string
  universalSearch?: string // Search by full name, email, phone
  appliedDates?: {
    from?: DateValue
    to?: DateValue
  }
  approvedDate?: {
    from?: DateValue
    to?: DateValue
  }
  status?: string
}

export type TDonationParams = {
  page?: string
  limit?: string
  nameProject?: string
  accountName?: string
  donateDate?: {
    from?: DateValue
    to?: DateValue
  }
}

export type TVolunteerParams = {
  page?: string
  limit?: string
  volunteer?: string
  nameProject?: string
  approveDate?: {
    start?: DateValue
    end?: DateValue
  }
}
