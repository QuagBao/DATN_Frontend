import { projectApiRequest } from '~/api-requests'

export const projectService = {
  async getProjects(searchParams?: URLSearchParams) {
    const params = {
      page: searchParams?.get('page') ?? '1',
      limit: searchParams?.get('limit') ?? '10',
      name_project: searchParams?.get('name_project') ?? '',
      universal_search: searchParams?.get('universal_search') ?? '',
      start_date: searchParams?.get('start_date') ?? '',
      end_date: searchParams?.get('end_date') ?? '',
      status: searchParams?.get('status') ?? ''
    }

    const filteredParams = Object.fromEntries(Object.entries(params).filter(([, value]) => value !== ''))

    return projectApiRequest.getProjects(filteredParams)
  }
}
