'use client'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Button, type DateRangePickerProps, Divider, type RangeValue } from '@heroui/react'
import { type DateValue, parseDate } from '@internationalized/date'
import { useRouter, useSearchParams } from 'next/navigation'

import CustomDateRangePicker from '~/components/shared/custom-date-range-picker'
import CustomInput from '~/components/shared/custom-input'
import { APP_ROUTES } from '~/config/routes'
import { type TDonationParams } from '~/shared/types/params.type'

import ExportModalDonors from './export-modal-donors'

const FilterDonorsData = () => {
  const { t } = useTranslation('management-donors')

  const searchParams = useSearchParams()
  const router = useRouter()
  const [datePickerKey, setDatePickerKey] = useState<number>(0)

  const getDateRangeFromParams = () => {
    const from = searchParams.get('start_date')
    const to = searchParams.get('end_date')
    return from && to
      ? {
          start: parseDate(from),
          end: parseDate(to)
        }
      : null
  }

  const [dateRange, setDateRange] = useState<RangeValue<DateValue> | null | undefined>(getDateRangeFromParams() || null)

  const { register, handleSubmit, setValue, reset } = useForm<TDonationParams>({
    mode: 'onSubmit',
    defaultValues: {
      page: searchParams.get('page') ?? '1',
      limit: searchParams.get('limit') ?? '10',
      accountName: searchParams.get('account_name') ?? '',
      nameProject: searchParams.get('project_name') ?? '',
      donateDate: {
        from: dateRange?.start,
        to: dateRange?.end
      }
    }
  })

  const [isExportModal, setIsExportModal] = useState(false)
  const handleExportModal = () => {
    setIsExportModal(true)
  }

  useEffect(() => {
    reset({
      page: searchParams.get('page') ?? '1',
      limit: searchParams.get('limit') ?? '10',
      accountName: searchParams.get('account_name') ?? '',
      nameProject: searchParams.get('project_name') ?? '',
      donateDate: {
        from: dateRange?.start,
        to: dateRange?.end
      }
    })
  }, [searchParams, reset, dateRange])

  const handleChangeDateRangePicker = (range: RangeValue<DateValue> | null) => {
    setDateRange(range)
    const from = range?.start
    const to = range?.end
    setValue('donateDate', { from, to })
  }

  const handleClearFilter = () => {
    reset()
    router.push(APP_ROUTES.RESOURCES.MANAGEMENT_DONORS)
    setDateRange(null)
    setDatePickerKey((prevKey) => prevKey + 1)
  }

  const onSubmit = handleSubmit((data) => {
    const { nameProject, accountName, donateDate: submittedDonateDate } = data

    const query: Record<string, string> = {
      ...Object.fromEntries(searchParams.entries()),
      project_name: nameProject || '',
      account_name: accountName || ''
    }

    if (submittedDonateDate?.from && submittedDonateDate.to) {
      query.start_date = String(submittedDonateDate.from)
      query.end_date = String(submittedDonateDate.to)
    } else {
      delete query.start_date
      delete query.end_date
    }

    const filteredQuery = Object.fromEntries(Object.entries(query).filter(([, value]) => value !== ''))
    const queryString = new URLSearchParams(filteredQuery).toString()
    router.push(`${APP_ROUTES.RESOURCES.MANAGEMENT_DONORS}?${queryString}`)
  })

  return (
    <div className='my-5'>
      <Divider />
      <form onSubmit={onSubmit} className='py-5'>
        <div className='flex flex-col gap-4'>
          <div className='grid grid-cols-1 items-center gap-4 md:grid-cols-2 xl:grid-cols-4'>
            <CustomInput
              type='text'
              label={t('fieldDonor')}
              placeholder={t('placeholderDonor')}
              register={register('accountName')}
            />

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
              label={t('fieldDonateDate')}
              hideTimeZone
              visibleMonths={2}
              value={dateRange as DateRangePickerProps['value']}
              onChange={(e) => handleChangeDateRangePicker(e)}
            />
          </div>
          <div className='flex items-center justify-between'>
            <Button color='primary' type='button' onPress={() => handleExportModal()}>
              {t('exportDonor')}
            </Button>
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
      {isExportModal && <ExportModalDonors isOpen={isExportModal} onClose={() => setIsExportModal(false)} />}
      <Divider />
    </div>
  )
}

export default FilterDonorsData
