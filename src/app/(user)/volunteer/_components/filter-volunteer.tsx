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
import { type TCollaboratorParams } from '~/shared/types/params.type'

const FilterDonation = () => {
  const { t } = useTranslation('volunteer')

  const router = useRouter()
  const searchParams = useSearchParams()
  const [datePickerKey, setDatePickerKey] = useState<number>(0)

  function getDateRangeFromParams(): RangeValue<DateValue> | null {
    const from = searchParams.get('start_date')
    const to = searchParams.get('end_date')
    return from && to ? { start: parseDate(from), end: parseDate(to) } : null
  }

  const [dateRange, setDateRange] = useState<RangeValue<DateValue> | null | undefined>(getDateRangeFromParams() || null)

  const { register, handleSubmit, setValue, reset } = useForm<TCollaboratorParams>({
    mode: 'onSubmit',
    defaultValues: {
      page: searchParams.get('page') ?? '1',
      limit: searchParams.get('limit') ?? '10',
      nameProject: searchParams.get('name_project') ?? '',
      universalSearch: searchParams.get('universal_search') ?? '',
      approvedDate: {
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
      universalSearch: searchParams.get('universal_search') ?? '',
      approvedDate: { from: dateRange?.start, to: dateRange?.end }
    })
  }, [searchParams, reset, dateRange])

  const handleChangeDateRangePicker = (range: RangeValue<DateValue> | null) => {
    setDateRange(range)
    const from = range?.start
    const to = range?.end
    setValue('approvedDate', { from, to })
  }

  const handleClearFilter = () => {
    reset()
    router.push(APP_ROUTES.COMMON.VOLUNTEER)
    setDateRange(null)
    setDatePickerKey((prevKey) => prevKey + 1)
  }

  const onSubmit = handleSubmit((data) => {
    const { universalSearch, nameProject, approvedDate } = data

    const query: Record<string, string> = {
      ...Object.fromEntries(searchParams.entries()),
      universal_search: universalSearch || '',
      name_project: nameProject || ''
    }

    if (approvedDate?.from && approvedDate.to) {
      query.start_date = String(approvedDate.from)
      query.end_date = String(approvedDate.to)
    } else {
      delete query.start_date
      delete query.end_date
    }

    const filteredQuery = Object.fromEntries(Object.entries(query).filter(([, value]) => value !== ''))
    const queryString = new URLSearchParams(filteredQuery).toString()
    router.push(`${APP_ROUTES.COMMON.VOLUNTEER}?${queryString}`)
  })
  return (
    <div className='my-2 px-5 md:px-40'>
      <form onSubmit={onSubmit} className='py-5'>
        <div className='flex flex-col gap-4'>
          <div className='grid grid-cols-1 items-center gap-4 md:grid-cols-2 xl:grid-cols-3'>
            <CustomInput
              type='text'
              classNames={{ label: '!text-ct-blue' }}
              label={t('fieldVolunteer')}
              placeholder={t('placeholderVolunteer')}
              register={register('universalSearch', {
                onBlur: (e: React.FocusEvent<HTMLInputElement>) => setValue('universalSearch', e.target.value)
              })}
            />

            <CustomInput
              type='text'
              classNames={{ label: '!text-ct-blue' }}
              label={t('fieldProject')}
              placeholder={t('placeholderProject')}
              register={register('nameProject', {
                onBlur: (e: React.FocusEvent<HTMLInputElement>) => setValue('nameProject', e.target.value)
              })}
            />

            <CustomDateRangePicker
              aria-label='approveAt'
              hourCycle={24}
              classNames={{ label: '!text-ct-blue' }}
              key={`createdAt-${datePickerKey}`}
              label={t('fieldApproveAt')}
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
