// 'use client'

// import { useState } from 'react'
// import { useForm } from 'react-hook-form'
// import { useTranslation } from 'react-i18next'
// import { addToast, Button } from '@heroui/react'
// import { useMutation, useQueryClient } from '@tanstack/react-query'

// import { rolesApiRequest } from '~/api-requests'
// import ConfirmModal from '~/components/shared/confirm-modal'
// import CustomInput from '~/components/shared/custom-input'
// import { useResourceContext } from '~/components/shared/resource-provider'
// import reactI18n from '~/config/i18n/react-i18n'
// import { API_URL } from '~/config/routes'
// import { handleApiEntityError } from '~/shared/utils'
// import { type TUserManagementRes } from '~/shared/validators'

// interface FilterAssignUser {
//   universalSearch: string
// }

// interface IFilterAssignUsersProps {
//   setFormFilterAssignUser: React.Dispatch<React.SetStateAction<FilterAssignUser>>
//   roleId: string
// }
// const FilterAssignRoleToUsers = ({ setFormFilterAssignUser, roleId }: IFilterAssignUsersProps) => {
//   const { t } = useTranslation(['roles'], { i18n: reactI18n })
//   const queryClient = useQueryClient()
//   const { selectedKeys, setSelectedKeys } = useResourceContext<TUserManagementRes>()
//   const [isAssignModalOpen, setIsAssignModalOpen] = useState<boolean>(false)

//   const { register, handleSubmit, reset } = useForm({
//     mode: 'onSubmit',
//     defaultValues: {
//       universalSearch: ''
//     }
//   })
//   const onSubmit = (data: FilterAssignUser) => {
//     setFormFilterAssignUser({
//       universalSearch: data.universalSearch.trim()
//     })
//   }
//   const handleClear = () => {
//     reset()
//     setFormFilterAssignUser({ universalSearch: '' })
//   }

//   const { mutate: assignUsersToRoleMutate, isPending: isAssigning } = useMutation({
//     mutationFn: (ids: string[]) => rolesApiRequest.assignUserToRole(roleId, ids),
//     onSuccess: async (data) => {
//       addToast({
//         color: 'success',
//         description: data.data.message
//       })
//       await queryClient.invalidateQueries({ queryKey: [API_URL.ROLE.GET_USERS_BY_ROLE] })
//       await queryClient.invalidateQueries({ queryKey: [API_URL.ROLE.GET_USERS_NOT_IN_ROLE] })
//       await queryClient.invalidateQueries({ queryKey: [API_URL.ROLE.GET_ROLES] })
//       setSelectedKeys([])
//       setIsAssignModalOpen(false)
//     },
//     onError: (error) => {
//       handleApiEntityError({ error })
//     }
//   })

//   const handleAssignUsersToRole = (ids: string[]) => assignUsersToRoleMutate(ids)

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <div className='grid grid-cols-3 gap-x-4 gap-y-2'>
//         <CustomInput
//           type='text'
//           register={register('universalSearch')}
//           label={t('modalAssignDeleteLabel')}
//           placeholder={t('modalAssignDeletePlaceholder')}
//         />
//       </div>
//       <div className='flex items-center justify-between gap-2 py-2'>
//         {selectedKeys.length > 0 && (
//           <Button
//             color='success'
//             onPress={() => setIsAssignModalOpen(true)}
//             disabled={isAssigning}
//             isLoading={isAssigning}
//           >
//             {t('assignRole')}
//           </Button>
//         )}

//         <div className='ml-auto flex gap-2 self-end py-2'>
//           <Button type='button' color='danger' variant='bordered' onPress={handleClear}>
//             {t('clear')}
//           </Button>
//           <Button color='primary' variant='bordered' type='submit'>
//             {t('search')}
//           </Button>
//         </div>
//       </div>

//       {isAssignModalOpen && (
//         <ConfirmModal
//           isOpen={isAssignModalOpen}
//           modalHeader={t('modalAssignDeleteAssignUsers')}
//           modalBody={t('modalAssignDeleteAssignSelectedMessage')}
//           confirmButtonText={t('confirm')}
//           cancelButtonText={t('cancel')}
//           onClose={() => setIsAssignModalOpen(false)}
//           onConfirm={() => handleAssignUsersToRole(selectedKeys)}
//         />
//       )}
//     </form>
//   )
// }

// export default FilterAssignRoleToUsers
