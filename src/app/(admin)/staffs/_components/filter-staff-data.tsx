'use client'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { addToast, Button, type DateRangePickerProps, Divider, type RangeValue } from '@heroui/react'
import { type DateValue, parseDate } from '@internationalized/date'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { type AxiosResponse } from 'axios'
import { useRouter, useSearchParams } from 'next/navigation'

import staffApiRequest from '~/api-requests/staff.request'
import ConfirmModal from '~/components/shared/confirm-modal'
import CustomDateRangePicker from '~/components/shared/custom-date-range-picker'
import CustomInput from '~/components/shared/custom-input'
import CustomSelect from '~/components/shared/custom-select'
import { useResourceContext } from '~/components/shared/resource-provider'
import reactI18n from '~/config/i18n/react-i18n'
import { useAuth } from '~/config/providers/auth.provider'
import { API_URL, APP_ROUTES } from '~/config/routes'
import { EPermissions } from '~/shared/enums'
import { type TUserResourceParams } from '~/shared/types/params.type'
import { type TResources } from '~/shared/types/resources.type'
import { handleApiEntityError } from '~/shared/utils'
import { hasPermission } from '~/shared/utils/permissions'
import { type TUserManagementRes, type TUsersManagementRes } from '~/shared/validators'

import CreateUserModal from './create-staff-modal'

interface IFilterUserDataProps {
  resourceName: TResources
  userStatusOptions?: { key: string; value: string }[]
  dataStaffs: TUsersManagementRes
}

const FilterUserData = ({ resourceName, userStatusOptions, dataStaffs }: IFilterUserDataProps) => {
  const { t } = useTranslation(['staffs'], { i18n: reactI18n })
  const { actionPermissions } = useAuth()

  const router = useRouter()
  const searchParams = useSearchParams()
  const [datePickerKey, setDatePickerKey] = useState<number>(0)

  const { selectedKeys, setSelectedKeys, isCreateModalOpen, setIsCreateModalOpen } =
    useResourceContext<TUserManagementRes>()
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false)
  const [isApproveModalOpen, setIsApproveModalOpen] = useState<boolean>(false)
  const [isBanModalOpen, setIsBanModalOpen] = useState<boolean>(false)

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

  useEffect(() => {
    setSelectedKeys([])
  }, [searchParams, setSelectedKeys])

  const handleChangeDateRangePicker = (range: RangeValue<DateValue> | null) => {
    setDateRange(range)
    const start = range?.start
    const end = range?.end
    setValue('created', { start, end })
  }

  const handleClearFilter = () => {
    reset()
    router.push(APP_ROUTES.RESOURCES.STAFFS)
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

    router.push(`${APP_ROUTES.RESOURCES.STAFFS}?${queryString}`)
  })

  const handleOpenCreateModal = () => {
    setIsCreateModalOpen(true)
  }

  const queryClient = useQueryClient()

  const { mutate: deleteStaffsMutate, isPending: isDeleting } = useMutation<
    AxiosResponse<{ message?: string }>[],
    Error,
    string[]
  >({
    mutationFn: (ids: string[]) => {
      return Promise.all(ids.map((id) => staffApiRequest.deleteStaff(id)))
    },
    onSuccess: (responses) => {
      queryClient.invalidateQueries({ queryKey: [API_URL.ADMIN.GET_STAFFS, String(searchParams)] })
      setIsDeleteModalOpen(false)
      setSelectedKeys([])

      const firstResponse = responses[0]
      const toastMessage = firstResponse.data.message || firstResponse.statusText || t('deleteSuccess')

      addToast({
        color: 'success',
        title: t('success'),
        description: toastMessage
      })
    },
    onError: (error) => {
      handleApiEntityError({ error })
    }
  })

  const handleDeleteStaffs = (ids: string[]) => deleteStaffsMutate(ids)

  const { mutate: approveStaffsMutate, isPending: isApproving } = useMutation({
    mutationFn: (ids: string[]) => staffApiRequest.approveStaffs(ids),
    onSuccess: async (data) => {
      queryClient.invalidateQueries({ queryKey: [API_URL.ADMIN.GET_STAFFS, String(searchParams)] })
      setIsApproveModalOpen(false)
      setSelectedKeys([])

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

  const handleApproveStaffs = (ids: string[]) => approveStaffsMutate(ids)

  const { mutate: banStaffsMutate, isPending: isBanning } = useMutation({
    mutationFn: (ids: string[]) => staffApiRequest.banStaffs(ids),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [API_URL.STAFF.GET_ALL] })
      setIsBanModalOpen(false)
      setSelectedKeys([])
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

  const handleBanStaffs = (ids: string[]) => banStaffsMutate(ids)

  const selectedActiveStaffs = dataStaffs.filter(
    (user) => selectedKeys.includes(String(user.id_account)) && user.status === 2
  )
  const selectedBannedStaffs = dataStaffs.filter(
    (user) => selectedKeys.includes(String(user.id_account)) && user.status === 3
  )

  return (
    <div className='my-2'>
      <Divider />
      <form onSubmit={onSubmit} className='py-5'>
        <div className='flex flex-col gap-4'>
          <div className='grid grid-cols-1 items-center gap-4 md:grid-cols-2 xl:grid-cols-4'>
            <CustomInput
              type='text'
              label={t('fieldUniversalSearch')}
              placeholder={t('placeholderUniversalSearch')}
              register={register('universalSearch')}
            />

            <CustomDateRangePicker
              aria-label='created'
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
          <div className='flex items-center justify-between gap-3'>
            {
              // hasPermission(resourceName, EPermissions.CREATE, actionPermissions) &&
              // selectedKeys.length === 0 && (
              <Button color='primary' onPress={handleOpenCreateModal}>
                {t('addNew')}
              </Button>
              // )
            }
            {selectedKeys.length > 0 && (
              <div className='flex items-center gap-3'>
                {/* {hasPermission(resourceName, EPermissions.DELETE, actionPermissions) && ( */}
                <Button
                  color='danger'
                  onPress={() => setIsDeleteModalOpen(true)}
                  disabled={isDeleting}
                  isLoading={isDeleting}
                >
                  {t('remove')}
                </Button>
                {/* )} */}
                {hasPermission(resourceName, EPermissions.UPDATE, actionPermissions) && (
                  <>
                    {selectedActiveStaffs.length === 0 && (
                      <Button
                        color='success'
                        onPress={() => setIsApproveModalOpen(true)}
                        disabled={isApproving}
                        isLoading={isApproving}
                      >
                        {t('approve')}
                      </Button>
                    )}

                    {selectedBannedStaffs.length === 0 && (
                      <Button
                        color='warning'
                        onPress={() => setIsBanModalOpen(true)}
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
              <Button color='danger' variant='bordered' type='button' onPress={handleClearFilter}>
                {t('clear')}
              </Button>
              <Button color='primary' variant='bordered' type='submit'>
                {t('search')}
              </Button>
            </div>
          </div>
        </div>
      </form>
      <Divider />
      {isCreateModalOpen && <CreateUserModal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} />}

      {isDeleteModalOpen && (
        <ConfirmModal
          modalHeader={t('modalDeleteUsers')}
          modalBody={t('modalDeleteSelectedMessage')}
          confirmButtonText={t('confirm')}
          cancelButtonText={t('cancel')}
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={() => {
            handleDeleteStaffs(selectedKeys)
          }}
        />
      )}

      {isApproveModalOpen && (
        <ConfirmModal
          modalHeader={t('modalApproveUsers')}
          modalBody={t('modalApproveSelectedMessage')}
          confirmButtonText={t('confirm')}
          cancelButtonText={t('cancel')}
          isOpen={isApproveModalOpen}
          onClose={() => setIsApproveModalOpen(false)}
          onConfirm={() => {
            handleApproveStaffs(selectedKeys)
          }}
        />
      )}

      {isBanModalOpen && (
        <ConfirmModal
          modalHeader={t('modalBanUsers')}
          modalBody={t('modalBanSelectedMessage')}
          confirmButtonText={t('confirm')}
          cancelButtonText={t('cancel')}
          isOpen={isBanModalOpen}
          onClose={() => setIsBanModalOpen(false)}
          onConfirm={() => {
            handleBanStaffs(selectedKeys)
          }}
        />
      )}
    </div>
  )
}

export default FilterUserData
