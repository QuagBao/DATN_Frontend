// import dynamic from 'next/dynamic'

// import initTranslations from '~/config/i18n/server'

// import ProfileFormSkeleton from './_components/profile-form-skeleton'

// export async function generateMetadata() {
//   const { t } = await initTranslations('profile')
//   return { title: t('title') }
// }

// const ProfileForm = dynamic(() => import('./_components/profile-form'), {
//   ssr: false,
//   loading: () => <ProfileFormSkeleton />
// })

// const ProfilePage = async () => {
//   return (
//     <div className='container mx-auto px-4'>
//       <ProfileForm />
//     </div>
//   )
// }

// export default ProfilePage

function ProfilePage() {
  return <div>Profile Page</div>
}

export default ProfilePage
