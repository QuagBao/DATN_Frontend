'use client'

import { useTranslation } from 'react-i18next'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'

import { CustomLoadingSkeletonResources } from '~/components/shared/custom-loading-skeleton-resources'
import { ResourceProvider } from '~/components/shared/resource-provider'
import { API_URL } from '~/config/routes'
import { COLLABORATOR_STATUS } from '~/shared/constants/collaborator.constant'
import { ECollaboratorStatus, EResources } from '~/shared/enums'
import { collaboratorService } from '~/shared/services/collaborator.service'
import { type TResources } from '~/shared/types'
import { type TCollaboratorBaseSchema } from '~/shared/validators'

import FilterCollaborators from './filter-collaborator-data'
import ManagementCollaboratorTable from './management-collaborator-table'

function ManagementCollaborators() {
  const { t } = useTranslation('management-collaborators')
  const searchParams = useSearchParams()

  const { data: collaboratorDataResponse, isLoading: collaboratorsLoading } = useQuery({
    queryKey: [API_URL.PROJECT.GET_COLLABORATORS, String(searchParams)],
    queryFn: async () => {
      const res = await collaboratorService.getCollaborators(searchParams)
      return res.data
    }
  })

  const collaboratorStatusOptions = [
    {
      key: ECollaboratorStatus[ECollaboratorStatus.pending],
      value: t(COLLABORATOR_STATUS[ECollaboratorStatus[ECollaboratorStatus.pending]].label)
    },
    {
      key: ECollaboratorStatus[ECollaboratorStatus.active],
      value: t(COLLABORATOR_STATUS[ECollaboratorStatus[ECollaboratorStatus.active]].label)
    }
  ]

  if (collaboratorsLoading) return <CustomLoadingSkeletonResources />

  return (
    <ResourceProvider<TCollaboratorBaseSchema>
      resourceName={EResources[EResources['management-collaborators']] as TResources}
    >
      <div>
        <h1 className='text-xl font-medium text-foreground'>{t('title')}</h1>
        <FilterCollaborators
          // resourceName={EResources[EResources['management-projects']] as TResources}
          collaboratorStatusOptions={collaboratorStatusOptions}
        />
        <div className='flex flex-1'>
          <ManagementCollaboratorTable
            data={collaboratorDataResponse?.data || []}
            paginationResponse={{
              page: collaboratorDataResponse?.page || 1,
              limit: collaboratorDataResponse?.limit || 20,
              total_items: collaboratorDataResponse?.total_items || 1,
              total_pages: collaboratorDataResponse?.total_pages || 1
            }}
          />
        </div>
      </div>
    </ResourceProvider>
  )
}

export default ManagementCollaborators
