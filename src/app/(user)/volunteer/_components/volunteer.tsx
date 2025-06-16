'use client'

import { useQuery } from '@tanstack/react-query'
import dynamic from 'next/dynamic'
import { useSearchParams } from 'next/navigation'

import TableSkeleton from '~/components/shared/table-skeleton'
import { API_URL } from '~/config/routes'
import { collaboratorService } from '~/shared/services/collaborator.service'

import FilterVolunteer from './filter-volunteer'

const CollaboratorTable = dynamic(() => import('./volunteer-table'), {
  ssr: false,
  loading: () => <TableSkeleton />
})

const Volunteer = () => {
  const searchParam = useSearchParams()

  const { data: collaboratorDataResponse, isLoading: collaboratorLoading } = useQuery({
    queryKey: [API_URL.PROJECT.GET_COLLABORATORS_ACTIVE, String(searchParam)],
    queryFn: async () => {
      const res = await collaboratorService.getCollaboratorsActive(searchParam)
      return res.data
    }
  })

  return (
    <section className='space-y-6 '>
      <FilterVolunteer />
      <CollaboratorTable
        data={collaboratorDataResponse?.data ?? []}
        paginationResponse={{
          page: collaboratorDataResponse?.page || 1,
          limit: collaboratorDataResponse?.limit || 10,
          total_items: collaboratorDataResponse?.total_items || 1,
          total_pages: collaboratorDataResponse?.total_pages || 1
        }}
        isLoading={collaboratorLoading}
      />
    </section>
  )
}

export default Volunteer
