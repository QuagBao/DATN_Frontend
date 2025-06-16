import dynamic from 'next/dynamic'

import initTranslations from '~/config/i18n/server'

import LoginAdminSkeleton from './_components/login-admin-skeleton'

export async function generateMetadata() {
  const { t } = await initTranslations('login-admin')
  return {
    title: t('title')
  }
}

const LoginAdminForm = dynamic(() => import('./_components/login-admin-form'), {
  ssr: false,
  loading: () => <LoginAdminSkeleton />
})

export default function LoginPage() {
  return <LoginAdminForm />
}
