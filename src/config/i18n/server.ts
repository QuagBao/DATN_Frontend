'use server'

import { initReactI18next } from 'react-i18next/initReactI18next'
import { createInstance } from 'i18next'
import resourcesToBackend from 'i18next-resources-to-backend'
import { cookies } from 'next/headers'

import { FALLBACK_LNG } from '~/shared/constants/common.constant'

export default async function initTranslations(namespaces: string | string[]) {
  const locale = cookies().get('language')?.value || FALLBACK_LNG
  const i18nInstance = createInstance()
  const ns = Array.isArray(namespaces) ? namespaces[0] : namespaces

  i18nInstance
    .use(initReactI18next)
    .use(
      resourcesToBackend((language: string, namespace: string) => import(`../locales/${language}/${namespace}.json`))
    )

  await i18nInstance.init({
    lng: locale,
    fallbackLng: FALLBACK_LNG,
    defaultNS: ns,
    fallbackNS: ns,
    ns
  })

  return {
    i18n: i18nInstance,
    resources: { [locale]: i18nInstance.services.resourceStore.data[locale] },
    t: i18nInstance.t
  }
}
