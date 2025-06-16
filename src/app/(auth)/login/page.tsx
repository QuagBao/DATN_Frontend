import dynamic from 'next/dynamic'

import initTranslations from '~/config/i18n/server'

import LoginSkeleton from './_components/login-skeleton'

export async function generateMetadata() {
  const { t } = await initTranslations('login')
  return { title: t('title') }
}

const LoginForm = dynamic(() => import('./_components/login-form'), {
  ssr: false,
  loading: () => <LoginSkeleton />
})

export default function LoginPage() {
  return <LoginForm />
}
