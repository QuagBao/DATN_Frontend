import dynamic from 'next/dynamic'

import { CustomLoadingSkeletonResources } from '~/components/shared/custom-loading-skeleton-resources'
import initTranslations from '~/config/i18n/server'

export async function generateMetadata() {
  const { t } = await initTranslations('management-collaborators')
  return { title: t('title') }
}

const CollaboratorsManagement = dynamic(() => import('./_components/management-collaborators'), {
  ssr: false,
  loading: () => <CustomLoadingSkeletonResources />
})

async function OrderManagementPage() {
  return (
    <div>
      <CollaboratorsManagement />
    </div>
  )
}

export default OrderManagementPage
