import dynamic from 'next/dynamic'

import initTranslations from '~/config/i18n/server'

import ProjectSkeleton from './_components/project-skeleton'

export async function generateMetadata() {
  const { t } = await initTranslations('project')
  return {
    title: t('title')
  }
}

const ProjectForm = dynamic(() => import('./_components/project-form'), {
  ssr: false,
  loading: () => <ProjectSkeleton />
})

const StockOrderPage = async () => {
  return <ProjectForm />
}

export default StockOrderPage
