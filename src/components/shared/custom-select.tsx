'use client'

import type React from 'react'
import { type FieldError, type FieldErrorsImpl, type Merge, type UseFormRegisterReturn } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { extendVariants, Select, SelectItem, type SelectProps } from '@heroui/react'
import clsx from 'clsx'

import reactI18n from '~/config/i18n/react-i18n'

const BaseCustomSelect = extendVariants(Select, {
  defaultVariants: {
    size: 'md'
  }
})

type SelectItemElement = React.ReactElement<React.ComponentProps<typeof SelectItem>>

interface CustomSelectProps extends Omit<SelectProps, 'children'> {
  options?: {
    key: string | number
    value: string | number
    [key: string]: unknown
  }[]
  validationErrorMessage?: string | FieldError | Merge<FieldError, FieldErrorsImpl<Record<string, unknown>>> | undefined
  children?: SelectItemElement | SelectItemElement[]
  register?: UseFormRegisterReturn
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  validationErrorMessage,
  children,
  labelPlacement = 'outside',
  register,
  disabledKeys,
  ...props
}) => {
  const { t } = useTranslation('validations', { i18n: reactI18n })
  const { ref, ...restRegister } = register || {}

  return (
    <div className='flex flex-col'>
      <BaseCustomSelect
        disabledKeys={disabledKeys}
        {...props}
        {...restRegister}
        ref={ref as unknown as React.Ref<React.ReactElement>}
        labelPlacement={labelPlacement}
        classNames={{
          trigger: clsx({
            'border-red-20 focus-within:ring-red-10 focus-within:border-red-90 bg-red-10': validationErrorMessage
          }),
          ...props.classNames
        }}
        isRequired={false}
      >
        {options?.map((option) => <SelectItem key={option.key}>{option.value}</SelectItem>)}
      </BaseCustomSelect>

      {validationErrorMessage && (
        <p className='mt-1 text-xs font-normal text-danger'>{t(String(validationErrorMessage))}</p>
      )}
    </div>
  )
}

export default CustomSelect
