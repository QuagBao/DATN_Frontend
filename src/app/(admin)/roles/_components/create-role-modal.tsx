// import type React from 'react'
// import { useEffect, useState } from 'react'
// import { useTranslation } from 'react-i18next'
// import {
//   addToast,
//   Button,
//   Modal,
//   ModalBody,
//   ModalContent,
//   ModalFooter,
//   ModalHeader,
//   useDisclosure
// } from '@heroui/react'

// import rolesApiRequest from '~/api-requests/role.request'
// import CustomInput from '~/components/shared/custom-input'
// import reactI18n from '~/config/i18n/react-i18n'
// import { type CreateRoleButtonProps } from '~/shared/types/admin-manager.type'
// import { isAxiosError } from '~/shared/utils'

// const CreateRoleButton: React.FC<CreateRoleButtonProps> = ({ onRoleCreated }) => {
//   const { t } = useTranslation(['roles'], { i18n: reactI18n })
//   const { isOpen, onOpen, onOpenChange } = useDisclosure()
//   const [name, setName] = useState('')

//   const handleSubmit = async () => {
//     try {
//       await rolesApiRequest.addRole({ name, textColor: '', bgColor: '' })
//       setName('')
//       onRoleCreated()
//       onOpenChange()
//       addToast({
//         title: t('success'),
//         color: 'success',
//         description: t('addRoleSuccess')
//       })
//     } catch (error) {
//       if (isAxiosError(error)) {
//         addToast({
//           title: t('error'),
//           color: 'danger',
//           description: t('pleaseEnterRole')
//         })
//       }
//     }
//   }
//   useEffect(() => {
//     if (!isOpen) {
//       setName('')
//     }
//   }, [isOpen])

//   return (
//     <>
//       <Button color='primary' onPress={onOpen}>
//         {t('addRole')}
//       </Button>
//       <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
//         <ModalContent>
//           {(onClose) => (
//             <>
//               <ModalHeader className='flex flex-col gap-1'> {t('addRole')}</ModalHeader>
//               <ModalBody>
//                 <CustomInput placeholder={t('roleName')} value={name} onChange={(e) => setName(e.target.value)} />
//               </ModalBody>
//               <ModalFooter>
//                 <Button color='danger' variant='light' onPress={onClose}>
//                   {t('close')}
//                 </Button>
//                 <Button color='primary' onPress={handleSubmit}>
//                   {t('submit')}
//                 </Button>
//               </ModalFooter>
//             </>
//           )}
//         </ModalContent>
//       </Modal>
//     </>
//   )
// }

// export default CreateRoleButton
