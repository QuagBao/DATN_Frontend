import type React from 'react'
import { type FieldValues, type UseFormRegister } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { DateRangePicker, type DateRangePickerProps } from '@heroui/react'

import reactI18n from '~/config/i18n/react-i18n'

interface ICustomDateRangePickerProps extends Omit<DateRangePickerProps, 'children'> {
  validationErrorMessage?: string
  register?: UseFormRegister<FieldValues>
}

const CustomDateRangePicker: React.FC<ICustomDateRangePickerProps> = ({
  validationErrorMessage,
  register,
  labelPlacement = 'outside',
  ...props
}) => {
  const { t } = useTranslation('validations', { i18n: reactI18n })
  return (
    <>
      <DateRangePicker
        aria-label={props['aria-label']}
        {...register}
        {...props}
        label={props.label}
        labelPlacement={labelPlacement}
      />
      {validationErrorMessage && (
        <p className='mt-1 text-start text-xs font-normal text-danger'>{t(String(validationErrorMessage))}</p>
      )}
    </>
  )
}

export default CustomDateRangePicker
