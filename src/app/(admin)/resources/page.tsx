// import dynamic from 'next/dynamic'

// import { CustomLoadingSkeletonResources } from '~/components/shared/custom-loading-skeleton-resources'

// const ResourcesForm = dynamic(() => import('./_components/resources-form'), {
//   ssr: false,
//   loading: () => <CustomLoadingSkeletonResources />
// })

// async function Resources() {
//   return (
//     <div>
//       <ResourcesForm />
//     </div>
//   )
// }

// export default Resources

function page() {
  return <div>Resources Page</div>
}

export default page
