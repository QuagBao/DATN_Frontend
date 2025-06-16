'use client'

import { initReactI18next } from 'react-i18next'
import i18n from 'i18next'
import resourcesToBackend from 'i18next-resources-to-backend'

import { useLanguageStore } from '~/shared/hooks'

const reactI18n = i18n.createInstance()

const languageFromCookieStore = useLanguageStore.getState().language

reactI18n
  .use(initReactI18next)
  .use(resourcesToBackend((language: string, namespace: string) => import(`../locales/${language}/${namespace}.json`)))
  .init({
    lng: languageFromCookieStore,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    },
    detection: {
      order: ['htmlTag', 'cookie']
    },
    react: {
      useSuspense: false
    }
  })
  .catch(() => {})

export default reactI18n
