'use client'

import { useTranslation } from 'react-i18next'
import { HeroUIProvider, ToastProvider } from '@heroui/react'

import reactI18n from '~/config/i18n/react-i18n'

const HeroUIProviderClient = ({ children }: { children: React.ReactNode }) => {
  const { i18n } = useTranslation('', { i18n: reactI18n })

  return (
    <HeroUIProvider locale={i18n.language}>
      <ToastProvider
        toastProps={{
          variant: 'flat',
          radius: 'sm',
          timeout: 3000,
          classNames: { closeButton: 'opacity-100 absolute right-2 top-1/2 -translate-y-1/2' }
        }}
      />
      {children}
    </HeroUIProvider>
  )
}

export default HeroUIProviderClient
