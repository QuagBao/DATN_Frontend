import dynamic from 'next/dynamic'

import initTranslations from '~/config/i18n/server'

import ResetPasswordSkeleton from './_components/reset-password-form.tsx-password-skeleton'

export async function generateMetadata() {
  const { t } = await initTranslations('reset-password')
  return {
    title: t('title')
  }
}

const ResetPasswordForm = dynamic(() => import('./_components/reset-password-form'), {
  ssr: false,
  loading: () => <ResetPasswordSkeleton />
})

const ResetPasswordPage = () => {
  return <ResetPasswordForm />
}

export default ResetPasswordPage
