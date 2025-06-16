const PREFIX = '/api'

export const NEXT_API_URL = {
  AUTH: {
    LOGIN: `${PREFIX}/auth/login`,
    LOGIN_STAFF: `${PREFIX}/auth/staffs/login`,
    LOGOUT: `${PREFIX}/auth/logout`,
    LOGOUT_ALL_DEVICE: `${PREFIX}/auth/logout-all`,
    REFRESH_ACCESS_TOKEN: `${PREFIX}/auth/refresh-access-token`
  },
  USERS: {
    PROFILE: `${PREFIX}/users/profile`
  },
  RESOURCES: {
    PERMISSIONS: {
      GET_RESOURCE_PERMISSIONS: `${PREFIX}/permissions/resources`,
      GET_ACTION_PERMISSIONS: `${PREFIX}/permissions/actions`
    }
  }
}
