import dynamic from 'next/dynamic'

import initTranslations from '~/config/i18n/server'

import IntroduceSkeleton from './_components/introduce-skeleton'

export async function generateMetadata() {
  const { t } = await initTranslations('introduce')
  return {
    title: t('title')
  }
}

const Introduce = dynamic(() => import('./_components/introduce-form'), {
  ssr: false,
  loading: () => <IntroduceSkeleton />
})

const IntroducePage = async () => {
  return <Introduce />
}

export default IntroducePage
