'use client'

import type React from 'react'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'

import reactI18n from '~/config/i18n/react-i18n'
import { useCookieStore } from '~/shared/hooks'

interface LanguageContextType {
  isLoadingLanguage: boolean
}

const LanguageContext = createContext<LanguageContextType>({ isLoadingLanguage: false })

interface LanguageProviderProps {
  children: React.ReactNode
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [isLoadingLanguage, setIsLoadingLanguage] = useState(false)

  const cookieLanguage = useCookieStore.getCookie('language') ?? 'en'

  useEffect(() => {
    if (cookieLanguage) {
      reactI18n
        .changeLanguage(cookieLanguage)
        .then(() => {
          setIsLoadingLanguage(true)
        })
        .catch(() => {})
    }
  }, [cookieLanguage])

  const contextValue = useMemo(() => ({ isLoadingLanguage }), [isLoadingLanguage])

  return <LanguageContext.Provider value={contextValue}>{children}</LanguageContext.Provider>
}

export const useLanguageInitialization = () => {
  return useContext(LanguageContext)
}
