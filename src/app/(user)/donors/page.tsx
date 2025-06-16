import dynamic from 'next/dynamic'

import initTranslations from '~/config/i18n/server'

import DonationSkeleton from './_components/donation-skeleton'

export async function generateMetadata() {
  const { t } = await initTranslations('project')
  return {
    title: t('title')
  }
}

const DonationPage = dynamic(() => import('./_components/donation'), {
  ssr: false,
  loading: () => <DonationSkeleton />
})

const StockOrderPage = async () => {
  return (
    <div className='mx-auto'>
      <DonationPage />
    </div>
  )
}

export default StockOrderPage
