'use client'

import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Button } from '@heroui/button'
import { addToast } from '@heroui/toast'
import { zodResolver } from '@hookform/resolvers/zod'
import CheckIcon from '@icons/check.svg'
import { useMutation } from '@tanstack/react-query'
import Cookies from 'js-cookie'
import { z } from 'zod'

import { authApiRequest } from '~/api-requests'
import PasswordInput from '~/components/shared/password-input'
import { cn, handleApiEntityError } from '~/shared/utils'

const schema = z
  .object({
    oldPassword: z.string({ message: 'required' }).min(8, 'tooSmall').max(20, 'tooBig'),
    newPassword: z.string({ message: 'required' }).refine(
      (value) => {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,20}$/.test(value)
      },
      { message: 'passwordInvalid' }
    ),
    confirmNewPassword: z.string({ message: 'required' })
  })
  .superRefine(({ newPassword, confirmNewPassword }, ctx) => {
    if (newPassword !== confirmNewPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'confirmPasswordNotMatch',
        path: ['confirmNewPassword']
      })
    }
  })

type TSchema = z.infer<typeof schema>

const ChangePassword = () => {
  const { t } = useTranslation('change-password')
  const {
    handleSubmit,
    watch,
    setError,
    reset,
    trigger,
    control,
    formState: { errors, isDirty, dirtyFields }
  } = useForm<TSchema>({
    mode: 'onBlur',
    resolver: zodResolver(schema),
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      confirmNewPassword: ''
    }
  })

  const changePasswordMutation = useMutation({ mutationFn: authApiRequest.changePassword })
  const newPassword = watch('newPassword')
  const isValidLength = newPassword.length >= 8 && newPassword.length <= 20
  const isValidUppercase = /^(?=.*[a-z])(?=.*[A-Z]).+$/.test(newPassword)
  const isValidSpecialChars = /^(?=.*\d)(?=.*[\W_]).+$/.test(newPassword)
  const token = Cookies.get('accessToken')

  const onSubmit = handleSubmit(async (values) => {
    try {
      const res = await changePasswordMutation.mutateAsync({
        token,
        old_password: values.oldPassword,
        new_password: values.newPassword
      })
      reset()
      addToast({
        color: 'success',
        description: res.data.message
      })
    } catch (error) {
      handleApiEntityError({ error, setError })
    }
  })

  return (
    <form className='flex flex-col gap-2 py-10 md:gap-6 md:px-40' onSubmit={onSubmit}>
      <Controller
        name='oldPassword'
        control={control}
        render={({ field }) => (
          <PasswordInput
            size='sm'
            label={t('currentPassword')}
            autoComplete='current-password'
            classNames={{
              label: '!text-ct-blue',
              inputWrapper: 'bg-ct-white group-data-[focus=true]:bg-base-frame',
              input: '!text-ct-blue'
            }}
            {...field}
            isInvalid={!!errors.oldPassword}
            errorMessage={errors.oldPassword?.message ? t(errors.oldPassword.message) : undefined}
          />
        )}
      />

      <Controller
        name='newPassword'
        control={control}
        render={({ field }) => (
          <PasswordInput
            size='sm'
            label={t('newPassword')}
            autoComplete='new-password'
            classNames={{
              label: '!text-ct-blue',
              inputWrapper: 'bg-ct-white group-data-[focus=true]:bg-base-frame',
              input: '!text-ct-blue'
            }}
            {...field}
            onChange={(e) => {
              const { value } = e.target
              if (value.includes(' ')) return
              field.onChange(value)
              dirtyFields.confirmNewPassword && trigger('confirmNewPassword')
            }}
            isInvalid={!!errors.newPassword}
            description={
              <div className='mt-2 text-xs font-normal text-ct-purple'>
                {errors.newPassword?.message && (
                  <p className='mb-1 text-tiny text-danger'>{t(errors.newPassword.message)}</p>
                )}
                <div className='flex items-center space-x-1'>
                  <CheckIcon className={cn('size-4', isValidLength ? 'text-success' : 'text-ct-purple')} />
                  <p className={cn(isValidLength && 'text-ct-purple')}>{t('length')}</p>
                </div>
                <div className='flex items-center space-x-1'>
                  <CheckIcon className={cn('size-4', isValidUppercase ? 'text-success' : 'text-ct-purple')} />
                  <p className={cn(isValidUppercase && 'text-ct-purple')}>{t('uppercaseAndLowercase')}</p>
                </div>
                <div className='flex items-center space-x-1'>
                  <CheckIcon className={cn('size-4', isValidSpecialChars ? 'text-success' : 'text-ct-purple')} />
                  <p className={cn(isValidSpecialChars && 'text-ct-purple')}>{t('numericAndSpecialChars')}</p>
                </div>
              </div>
            }
          />
        )}
      />

      <Controller
        control={control}
        name='confirmNewPassword'
        render={({ field }) => (
          <PasswordInput
            size='sm'
            label={t('confirmNewPassword')}
            autoComplete='new-password'
            classNames={{
              label: '!text-ct-blue',
              inputWrapper: 'bg-ct-white group-data-[focus=true]:bg-base-frame',
              input: '!text-ct-blue'
            }}
            {...field}
            isInvalid={!!errors.confirmNewPassword}
            errorMessage={errors.confirmNewPassword?.message ? t(errors.confirmNewPassword.message) : undefined}
          />
        )}
      />

      <Button
        type='submit'
        color='primary'
        isDisabled={!isDirty}
        className={cn(
          'fixed bottom-4 left-5 right-5 mt-auto font-semibold md:left-40 md:right-40',
          !isDirty && 'bg-ct-secondary'
        )}
      >
        {t('btnUpdate')}
      </Button>
    </form>
  )
}

export default ChangePassword
