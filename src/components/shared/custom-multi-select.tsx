'use client'

import type React from 'react'
import type {
  FieldError,
  FieldErrorsImpl,
  FieldPath,
  FieldPathValue,
  FieldValue,
  FieldValues,
  Merge,
  UseFormRegisterReturn
} from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { extendVariants, Select, type SelectedItems, SelectItem, type SelectProps } from '@heroui/react'
import clsx from 'clsx'

import reactI18n from '~/config/i18n/react-i18n'

const BaseCustomSelect = extendVariants(Select, {
  defaultVariants: {
    size: 'md'
  }
})

type SelectItemElement = React.ReactElement<React.ComponentProps<typeof SelectItem>>

// Loại bỏ 'children' và 'ref' khỏi SelectProps
interface MultipleSelectProps<TFieldValues extends FieldValues, TFieldName extends FieldValue<TFieldValues>>
  extends Omit<SelectProps, 'children' | 'ref'> {
  options?: {
    key: string | number
    value: string | number
    [key: string]: unknown
  }[]
  validationErrorMessage?: string | FieldError | Merge<FieldError, FieldErrorsImpl<TFieldValues>> | undefined
  children?: SelectItemElement | SelectItemElement[]
  register?: UseFormRegisterReturn
  selectionMode: 'multiple'
  selectedKeys: string[]
  setValue: (value: FieldPathValue<TFieldValues, TFieldName>) => void
  clearErrors?: (name?: FieldPath<TFieldValues>) => void
  labelPlacement?: 'inside' | 'outside'
}

type CustomMultiSelectProps<
  TFieldValues extends FieldValues = FieldValues,
  TFieldName extends FieldValue<TFieldValues> = FieldValue<TFieldValues>
> = MultipleSelectProps<TFieldValues, TFieldName>

const CustomMultiSelect: React.FC<CustomMultiSelectProps> = ({
  options,
  validationErrorMessage,
  children,
  labelPlacement = 'outside',
  register,
  selectionMode,
  selectedKeys: selectedKeysProp,
  disabledKeys,
  setValue,
  clearErrors,
  ...props
}) => {
  const { t } = useTranslation(['validations', 'custom-multi-select'], { i18n: reactI18n })

  const allOptions = options?.map((option) => String(option.key)) || []
  const allOptionsSelected = allOptions.every((option) => selectedKeysProp.includes(option))

  const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    let selectedValues = new Set(
      e.target.value
        .split(',')
        .map(String)
        .filter((item) => item !== '')
        .sort()
    )

    const areAllOptionsSelected = allOptions.every((option) => selectedValues.has(String(option)))
    const selectedKeys = new Set(selectedKeysProp)

    if (!selectedKeys.has('all') && selectedValues.has('all')) {
      selectedValues = new Set(['all', ...allOptions])
    } else if (selectedKeys.has('all') && !selectedValues.has('all')) {
      selectedValues = new Set()
    } else if (areAllOptionsSelected && !selectedValues.has('all')) {
      selectedValues = new Set(['all', ...allOptions])
    } else if (!areAllOptionsSelected && selectedValues.has('all')) {
      selectedValues.delete('all')
    }

    setValue(Array.from(selectedValues))

    if (selectedValues.size > 0) {
      clearErrors && clearErrors()
    }
  }

  const { ref: registerRef, ...restRegister } = register || {}

  return (
    <div className='flex flex-col'>
      <BaseCustomSelect
        selectedKeys={selectedKeysProp}
        disabledKeys={disabledKeys}
        selectionMode={selectionMode}
        {...props}
        {...restRegister}
        labelPlacement={labelPlacement}
        onChange={handleSelectionChange}
        classNames={{
          trigger: clsx({
            'border-red-20 focus-within:ring-red-10 focus-within:border-red-90 bg-red-10': validationErrorMessage
          }),
          ...props.classNames
        }}
        isRequired={false}
        renderValue={(items: SelectedItems) => {
          return (
            <div className='flex flex-wrap gap-2'>
              {items
                .filter((item) => item.key !== 'all')
                .map((item) => item.rendered)
                .join(', ')}
            </div>
          )
        }}
      >
        <>
          <SelectItem key='all'>
            {allOptionsSelected ? t('custom-multi-select:deSelectAll') : t('custom-multi-select:selectAll')}
          </SelectItem>
          {options?.map((option) => <SelectItem key={option.key}>{option.value}</SelectItem>)}
        </>
      </BaseCustomSelect>
      {validationErrorMessage && (
        <p className='mt-1 text-xs font-normal text-danger'>{t(String(validationErrorMessage))}</p>
      )}
    </div>
  )
}

export default CustomMultiSelect
