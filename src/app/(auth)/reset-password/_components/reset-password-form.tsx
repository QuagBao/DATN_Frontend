'use client'

import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { addToast, Button, Card, CardBody, CardFooter, CardHeader } from '@heroui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import Lock from '@icons/lock.svg'
import { useMutation } from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { z } from 'zod'

import { authApiRequest } from '~/api-requests'
import PasswordInput from '~/components/shared/password-input'
import { APP_ROUTES } from '~/config/routes'
import { PASSWORD_REGEX } from '~/shared/constants/common.constant'
import { handleApiEntityError } from '~/shared/utils'

const schema = z
  .object({
    newPassword: z
      .string()
      .min(1, { message: 'required' })
      .min(8, { message: 'passwordMinLength' })
      .max(20, { message: 'passwordMaxLength' })
      .regex(PASSWORD_REGEX, { message: 'passwordRegex' }),
    confirmPassword: z.string().min(1, { message: 'required' })
  })
  .superRefine(({ newPassword, confirmPassword }, ctx) => {
    if (newPassword !== confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'confirmPasswordNotMatch',
        path: ['confirmPassword']
      })
    }
  })

type TSchema = z.infer<typeof schema>

const ResetPasswordForm = () => {
  const router = useRouter()
  const { t } = useTranslation('reset-password')
  const searchParams = useSearchParams()
  const otp = searchParams.get('otp') || ''
  const email = searchParams.get('email') || ''
  const resetPasswordMutation = useMutation({ mutationFn: authApiRequest.resetPassword })

  const {
    control,
    handleSubmit,
    setError,
    trigger,
    formState: { errors, dirtyFields }
  } = useForm<TSchema>({
    mode: 'onBlur',
    defaultValues: { newPassword: '', confirmPassword: '' },
    resolver: zodResolver(schema)
  })

  const onSubmit = handleSubmit(async (data) => {
    try {
      const res = await resetPasswordMutation.mutateAsync({ email, otp, new_password: data.newPassword })
      addToast({
        color: 'success',
        description: res.data.message
      })
      router.push(APP_ROUTES.AUTH.LOGIN)
    } catch (error) {
      handleApiEntityError({ error, setError })
    }
  })

  return (
    <div className='fixed inset-0 flex w-full items-center justify-center bg-default-100 py-20'>
      <div className='container mx-auto flex justify-center px-4'>
        <Card className='w-[500px] max-w-full p-4'>
          <CardHeader className='flex flex-col items-center justify-center gap-3'>
            <div className='flex items-center justify-center gap-5'>
              <Image src='/assets/images/logo_dhbk.jpg' alt='logo' width={60} height={0} />
              <Image src='/assets/images/logo_50_nam.png' alt='logo' width={60} height={0} />
              <Image src='/assets/images/logo_doan.png' alt='logo' width={60} height={0} />
              <Image src='/assets/images/logo_hoi_sv.png' alt='logo' width={60} height={0} />
            </div>
            <div className='text-center text-base font-bold text-ct-blue md:text-xl'>{t('brand')}</div>
            <div className='text-center text-base font-bold text-ct-blue md:text-xl'>{t('title')}</div>
          </CardHeader>
          <CardBody>
            <form onSubmit={onSubmit}>
              <div className='space-y-3'>
                <Controller
                  control={control}
                  name='newPassword'
                  render={({ field }) => (
                    <PasswordInput
                      autoComplete='new-password'
                      label={
                        <div className='flex items-center gap-1 text-sm text-ct-blue md:text-base'>
                          <Lock className='size-4 md:size-5' />
                          <span>{t('newPassword')}</span>
                        </div>
                      }
                      classNames={{
                        inputWrapper:
                          'text-ct-blue dark:bg-[#1f2a38] dark:group-data-[focus=true]:bg-[#1f2a38] py-1 md:py-2',
                        input: '!text-ct-blue text-sm md:text-base',
                        base: 'min-h-12 md:min-h-14'
                      }}
                      isInvalid={!!errors.newPassword}
                      errorMessage={errors.newPassword?.message && t(errors.newPassword.message)}
                      {...field}
                      onChange={(e) => {
                        const { value } = e.target
                        if (value.includes(' ')) return
                        field.onChange(value)
                        dirtyFields.confirmPassword && trigger('confirmPassword')
                      }}
                    />
                  )}
                />

                <Controller
                  control={control}
                  name='confirmPassword'
                  render={({ field }) => (
                    <PasswordInput
                      autoComplete='new-password'
                      label={
                        <div className='flex items-center gap-1 text-sm text-ct-blue md:text-base'>
                          <Lock className='size-4 md:size-5' />
                          <span>{t('confirmPassword')}</span>
                        </div>
                      }
                      classNames={{
                        inputWrapper:
                          'text-ct-blue dark:bg-[#1f2a38] dark:group-data-[focus=true]:bg-[#1f2a38] py-1 md:py-2',
                        input: '!text-ct-blue text-sm md:text-base',
                        base: 'min-h-12 md:min-h-14'
                      }}
                      isInvalid={!!errors.confirmPassword}
                      errorMessage={errors.confirmPassword?.message && t(errors.confirmPassword.message)}
                      {...field}
                    />
                  )}
                />
                <Button
                  className='h-10 bg-ct-blue text-sm text-ct-white md:h-12 md:text-base'
                  fullWidth
                  size='lg'
                  type='submit'
                  isLoading={resetPasswordMutation.isPending}
                  isDisabled={resetPasswordMutation.isPending}
                >
                  {t('resetPassword')}
                </Button>
              </div>
            </form>
          </CardBody>
          <CardFooter>
            <div className='flex w-full items-center justify-center'>
              <div className='text-sm text-ct-blue md:text-base'>
                {t('haveAccount')}
                <Link href={APP_ROUTES.AUTH.LOGIN} className='ml-1 font-bold text-ct-purple'>
                  {t('login')}
                </Link>
              </div>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

export default ResetPasswordForm
