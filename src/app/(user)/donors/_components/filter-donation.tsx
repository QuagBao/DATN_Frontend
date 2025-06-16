'use client'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Button, type DateRangePickerProps, type RangeValue } from '@heroui/react'
import { type DateValue, parseDate } from '@internationalized/date'
import { useRouter, useSearchParams } from 'next/navigation'

import CustomDateRangePicker from '~/components/shared/custom-date-range-picker'
import CustomInput from '~/components/shared/custom-input'
import { APP_ROUTES } from '~/config/routes'
import { type TDonationParams } from '~/shared/types/params.type'

const FilterDonation = () => {
  const { t } = useTranslation('donors')

  const router = useRouter()
  const searchParams = useSearchParams()

  function getDateRangeFromParams(): RangeValue<DateValue> | null {
    const from = searchParams.get('start_date')
    const to = searchParams.get('end')
    return from && to ? { start: parseDate(from), end: parseDate(to) } : null
  }

  const [datePickerKey, setDatePickerKey] = useState<number>(0)
  const [dateRange, setDateRange] = useState<RangeValue<DateValue> | null | undefined>(getDateRangeFromParams() || null)

  const { register, handleSubmit, setValue, reset } = useForm<TDonationParams>({
    mode: 'onSubmit',
    defaultValues: {
      page: searchParams.get('page') ?? '1',
      limit: searchParams.get('limit') ?? '10',
      nameProject: searchParams.get('project_name') ?? '',
      accountName: searchParams.get('account_name') ?? '',
      donateDate: {
        from: dateRange?.start,
        to: dateRange?.end
      }
    }
  })

  useEffect(() => {
    reset({
      page: searchParams.get('page') ?? '1',
      limit: searchParams.get('limit') ?? '10',
      nameProject: searchParams.get('project_name') ?? '',
      accountName: searchParams.get('account_name') ?? '',
      donateDate: { from: dateRange?.start, to: dateRange?.end }
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
    router.push(APP_ROUTES.COMMON.DONORS)
    setDateRange(null)
    setDatePickerKey((prevKey) => prevKey + 1)
  }

  const onSubmit = handleSubmit((data) => {
    const { nameProject, accountName, donateDate } = data

    const query: Record<string, string> = {
      ...Object.fromEntries(searchParams.entries()),
      project_name: nameProject || '',
      account_name: accountName || ''
    }

    if (donateDate?.from && donateDate.to) {
      query.start_date = String(donateDate.from)
      query.end_date = String(donateDate.to)
    } else {
      delete query.start_date
      delete query.end_date
    }

    const filteredQuery = Object.fromEntries(Object.entries(query).filter(([, value]) => value !== ''))
    const queryString = new URLSearchParams(filteredQuery).toString()
    router.push(`${APP_ROUTES.COMMON.DONORS}?${queryString}`)
  })
  return (
    <div className='my-2 px-5 md:px-40'>
      <form onSubmit={onSubmit} className='py-5'>
        <div className='flex flex-col gap-4'>
          <div className='grid grid-cols-1 items-center gap-4 md:grid-cols-2 xl:grid-cols-3'>
            <CustomInput
              type='text'
              classNames={{ label: '!text-ct-blue' }}
              label={t('fieldNameProject')}
              placeholder={t('placeholderNameProject')}
              register={register('nameProject')}
            />

            <CustomInput
              type='text'
              classNames={{ label: '!text-ct-blue' }}
              label={t('fieldDonator')}
              placeholder={t('placeholderDonator')}
              register={register('accountName')}
            />

            <CustomDateRangePicker
              aria-label='createdAt'
              hourCycle={24}
              classNames={{ label: '!text-ct-blue' }}
              key={`createdAt-${datePickerKey}`}
              label={t('fieldDonateDate')}
              hideTimeZone
              visibleMonths={2}
              value={dateRange as DateRangePickerProps['value']}
              onChange={(e) => handleChangeDateRangePicker(e)}
            />
          </div>
          <div className='flex items-center justify-between'>
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
    </div>
  )
}

export default FilterDonation
