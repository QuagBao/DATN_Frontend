import dynamic from 'next/dynamic'

import { CustomLoadingSkeletonResources } from '~/components/shared/custom-loading-skeleton-resources'
import initTranslations from '~/config/i18n/server'

export async function generateMetadata() {
  const { t } = await initTranslations('users')
  return { title: t('title') }
}

const UsersManagementForm = dynamic(() => import('./_components/users-management-form'), {
  ssr: false,
  loading: () => <CustomLoadingSkeletonResources />
})

async function UserManagementPage() {
  return (
    <div>
      <UsersManagementForm />
    </div>
  )
}

export default UserManagementPage
