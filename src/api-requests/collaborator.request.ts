import { API_URL } from '~/config/routes'
import { axiosHttp } from '~/shared/http/axios'
import { type TCollaboratorParams } from '~/shared/types/params.type'
import { type TCollaboratorsData } from '~/shared/validators/schemas/collaborator/collaborator.schema'

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
  applyCollaborator: async (project_id: string) =>
    axiosHttp.post(API_URL.USER.APPLY_COLLABORATOR, new URLSearchParams({ project_id }), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }),
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
  }
}

export default collaboratorApiRequest
