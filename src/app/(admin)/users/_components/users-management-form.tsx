'use client'

import { useTranslation } from 'react-i18next'
import { useQuery } from '@tanstack/react-query'
import dynamic from 'next/dynamic'
import { useSearchParams } from 'next/navigation'

import { CustomLoadingSkeletonResources } from '~/components/shared/custom-loading-skeleton-resources'
import { ResourceProvider } from '~/components/shared/resource-provider'
import TableSkeleton from '~/components/shared/table-skeleton'
import { API_URL } from '~/config/routes'
import { EUserStatus } from '~/shared/enums'
import { EResources } from '~/shared/enums/resources.enum'
import { userService } from '~/shared/services/user.service'
import { type TResources } from '~/shared/types/resources.type'
import { type TUsersManagementRes } from '~/shared/validators'

import FilterUserData from './filter-user-data'

const UsersManagementTable = dynamic(() => import('./users-management-table'), {
  ssr: false,
  loading: () => <TableSkeleton />
})

const UsersManagementForm = () => {
  const { t } = useTranslation('users')
  const searchParams = useSearchParams()

  const { data: userDataResponse, isLoading: usersLoading } = useQuery({
    queryKey: [API_URL.USER.GET_ALL, String(searchParams)],
    queryFn: async () => {
      const res = await userService.getUsers(searchParams)
      return res.data
    }
  })

  const userStatusOptions = [
    { key: String(EUserStatus[EUserStatus.pending]), value: t(EUserStatus[EUserStatus.pending]) },
    { key: String(EUserStatus[EUserStatus.active]), value: t(EUserStatus[EUserStatus.active]) },
    { key: String(EUserStatus[EUserStatus.blocked]), value: t(EUserStatus[EUserStatus.blocked]) }
  ]

  if (usersLoading) return <CustomLoadingSkeletonResources />

  return (
    <ResourceProvider<TUsersManagementRes> resourceName={EResources[EResources.users] as TResources}>
      <div>
        <h1 className='text-xl font-medium'>{t('title')}</h1>
        <FilterUserData
          resourceName={EResources[EResources.users] as TResources}
          userStatusOptions={userStatusOptions}
          dataUsers={userDataResponse?.data || []}
        />
        <UsersManagementTable
          data={userDataResponse?.data || []}
          paginationResponse={{
            page: userDataResponse?.page || 1,
            limit: userDataResponse?.limit || 20,
            total_items: userDataResponse?.total_items || 1,
            total_pages: userDataResponse?.total_pages || 1
          }}
        />
      </div>
    </ResourceProvider>
  )
}

export default UsersManagementForm
