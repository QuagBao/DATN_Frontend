'use client'

import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { addToast, Button, Card, CardBody, CardFooter, CardHeader, Input, useDisclosure } from '@heroui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import Lock from '@icons/lock.svg'
import MailOutline from '@icons/mail-outline.svg'
import Phone from '@icons/phone.svg'
import Profile from '@icons/profile.svg'
import { useMutation } from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { z } from 'zod'

import { authApiRequest } from '~/api-requests'
import OtpModal from '~/components/shared/otp-modal'
import PasswordInput from '~/components/shared/password-input'
import { APP_ROUTES } from '~/config/routes'
import { EMAIL_REGEX, PASSWORD_REGEX } from '~/shared/constants/common.constant'
import { handleApiEntityError } from '~/shared/utils'

const schema = z.object({
  full_name: z.string().min(1, { message: 'required' }),
  phone: z
    .string()
    .nonempty({ message: 'required' })
    .regex(/^\d{10}$/, { message: 'invalidPhone' }),
  email: z.string().min(1, { message: 'required' }).regex(EMAIL_REGEX, { message: 'invalidEmail' }),
  password: z
    .string()
    .min(1, { message: 'required' })
    .min(8, { message: 'passwordMinLength' })
    .max(20, { message: 'passwordMaxLength' })
    .regex(PASSWORD_REGEX, { message: 'passwordRegex' })
})

type TSchema = z.infer<typeof schema>

const RegisterForm = () => {
  const router = useRouter()
  const otpModal = useDisclosure()
  const { t } = useTranslation('register')
  const resendOtpMutation = useMutation({ mutationFn: authApiRequest.resendOtp })
  const registerMutation = useMutation({ mutationFn: authApiRequest.register })
  const verifyAccountMutation = useMutation({ mutationFn: authApiRequest.verifyAccount })
  const {
    control,
    handleSubmit,
    setError,
    getValues,
    formState: { errors }
  } = useForm<TSchema>({
    mode: 'onSubmit',
    defaultValues: {
      email: 'tranquangbao2003@gmail.com',
      phone: '0123456789',
      password: 'Pass123@',
      full_name: 'Trần Quang Bảo'
    },
    resolver: zodResolver(schema)
  })

  const onSubmit = handleSubmit(async (data) => {
    try {
      const res = await registerMutation.mutateAsync(data)
      addToast({
        color: 'success',
        description: res.data.message
      })
      otpModal.onOpen()
    } catch (error) {
      handleApiEntityError({ error, setError })
    }
  })

  const handleResendOtp = async () => {
    try {
      const res = await resendOtpMutation.mutateAsync({ email: getValues('email') })
      addToast({
        color: 'success',
        description: res.data.message
      })
    } catch (error) {
      handleApiEntityError({ error })
    }
  }

  const handleConfirmOtp = async (otp: string) => {
    try {
      const res = await verifyAccountMutation.mutateAsync({ email: getValues('email'), otp })
      addToast({
        color: 'success',
        description: res.data.message
      })
      otpModal.onClose()
      router.push(APP_ROUTES.AUTH.LOGIN)
    } catch (error) {
      handleApiEntityError({ error })
    }
  }

  return (
    <div className='fixed inset-0 flex w-full items-center justify-center bg-default-100 py-20'>
      <div className='container mx-auto flex justify-center p-4'>
        <Card className='w-[500px] max-w-full px-4'>
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
          <CardBody className='h-80 overflow-y-auto md:h-96'>
            <form onSubmit={onSubmit}>
              <div className='space-y-3'>
                <Controller
                  control={control}
                  name='full_name'
                  render={({ field }) => (
                    <Input
                      label={
                        <div className='flex items-center gap-1 text-sm text-ct-blue md:text-base'>
                          <Profile className='size-4 md:size-5' />
                          <span>{t('fullName')}</span>
                        </div>
                      }
                      classNames={{
                        inputWrapper: 'dark:bg-[#1f2a38] dark:group-data-[focus=true]:bg-[#1f2a38] py-1 md:py-2',
                        input: '!text-ct-blue text-sm md:text-base',
                        base: 'min-h-12 md:min-h-14'
                      }}
                      isInvalid={!!errors.full_name}
                      errorMessage={errors.full_name?.message && t(errors.full_name.message)}
                      {...field}
                    />
                  )}
                />

                <Controller
                  control={control}
                  name='phone'
                  render={({ field }) => (
                    <Input
                      inputMode='numeric'
                      type='tel'
                      maxLength={10}
                      onKeyDown={(e) => {
                        const allowed = ['Backspace', 'Delete', 'Tab', 'Enter', 'ArrowLeft', 'ArrowRight']
                        if (!/\d/.test(e.key) && !allowed.includes(e.key)) {
                          e.preventDefault()
                        }
                      }}
                      label={
                        <div className='flex items-center gap-1 text-sm text-ct-blue md:text-base'>
                          <Phone className='size-4 md:size-5' />
                          <span>{t('phone')}</span>
                        </div>
                      }
                      classNames={{
                        inputWrapper: 'dark:bg-[#1f2a38] dark:group-data-[focus=true]:bg-[#1f2a38] py-1 md:py-2',
                        input: '!text-ct-blue text-sm md:text-base',
                        base: 'min-h-12 md:min-h-14'
                      }}
                      isInvalid={!!errors.phone}
                      errorMessage={errors.phone?.message && t(errors.phone.message)}
                      {...field}
                    />
                  )}
                />

                <Controller
                  control={control}
                  name='email'
                  render={({ field }) => (
                    <Input
                      autoComplete='email'
                      label={
                        <div className='flex items-center gap-1 text-sm text-ct-blue md:text-base'>
                          <MailOutline className='size-4 md:size-5' />
                          <span>{t('email')}</span>
                        </div>
                      }
                      classNames={{
                        inputWrapper: 'dark:bg-[#1f2a38] dark:group-data-[focus=true]:bg-[#1f2a38] py-1 md:py-2',
                        input: '!text-ct-blue text-sm md:text-base',
                        base: 'min-h-12 md:min-h-14'
                      }}
                      isInvalid={!!errors.email}
                      errorMessage={errors.email?.message && t(errors.email.message)}
                      {...field}
                    />
                  )}
                />

                <Controller
                  control={control}
                  name='password'
                  render={({ field }) => (
                    <PasswordInput
                      autoComplete='new-password'
                      label={
                        <div className='flex items-center gap-1 text-sm text-ct-blue md:text-base'>
                          <Lock className='size-4 md:size-5' />
                          <span>{t('password')}</span>
                        </div>
                      }
                      classNames={{
                        inputWrapper: 'dark:bg-[#1f2a38] dark:group-data-[focus=true]:bg-[#1f2a38] py-1 md:py-2',
                        input: '!text-ct-blue text-sm md:text-base',
                        base: 'min-h-12 md:min-h-14'
                      }}
                      isInvalid={!!errors.password}
                      errorMessage={errors.password?.message && t(errors.password.message)}
                      {...field}
                    />
                  )}
                />

                <Button
                  className='h-10 bg-ct-blue text-sm text-ct-white md:h-12 md:text-base'
                  fullWidth
                  size='lg'
                  type='submit'
                  disabled={registerMutation.isPending}
                  isLoading={registerMutation.isPending}
                >
                  {t('register')}
                </Button>
              </div>
            </form>
          </CardBody>
          <CardFooter>
            <div className='flex w-full items-center justify-center'>
              <p className='text-center text-sm text-ct-blue md:text-base'>
                {t('haveAccount')}
                <Link href={APP_ROUTES.AUTH.LOGIN} className='ml-1 font-medium text-ct-purple'>
                  {t('login')}
                </Link>
              </p>
            </div>
          </CardFooter>
        </Card>
        <OtpModal
          email={getValues('email')}
          isOpen={otpModal.isOpen}
          onOpenChange={otpModal.onOpenChange}
          onConfirmOtp={handleConfirmOtp}
          onResendOtp={handleResendOtp}
        />
      </div>
    </div>
  )
}

export default RegisterForm
