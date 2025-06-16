// import { API_URL } from '~/config/routes'
// import { axiosHttp } from '~/shared/http/axios'
// import { type ISuccessResponse } from '~/shared/types'
// import { type TUserResourceParams } from '~/shared/types/params.type'
// import type { IGetRolesRes } from '~/shared/types/role.type'
// import {
//   type TApiResponse,
//   type TCreateRoleReq,
//   type TEditRoleReq,
//   type UsersManagementResSchema
// } from '~/shared/validators'

// const rolesApiRequest = {
//   addRole: async (data: TCreateRoleReq) => axiosHttp.post<ISuccessResponse<undefined>>(API_URL.ROLE.ADD_ROLE, data),
//   getRoles: async () => {
//     const params = { limit: '99' }
//     return axiosHttp.get<ISuccessResponse<IGetRolesRes>>(API_URL.ROLE.GET_ROLES, { params })
//   },

//   getUsersByRole: async (roleId: string, params?: TUserResourceParams) => {
//     const defaultParams = { ...params }
//     defaultParams.limit ??= '99'

//     return axiosHttp.get<TApiResponse>(API_URL.ROLE.GET_USERS_BY_ROLE.replace(':id', roleId), { params: defaultParams })
//   },

//   getUsersNotInRole: async (roleId: string, params?: TUserResourceParams) => {
//     const defaultParams = { ...params }
//     defaultParams.limit ??= '99'

//     return axiosHttp.get<TApiResponse>(API_URL.ROLE.GET_USERS_NOT_IN_ROLE.replace(':id', roleId), {
//       params: defaultParams
//     })
//   },

//   deleteRole: (roleIds: string[]) =>
//     axiosHttp.delete<ISuccessResponse<undefined>>(API_URL.ROLE.DELETE_ROLE, {
//       data: { roleIds }
//     }),

//   updateRole: async ({ roleId, data }: { roleId: string; data: TEditRoleReq }) =>
//     axiosHttp.patch<ISuccessResponse<undefined>>(API_URL.ROLE.EDIT_ROLE.replace(':id', roleId), data),

//   assignUserToRole: async (roleId: string, accountIds: string[]) =>
//     axiosHttp.patch<TApiResponse<typeof UsersManagementResSchema>>(API_URL.ROLE.ASSIGN_ROLE, {
//       roleId,
//       accountIds
//     }),

//   removeUserToRole: async (roleId: string, accountIds: string[]) =>
//     axiosHttp.delete<TApiResponse<typeof UsersManagementResSchema>>(API_URL.ROLE.REMOVE_USERS, {
//       data: { roleId, accountIds }
//     })
// }

// export default rolesApiRequest
