'use client'

import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { addToast, Button, Card, CardBody, CardHeader, Input } from '@heroui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import Lock from '@icons/lock.svg'
import MailOutline from '@icons/mail-outline.svg'
import { useMutation } from '@tanstack/react-query'
// import { useMutation } from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { z } from 'zod'

import { authApiRequest } from '~/api-requests'
// import { authApiRequest } from '~/api-requests'
import PasswordInput from '~/components/shared/password-input'
import { useAuth } from '~/config/providers'
import { APP_ROUTES } from '~/config/routes'
import { EMAIL_REGEX } from '~/shared/constants/common.constant'
// import { useCookieStore } from '~/shared/hooks'
import { handleApiEntityError } from '~/shared/utils'

const schema = z.object({
  email: z.string().min(1, { message: 'required' }).regex(EMAIL_REGEX, { message: 'invalidEmail' }),
  password: z.string().min(1, { message: 'required' })
})

type TSchema = z.infer<typeof schema>

const LoginAdminForm = () => {
  const router = useRouter()
  const { setIsLoggedIn } = useAuth()
  const { t } = useTranslation('login-admin')
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<TSchema>({
    mode: 'onSubmit',
    defaultValues: { email: 'admin@bkfund.vn', password: 'Admin123@' },
    resolver: zodResolver(schema)
  })

  const { mutate, isPending } = useMutation({
    mutationFn: (payload: TSchema) => authApiRequest.loginToStaffNextServer(payload),
    onSuccess: (data) => {
      addToast({
        color: 'success',
        description: data.data.message
      })
      setIsLoggedIn(true)
      router.push(APP_ROUTES.RESOURCES.USERS)
      router.refresh()
    },
    onError: (error) => {
      handleApiEntityError({ error, setError })
    }
  })

  const onSubmit = handleSubmit((data: TSchema) => mutate(data))

  return (
    <div className='fixed inset-0 flex w-full items-center justify-center bg-default-100 py-20'>
      <div className='container mx-auto flex justify-center px-4'>
        <Card className='w-[500px] max-w-full p-4'>
          <CardHeader className='flex flex-col items-center justify-center gap-3'>
            <div className='grid grid-cols-2 items-center justify-center gap-5'>
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
                      autoComplete='username'
                      label={
                        <div className='flex items-center gap-1 text-sm text-ct-blue md:text-base'>
                          <MailOutline className='size-4 md:size-5' />
                          <span>{t('email')}</span>
                        </div>
                      }
                      classNames={{
                        inputWrapper: 'dark:bg-[#1f2a38] dark:group-data-[focus=true]:bg-[#1f2a38] py-1 md:py-2',
                        input: '!text-ct-blue text-sm md:text-base'
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
                      autoComplete='current-password'
                      label={
                        <div className='flex items-center gap-1 text-sm text-ct-blue md:text-base'>
                          <Lock className='size-4 md:size-5 ' />
                          <span>{t('password')}</span>
                        </div>
                      }
                      classNames={{
                        inputWrapper:
                          'text-ct-blue dark:bg-[#1f2a38] dark:group-data-[focus=true]:bg-[#1f2a38] py-1 md:py-2',
                        input: '!text-ct-blue text-sm md:text-base'
                      }}
                      isInvalid={!!errors.password}
                      errorMessage={errors.password?.message && t(errors.password.message)}
                      {...field}
                    />
                  )}
                />
                <div className='mt-[2px] text-right md:mt-1'>
                  <Link href={APP_ROUTES.AUTH.FORGOT_PASSWORD} className='text-sm text-ct-blue md:text-base'>
                    {t('forgotPassword')}
                  </Link>
                </div>
                <Button
                  className='h-10 bg-ct-blue text-sm text-ct-white md:h-12 md:text-base'
                  fullWidth
                  size='lg'
                  type='submit'
                  disabled={isPending}
                  isLoading={isPending}
                >
                  {t('login')}
                </Button>
              </div>
            </form>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

export default LoginAdminForm
