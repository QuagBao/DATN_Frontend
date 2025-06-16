import dynamic from 'next/dynamic'

import initTranslations from '~/config/i18n/server'

export async function generateMetadata() {
  const { t } = await initTranslations('project')
  return {
    title: t('title')
  }
}

const DetailForm = dynamic(() => import('./_components/detail-form'), {
  ssr: false,
  loading: () => <div>Loading...</div>
})

const StockOrderPage = async () => {
  return (
    <div className='mx-auto'>
      <DetailForm />
    </div>
  )
}

export default StockOrderPage
