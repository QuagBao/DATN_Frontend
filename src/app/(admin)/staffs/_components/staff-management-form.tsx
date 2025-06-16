'use client'

import { useTranslation } from 'react-i18next'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'

import { CustomLoadingSkeletonResources } from '~/components/shared/custom-loading-skeleton-resources'
import { ResourceProvider } from '~/components/shared/resource-provider'
import { API_URL } from '~/config/routes'
import { EUserStatus } from '~/shared/enums'
import { EResources } from '~/shared/enums/resources.enum'
import { userService } from '~/shared/services/user.service'
import { type TResources } from '~/shared/types/resources.type'
import { type TUsersManagementRes } from '~/shared/validators'

import FilterUserData from './filter-staff-data'
import StaffsManagementTable from './staff-management-table'

const StaffManagementForm = () => {
  const { t } = useTranslation('staffs')
  const searchParams = useSearchParams()
  const { data: staffDataResponse, isLoading: staffsLoading } = useQuery({
    queryKey: [API_URL.ADMIN.GET_STAFFS, String(searchParams)],
    queryFn: async () => {
      const res = await userService.getStaffs(searchParams)
      return res.data
    }
  })

  const userStatusOptions = [
    { key: String(EUserStatus[EUserStatus.pending]), value: t(EUserStatus[EUserStatus.pending]) },
    { key: String(EUserStatus[EUserStatus.active]), value: t(EUserStatus[EUserStatus.active]) },
    { key: String(EUserStatus[EUserStatus.blocked]), value: t(EUserStatus[EUserStatus.blocked]) }
  ]

  if (staffsLoading) return <CustomLoadingSkeletonResources />

  return (
    <ResourceProvider<TUsersManagementRes> resourceName={EResources[EResources.staffs] as TResources}>
      <div>
        <h1 className='text-xl font-medium text-foreground'>{t('titleAdmin')}</h1>
        <FilterUserData
          resourceName={EResources[EResources.staffs] as TResources}
          userStatusOptions={userStatusOptions}
          dataStaffs={staffDataResponse?.data || []}
        />
        <div className='flex flex-1'>
          <StaffsManagementTable
            data={staffDataResponse?.data || []}
            paginationResponse={{
              page: staffDataResponse?.page || 1,
              limit: staffDataResponse?.limit || 20,
              total_items: staffDataResponse?.total_items || 1,
              total_pages: staffDataResponse?.total_pages || 1
            }}
          />
        </div>
      </div>
    </ResourceProvider>
  )
}

export default StaffManagementForm
