// import { useEffect, useMemo, useState } from 'react'
// import { Controller, useForm } from 'react-hook-form'
// import { useTranslation } from 'react-i18next'
// import {
//   Accordion,
//   AccordionItem,
//   addToast,
//   Button,
//   Checkbox,
//   Input,
//   Modal,
//   ModalBody,
//   ModalContent,
//   ModalHeader,
//   Tab,
//   Tabs,
//   useDisclosure
// } from '@heroui/react'
// import { zodResolver } from '@hookform/resolvers/zod'
// import Pencil from '@icons/pencil.svg'
// import { useMutation, useQuery } from '@tanstack/react-query'

// import { permissionApiRequest, rolesApiRequest } from '~/api-requests'
// import reactI18n from '~/config/i18n/react-i18n'
// import { API_URL } from '~/config/routes'
// import { type IGetAllPermissionsRes } from '~/shared/types/permission.type'
// import { type IRole } from '~/shared/types/role.type'
// import { handleApiEntityError } from '~/shared/utils'
// import { EditRoleSchema, type TEditRoleReq } from '~/shared/validators'

// interface IProps {
//   roleUser: IRole
//   refetch: () => void
//   permissions: IGetAllPermissionsRes[]
// }

// const EditRoleButton = ({ roleUser, refetch, permissions }: IProps) => {
//   const { t } = useTranslation(['roles'], { i18n: reactI18n })
//   const { isOpen, onOpen, onClose } = useDisclosure()
//   const updateRoleMutation = useMutation({ mutationFn: rolesApiRequest.updateRole })
//   const updatePermissionMutation = useMutation({ mutationFn: permissionApiRequest.updatePermission })
//   const [permissionIds, setPermissionIds] = useState<number[]>(() => {
//     return roleUser.resources.flatMap((resource) => resource.permissions.map((permission) => permission.id))
//   })

//   const { data } = useQuery({
//     queryKey: [API_URL.ROLE.GET_ROLES],
//     queryFn: rolesApiRequest.getRoles
//   })
//   const priorityRange = data?.data.data.priorityRange

//   const editRoleSchema = useMemo(() => {
//     const range = priorityRange || { min: 1, max: 6 }
//     return EditRoleSchema(range.min, range.max)
//   }, [priorityRange])

//   const {
//     register,
//     setError,
//     control,
//     setValue,
//     handleSubmit,
//     formState: { errors }
//   } = useForm<TEditRoleReq>({
//     mode: 'onBlur',
//     resolver: zodResolver(editRoleSchema),
//     defaultValues: { name: roleUser.name, priority: roleUser.priority }
//   })

//   useEffect(() => {
//     if (isOpen) {
//       setValue('name', roleUser.name)
//       setValue('priority', roleUser.priority)
//       setPermissionIds(
//         roleUser.resources.flatMap((resource) => resource.permissions.map((permission) => permission.id))
//       )
//     }
//   }, [isOpen, roleUser.name, roleUser.priority, roleUser.resources, setValue])

//   const onSubmit = handleSubmit(async (values) => {
//     try {
//       await updateRoleMutation.mutateAsync({ roleId: roleUser.id, data: values })
//       refetch()
//       onClose()
//       addToast({
//         color: 'success',
//         title: t('success'),
//         description: t('updateRoleSuccess')
//       })
//     } catch (error) {
//       handleApiEntityError({ error, setError })
//     }
//   })

//   const handleUpdatePermission = async () => {
//     await updatePermissionMutation.mutateAsync({
//       roleId: roleUser.id,
//       permissionIds
//     })
//     refetch()
//     onClose()
//     addToast({
//       color: 'success',
//       title: t('success'),
//       description: t('updatePermissionSuccess')
//     })
//   }

//   return (
//     <>
//       <Button color='default' variant='flat' onPress={onOpen} isIconOnly>
//         <Pencil className='size-4 text-foreground' />
//       </Button>
//       <Modal isOpen={isOpen} onClose={onClose}>
//         <ModalContent className='max-h-[700px] overflow-y-auto'>
//           <ModalHeader className='flex flex-col gap-1'>{t('roles:editRoles')}</ModalHeader>
//           <ModalBody>
//             <Tabs disableAnimation>
//               <Tab key='roles' title={t('roles:roles')}>
//                 <form className='space-y-4' onSubmit={onSubmit}>
//                   <Controller
//                     control={control}
//                     name='name'
//                     render={({ field }) => (
//                       <Input
//                         size='sm'
//                         label={t('columnsRoleName')}
//                         isInvalid={!!errors.name}
//                         errorMessage={errors.name?.message}
//                         {...field}
//                       />
//                     )}
//                   />
//                   <Input
//                     size='sm'
//                     label={t('columnsPriority')}
//                     isRequired
//                     isInvalid={!!errors.priority}
//                     errorMessage={errors.priority?.message}
//                     {...register('priority')}
//                   />
//                   <Button color='primary' type='submit' isLoading={updateRoleMutation.isPending}>
//                     {t('updateRoles')}
//                   </Button>
//                 </form>
//               </Tab>

//               <Tab key='permissions' title={t('permissions')}>
//                 <Accordion className='max-h-[500px] overflow-y-auto'>
//                   {permissions.map((resource) => (
//                     <AccordionItem
//                       key={resource.id}
//                       aria-label={resource.name}
//                       // title={resource.name.toUpperCase()}
//                       title={t(
//                         `roles:${resource.name.replace(/_([a-z])/g, (_: string, letter: string): string =>
//                           letter.toUpperCase()
//                         )}`
//                       )}
//                     >
//                       <div className='flex gap-3'>
//                         {resource.permissions.map((permission) => {
//                           const isChecked = permissionIds.includes(permission.id)
//                           return (
//                             <Checkbox
//                               key={`${resource.id}-${permission.id}`}
//                               isSelected={isChecked}
//                               onValueChange={(isSelected) => {
//                                 const newPermissionIds = isSelected
//                                   ? [...permissionIds, permission.id]
//                                   : permissionIds.filter((id) => id !== permission.id)
//                                 setPermissionIds(newPermissionIds)
//                               }}
//                             >
//                               {t(`roles:${permission.action}`)}
//                             </Checkbox>
//                           )
//                         })}
//                       </div>
//                     </AccordionItem>
//                   ))}
//                 </Accordion>
//                 <Button
//                   color='primary'
//                   className='sticky mt-4'
//                   onPress={handleUpdatePermission}
//                   isLoading={updatePermissionMutation.isPending}
//                 >
//                   {t('roles:updatePermissions')}
//                 </Button>
//               </Tab>
//             </Tabs>
//           </ModalBody>
//         </ModalContent>
//       </Modal>
//     </>
//   )
// }

// export default EditRoleButton
