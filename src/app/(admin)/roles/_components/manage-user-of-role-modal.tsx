// 'use client'

// import { useState } from 'react'
// import { useTranslation } from 'react-i18next'
// import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Tab, Tabs } from '@heroui/react'

// import { ResourceProvider } from '~/components/shared/resource-provider'
// import { EResources } from '~/shared/enums'
// import { type TResources } from '~/shared/types/resources.type'
// import { type TUserManagementRes } from '~/shared/validators'

// import AssignRoleToUserTab from './assign-role-to-user-tab'
// import ManageUserOfRoleForm from './manage-user-of-role-form'

// const ManageUserOfRoleModal = ({
//   isOpen,
//   onClose,
//   roleId,
//   roleName
// }: {
//   isOpen: boolean
//   onClose?: () => void
//   roleId: string
//   roleName?: string
// }) => {
//   const { t } = useTranslation('roles')

//   const [selectedTab, setSelectedTab] = useState('manage')

//   return (
//     <Modal
//       placement='top'
//       isOpen={isOpen}
//       shouldBlockScroll
//       onClose={onClose}
//       radius='sm'
//       size='5xl'
//       isDismissable={false}
//     >
//       <ModalContent>
//         {() => (
//           <>
//             <ModalHeader className='flex flex-col justify-center gap-1'>
//               <h2 className='text-xl font-bold'>
//                 {t('roles:manageRole')}
//                 {roleName}
//               </h2>
//             </ModalHeader>

//             <ModalBody>
//               <Tabs selectedKey={selectedTab} onSelectionChange={(key) => setSelectedTab(String(key))} disableAnimation>
//                 <Tab key='manage' title={t('removeRoleFromUser')}>
//                   <ResourceProvider<TUserManagementRes> resourceName={EResources[EResources.roles] as TResources}>
//                     <ManageUserOfRoleForm roleId={String(roleId)} isOpen={isOpen} />
//                   </ResourceProvider>
//                 </Tab>

//                 <Tab key='assign' title={t('assignRoleToUser')}>
//                   <ResourceProvider<TUserManagementRes> resourceName={EResources[EResources.roles] as TResources}>
//                     <AssignRoleToUserTab isOpen={isOpen} roleId={roleId} />
//                   </ResourceProvider>
//                 </Tab>
//               </Tabs>
//             </ModalBody>
//             <ModalFooter>
//               <Button variant='light' type='button' onPress={onClose}>
//                 {t('roles:cancel')}
//               </Button>
//             </ModalFooter>
//           </>
//         )}
//       </ModalContent>
//     </Modal>
//   )
// }

// export default ManageUserOfRoleModal
