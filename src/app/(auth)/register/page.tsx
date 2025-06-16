import dynamic from 'next/dynamic'

import initTranslations from '~/config/i18n/server'

import RegisterSkeleton from './_components/register-skeleton'

export async function generateMetadata() {
  const { t } = await initTranslations('register')
  return {
    title: t('title')
  }
}

const RegisterForm = dynamic(() => import('./_components/register-form'), {
  ssr: false,
  loading: () => <RegisterSkeleton />
})

export default function RegisterPage() {
  return <RegisterForm />
}
