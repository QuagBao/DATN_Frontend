'use client'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Button, type DateRangePickerProps, Divider, type RangeValue } from '@heroui/react'
import { type DateValue, parseDate } from '@internationalized/date'
import { useRouter, useSearchParams } from 'next/navigation'

import CustomDateRangePicker from '~/components/shared/custom-date-range-picker'
import CustomInput from '~/components/shared/custom-input'
import CustomSelect from '~/components/shared/custom-select'
import { useResourceContext } from '~/components/shared/resource-provider'
import reactI18n from '~/config/i18n/react-i18n'
import { APP_ROUTES } from '~/config/routes'
import { type TProjectParams } from '~/shared/types/params.type'
import { type TProjectBaseSchema } from '~/shared/validators/schemas/project/project.schema'

import ModalCreateEditProject from './modal-create-edit-project'

interface IFilterProjectDataProps {
  // resourceName: TResources
  projectStatusOptions?: { key: string; value: string }[]
}

const FilterProjectData = ({ projectStatusOptions }: IFilterProjectDataProps) => {
  const { t } = useTranslation(['management-projects'], { i18n: reactI18n })
  // const { actionPermissions } = useAuth()

  const router = useRouter()
  const searchParams = useSearchParams()
  const [datePickerKey, setDatePickerKey] = useState<number>(0)

  const { isCreateModalOpen, setIsCreateModalOpen } = useResourceContext<TProjectBaseSchema>()

  const getDateRangeFromParams = () => {
    const from = searchParams.get('start_date')
    const to = searchParams.get('end_date')
    return from && to ? { start: parseDate(from), end: parseDate(to) } : null
  }

  const [dateRange, setDateRange] = useState<RangeValue<DateValue> | null | undefined>(getDateRangeFromParams() || null)

  const { register, handleSubmit, setValue, reset } = useForm<TProjectParams>({
    mode: 'onSubmit',
    defaultValues: {
      page: searchParams.get('page') ?? '1',
      limit: searchParams.get('limit') ?? '10',
      nameProject: searchParams.get('name_project') ?? '',
      status: searchParams.get('status') ? Number(searchParams.get('status')) : undefined,
      dateRange: {
        from: dateRange?.start,
        to: dateRange?.end
      }
    }
  })

  useEffect(() => {
    reset({
      page: searchParams.get('page') ?? '1',
      limit: searchParams.get('limit') ?? '10',
      nameProject: searchParams.get('name_project') ?? '',
      status: searchParams.get('status') ? Number(searchParams.get('status')) : undefined,
      dateRange: {
        from: dateRange?.start,
        to: dateRange?.end
      }
    })
  }, [searchParams, reset, dateRange])

  const handleChangeDateRangePicker = (range: RangeValue<DateValue> | null) => {
    setDateRange(range)
    const from = range?.start
    const to = range?.end
    setValue('dateRange', { from, to })
  }

  const handleClearFilter = () => {
    reset()
    router.push(APP_ROUTES.RESOURCES.MANAGEMENT_PROJECTS)
    setDateRange(null)
    setDatePickerKey((prevKey) => prevKey + 1)
  }

  const onSubmit = handleSubmit((data) => {
    const { nameProject, dateRange: submittedDateRange, status } = data

    const query: Record<string, string> = {
      ...Object.fromEntries(searchParams.entries()),
      name_project: nameProject || '',
      status: status ? String(status) : ''
    }

    if (submittedDateRange?.from && submittedDateRange.to) {
      query.start_date = String(submittedDateRange.from)
      query.end_date = String(submittedDateRange.to)
    } else {
      delete query.start_date
      delete query.end_date
    }

    const filteredQuery = Object.fromEntries(Object.entries(query).filter(([, value]) => value !== ''))
    const queryString = new URLSearchParams(filteredQuery).toString()
    router.push(`${APP_ROUTES.RESOURCES.MANAGEMENT_PROJECTS}?${queryString}`)
  })

  const handleOpenCreateModal = () => {
    setIsCreateModalOpen(true)
  }

  return (
    <div className='my-5'>
      <Divider />
      <form onSubmit={onSubmit} className='py-5'>
        <div className='flex flex-col gap-4'>
          <div className='grid grid-cols-1 items-center gap-4 md:grid-cols-2 xl:grid-cols-4'>
            <CustomInput
              type='text'
              label={t('fieldProject')}
              placeholder={t('placeholderProject')}
              register={register('nameProject')}
            />

            <CustomDateRangePicker
              aria-label='created'
              hourCycle={24}
              key={`created-${datePickerKey}`}
              label={t('fieldRangeDate')}
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
              options={projectStatusOptions}
              disallowEmptySelection
            />
          </div>
          <div className='flex items-center justify-between'>
            {
              // hasPermission(resourceName, EPermissions.CREATE, actionPermissions) &&
              // selectedKeys.length === 0 && (
              <Button color='primary' onPress={handleOpenCreateModal}>
                {t('addNew')}
              </Button>
              // )
            }

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

      {isCreateModalOpen && (
        <ModalCreateEditProject isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} isCreateModal />
      )}
    </div>
  )
}

export default FilterProjectData
