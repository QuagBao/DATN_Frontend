import envConfig from '~/config/env'
import { API_URL } from '~/config/routes'
import { axiosHttp } from '~/shared/http/axios'
import { type TDonationReq } from '~/shared/validators/schemas/donation/donation.schema'

const donationApiRequest = {
  checkPaid: async (ref: string) => fetch(`${envConfig.NEXT_PUBLIC_RESPOND_GG_SHEET}?ref=${ref}`),
  createDonation: async (data: TDonationReq) => {
    return axiosHttp.post(API_URL.DONATION.CREATE_DONATION, data)
  }
}

export default donationApiRequest
