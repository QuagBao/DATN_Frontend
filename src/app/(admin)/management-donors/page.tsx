import dynamic from 'next/dynamic'

import { CustomLoadingSkeletonResources } from '~/components/shared/custom-loading-skeleton-resources'
import initTranslations from '~/config/i18n/server'

export async function generateMetadata() {
  const { t } = await initTranslations('management-donors')
  return { title: t('title') }
}

const ManagementDonors = dynamic(() => import('./_components/management-donors'), {
  ssr: false,
  loading: () => <CustomLoadingSkeletonResources />
})

async function OrderManagementPage() {
  return (
    <div>
      <ManagementDonors />
    </div>
  )
}

export default OrderManagementPage
