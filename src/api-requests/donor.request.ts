import { API_URL } from '~/config/routes'
import { axiosHttp } from '~/shared/http/axios'
import { type TDonationParams } from '~/shared/types/params.type'
import { type TDonorsData } from '~/shared/validators/schemas/donors/donor.schema'

const donorApiRequest = {
  getDonors: async (params?: TDonationParams) => {
    const defaultParams = { ...params }
    defaultParams.limit ??= '10'
    return axiosHttp.get<TDonorsData>(API_URL.PROJECT.GET_DONORS, { params: defaultParams })
  },
  exportDonors: async (id_project: string) => {
    return axiosHttp.get(API_URL.ADMIN.EXPORT_DONOR, { params: { id_project }, responseType: 'blob' })
  }
}

export default donorApiRequest
