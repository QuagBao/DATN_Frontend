'use client'

import { useQuery } from '@tanstack/react-query'
import dynamic from 'next/dynamic'
import { useSearchParams } from 'next/navigation'

import projectApiRequest from '~/api-requests/project.request'
import { API_URL } from '~/config/routes'
import { projectService } from '~/shared/services/project.service'

import HomeSkeleton from './home-skeleton'
import Introduce from './introduce'

const ListProjecInProgress = dynamic(() => import('./project'), {
  ssr: false,
  loading: () => <div>Loading...</div>
})

const Home = () => {
  const searchParams = useSearchParams()
  const { data, isLoading } = useQuery({
    queryKey: [API_URL.PROJECT.SUMMARY],
    queryFn: async () => {
      const res = await projectApiRequest.summary()
      return res
    }
  })

  const { data: projectInProgressData, isLoading: isLoadingProject } = useQuery({
    queryKey: [API_URL.PROJECT.PROJECT_IN_PROGRESS, String(searchParams)],
    queryFn: async () => {
      const res = await projectService.getProjects(searchParams)
      return res.data
    }
  })

  if (isLoading) return <HomeSkeleton />

  return (
    <div className='space-y-6'>
      <Introduce
        total_projects={data?.data.total_projects ?? 0}
        total_collaborators={data?.data.total_collaborators ?? 0}
        total_donors={data?.data.total_donors ?? 0}
      />
      <ListProjecInProgress
        data={projectInProgressData?.data ?? []}
        isLoadingProject={isLoadingProject}
        paginationResponse={
          projectInProgressData
            ? {
                page: projectInProgressData.page,
                limit: projectInProgressData.limit,
                total_items: projectInProgressData.total_items,
                total_pages: projectInProgressData.total_pages
              }
            : undefined
        }
      />
    </div>
  )
}

export default Home
