import { API_URL, NEXT_API_URL } from '~/config/routes'
import { axiosHttp } from '~/shared/http/axios'
import type { IProfile } from '~/shared/types'
import { type TUserResourceParams } from '~/shared/types/params.type'
import type {
  approversSchema,
  CreateUserResSchema,
  requestersSchema,
  TApiResponse,
  TCreateUserReq,
  TUpdateUserProfileReq,
  TUpdateUserReq,
  TUsersManagementApiResponse,
  UserBaseSchema,
  UsersManagementResSchema
} from '~/shared/validators'

const userApiRequest = {
  // Used
  getMe: async (accessToken?: string) => {
    return axiosHttp.get<IProfile>(API_URL.USER.GET_PROFILE, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
  },
  getUsers: async (params?: TUserResourceParams) => {
    const defaultParams = { ...params }
    defaultParams.limit ??= '10'

    return axiosHttp.get<TUsersManagementApiResponse>(API_URL.ADMIN.GET_USERS, { params: defaultParams })
  },
  banUser: async (userId: string) => {
    return axiosHttp.patch(`${API_URL.ADMIN.BAN_USER}/${userId}`)
  },
  unlockUser: async (userId: string) => {
    return axiosHttp.patch(`${API_URL.ADMIN.UNLOCK_USER}/${userId}`)
  },
  getStaffs: async (params?: TUserResourceParams) => {
    const defaultParams = { ...params }
    defaultParams.limit ??= '10'
    return axiosHttp.get<TUsersManagementApiResponse>(API_URL.ADMIN.GET_STAFFS, { params: defaultParams })
  },

  // Unused
  getUserById: async (id: string) =>
    axiosHttp.get<TApiResponse<typeof UserBaseSchema>>(API_URL.USER.GET_BY_ID.replace(':id', id)),
  getApprovers: async () => axiosHttp.get<TApiResponse<typeof approversSchema>>(API_URL.USER.GET_APPROVERS),

  getRequesters: async () => axiosHttp.get<TApiResponse<typeof requestersSchema>>(API_URL.USER.GET_REQUESTERS),

  updateUser: async (id: string, data: TUpdateUserReq) => {
    return axiosHttp.patch<TApiResponse<typeof CreateUserResSchema>>(API_URL.USER.UPDATE.replace(':id', id), data)
  },

  updateProfile: async (data: TUpdateUserProfileReq) => {
    return axiosHttp.patch<TApiResponse<typeof UserBaseSchema>>(API_URL.USER.UPDATE_PROFILE, data)
  },

  updateProfileToNextServer: async (data: IProfile) => {
    return axiosHttp.patch<TApiResponse<typeof UserBaseSchema>>(NEXT_API_URL.USERS.PROFILE, data, {
      baseURL: ''
    })
  },

  createUser: async (data: TCreateUserReq) =>
    axiosHttp.post<TApiResponse<typeof CreateUserResSchema>>(API_URL.USER.CREATE_USER, data),

  deleteUser: async (userAccountIds: string[]) =>
    axiosHttp.delete<TApiResponse<typeof UsersManagementResSchema>>(API_URL.USER.DELETE, {
      data: { userAccountIds }
    }),

  approveUsers: async (userAccountIds: string[]) =>
    axiosHttp.patch<TApiResponse<typeof UsersManagementResSchema>>(API_URL.USER.APPROVE_USERS, {
      userAccountIds
    }),

  banUsers: async (userAccountIds: string[]) =>
    axiosHttp.patch<TApiResponse<typeof UsersManagementResSchema>>(API_URL.USER.BAN_USERS, {
      userAccountIds
    }),

  exportExcel: async (userIds: string[]) => {
    return axiosHttp.post<Blob>(
      API_URL.USER.EXPORT_EXCEL,
      { userIds },
      {
        responseType: 'arraybuffer'
      }
    )
  },

  getTemplateExcel: async () =>
    axiosHttp.get<Blob>(API_URL.USER.TEMPLATE_EXCEL, {
      responseType: 'blob'
    }),

  importExcel: async (file: File) => {
    const formData = new FormData()
    formData.append('file', file)

    return axiosHttp.post(API_URL.USER.IMPORT_EXCEL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },

  bulkCreateUser: async (
    users: { email: string; fullName: string; phone: string; userName: string; password: string; notes: string }[]
  ) => axiosHttp.post(API_URL.USER.BULK_CREATE, { users }, { responseType: 'blob' })
}

export default userApiRequest
