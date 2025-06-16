import { forwardRef } from 'react'
import { type FieldError, type FieldErrorsImpl, type Merge, type UseFormRegisterReturn } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { cn, type InputProps } from '@heroui/react'

interface CustomFileInputProps extends Omit<InputProps, 'type' | 'children'> {
  validationErrorMessage?: string | FieldError | Merge<FieldError, FieldErrorsImpl> | undefined
  register?: UseFormRegisterReturn
  setValue?: (name: string, value: FileList, options?: Record<string, unknown>) => void // thêm setValue để cập nhật thủ công
  name?: string
  multiple?: boolean
}

function mergeRefs<T>(...refs: (React.Ref<T> | undefined)[]): React.RefCallback<T> {
  return (instance: T) => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(instance)
      } else if (ref != null) {
        const mutableRef = ref as React.MutableRefObject<T | null>
        mutableRef.current = instance
      }
    })
  }
}

const CustomFileInput = forwardRef<HTMLInputElement, CustomFileInputProps>(
  ({ validationErrorMessage, register, setValue, name, multiple = false, classNames, ...props }, ref) => {
    const { t } = useTranslation('validations')

    const { ref: registerRef } = register || {}

    const combinedRef = mergeRefs(ref, registerRef)

    // Xử lý onChange thủ công để cập nhật FileList vào react-hook-form
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && name && setValue) {
        setValue(name, e.target.files, { shouldValidate: true })
      }
    }

    // Omit 'size' if it's not a number to avoid type error
    const { size, ...restProps } = props
    const inputProps =
      typeof size === 'number' || typeof size === 'undefined' ? { size, ...restProps } : { ...restProps }

    return (
      <>
        <input
          type='file'
          multiple={multiple}
          ref={combinedRef}
          className={cn('file-input', validationErrorMessage && 'border-danger', classNames?.input)}
          onChange={handleChange} // tự xử lý onChange
          {...inputProps}
        />
        {validationErrorMessage && <p className='mt-1 text-sm text-danger'>{t(String(validationErrorMessage))}</p>}
      </>
    )
  }
)

export default CustomFileInput
