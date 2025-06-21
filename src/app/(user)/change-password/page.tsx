import dynamic from 'next/dynamic'

import initTranslations from '~/config/i18n/server'

import ChangePasswordSkeleton from './_components/change-password-skeleton'

export async function generateMetadata() {
  const { t } = await initTranslations('change-password')
  return { title: t('title') }
}

const ChangePassword = dynamic(() => import('./_components/change-password'), {
  ssr: false,
  loading: () => <ChangePasswordSkeleton />
})

const ChangePasswordPage = async () => {
  return <ChangePassword />
}

export default ChangePasswordPage
