'use client'

import { useTranslation } from 'react-i18next'
import { useQuery } from '@tanstack/react-query'
import dynamic from 'next/dynamic'
import { useSearchParams } from 'next/navigation'

import { CustomLoadingSkeletonResources } from '~/components/shared/custom-loading-skeleton-resources'
import { ResourceProvider } from '~/components/shared/resource-provider'
import TableSkeleton from '~/components/shared/table-skeleton'
import { API_URL } from '~/config/routes'
import { EResources } from '~/shared/enums'
import { donorService } from '~/shared/services/donor.service'
import { type TResources } from '~/shared/types'
import { type TDonorBaseSchema } from '~/shared/validators/schemas/donors/donor.schema'

import FilterDonorsData from './filter-donors-data'

const ManagementDonorsTable = dynamic(() => import('./management-donors-table'), {
  ssr: false,
  loading: () => <TableSkeleton />
})

const ManagementDonors = () => {
  const { t } = useTranslation('management-donors')
  const searchParams = useSearchParams()

  const { data: donorsDataResponse, isLoading: donorsLoading } = useQuery({
    queryKey: [API_URL.PROJECT.ALL_PROJECT, String(searchParams)],
    queryFn: async () => {
      const res = await donorService.getDonors(searchParams)
      return res.data
    }
  })
  if (donorsLoading) return <CustomLoadingSkeletonResources />
  return (
    <ResourceProvider<TDonorBaseSchema> resourceName={EResources[EResources['management-donors']] as TResources}>
      <div>
        <h1 className='text-xl font-medium text-foreground'>{t('title')}</h1>
        <FilterDonorsData />
        <ManagementDonorsTable
          data={donorsDataResponse?.data || []}
          paginationResponse={{
            page: donorsDataResponse?.page || 1,
            limit: donorsDataResponse?.limit || 20,
            total_items: donorsDataResponse?.total_items || 1,
            total_pages: donorsDataResponse?.total_pages || 1
          }}
        />
      </div>
    </ResourceProvider>
  )
}

export default ManagementDonors
