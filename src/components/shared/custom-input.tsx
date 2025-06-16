import { forwardRef, useState } from 'react'
import { type FieldError, type FieldErrorsImpl, type Merge, type UseFormRegisterReturn } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { cn, Input, type InputProps } from '@heroui/react'
import EyeIcon from '@icons/eye.svg'
import EyeOffIcon from '@icons/eye-off.svg'

interface CustomInputProps extends Omit<InputProps, 'children'> {
  validationErrorMessage?: string | FieldError | Merge<FieldError, FieldErrorsImpl> | undefined
  register?: UseFormRegisterReturn
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

const CustomInput = forwardRef<React.ElementRef<typeof Input>, CustomInputProps>(
  (
    {
      validationErrorMessage,
      register,
      onChange,
      onBlur,
      value,
      labelPlacement = 'outside',
      type,
      endContent,
      ...props
    },
    ref
  ) => {
    const { t } = useTranslation('validations')
    const [isVisible, setIsVisible] = useState(false)
    const toggleVisibility = () => setIsVisible(!isVisible)

    const { ref: registerRef, ...restRegister } = register || {}

    const combinedRef = mergeRefs(ref, registerRef)

    const finalEndContent =
      type === 'password' && !endContent ? (
        <button
          className='items-center self-center text-foreground focus:outline-none'
          type='button'
          onClick={toggleVisibility}
        >
          {isVisible ? (
            <EyeOffIcon className='pointer-events-none' width={16} height={16} />
          ) : (
            <EyeIcon className='pointer-events-none' width={16} height={16} />
          )}
        </button>
      ) : (
        endContent
      )

    return (
      <Input
        ref={combinedRef}
        labelPlacement={labelPlacement}
        type={type === 'password' && isVisible ? 'text' : type}
        isInvalid={Boolean(validationErrorMessage)}
        errorMessage={validationErrorMessage ? t(String(validationErrorMessage)) : undefined}
        classNames={{ input: cn(validationErrorMessage && 'placeholder:text-danger'), ...props.classNames }}
        endContent={finalEndContent}
        {...(register ? restRegister : { onChange, onBlur, value })}
        {...props}
      />
    )
  }
)

export default CustomInput
