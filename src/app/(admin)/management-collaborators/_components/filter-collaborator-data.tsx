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
import reactI18n from '~/config/i18n/react-i18n'
import { APP_ROUTES } from '~/config/routes'
import { type TCollaboratorParams } from '~/shared/types/params.type'

import ExportModal from './export-modal'
import ImportModal from './import-modal'

interface IFilterCollaboratorsProps {
  collaboratorStatusOptions?: { key: string; value: string }[]
}

const FilterCollaborators = ({ collaboratorStatusOptions }: IFilterCollaboratorsProps) => {
  const { t } = useTranslation(['management-collaborators'], { i18n: reactI18n })
  const router = useRouter()
  const searchParams = useSearchParams()
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

  const { register, handleSubmit, setValue, reset } = useForm<TCollaboratorParams>({
    mode: 'onSubmit',
    defaultValues: {
      page: searchParams.get('page') ?? '1',
      limit: searchParams.get('limit') ?? '10',
      nameProject: searchParams.get('name_project') ?? '',
      universalSearch: searchParams.get('universal_search') ?? '',
      status: searchParams.get('status') ?? '',
      appliedDates: {
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
      status: searchParams.get('status') ?? '',
      appliedDates: { from: dateRange?.start, to: dateRange?.end }
    })
  }, [searchParams, reset, dateRange])

  const handleChangeDateRangePicker = (range: RangeValue<DateValue> | null) => {
    setDateRange(range)
    const from = range?.start
    const to = range?.end
    setValue('appliedDates', { from, to })
  }

  const handleClearFilter = () => {
    reset()
    router.push(APP_ROUTES.RESOURCES.MANAGEMENT_COLLABORATORS)
    setDateRange(null)
    setDatePickerKey((prevKey) => prevKey + 1)
  }

  const onSubmit = handleSubmit((data) => {
    const { nameProject, universalSearch, appliedDates: submittedAppliedDate, status } = data

    const query: Record<string, string> = {
      ...Object.fromEntries(searchParams.entries()),
      name_project: nameProject || '',
      universal_search: universalSearch || '',
      status: status ? String(status) : ''
    }

    if (submittedAppliedDate?.from && submittedAppliedDate.to) {
      query.start_date = String(submittedAppliedDate.from)
      query.end_date = String(submittedAppliedDate.to)
    } else {
      delete query.start_date
      delete query.end_date
    }

    const filteredQuery = Object.fromEntries(Object.entries(query).filter(([, value]) => value !== ''))
    const queryString = new URLSearchParams(filteredQuery).toString()
    router.push(`${APP_ROUTES.RESOURCES.MANAGEMENT_COLLABORATORS}?${queryString}`)
  })

  const [isExportModal, setIsExportModal] = useState(false)
  const [isImportModal, setIsImportModal] = useState(false)
  const handleOpenExportModal = () => {
    setIsExportModal(true)
  }
  const handleOpenImportModal = () => {
    setIsImportModal(true)
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
              label={t('fieldAppliedDate')}
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
              options={collaboratorStatusOptions}
              disallowEmptySelection
            />
          </div>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <Button color='primary' onPress={() => handleOpenExportModal()}>
                {t('exportCollaborator')}
              </Button>
              <Button color='primary' onPress={() => handleOpenImportModal()}>
                {t('importCollaborator')}
              </Button>
            </div>

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
      {isExportModal && <ExportModal isOpen={isExportModal} onClose={() => setIsExportModal(false)} />}
      {isImportModal && <ImportModal isOpen={isImportModal} onClose={() => setIsImportModal(false)} />}
      <Divider />
    </div>
  )
}

export default FilterCollaborators
