import { forwardRef, type Ref, useState } from 'react'
import { Input, type InputProps } from '@heroui/react'
import RegEye from '@icons/reg-eye.svg'
import RegEyeSlash from '@icons/reg-eye-slash.svg'

type IProps = Omit<InputProps, 'type'>

const PasswordInput = forwardRef((props: IProps, ref: Ref<HTMLInputElement>) => {
  const [isVisible, setIsVisible] = useState(false)

  const toggleVisibility = () => setIsVisible(!isVisible)

  return (
    <Input
      ref={ref}
      type={isVisible ? 'text' : 'password'}
      endContent={
        <button
          aria-label='toggle password visibility'
          className='focus:outline-none'
          type='button'
          onClick={toggleVisibility}
        >
          {isVisible ? (
            <RegEyeSlash className='size-4 text-ct-blue md:size-5' />
          ) : (
            <RegEye className='size-4 text-ct-blue md:size-5' />
          )}
        </button>
      }
      {...props}
    />
  )
})

export default PasswordInput
