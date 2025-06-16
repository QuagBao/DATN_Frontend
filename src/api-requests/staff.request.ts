import { API_URL } from '~/config/routes'
import { axiosHttp } from '~/shared/http/axios'
import { type IProfile } from '~/shared/types/account.type'
import { type TStaffResourceParams } from '~/shared/types/params.type'
import type {
  approversSchema,
  requestersSchema,
  StaffBaseSchema,
  StaffsManagementResSchema,
  TApiResponse,
  TUpdateStaffReq,
  UpdateStaffReqSchema,
  UserBaseSchema
} from '~/shared/validators'

const staffApiRequest = {
  deleteStaff: async (staffId: string) => axiosHttp.delete(`${API_URL.ADMIN.DELETE_STAFF}/${staffId}`),
  getStaffById: async (staffId: string) =>
    axiosHttp.get<typeof UserBaseSchema>(`${API_URL.ADMIN.GET_STAFF_BY_ID}/${staffId}`),

  getMe: async (accessToken?: string) =>
    axiosHttp.get<IProfile>(API_URL.USER.GET_PROFILE, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }),
  // Unused

  getStaffs: async (params?: TStaffResourceParams) => {
    const defaultParams = { ...params }
    defaultParams.limit ??= '99'

    return axiosHttp.get<TApiResponse<typeof StaffsManagementResSchema>>(API_URL.STAFF.GET_ALL, {
      params: defaultParams
    })
  },

  getApprovers: async () => axiosHttp.get<TApiResponse<typeof approversSchema>>(API_URL.STAFF.GET_APPROVERS),

  getRequesters: async () => axiosHttp.get<TApiResponse<typeof requestersSchema>>(API_URL.STAFF.GET_REQUESTERS),

  updateStaff: async (id: string, data: TUpdateStaffReq) => {
    return axiosHttp.patch<TApiResponse<typeof UpdateStaffReqSchema>>(API_URL.STAFF.UPDATE.replace(':id', id), data)
  },

  updateProfile: async (data: Pick<IProfile, 'fullName' | 'phone' | 'notes'>) => {
    return axiosHttp.patch<TApiResponse<typeof StaffBaseSchema>>(API_URL.STAFF.UPDATE_PROFILE, data)
  },

  createStaff: async (data: { email: string }) =>
    axiosHttp.post<typeof StaffsManagementResSchema>(`${API_URL.ADMIN.CREATE_STAFF}?email=${data.email}`),

  approveStaffs: async (staffIds: string[]) =>
    axiosHttp.patch<TApiResponse<typeof StaffsManagementResSchema>>(API_URL.STAFF.APPROVE_STAFFS, {
      staffIds
    }),

  banStaffs: async (staffIds: string[]) =>
    axiosHttp.patch<TApiResponse<typeof StaffsManagementResSchema>>(API_URL.STAFF.BAN_STAFFS, {
      staffIds
    }),

  exportExcel: async (staffIds: string[]) => {
    return axiosHttp.post<Blob>(
      API_URL.STAFF.EXPORT_EXCEL,
      { staffIds },
      {
        responseType: 'arraybuffer'
      }
    )
  }
}

export default staffApiRequest
