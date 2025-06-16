import { EResources } from '~/shared/enums/resources.enum'
import { normalizeRoutes } from '~/shared/utils/common.util'

export const APP_ROUTES = {
  AUTH: {
    REGISTER: '/register',
    LOGIN: '/login',
    LOGIN_ADMIN: '/login-admin',
    LOGOUT: '/logout',
    LOGOUT_ALL: '/logout-all',
    FORGOT_PASSWORD: '/forgot-password',
    RESEND_VERIFY_ACCOUNT: '/resend-verify-account',
    RESET_PASSWORD: '/reset-password',
    SESSIONS: `/sessions`
  },

  COMMON: {
    ROOT: '/',
    INTRODUCE: '/introduce',
    SEARCH_STOCK: '/search-stock',
    PROJECT: '/project',
    CHANGE_PASSWORD: '/change-password',
    PROFILE: '/profile',
    DONORS: '/donors',
    DONATION: '/donation',
    VOLUNTEER: '/volunteer',

    NOT_FOUND: '*'
  },

  COMMON_RESOURCES: {
    SETTINGS: {
      PROFILE: '/settings/profile',
      COMMON: '/settings/common'
    }
  },

  RESOURCES: {
    USERS: `/${EResources[EResources.users]}`,
    STAFFS: `/${EResources[EResources.staffs]}`,
    MANAGEMENT_PROJECTS: `/${EResources[EResources['management-projects']]}`,
    MANAGEMENT_DONORS: `/${EResources[EResources['management-donors']]}`,
    MANAGEMENT_COLLABORATORS: `/${EResources[EResources['management-collaborators']]}`,
    MANAGEMENT_IDEAS: `/${EResources[EResources['management-ideas']]}`,
    MANAGEMENT_RESOURCES: `/${EResources[EResources['management-resources']]}`
  }
} as const

export const COMMON_ROUTES: string[] = normalizeRoutes([...Object.values(APP_ROUTES.COMMON)])
export const AUTH_ROUTES: string[] = normalizeRoutes([...Object.values(APP_ROUTES.AUTH)])
export const RESOURCES_ROUTES: string[] = normalizeRoutes([...Object.values(APP_ROUTES.RESOURCES)])
export const COMMON_RESOURCES_ROUTES: string[] = normalizeRoutes([...Object.values(APP_ROUTES.COMMON_RESOURCES)])
