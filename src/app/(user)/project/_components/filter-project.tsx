'use client'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Button, type DateRangePickerProps, type RangeValue } from '@heroui/react'
import { type DateValue, parseDate } from '@internationalized/date'
import { useRouter, useSearchParams } from 'next/navigation'

import CustomDateRangePicker from '~/components/shared/custom-date-range-picker'
import CustomInput from '~/components/shared/custom-input'
import CustomSelect from '~/components/shared/custom-select'
import { APP_ROUTES } from '~/config/routes'
import { type TProjectParams } from '~/shared/types/params.type'

interface IFilterProjectDataProps {
  projectStatusOptions?: { key: string; value: string }[]
}

const FilterProject = ({ projectStatusOptions }: IFilterProjectDataProps) => {
  const { t } = useTranslation('project')

  const router = useRouter()
  const searchParams = useSearchParams()
  const [datePickerKey, setDatePickerKey] = useState<number>(0)

  function getDateRangeFromParams(): RangeValue<DateValue> | null {
    const from = searchParams.get('from')
    const to = searchParams.get('to')
    return from && to ? { start: parseDate(from), end: parseDate(to) } : null
  }
  const [dateRange, setDateRange] = useState<RangeValue<DateValue> | null | undefined>(getDateRangeFromParams() || null)

  const { register, handleSubmit, setValue, reset } = useForm<TProjectParams>({
    mode: 'onSubmit',
    defaultValues: {
      page: searchParams.get('page') ?? '1',
      limit: searchParams.get('limit') ?? '10',
      nameProject: searchParams.get('nameProject') ?? '',
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
      nameProject: searchParams.get('nameProject') ?? '',
      status: searchParams.get('status') ? Number(searchParams.get('status')) : undefined,
      dateRange: dateRange ? { from: dateRange.start, to: dateRange.end } : undefined
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
    router.push(APP_ROUTES.COMMON.PROJECT)
    setDateRange(null)
    setDatePickerKey((prevKey) => prevKey + 1)
  }

  const onSubmit = handleSubmit((data) => {
    const { nameProject, status, dateRange: formDateRange } = data

    const query: Record<string, string> = {
      ...Object.fromEntries(searchParams.entries()),
      nameProject: nameProject || '',
      status: String(status) || ''
    }

    if (formDateRange?.from && formDateRange.to) {
      query.dateRangeFrom = String(formDateRange.from)
      query.dateRangeTo = String(formDateRange.to)
    } else {
      delete query.dateRangeFrom
      delete query.dateRangeTo
    }

    const filteredQuery = Object.fromEntries(Object.entries(query).filter(([, value]) => value !== ''))
    const queryString = new URLSearchParams(filteredQuery).toString()
    router.push(`${APP_ROUTES.COMMON.PROJECT}?${queryString}`)
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

            <CustomDateRangePicker
              aria-label='createdAt'
              hourCycle={24}
              classNames={{ label: '!text-ct-blue' }}
              key={`createdAt-${datePickerKey}`}
              label={t('fieldDateRange')}
              hideTimeZone
              visibleMonths={2}
              value={dateRange as DateRangePickerProps['value']}
              onChange={(e) => handleChangeDateRangePicker(e)}
            />

            <CustomSelect
              aria-label='status'
              classNames={{ label: '!text-ct-blue' }}
              label={t('fieldStatus')}
              labelPlacement='outside'
              register={register('status')}
              placeholder={t('placeholderStatus')}
              options={projectStatusOptions}
              disallowEmptySelection
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

export default FilterProject
