import { userApiRequest } from '~/api-requests'

export const userService = {
  async getUsers(searchParams: URLSearchParams) {
    const params = {
      page: searchParams.get('page') ?? '1',
      limit: searchParams.get('limit') ?? '10',
      universal_search: searchParams.get('universal_search') ?? '',
      start_date: searchParams.get('start_date') ?? '',
      end_date: searchParams.get('end_date') ?? '',
      status: searchParams.get('status') ?? ''
    }

    const filteredParams = Object.fromEntries(Object.entries(params).filter(([, value]) => value !== ''))

    return userApiRequest.getUsers(filteredParams)
  },

  async getStaffs(searchParams: URLSearchParams) {
    const params = {
      page: searchParams.get('page') ?? '1',
      limit: searchParams.get('limit') ?? '10',
      universal_search: searchParams.get('universal_search') ?? '',
      start_date: searchParams.get('start_date') ?? '',
      end_date: searchParams.get('end_date') ?? '',
      status: searchParams.get('status') ?? ''
    }

    const filteredParams = Object.fromEntries(Object.entries(params).filter(([, value]) => value !== ''))

    return userApiRequest.getStaffs(filteredParams)
  }
}
