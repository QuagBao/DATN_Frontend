'use client'

import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { addToast, Button, Card, CardBody, CardFooter, CardHeader, Input, useDisclosure } from '@heroui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import MailOutline from '@icons/mail-outline.svg'
import { useMutation } from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { z } from 'zod'

import { authApiRequest } from '~/api-requests'
import OtpModal from '~/components/shared/otp-modal'
import { APP_ROUTES } from '~/config/routes'
import { handleApiEntityError } from '~/shared/utils'

const schema = z.object({
  email: z.string().min(1, { message: 'required' }).email('invalidEmail')
})

type TSchema = z.infer<typeof schema>

const ForgotPasswordForm = () => {
  const router = useRouter()
  const otpModal = useDisclosure()
  const { t } = useTranslation('forgot-password')
  const forgotPasswordMutation = useMutation({ mutationFn: authApiRequest.forgotPassword })
  const resendOtpMutation = useMutation({ mutationFn: authApiRequest.forgotResendOtp })
  const verifyTokenMutation = useMutation({ mutationFn: authApiRequest.verifyAccountResetPassword })
  const {
    control,
    handleSubmit,
    setError,
    getValues,
    formState: { errors }
  } = useForm<TSchema>({
    mode: 'onSubmit',
    defaultValues: { email: '' },
    resolver: zodResolver(schema)
  })

  const onSubmit = handleSubmit(async (data) => {
    try {
      const res = await forgotPasswordMutation.mutateAsync(data)
      otpModal.onOpen()
      addToast({
        color: 'success',
        description: res.data.message
      })
    } catch (error) {
      handleApiEntityError({ error, setError })
    }
  })

  const handleConfirmOtp = async (otp: string) => {
    try {
      const res = await verifyTokenMutation.mutateAsync({ email: getValues('email'), otp })
      addToast({
        color: 'success',
        description: res.data.message
      })
      otpModal.onClose()
      router.push(`${APP_ROUTES.AUTH.RESET_PASSWORD}?email=${getValues('email')}&otp=${otp}`)
    } catch (error) {
      handleApiEntityError({ error })
    }
  }

  const handleResendOtp = async () => {
    try {
      const res = await resendOtpMutation.mutateAsync({
        email: getValues('email')
      })
      addToast({
        color: 'success',
        description: res.data.message
      })
    } catch (error) {
      handleApiEntityError({ error })
    }
  }

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
                  name='email'
                  render={({ field }) => (
                    <Input
                      label={
                        <div className='flex items-center gap-1 text-sm text-ct-blue md:text-base'>
                          <MailOutline className='size-4 md:size-5' />
                          <span>{t('email')}</span>
                        </div>
                      }
                      classNames={{
                        inputWrapper: 'dark:bg-[#1f2a38] dark:group-data-[focus=true]:bg-[#1f2a38] py-1 md:py-2',
                        input: '!text-ct-blue text-sm md:text-base',
                        base: 'h-12 md:h-14'
                      }}
                      isInvalid={!!errors.email}
                      errorMessage={errors.email?.message && t(errors.email.message)}
                      {...field}
                    />
                  )}
                />
                <Button
                  className='h-10 bg-ct-blue text-sm text-ct-white md:h-12 md:text-base'
                  fullWidth
                  size='lg'
                  type='submit'
                  disabled={forgotPasswordMutation.isPending}
                  isLoading={forgotPasswordMutation.isPending}
                >
                  {t('sendEmail')}
                </Button>
              </div>
            </form>
          </CardBody>
          <CardFooter>
            <div className='flex w-full items-center justify-center'>
              <div className='text-sm text-ct-blue md:text-base'>
                <span>{t('back')}</span>
                <Link href={APP_ROUTES.AUTH.LOGIN} className='ml-1 font-medium text-ct-purple'>
                  {t('login')}
                </Link>
              </div>
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

export default ForgotPasswordForm
