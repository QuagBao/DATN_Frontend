'use client'

import { useTranslation } from 'react-i18next'
import { Button } from '@heroui/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import reactI18n from '~/config/i18n/react-i18n'
import { APP_ROUTES } from '~/config/routes'

const Custom500Page = () => {
  const router = useRouter()
  const { t } = useTranslation('500', { i18n: reactI18n })
  const handleGoDashboard = () => {
    router.push(APP_ROUTES.COMMON.ROOT)
  }

  return (
    <div className='dark:bg-dark-primary bg-gray-10/80 flex h-screen w-full flex-col items-center justify-center gap-10 p-6'>
      <div className='flex flex-col items-center justify-center text-center text-black dark:text-white'>
        <Image src='/assets/images/500.svg' alt='logo' className='object-cover' width={300} height={300} />
        <div className='mb-4 mt-8 text-2xl font-semibold text-primary'>{t('stop')}</div>
        <div className='text-xs font-normal text-secondary'>{t('notification')}</div>

        <Button
          className='bg-gray-60 shadow-s-light-b-strong mt-4 w-fit rounded-lg text-xs font-semibold text-white'
          type='button'
          onPress={handleGoDashboard}
        >
          {t('back')}
        </Button>
      </div>
    </div>
  )
}

export default Custom500Page
