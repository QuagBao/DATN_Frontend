// 'use client'

// import { useState } from 'react'
// import { useTranslation } from 'react-i18next'
// import { Button, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip } from '@heroui/react'
// import Member from '@icons/member.svg'
// import { useQuery } from '@tanstack/react-query'

// import { permissionApiRequest, rolesApiRequest } from '~/api-requests'
// import { CustomLoadingSkeletonResources } from '~/components/shared/custom-loading-skeleton-resources'
// import { useAuth } from '~/config/providers/auth.provider'
// import { API_URL } from '~/config/routes'
// import { EPermissions, EResources } from '~/shared/enums'
// import { hasPermission } from '~/shared/utils/permissions'

// import CreateRoleButton from './create-role-modal'
// import DeleteRoleModal from './delete-role-button'
// import EditRoleButton from './edit-role-button'
// import ManageUserOfRoleModal from './manage-user-of-role-modal'

// const RolesForm: React.FC = () => {
//   const { t } = useTranslation(['roles'])

//   // State quản lý việc chọn nhiều role và modal quản lý user của role
//   const [selectedRoleIds, setSelectedRoleIds] = useState<Set<string>>(new Set())
//   const [isAssignUserModalOpen, setIsAssignUserModalOpen] = useState(false)
//   const [selectedRole, setSelectedRole] = useState<{ id: string; name: string }>({
//     id: '',
//     name: ''
//   })

//   const { actionPermissions } = useAuth()
//   const canUpdate = hasPermission(EResources[EResources.roles], EPermissions.UPDATE, actionPermissions)
//   const canDelete = hasPermission(EResources[EResources.roles], EPermissions.DELETE, actionPermissions)
//   const canCreate = hasPermission(EResources[EResources.roles], EPermissions.CREATE, actionPermissions)

//   const columns = [
//     { name: t('columnsRoleName'), uid: 'name' },
//     { name: t('columnsPriority'), uid: 'priority' },
//     { name: t('columnsMember'), uid: 'member' },
//     canUpdate ? { name: t('columnsActions'), uid: 'action' } : { name: '', uid: '' }
//   ]
//   const {
//     data: roleDataResponse,
//     isLoading: rolesLoading,
//     refetch
//   } = useQuery({
//     queryKey: [API_URL.ROLE.GET_ROLES],
//     queryFn: rolesApiRequest.getRoles
//   })
//   const rolesData = (roleDataResponse?.data.data.roles || []).sort((a, b) => a.priority - b.priority)

//   const { data: permissionsData } = useQuery({
//     queryKey: [API_URL.PERMISSION.GET_ALL_PERMISSIONS],
//     queryFn: permissionApiRequest.getAllPermissions
//   })
//   const permissions = permissionsData?.data.data || []

//   const handleOpenAssignUserModal = (id: string, name: string) => {
//     setSelectedRole({ id, name })
//     setIsAssignUserModalOpen(true)
//   }

//   if (rolesLoading) return <CustomLoadingSkeletonResources />

//   return (
//     <div>
//       <div className='mb-5 flex items-center justify-between'>
//         <div className='text-[20px] font-medium text-foreground'>{t('roles:title')}</div>
//         <div className='flex items-center gap-2'>
//           {canCreate && <CreateRoleButton onRoleCreated={refetch} />}
//           {canDelete && selectedRoleIds.size > 0 && (
//             <DeleteRoleModal
//               onRoleCreated={refetch}
//               roleId={Array.from(selectedRoleIds)}
//               setSelectedRoleIds={setSelectedRoleIds}
//             />
//           )}
//         </div>
//       </div>

//       <div className='rounded-xl border border-ct-border'>
//         <Table
//           aria-label='Bảng thông tin vai trò'
//           selectionMode='multiple'
//           isHeaderSticky
//           selectedKeys={selectedRoleIds}
//           classNames={{
//             base: 'max-h-[75vh] overflow-auto'
//           }}
//           onSelectionChange={(keys) => {
//             if (keys === 'all') {
//               setSelectedRoleIds(new Set(rolesData.map((role) => String(role.id))))
//             } else {
//               setSelectedRoleIds(keys as Set<string>)
//             }
//           }}
//         >
//           <TableHeader columns={columns}>
//             {(column) => (
//               <TableColumn key={column.uid} align={column.uid === 'name' ? 'start' : 'center'}>
//                 {column.name}
//               </TableColumn>
//             )}
//           </TableHeader>
//           <TableBody>
//             {rolesData.map((role) => (
//               <TableRow key={role.id}>
//                 <TableCell>{role.name}</TableCell>
//                 <TableCell>
//                   <div className='flex justify-center'>{role.priority}</div>
//                 </TableCell>
//                 <TableCell>
//                   <div className='flex items-center justify-center gap-2'>
//                     <Tooltip content={t('contentTooltip')}>
//                       <Button
//                         className='flex items-center justify-center gap-2 bg-transparent'
//                         onPress={() => handleOpenAssignUserModal(role.id, role.name)}
//                       >
//                         <p>{role.totalAccounts}</p>
//                         <Member className='h-4 w-4' />
//                       </Button>
//                     </Tooltip>
//                   </div>
//                 </TableCell>
//                 <TableCell>
//                   {canUpdate && (
//                     <div className='flex items-center justify-center'>
//                       <EditRoleButton roleUser={role} refetch={refetch} permissions={permissions} />
//                     </div>
//                   )}
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </div>

//       {/* Modal quản lý user của vai trò */}
//       <ManageUserOfRoleModal
//         isOpen={isAssignUserModalOpen}
//         onClose={() => setIsAssignUserModalOpen(false)}
//         roleId={selectedRole.id}
//         roleName={selectedRole.name}
//       />
//     </div>
//   )
// }

// export default RolesForm
