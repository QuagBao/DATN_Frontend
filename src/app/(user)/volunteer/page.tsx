import dynamic from 'next/dynamic'

import initTranslations from '~/config/i18n/server'

import VolunteerSkeleton from './_components/vonlunteer-skeleton'

export async function generateMetadata() {
  const { t } = await initTranslations('volunteer')
  return {
    title: t('title')
  }
}

const Volunteer = dynamic(() => import('./_components/volunteer'), {
  ssr: false,
  loading: () => <VolunteerSkeleton />
})

const StockOrderPage = async () => {
  return (
    <div className='mx-auto'>
      <Volunteer />
    </div>
  )
}

export default StockOrderPage
