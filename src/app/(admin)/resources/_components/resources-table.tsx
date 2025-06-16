// import { useMemo, useState } from 'react'
// import { useTranslation } from 'react-i18next'
// import {
//   addToast,
//   Button,
//   Checkbox,
//   Table,
//   TableBody,
//   TableCell,
//   TableColumn,
//   TableHeader,
//   TableRow
// } from '@heroui/react'
// import { useMutation, useQueryClient } from '@tanstack/react-query'

// import { authApiRequest } from '~/api-requests'
// import { API_URL } from '~/config/routes'
// import { type IAction, type IGetPermissionsRes, type IResource } from '~/shared/types'

// const ResourcesManagementTable: React.FC<{
//   resourcesData: IResource[]
//   actionsData: IAction[]
//   permissionsData: IGetPermissionsRes[]
//   isSuperAdmin: boolean | undefined
// }> = ({ resourcesData, actionsData, permissionsData, isSuperAdmin }) => {
//   const { t } = useTranslation('resources')
//   const queryClient = useQueryClient()

//   const columns = [
//     { name: t('index'), uid: 'id' },
//     { name: t('name'), uid: 'name' },
//     { name: t('read'), uid: 'read' },
//     { name: t('create'), uid: 'create' },
//     { name: t('update'), uid: 'update' },
//     { name: t('delete'), uid: 'delete' }
//   ]
//   const defaultSelectedActionIds: Record<number, number[]> = {}
//   permissionsData.forEach((permission) => {
//     defaultSelectedActionIds[permission.id] = permission.actions.map((action) => action.id)
//   })

//   const [selectActionIds, setSelectedActionIds] = useState<Record<number, number[]>>(defaultSelectedActionIds)

//   const updatePermissionsMutation = useMutation({ mutationFn: authApiRequest.updateActionToPermissions })

//   const onToggleCheckbox = (resourceId: number, actionId: number) => () => {
//     setSelectedActionIds((prev) => {
//       const currentSelected = prev[resourceId] ?? []
//       const updated = currentSelected.includes(actionId)
//         ? currentSelected.filter((id) => id !== actionId)
//         : [...currentSelected, actionId]
//       return {
//         ...prev,
//         [resourceId]: updated
//       }
//     })
//   }

//   const hasChanges = useMemo(() => {
//     return Object.entries(selectActionIds).some(([resourceIdStr, selectedActionIdList]) => {
//       const resourceId = Number(resourceIdStr)
//       const defaultPermission = permissionsData.find((p) => p.id === resourceId)
//       const defaultActionIds = defaultPermission?.actions.map((a) => a.id) ?? []
//       const areEqual =
//         defaultActionIds.length === selectedActionIdList.length &&
//         defaultActionIds.every((id) => selectedActionIdList.includes(id))
//       return !areEqual
//     })
//   }, [selectActionIds, permissionsData])

//   const handleSave = async () => {
//     const updatePermissions = Object.entries(selectActionIds)
//       .map(([resourceIdStr, selectedActionIdList]) => {
//         const resourceId = Number(resourceIdStr)
//         const defaultPermission = permissionsData.find((p) => p.id === resourceId)

//         const defaultActionIds = defaultPermission?.actions.map((a) => a.id) ?? []

//         const areEqual =
//           defaultActionIds.length === selectedActionIdList.length &&
//           defaultActionIds.every((id) => selectedActionIdList.includes(id))

//         if (!areEqual) {
//           return {
//             resourceId,
//             actionIds: selectedActionIdList
//           }
//         }
//         return null
//       })
//       .filter(Boolean) as {
//       resourceId: number
//       actionIds: number[]
//     }[]

//     await Promise.all(updatePermissions.map((data) => updatePermissionsMutation.mutateAsync(data)))
//     addToast({
//       color: 'success',
//       title: t('success'),
//       description: t('updatePermissionSuccess')
//     })
//     queryClient.invalidateQueries({ queryKey: [API_URL.PERMISSION.GET_PERMISSIONS] })
//     queryClient.invalidateQueries({ queryKey: [API_URL.PERMISSION.GET_ALL_PERMISSIONS] })
//   }

//   const handleCancel = () => {
//     setSelectedActionIds(defaultSelectedActionIds)
//   }

//   const renderCell = (item: IResource, columnKey: string): React.ReactNode => {
//     const cellValue = item[columnKey as keyof IResource]
//     const actionId = actionsData.find((action) => action.name === columnKey)?.id ?? -1
//     switch (columnKey) {
//       case 'read':
//       case 'create':
//       case 'update':
//       case 'delete':
//         return (
//           <Checkbox
//             radius='sm'
//             color='success'
//             isDisabled={!isSuperAdmin}
//             isSelected={Array.isArray(selectActionIds[item.id]) && selectActionIds[item.id].includes(actionId)}
//             onValueChange={onToggleCheckbox(item.id, actionId)}
//           >
//             {t(columnKey)}
//           </Checkbox>
//         )

//       default:
//         return cellValue
//     }
//   }

//   return (
//     <div>
//       <Table aria-label='Danh sách quyền' isHeaderSticky classNames={{ wrapper: 'max-h-[550px] pt-0 pb-4 px-0' }}>
//         <TableHeader>
//           {columns.map((column) => (
//             <TableColumn key={column.uid}>{column.name}</TableColumn>
//           ))}
//         </TableHeader>
//         <TableBody>
//           {resourcesData.map((resource) => (
//             <TableRow key={resource.id} className='border-b border-ct-border'>
//               {columns.map((column) => (
//                 <TableCell key={column.uid}>{renderCell(resource, column.uid)}</TableCell>
//               ))}
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>

//       <div className='mt-5 flex w-full justify-end gap-3'>
//         <Button color='danger' variant='bordered' isDisabled={!hasChanges} type='button' onPress={handleCancel}>
//           {t('cancel')}
//         </Button>
//         <Button
//           color='success'
//           variant='solid'
//           type='button'
//           onPress={handleSave}
//           isLoading={updatePermissionsMutation.isPending}
//           isDisabled={!hasChanges}
//         >
//           {t('save')}
//         </Button>
//       </div>
//     </div>
//   )
// }

// export default ResourcesManagementTable
