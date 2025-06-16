import donorApiRequest from '~/api-requests/donor.request'

export const donorService = {
  async getDonors(searchParams: URLSearchParams) {
    const params = {
      page: searchParams.get('page') ?? '1',
      limit: searchParams.get('limit') ?? '10',
      project_name: searchParams.get('project_name') ?? '',
      account_name: searchParams.get('account_name') ?? '',
      start_date: searchParams.get('start_date') ?? '',
      end_date: searchParams.get('end_date') ?? '',
      status: searchParams.get('status') ?? ''
    }

    const filteredParams = Object.fromEntries(Object.entries(params).filter(([, value]) => value !== ''))

    return donorApiRequest.getDonors(filteredParams)
  }
}
