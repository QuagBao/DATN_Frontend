// 'use client'

// import { useTranslation } from 'react-i18next'
// import { Spinner } from '@heroui/react'
// import { useQuery } from '@tanstack/react-query'
// import camelCase from 'lodash/camelCase'
// import { useSearchParams } from 'next/navigation'

// import { authApiRequest } from '~/api-requests'
// import actionRequest from '~/api-requests/action.request'
// import resourcesApiRequest from '~/api-requests/resource.request'
// import { useAuth } from '~/config/providers/auth.provider'
// import { API_URL } from '~/config/routes'

// import FilterResources from './filter-resources'
// import ResourcesManagementTable from './resources-table'

// function ResourcesForm() {
//   const { t } = useTranslation('resources')
//   const { userInfo } = useAuth()
//   const isSuperAdmin = userInfo?.isSuperAdmin
//   const searchParams = useSearchParams()
//   const resourceName = searchParams.get('resourceName')

//   const { data: actionsData } = useQuery({
//     queryKey: [API_URL.ACTIONS.GET_ALL_ACTIONS],
//     queryFn: actionRequest.getAllActions
//   })
//   const { data: permissionsData, isPending } = useQuery({
//     queryKey: [API_URL.PERMISSION.GET_PERMISSIONS],
//     queryFn: authApiRequest.getAllPermissions
//   })
//   const { data: resourcesData } = useQuery({
//     queryKey: [API_URL.RESOURCES.GET_ALL_RESOURCES],
//     queryFn: resourcesApiRequest.getAllResources
//   })
//   const actions = actionsData?.data.data ?? []
//   const permissions = permissionsData?.data.data ?? []
//   const resources = (resourcesData?.data.data ?? [])
//     .map((resource) => ({ ...resource, name: t(camelCase(resource.name)) }))
//     .filter((resource) => !resourceName || resource.name.toLowerCase().includes(resourceName.trim().toLowerCase()))

//   return (
//     <div>
//       <div className='mb-5 text-lg font-medium text-foreground'>{t('resources')}</div>
//       <FilterResources />
//       {isPending && (
//         <div className='flex justify-center'>
//           <Spinner />
//         </div>
//       )}
//       {!isPending && (
//         <div className='mt-5'>
//           <ResourcesManagementTable
//             actionsData={actions}
//             resourcesData={resources}
//             permissionsData={permissions}
//             isSuperAdmin={isSuperAdmin}
//           />
//         </div>
//       )}
//     </div>
//   )
// }

// export default ResourcesForm
