import { API_URL } from '~/config/routes'
import { axiosHttp } from '~/shared/http/axios'
import { type TCollaboratorParams } from '~/shared/types/params.type'
import {
  type TCollaboratorReqSchema,
  type TCollaboratorsData
} from '~/shared/validators/schemas/collaborator/collaborator.schema'

const collaboratorApiRequest = {
  getCollaborators: async (params?: TCollaboratorParams) => {
    const defaultParams = { ...params }
    defaultParams.limit ??= '10'
    return axiosHttp.get<TCollaboratorsData>(API_URL.PROJECT.GET_COLLABORATORS, { params: defaultParams })
  },
  getCollaboratorsActive: async (params?: TCollaboratorParams) => {
    const defaultParams = { ...params }
    defaultParams.limit ??= '10'
    return axiosHttp.get<TCollaboratorsData>(API_URL.PROJECT.GET_COLLABORATORS_ACTIVE, { params: defaultParams })
  },
  applyCollaborator: async (data: TCollaboratorReqSchema) => axiosHttp.post(API_URL.USER.APPLY_COLLABORATOR, data),
  approveCollaborator: async (userId: string) => {
    return axiosHttp.patch(`${API_URL.ADMIN.ACCEPT_COLLABORATOR}/${userId}`)
  },
  deleteCollaborator: async (userId: string) => {
    return axiosHttp.delete(`${API_URL.ADMIN.DELETE_COLLABORATOR}/${userId}`)
  },
  exportCollaborator: async (id_project: string) => {
    return axiosHttp.get(API_URL.ADMIN.EXPORT_COLLABORATOR, {
      params: { id_project },
      responseType: 'blob'
    })
  },
  importCollaborator: async (id_project: string, file: File) => {
    const formData = new FormData()
    formData.append('file', file)
    return axiosHttp.post(API_URL.ADMIN.IMPORT_COLLABORATOR, formData, {
      params: { id_project },
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  }
}

export default collaboratorApiRequest
