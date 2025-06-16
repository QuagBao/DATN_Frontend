import dynamic from 'next/dynamic'

import { CustomLoadingSkeletonResources } from '~/components/shared/custom-loading-skeleton-resources'
import initTranslations from '~/config/i18n/server'

export async function generateMetadata() {
  const { t } = await initTranslations('order-management')
  return { title: t('title') }
}

const ManagementResources = dynamic(() => import('./_components/management-resources'), {
  ssr: false,
  loading: () => <CustomLoadingSkeletonResources />
})

async function OrderManagementPage() {
  return (
    <div>
      <ManagementResources />
    </div>
  )
}

export default OrderManagementPage
