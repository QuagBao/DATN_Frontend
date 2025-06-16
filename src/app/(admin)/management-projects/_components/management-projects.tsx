'use client'

import { useTranslation } from 'react-i18next'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'

import { CustomLoadingSkeletonResources } from '~/components/shared/custom-loading-skeleton-resources'
import { ResourceProvider } from '~/components/shared/resource-provider'
import { API_URL } from '~/config/routes'
import { EProjectStatus, EResources } from '~/shared/enums'
import { projectService } from '~/shared/services/project.service'
import { type TResources } from '~/shared/types'
import { type TProjectBaseSchema } from '~/shared/validators/schemas/project/project.schema'

import FilterProjectData from './filter-project-data'
import ProjectManagementTable from './project-management-table'

const ManagementProjects = () => {
  const { t } = useTranslation('management-projects')
  const searchParams = useSearchParams()

  const { data: projectDataResponse, isLoading: projectsLoading } = useQuery({
    queryKey: [API_URL.PROJECT.ALL_PROJECT, String(searchParams)],
    queryFn: async () => {
      const res = await projectService.getProjects(searchParams)
      return res.data
    }
  })

  const projectStatusOptions = [
    {
      key: String(EProjectStatus[EProjectStatus.IN_PROGRESS]),
      value: t([EProjectStatus[EProjectStatus.IN_PROGRESS]])
    },
    {
      key: String(EProjectStatus[EProjectStatus.DONE]),
      value: t([EProjectStatus[EProjectStatus.DONE]])
    }
  ]

  if (projectsLoading) return <CustomLoadingSkeletonResources />

  return (
    <ResourceProvider<TProjectBaseSchema> resourceName={EResources[EResources['management-projects']] as TResources}>
      <div>
        <h1 className='text-xl font-medium text-foreground'>{t('titleProject')}</h1>
        <FilterProjectData
          // resourceName={EResources[EResources['management-projects']] as TResources}
          projectStatusOptions={projectStatusOptions}
        />
        <div className='flex flex-1'>
          <ProjectManagementTable
            data={projectDataResponse?.data || []}
            paginationResponse={{
              page: projectDataResponse?.page || 1,
              limit: projectDataResponse?.limit || 20,
              total_items: projectDataResponse?.total_items || 1,
              total_pages: projectDataResponse?.total_pages || 1
            }}
          />
        </div>
      </div>
    </ResourceProvider>
  )
}

export default ManagementProjects
