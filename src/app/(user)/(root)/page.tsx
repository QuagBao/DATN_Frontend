import dynamic from 'next/dynamic'

import initTranslations from '~/config/i18n/server'

import HomeSkeleton from './_components/home-skeleton'

export async function generateMetadata() {
  const { t } = await initTranslations('home')
  return {
    title: t('title')
  }
}

const Home = dynamic(() => import('./_components/home'), {
  ssr: false,
  loading: () => <HomeSkeleton />
})

function HomePage() {
  return (
    <div className='mx-auto'>
      <Home />
    </div>
  )
}

export default HomePage
