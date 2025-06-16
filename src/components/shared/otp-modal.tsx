import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Button, InputOtp, Modal, ModalBody, ModalContent } from '@heroui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import { z } from 'zod'

import { useAuth } from '~/config/providers'
import { cn } from '~/shared/utils'

interface IProps {
  isOpen: boolean
  email?: string
  onOpenChange: () => void
  onConfirmOtp: (otp: string) => void
  onResendOtp?: () => void
}

const WAITING_TIME = 60

const schema = z.object({
  otp: z.string().min(1, 'required').length(5, { message: 'invalid' })
})

type TSchema = z.infer<typeof schema>

function OtpModal({ isOpen, email, onOpenChange, onConfirmOtp, onResendOtp }: IProps) {
  const { t } = useTranslation('otp-modal')
  const { userInfo } = useAuth()
  const [waitingTime, setWaitingTime] = useState(WAITING_TIME)
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm<TSchema>({
    mode: 'onSubmit',
    defaultValues: { otp: '' },
    resolver: zodResolver(schema)
  })

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isOpen && onResendOtp && waitingTime > 0) {
      interval = setTimeout(() => {
        setWaitingTime((prev) => prev - 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isOpen, onResendOtp, waitingTime])

  useEffect(() => {
    if (!isOpen) reset()
  }, [isOpen, reset])

  const onSubmit = handleSubmit((data) => {
    onConfirmOtp(data.otp)
    reset()
  })

  return (
    <Modal
      size='sm'
      radius='sm'
      placement='center'
      isDismissable={false}
      isKeyboardDismissDisabled
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <ModalContent className='bg-base-frame text-ct-blue'>
        <ModalBody>
          <div className='my-5 flex flex-col items-center justify-center'>
            <Image src='/assets/images/otp-new-transaction.svg' alt='success-icon' width={48} height={48} />
            <div className='mt-6 text-xl font-bold'>{t('title')}</div>
            <p className='mt-4 text-center text-ct-blue'>
              {t('pleaseEnter')} {email ?? userInfo?.email}
            </p>

            <form className='mt-6 flex w-full flex-col gap-4' onSubmit={onSubmit}>
              <Controller
                control={control}
                name='otp'
                render={({ field }) => (
                  <InputOtp
                    size='md'
                    length={5}
                    {...field}
                    isInvalid={!!errors.otp}
                    errorMessage={errors.otp?.message && t(errors.otp.message)}
                    classNames={{
                      base: 'mx-auto',
                      segmentWrapper: 'gap-x-3 justify-between',
                      segment: [
                        'dark:bg-gray-800',
                        'dark:border-[#4B5563]',
                        'dark:border-1',
                        'dark:data-[active=true]:border-success'
                      ],
                      errorMessage: 'text-center'
                    }}
                  />
                )}
              />
              {onResendOtp && (
                <p className='text-center text-sm'>
                  <span className='text-ct-blue'>{t('dontReceiveCode')}</span>
                  <button
                    className={cn('ml-1 cursor-pointer text-ct-purple', waitingTime > 0 && 'cursor-default opacity-50')}
                    type='button'
                    disabled={waitingTime > 0}
                    onClick={() => {
                      setWaitingTime(WAITING_TIME)
                      onResendOtp()
                    }}
                  >
                    {t('resend')} {waitingTime > 0 ? `(${waitingTime})` : ''}
                  </button>
                </p>
              )}
              <Button size='lg' fullWidth color='primary' type='submit'>
                {t('confirm')}
              </Button>
            </form>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default OtpModal
