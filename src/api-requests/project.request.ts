import { API_URL } from '~/config/routes'
import { axiosHttp } from '~/shared/http/axios'
import { type TProjectParams } from '~/shared/types/params.type'
import { type TDashboardSchema } from '~/shared/validators/schemas/dashboard/dashboard.schema'
import {
  type TCreateProjectReq,
  type TEditProjectReq,
  type TProjectBaseSchema,
  type TProjectsData
} from '~/shared/validators/schemas/project/project.schema'

const projectApiRequest = {
  summary: async () => {
    return axiosHttp.get<TDashboardSchema>(API_URL.PROJECT.SUMMARY)
  },
  projectInProgress: async (params?: { page?: string; limit?: string }) => {
    return axiosHttp.get<TProjectsData>(API_URL.PROJECT.PROJECT_IN_PROGRESS, { params })
  },
  getProjectById: async (id: string) => {
    return axiosHttp.get<TProjectBaseSchema>(`${API_URL.PROJECT.PROJECT_BY_ID}/${id}`)
  },
  getProjects: async (params: TProjectParams) => {
    return axiosHttp.get<TProjectsData>(API_URL.PROJECT.ALL_PROJECT, { params })
  },
  // Role Admin
  createProject: async (data: Omit<TCreateProjectReq, 'images'>, imageFiles: File[]) => {
    const formData = new FormData()
    formData.append('data', JSON.stringify(data))

    imageFiles.forEach((file) => {
      formData.append('images', file)
    })
    return axiosHttp.post(API_URL.PROJECT.CREATE_PROJECT, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  },
  editProject: async (
    data: Omit<TEditProjectReq, 'images'>,
    imageFiles: File[],
    idImagesToKeep: string[] | undefined
  ) => {
    const formData = new FormData()
    formData.append('name_project', data.name_project)
    formData.append('data', JSON.stringify(data))
    if (idImagesToKeep && idImagesToKeep.length > 0) {
      idImagesToKeep.forEach((id) => {
        formData.append('id_images_to_keep', id)
      })
    }
    imageFiles.forEach((file) => {
      formData.append('images', file)
    })
    return axiosHttp.patch(API_URL.ADMIN.EDIT_PROJECT, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  },
  deleteProject: async (nameProject: string) => {
    const formData = new FormData()
    formData.append('name_project', nameProject)
    return axiosHttp.delete(API_URL.ADMIN.DELETE_PROJECT, {
      headers: { 'Content-Type': 'multipart/form-data' },
      data: formData
    })
  }
}

export default projectApiRequest
