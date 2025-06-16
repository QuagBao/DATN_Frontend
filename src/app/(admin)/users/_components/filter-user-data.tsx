'use client'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { addToast, Button, type DateRangePickerProps, Divider, type RangeValue } from '@heroui/react'
import { type DateValue, parseDate } from '@internationalized/date'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import dynamic from 'next/dynamic'
import { useRouter, useSearchParams } from 'next/navigation'

import { userApiRequest } from '~/api-requests'
import ConfirmModal from '~/components/shared/confirm-modal'
import CustomInput from '~/components/shared/custom-input'
import CustomSelect from '~/components/shared/custom-select'
import { useResourceContext } from '~/components/shared/resource-provider'
import { useAuth } from '~/config/providers/auth.provider'
import { API_URL, APP_ROUTES } from '~/config/routes'
import { EPermissions } from '~/shared/enums'
import { type TUserResourceParams } from '~/shared/types/params.type'
import { type TResources } from '~/shared/types/resources.type'
import { handleApiEntityError } from '~/shared/utils'
import { hasPermission } from '~/shared/utils/permissions'
import { type TUserManagementRes } from '~/shared/validators'

const CustomDateRangePicker = dynamic(() => import('~/components/shared/custom-date-range-picker'), {
  ssr: false,
  loading: () => <div className='h-10 animate-pulse rounded-md bg-default-100' />
})

interface IFilterUserDataProps {
  resourceName: TResources
  userStatusOptions?: { key: string; value: string }[]
  dataUsers: TUserManagementRes[]
}

const FilterUserData = ({ resourceName, userStatusOptions, dataUsers }: IFilterUserDataProps) => {
  const { t } = useTranslation('users')
  const { actionPermissions } = useAuth()

  const router = useRouter()
  const searchParams = useSearchParams()
  const [datePickerKey, setDatePickerKey] = useState<number>(0)

  const {
    selectedKeys,
    setSelectedKeys,
    setIsDeleteManyModalOpen,
    isDeleteManyModalOpen,
    isApproveManyModalOpen,
    setIsApproveManyModalOpen,
    isBanManyModalOpen,
    setIsBanManyModalOpen
  } = useResourceContext<TUserManagementRes>()

  const getDateRangeFromParams = () => {
    const start = searchParams.get('start_date')
    const end = searchParams.get('end_date')
    return start && end
      ? {
          start: parseDate(start),
          end: parseDate(end)
        }
      : null
  }

  const [dateRange, setDateRange] = useState<RangeValue<DateValue> | null | undefined>(getDateRangeFromParams() || null)

  const { register, handleSubmit, setValue, reset } = useForm<TUserResourceParams>({
    mode: 'onSubmit',
    defaultValues: {
      page: searchParams.get('page') ?? '1',
      limit: searchParams.get('limit') ?? '10',
      universalSearch: searchParams.get('universal_search') ?? '',
      status: searchParams.get('status') ? String(searchParams.get('status')) : undefined,
      created: {
        start: dateRange?.start,
        end: dateRange?.end
      }
    }
  })

  useEffect(() => {
    reset({
      page: searchParams.get('page') ?? '1',
      limit: searchParams.get('limit') ?? '10',
      universalSearch: searchParams.get('universal_search') ?? '',
      status: searchParams.get('status') ? String(searchParams.get('status')) : undefined,
      created: {
        start: dateRange?.start,
        end: dateRange?.end
      }
    })
  }, [searchParams, reset, dateRange])

  const handleChangeDateRangePicker = (range: RangeValue<DateValue> | null) => {
    setDateRange(range)
    const start = range?.start
    const end = range?.end
    setValue('created', { start, end })
  }

  const handleClearFilter = () => {
    reset()
    router.push(APP_ROUTES.RESOURCES.USERS)
    setDateRange(null)
    setDatePickerKey((prevKey) => prevKey + 1)
  }

  const onSubmit = handleSubmit((data) => {
    const { universalSearch, roleId, created, status } = data

    const query: Record<string, string> = {
      ...Object.fromEntries(searchParams.entries()),
      universal_search: universalSearch || '',
      roleId: roleId ? String(roleId) : '',
      status: status ? String(status) : ''
    }

    if (created?.start && created.end) {
      query.start_date = String(created.start)
      query.end_date = String(created.end)
    } else {
      delete query.start_date
      delete query.end_date
    }

    const filteredQuery = Object.fromEntries(Object.entries(query).filter(([, value]) => value !== ''))

    const queryString = new URLSearchParams(filteredQuery).toString()
    setSelectedKeys([])
    router.push(`${APP_ROUTES.RESOURCES.USERS}?${queryString}`)
  })

  const uniqueKeys = Array.from(new Set<string>([]))

  const queryClient = useQueryClient()

  const { mutate: deleteUsersMutate, isPending: isDeleting } = useMutation({
    mutationFn: (ids: string[]) => userApiRequest.deleteUser(ids),
    onSuccess: async (data) => {
      setSelectedKeys([])
      await queryClient.invalidateQueries({ queryKey: [API_URL.USER.GET_ALL] })
      setIsDeleteManyModalOpen(false)
      addToast({
        color: 'success',
        title: t('success'),
        description: data.data.message || data.statusText
      })
    },
    onError: (error) => {
      handleApiEntityError({ error })
    }
  })

  const handleDeleteUsers = (ids: string[]) => deleteUsersMutate(ids)

  const { mutate: approveUsersMutate, isPending: isApproving } = useMutation({
    mutationFn: (ids: string[]) => userApiRequest.approveUsers(ids),
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: [API_URL.USER.GET_ALL] })
      setIsApproveManyModalOpen(false)
      setSelectedKeys(uniqueKeys)
      addToast({
        color: 'success',
        title: t('success'),
        description: data.data.message || data.statusText
      })
    },
    onError: (error) => {
      handleApiEntityError({ error })
    }
  })

  const handleApproveUsers = (ids: string[]) => approveUsersMutate(ids)

  const { mutate: banUsersMutate, isPending: isBanning } = useMutation({
    mutationFn: (ids: string[]) => userApiRequest.banUsers(ids),
    onSuccess: async (data) => {
      setSelectedKeys([])
      await queryClient.invalidateQueries({ queryKey: [API_URL.USER.GET_ALL] })
      setIsBanManyModalOpen(false)
      addToast({
        color: 'success',
        title: t('success'),
        description: data.data.message || data.statusText
      })
    },
    onError: (error) => {
      handleApiEntityError({ error })
    }
  })

  const handleBanUsers = (ids: string[]) => banUsersMutate(ids)

  const selectedActiveUsers = dataUsers.filter(
    (user) => selectedKeys.includes(String(user.id_account)) && user.status === 2
  )
  const selectedBannedUsers = dataUsers.filter(
    (user) => selectedKeys.includes(String(user.id_account)) && user.status === 3
  )

  return (
    <div className='my-2'>
      <Divider />
      <form onSubmit={onSubmit} className='py-5'>
        <div className='flex flex-col gap-4'>
          <div className='grid grid-cols-1 items-center gap-4 md:grid-cols-2 xl:grid-cols-3'>
            <CustomInput
              type='text'
              label={t('fieldUniversalSearch')}
              placeholder={t('placeholderUniversalSearch')}
              register={register('universalSearch')}
            />

            <CustomDateRangePicker
              aria-label='createDate'
              hourCycle={24}
              key={`created-${datePickerKey}`}
              label={t('fieldJoinDate')}
              hideTimeZone
              visibleMonths={2}
              value={dateRange as DateRangePickerProps['value']}
              onChange={(e) => handleChangeDateRangePicker(e)}
            />
            <CustomSelect
              aria-label='status'
              label={t('fieldStatus')}
              labelPlacement='outside'
              register={register('status')}
              placeholder={t('placeholderStatus')}
              options={userStatusOptions}
              disallowEmptySelection
            />
          </div>
          <div className='flex items-center justify-between'>
            {selectedKeys.length > 0 && (
              <div className='flex gap-2'>
                {hasPermission(resourceName, EPermissions.DELETE, actionPermissions) && (
                  <Button
                    color='danger'
                    onPress={() => {
                      setIsDeleteManyModalOpen(true)
                    }}
                    disabled={isDeleting}
                    isLoading={isDeleting}
                  >
                    {t('remove')}
                  </Button>
                )}
                {hasPermission(resourceName, EPermissions.UPDATE, actionPermissions) && (
                  <>
                    {selectedActiveUsers.length === 0 && (
                      <Button
                        color='success'
                        onPress={() => setIsApproveManyModalOpen(true)}
                        disabled={isApproving}
                        isLoading={isApproving}
                      >
                        {t('approve')}
                      </Button>
                    )}
                    {selectedBannedUsers.length === 0 && (
                      <Button
                        color='warning'
                        onPress={() => setIsBanManyModalOpen(true)}
                        disabled={isBanning}
                        isLoading={isBanning}
                      >
                        {t('lock')}
                      </Button>
                    )}
                  </>
                )}
              </div>
            )}
            <div className='ml-auto flex items-center justify-end gap-2'>
              <Button type='button' color='danger' variant='bordered' onPress={handleClearFilter}>
                {t('clear')}
              </Button>
              <Button type='submit' color='primary' variant='bordered'>
                {t('search')}
              </Button>
            </div>
          </div>
        </div>
      </form>
      <Divider />

      {isDeleteManyModalOpen && (
        <ConfirmModal
          isOpen={isDeleteManyModalOpen}
          modalHeader={t('modalDeleteUsers')}
          modalBody={t('modalDeleteSelectedMessage')}
          confirmButtonText={t('confirm')}
          cancelButtonText={t('cancel')}
          onClose={() => setIsDeleteManyModalOpen(false)}
          onConfirm={() => {
            handleDeleteUsers(selectedKeys)
          }}
        />
      )}

      {isApproveManyModalOpen && (
        <ConfirmModal
          modalHeader={t('modalApproveUsers')}
          modalBody={t('modalApproveSelectedMessage')}
          confirmButtonText={t('confirm')}
          cancelButtonText={t('cancel')}
          isOpen={isApproveManyModalOpen}
          onClose={() => setIsApproveManyModalOpen(false)}
          onConfirm={() => {
            handleApproveUsers(selectedKeys)
          }}
        />
      )}

      {isBanManyModalOpen && (
        <ConfirmModal
          modalHeader={t('modalBanUsers')}
          modalBody={t('modalBanSelectedMessage')}
          confirmButtonText={t('confirm')}
          cancelButtonText={t('cancel')}
          isOpen={isBanManyModalOpen}
          onClose={() => setIsBanManyModalOpen(false)}
          onConfirm={() => {
            handleBanUsers(selectedKeys)
          }}
        />
      )}
    </div>
  )
}

export default FilterUserData
