// 'use client'

// import { useState } from 'react'
// import { useTranslation } from 'react-i18next'
// import { addToast, Button } from '@heroui/react'

// import rolesApiRequest from '~/api-requests/role.request'
// import ConfirmModal from '~/components/shared/confirm-modal'
// import reactI18n from '~/config/i18n/react-i18n'
// import { handleApiEntityError } from '~/shared/utils'

// interface DeleteRoleModalProps {
//   onRoleCreated: () => void
//   roleId: string[]
//   setSelectedRoleIds: React.Dispatch<React.SetStateAction<Set<string>>>
// }

// const DeleteRoleModal: React.FC<DeleteRoleModalProps> = ({ onRoleCreated, roleId, setSelectedRoleIds }) => {
//   const [isDeleteOpen, setIsDeleteOpen] = useState(false)
//   const { t } = useTranslation(['roles'], { i18n: reactI18n })

//   const handleDeleteRole = async () => {
//     try {
//       await rolesApiRequest.deleteRole(roleId)
//       onRoleCreated()
//       setIsDeleteOpen(false)
//       setSelectedRoleIds(new Set())
//       addToast({
//         color: 'success',
//         title: t('success'),
//         description: t('deleteRoleSuccess')
//       })
//     } catch (error) {
//       handleApiEntityError({ error })
//     }
//   }

//   return (
//     <>
//       <Button onPress={() => setIsDeleteOpen(true)} color='danger'>
//         {t('removeRole')}
//       </Button>

//       <ConfirmModal
//         isOpen={isDeleteOpen}
//         onClose={() => setIsDeleteOpen(false)}
//         onConfirm={handleDeleteRole}
//         modalHeader={t('removeRole')}
//         modalBody={t('deleteConfirmation') || ''}
//         confirmButtonText={t('confirm')}
//         cancelButtonText={t('cancel')}
//       />
//     </>
//   )
// }

// export default DeleteRoleModal
