import dynamic from 'next/dynamic'

import { CustomLoadingSkeletonResources } from '~/components/shared/custom-loading-skeleton-resources'
import initTranslations from '~/config/i18n/server'

export async function generateMetadata() {
  const { t } = await initTranslations('management-projects')
  return { title: t('title') }
}

const ManagementProjects = dynamic(() => import('./_components/management-projects'), {
  ssr: false,
  loading: () => <CustomLoadingSkeletonResources />
})

async function OrderManagementPage() {
  return (
    <div>
      <ManagementProjects />
    </div>
  )
}

export default OrderManagementPage
