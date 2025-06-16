'use client'

import { useTranslation } from 'react-i18next'
import { Button } from '@heroui/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import reactI18n from '~/config/i18n/react-i18n'
import { APP_ROUTES } from '~/config/routes'

const NotFoundPage = () => {
  const router = useRouter()

  const { t } = useTranslation('not-found', { i18n: reactI18n })

  const handleGoDashboard = () => {
    router.push(APP_ROUTES.COMMON.ROOT)
  }

  return (
    <div className='dark:bg-dark-primary bg-gray-10/80 flex h-screen w-full flex-col items-center justify-center gap-10 p-6'>
      <div className='flex flex-col items-center justify-center text-center text-black dark:text-white'>
        <Image src='/assets/images/404.svg' alt='logo' className='object-cover' width={300} height={300} />
        <div className='mb-4 mt-8 text-2xl font-semibold text-primary'>{t('notFoundPage')}</div>
        <div className='text-xs font-normal text-secondary'>{t('notFoundDescription')}</div>
        <Button
          type='button'
          onPress={handleGoDashboard}
          className='mb-2 me-2 mt-6 rounded-lg bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 px-5 py-2.5 text-center text-sm font-medium text-gray-900 hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-lime-300 dark:focus:ring-lime-800'
        >
          {t('notFoundButton')}
        </Button>
      </div>
    </div>
  )
}

export default NotFoundPage
