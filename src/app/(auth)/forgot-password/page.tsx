import dynamic from 'next/dynamic'

import initTranslations from '~/config/i18n/server'

import ForgotPasswordSkeleton from './_components/forgot-password-skeleton'

export async function generateMetadata() {
  const { t } = await initTranslations('forgot-password')
  return {
    title: t('title')
  }
}
const ForgotPasswordForm = dynamic(() => import('./_components/forgot-password-form'), {
  ssr: false,
  loading: () => <ForgotPasswordSkeleton />
})

export default function ForgotPasswordPage() {
  return <ForgotPasswordForm />
}
