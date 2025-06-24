const AUTH_PREFIX = ''
const DASHBOARD_PREFIX = '/dashboard'
const PROJECT_PREFIX = '/projects'
const REGISTER_PREFIX = '/register'
const FORGOT_PREFIX = '/forgot-password'
const USER_PREFIX = '/user'
const STAFF_PREFIX = '/staff'
const RESOURCES = '/resources'
const ACTIONS = '/actions'
const PERMISSIONS = 'permissions'
const DONATION_PREFIX = '/donation'
const WALLET_TRANSACTIONS_PREFIX = '/transactions'
const ADMIN_PREFIX = '/admin'
const WALLET_PREFIX = '/wallets'
const DONOR_PREFIX = '/donations'
const ACTIVE_COLLABORATOR_PREFIX = '/active-collaborators'
const COLLABORATOR_PREFIX = '/collaborators'

export const API_URL = {
  AUTH: {
    LOGIN: `${AUTH_PREFIX}/login`,

    REGISTER: `${AUTH_PREFIX}${REGISTER_PREFIX}`,
    VERIFY_ACCOUNT: `${AUTH_PREFIX}${REGISTER_PREFIX}/verify-otp`,
    RESEND_OTP: `${AUTH_PREFIX}${REGISTER_PREFIX}/resend-otp`,

    FORGOT_PASSWORD: `${AUTH_PREFIX}${FORGOT_PREFIX}`,
    FORGOT_PASSWORD_RESEND_OTP: `${AUTH_PREFIX}${FORGOT_PREFIX}/resend-otp`,
    RESEND_VERIFY_ACCOUNT: `${AUTH_PREFIX}${FORGOT_PREFIX}/verify-otp-reset`,
    RESET_PASSWORD: `${AUTH_PREFIX}${FORGOT_PREFIX}/reset-password`,

    CHANGE_PASSWORD: `${AUTH_PREFIX}/change-password`,

    LOGOUT: `${AUTH_PREFIX}/logout`
  },

  PROJECT: {
    SUMMARY: `${DASHBOARD_PREFIX}/summary`,
    PROJECT_IN_PROGRESS: `${PROJECT_PREFIX}/in-progress`,

    GET_COLLABORATORS: COLLABORATOR_PREFIX,
    GET_COLLABORATORS_ACTIVE: ACTIVE_COLLABORATOR_PREFIX,
    GET_DONORS: DONOR_PREFIX,
    ALL_PROJECT: PROJECT_PREFIX,

    PROJECT_BY_ID: PROJECT_PREFIX,
    CREATE_PROJECT: `${PROJECT_PREFIX}/create`
  },

  DONATION: {
    CREATE_DONATION: `${DONATION_PREFIX}/create`,
    PROJECT_BY_ID: PROJECT_PREFIX
  },

  COLLABORATOR: {
    CREATE_DONATION: `${DONATION_PREFIX}/create`,
    PROJECT_BY_ID: PROJECT_PREFIX
  },

  ACCOUNT_SETTING: {
    GET_MY_ACCOUNT_SETTING: 'account-settings',
    UPDATE_MY_ACCOUNT_SETTING: 'account-settings'
  },

  ADMIN: {
    // Action with user
    GET_USERS: `${ADMIN_PREFIX}/users`,
    BAN_USER: `${ADMIN_PREFIX}/block-user`,
    UNLOCK_USER: `${ADMIN_PREFIX}/unblock-user`,
    ACCEPT_COLLABORATOR: `${ADMIN_PREFIX}/accept-collaborators`,
    DELETE_COLLABORATOR: `${ADMIN_PREFIX}/collaborators`,

    // Action with staff
    GET_STAFFS: `${ADMIN_PREFIX}${STAFF_PREFIX}`,
    CREATE_STAFF: `${ADMIN_PREFIX}${STAFF_PREFIX}/create`,
    DELETE_STAFF: `${ADMIN_PREFIX}${STAFF_PREFIX}/delete`,
    GET_STAFF_BY_ID: `${ADMIN_PREFIX}${STAFF_PREFIX}`,

    // Action with projects
    EDIT_PROJECT: `${ADMIN_PREFIX}${PROJECT_PREFIX}/update-by-owner`,
    DELETE_PROJECT: `${ADMIN_PREFIX}${PROJECT_PREFIX}/delete-by-owner`,
    EXPORT_COLLABORATOR: `${ADMIN_PREFIX}${COLLABORATOR_PREFIX}/export`,
    IMPORT_COLLABORATOR: `${ADMIN_PREFIX}${COLLABORATOR_PREFIX}/import`,
    EXPORT_DONOR: `${ADMIN_PREFIX}${DONOR_PREFIX}/export`,
    IMPORT_DONOR: `${ADMIN_PREFIX}${DONOR_PREFIX}/import`
  },

  USER: {
    GET_PROFILE: `${USER_PREFIX}/profile`,
    APPLY_COLLABORATOR: `${USER_PREFIX}/apply-collaborator`,

    CREATE_USER: USER_PREFIX,
    GET_ALL: USER_PREFIX,
    GET_BY_ID: `${USER_PREFIX}/:id`,
    UPDATE: `${USER_PREFIX}/:id`,
    UPDATE_PROFILE: `${USER_PREFIX}/profile`,
    DELETE: USER_PREFIX,
    GET_APPROVERS: `${USER_PREFIX}/approvers`,
    GET_REQUESTERS: `${USER_PREFIX}/requesters`,
    EXPORT_EXCEL: `${USER_PREFIX}/export`,
    APPROVE_USERS: `${USER_PREFIX}/approve`,
    BAN_USERS: `${USER_PREFIX}/ban`,
    TEMPLATE_EXCEL: `${USER_PREFIX}/template-excel`,
    IMPORT_EXCEL: `${USER_PREFIX}/import-excel`,
    BULK_CREATE: `${USER_PREFIX}/bulk-create`
  },

  STAFF: {
    CREATE_STAFF: STAFF_PREFIX,
    GET_PROFILE: `${STAFF_PREFIX}/profile`,
    GET_ALL: STAFF_PREFIX,
    GET_BY_ID: `${STAFF_PREFIX}/:id`,
    UPDATE: `${STAFF_PREFIX}/:id`,
    UPDATE_PROFILE: `${STAFF_PREFIX}/profile`,
    DELETE: STAFF_PREFIX,
    GET_APPROVERS: `${STAFF_PREFIX}/approvers`,
    GET_REQUESTERS: `${STAFF_PREFIX}/requesters`,
    EXPORT_EXCEL: `${STAFF_PREFIX}/export`,
    APPROVE_STAFFS: `${STAFF_PREFIX}/activate`,
    BAN_STAFFS: `${STAFF_PREFIX}/deactivate`
  },

  RESOURCES: {
    GET_ALL_RESOURCES: RESOURCES
  },
  ACTIONS: {
    GET_ALL_ACTIONS: ACTIONS
  },

  ROLE: {
    GET_ROLES: '/roles',
    GET_ALL_ROLES: '/roles',
    GET_USERS_BY_ROLE: '/roles/:id/accounts',
    GET_USERS_NOT_IN_ROLE: '/roles/:id/non-accounts',
    ADD_ROLE: '/roles',
    DELETE_ROLE: '/roles',
    EDIT_ROLE: '/roles/:id',
    ASSIGN_ROLE: `/roles/assign-accounts`,
    REMOVE_USERS: '/roles/remove-accounts'
  },

  PERMISSION: {
    UPDATE_PERMISSION: '/roles/assign-permissions',
    GET_ALL_PERMISSIONS: '/permissions/all',
    GET_PERMISSIONS: PERMISSIONS,
    UPDATE_ACTIONS_PERMISSIONS: `${PERMISSIONS}/assign-actions`,
    GET_RESOURCE_PERMISSIONS: `${PERMISSIONS}/resources`,
    GET_ACTION_PERMISSIONS: `${PERMISSIONS}/actions`
  },

  WALLET_TRANSACTIONS: {
    GET_TRANSACTION_CONTACTS: `${WALLET_TRANSACTIONS_PREFIX}/contacts`,
    GET_TRANSACTION_HISTORY: `${WALLET_TRANSACTIONS_PREFIX}/:contactWalletId`
  },

  WALLETS: {
    GET_USER_BY_WALLET_CODE: `${WALLET_PREFIX}/find/:walletCode`,
    USER: `${WALLET_PREFIX}/me`,
    ADMIN: `${WALLET_PREFIX}/:id`,
    REQUEST_TRANSFER: `${WALLET_PREFIX}/request-transfer`,
    TRANSFER: `${WALLET_PREFIX}/transfer`,
    RESEND_OTP: `${WALLET_PREFIX}/resend-otp`
  },

  BALANCE_HISTORIES: {
    USER: '/balance-histories/me',
    ADMIN: '/balance-histories/:id'
  },

  STOCK: {
    GET_ALL_STOCKS: '/stocks',
    NEWS: '/news/:id',
    GET_STOCK_DETAIL: '/stocks/:id',
    UPDATE_STOCK: '/stocks/:id',
    DELETE_STOCKS: '/stocks/delete',
    GET_FOLLOWED_STOCKS: '/stocks/followed',
    FOLLOW_STOCK: '/stocks/follow',
    UNFOLLOW_STOCK: '/stocks/follow'
  },

  ORDER: {
    GET_PENDING_ORDERS: '/orders/:id/pending-orders'
  },

  MARKET_PRICE: {
    GET_MARKET_PRICES: '/market-prices'
  }
} as const
