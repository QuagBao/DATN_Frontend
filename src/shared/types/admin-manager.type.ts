// -------------------- Permission & Resource --------------------
export interface PermissionRole {
  id: number
  action: string
}

export interface Actions {
  id: number
  name: string
}

export interface Permission {
  id: number
  actions: Actions[]
  resources: Resources[]
}

export interface PermissionsResponse {
  statusCode: number
  message: string
  data: Resources[]
}

export interface Resources {
  id: number
  name: string
}

// ------------------------- Role -------------------------
export interface Role {
  id: string
  name: string
  priority?: number
  totalUsers?: number
  permissions?: {
    id: string
    name: string
  }[]
  textColor?: string
  bgColor?: string
  resources?: {
    id: string
    name: string
    description: string
    permissions: PermissionRole[]
  }[]
}

// -------------------- Params & Props --------------------
export interface ParamsEditRole {
  roleId: string
  data: {
    name: string
    priority: string
  }
}

export interface CreateRoleButtonProps {
  onRoleCreated: () => void
  id?: string
}

export interface EditRoleButtonProps {
  roleUser: Role
  onRoleCreated: () => void
}

// -------------------- Get Auth Sessions --------------------

// ~/shared/types.ts

export interface AuthSession {
  createdAt?: string
  notAfter?: string
  refreshedAt?: boolean
  ip?: string | number
  userAgent?: string
  revoked?: boolean
  user?: {
    id?: string | number
    userName?: string
  }
}
