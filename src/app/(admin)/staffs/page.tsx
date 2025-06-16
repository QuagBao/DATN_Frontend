import dynamic from 'next/dynamic'

import { CustomLoadingSkeletonResources } from '~/components/shared/custom-loading-skeleton-resources'
import initTranslations from '~/config/i18n/server'

export async function generateMetadata() {
  const { t } = await initTranslations('staffs')
  return { title: t('title') }
}

const StaffManagementForm = dynamic(() => import('./_components/staff-management-form'), {
  ssr: false,
  loading: () => <CustomLoadingSkeletonResources />
})

async function UserManagementPage() {
  return (
    <div>
      <StaffManagementForm />
    </div>
  )
}

export default UserManagementPage
