// import dynamic from 'next/dynamic'

// import { CustomLoadingSkeletonResources } from '~/components/shared/custom-loading-skeleton-resources'
// import initTranslations from '~/config/i18n/server'

// export async function generateMetadata() {
//   const { t } = await initTranslations('roles')
//   return { title: t('title') }
// }

// const RolesForm = dynamic(() => import('./_components/roles-form'), {
//   ssr: false,
//   loading: () => <CustomLoadingSkeletonResources />
// })

// const RolesPage = () => {
//   return <RolesForm />
// }

// export default RolesPage

function RolesPage() {
  return <div>Role Page</div>
}

export default RolesPage
