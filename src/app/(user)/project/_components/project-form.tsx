'use client'

import { useTranslation } from 'react-i18next'
import { useQuery } from '@tanstack/react-query'
import { usePathname, useSearchParams } from 'next/navigation'

import { API_URL } from '~/config/routes'
import { PROJECT_STATUS } from '~/shared/constants/project'
import { EProjectStatus } from '~/shared/enums'
import { projectService } from '~/shared/services/project.service'

import ListProject from '../../(root)/_components/project'
import FilterProject from './filter-project'
import ProjectSkeleton from './project-skeleton'

const ProjectForm = () => {
  const { t } = useTranslation('project')
  const pathName = usePathname()
  const searchParams = useSearchParams()
  const { data: projectDataResponse, isLoading: projectsLoading } = useQuery({
    queryKey: [API_URL.PROJECT.ALL_PROJECT, pathName, searchParams],
    queryFn: async () => {
      const res = await projectService.getProjects(searchParams)
      return res.data
    }
  })

  const projectStatusOptions = [
    {
      key: String(EProjectStatus.IN_PROGRESS),
      value: t(PROJECT_STATUS[EProjectStatus[EProjectStatus.IN_PROGRESS]].label)
    },
    { key: String(EProjectStatus.DONE), value: t(PROJECT_STATUS[EProjectStatus[EProjectStatus.DONE]].label) }
  ]

  if (projectsLoading) return <ProjectSkeleton />

  return (
    <section className='my-6 space-y-6 '>
      <FilterProject projectStatusOptions={projectStatusOptions} />
      <ListProject
        data={projectDataResponse?.data || []}
        paginationResponse={{
          page: projectDataResponse?.page || 1,
          limit: projectDataResponse?.limit || 20,
          total_items: projectDataResponse?.total_items || 1,
          total_pages: projectDataResponse?.total_pages || 1
        }}
      />
    </section>
  )
}

export default ProjectForm
