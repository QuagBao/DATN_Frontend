// 'use client'

// import { useEffect, useState } from 'react'
// import { useTranslation } from 'react-i18next'
// import { addToast } from '@heroui/react'
// import { useQueryClient } from '@tanstack/react-query'
// import { usePathname, useRouter } from 'next/navigation'

// import reactI18n from '~/config/i18n/react-i18n'
// import { useAuth } from '~/config/providers'
// import { APP_ROUTES, NEXT_API_URL } from '~/config/routes'
// import { API_URL } from '~/config/routes/api.route'
// import { SocketEvent } from '~/shared/enums/socket.enum'
// import { useSocketStore } from '~/shared/hooks'
// import type { IMessageResponse } from '~/shared/hooks/use-socket-store'

// const RoleSocket = () => {
//   const router = useRouter()
//   const pathname = usePathname()
//   const queryClient = useQueryClient()
//   const { resourcePermissions, isLoadingPermission } = useAuth()
//   const { t } = useTranslation('socket', { i18n: reactI18n })
//   const rolesSocket = useSocketStore((state) => state.rolesSocket)
//   const [shouldNavigate, setShouldNavigate] = useState(false)

//   useEffect(() => {
//     if (
//       !isLoadingPermission &&
//       shouldNavigate &&
//       !resourcePermissions.some((resource) => pathname.includes(resource))
//     ) {
//       setShouldNavigate(false)
//       router.push(APP_ROUTES.COMMON_RESOURCES.SETTINGS.PROFILE)
//     }
//   }, [isLoadingPermission, pathname, resourcePermissions, router, shouldNavigate])

//   /* ------------------ START ROLE-PERMISSION EVENT ------------------ */
//   useEffect(() => {
//     const onCreateRole = async (data: IMessageResponse) => {
//       queryClient.invalidateQueries({ queryKey: [API_URL.ROLE.GET_ROLES] })
//       addToast({
//         color: 'primary',
//         description: data.message
//       })
//     }

//     rolesSocket?.on(SocketEvent.ROLE_CREATED, onCreateRole)

//     return () => {
//       rolesSocket?.off(SocketEvent.ROLE_CREATED, onCreateRole)
//     }
//   }, [queryClient, rolesSocket])

//   useEffect(() => {
//     const onUpdateRole = async (data: IMessageResponse) => {
//       queryClient.invalidateQueries({ queryKey: [API_URL.ROLE.GET_ROLES] })
//       addToast({
//         color: 'primary',
//         description: data.message
//       })
//     }

//     rolesSocket?.on(SocketEvent.ROLE_UPDATED, onUpdateRole)

//     return () => {
//       rolesSocket?.off(SocketEvent.ROLE_UPDATED, onUpdateRole)
//     }
//   }, [queryClient, rolesSocket])

//   useEffect(() => {
//     const onDeleteRole = async (data: IMessageResponse) => {
//       queryClient.invalidateQueries({ queryKey: [API_URL.ROLE.GET_ROLES] })
//       addToast({
//         color: 'primary',
//         description: data.message
//       })
//     }

//     rolesSocket?.on(SocketEvent.ROLE_DELETED, onDeleteRole)

//     return () => {
//       rolesSocket?.off(SocketEvent.ROLE_DELETED, onDeleteRole)
//     }
//   }, [queryClient, rolesSocket])

//   useEffect(() => {
//     const onAssignPermission = async (data: IMessageResponse) => {
//       await Promise.all([
//         queryClient.invalidateQueries({ queryKey: [API_URL.ROLE.GET_ROLES] }),
//         queryClient.invalidateQueries({ queryKey: [NEXT_API_URL.RESOURCES.PERMISSIONS.GET_RESOURCE_PERMISSIONS] }),
//         queryClient.invalidateQueries({ queryKey: [NEXT_API_URL.RESOURCES.PERMISSIONS.GET_ACTION_PERMISSIONS] })
//       ])
//       addToast({
//         color: 'primary',
//         description: data.message
//       })
//       setShouldNavigate(true)
//     }

//     rolesSocket?.on(SocketEvent.ASSIGN_PERMISSION, onAssignPermission)

//     return () => {
//       rolesSocket?.off(SocketEvent.ASSIGN_PERMISSION, onAssignPermission)
//     }
//   }, [queryClient, resourcePermissions, rolesSocket])
//   /* ------------------ END ROLE-PERMISSION EVENT ------------------ */

//   /* ------------------ START STAFF EVENT ------------------ */
//   useEffect(() => {
//     const onCreateStaff = () => {
//       queryClient.invalidateQueries({ queryKey: [API_URL.STAFF.GET_ALL] })
//       queryClient.invalidateQueries({ queryKey: [API_URL.ROLE.GET_ROLES] })
//     }

//     rolesSocket?.on(SocketEvent.CREATE_STAFFS, onCreateStaff)

//     return () => {
//       rolesSocket?.off(SocketEvent.CREATE_STAFFS, onCreateStaff)
//     }
//   }, [queryClient, rolesSocket])

//   useEffect(() => {
//     const onUpdateStaff = async (data: IMessageResponse) => {
//       await Promise.all([
//         queryClient.invalidateQueries({ queryKey: [API_URL.STAFF.GET_ALL] }),
//         queryClient.invalidateQueries({ queryKey: [API_URL.ROLE.GET_ROLES] }),
//         queryClient.invalidateQueries({ queryKey: [NEXT_API_URL.RESOURCES.PERMISSIONS.GET_RESOURCE_PERMISSIONS] }),
//         queryClient.invalidateQueries({ queryKey: [NEXT_API_URL.RESOURCES.PERMISSIONS.GET_ACTION_PERMISSIONS] })
//       ])
//       addToast({
//         color: 'primary',
//         description: data.message
//       })
//       setShouldNavigate(true)
//     }

//     rolesSocket?.on(SocketEvent.UPDATE_STAFFS, onUpdateStaff)

//     return () => {
//       rolesSocket?.off(SocketEvent.UPDATE_STAFFS, onUpdateStaff)
//     }
//   }, [queryClient, resourcePermissions, rolesSocket])

//   useEffect(() => {
//     const onRemoveStaff = (data: IMessageResponse) => {
//       queryClient.invalidateQueries({ queryKey: [API_URL.STAFF.GET_ALL] })
//       queryClient.invalidateQueries({ queryKey: [API_URL.ROLE.GET_ROLES] })
//       addToast({
//         color: 'primary',
//         description: data.message
//       })
//     }

//     rolesSocket?.on(SocketEvent.REMOVE_STAFFS, onRemoveStaff)

//     return () => {
//       rolesSocket?.off(SocketEvent.REMOVE_STAFFS, onRemoveStaff)
//     }
//   }, [queryClient, rolesSocket])

//   useEffect(() => {
//     const onBanStaff = (data: IMessageResponse) => {
//       queryClient.invalidateQueries({ queryKey: [API_URL.STAFF.GET_ALL] })
//       addToast({
//         color: 'primary',
//         description: data.message
//       })
//     }

//     rolesSocket?.on(SocketEvent.BAN_STAFFS, onBanStaff)

//     return () => {
//       rolesSocket?.off(SocketEvent.BAN_STAFFS, onBanStaff)
//     }
//   }, [queryClient, rolesSocket])

//   useEffect(() => {
//     const onUnBanStaff = (data: IMessageResponse) => {
//       queryClient.invalidateQueries({ queryKey: [API_URL.STAFF.GET_ALL] })
//       addToast({
//         color: 'primary',
//         description: data.message
//       })
//     }

//     rolesSocket?.on(SocketEvent.UNBAN_STAFFS, onUnBanStaff)

//     return () => {
//       rolesSocket?.off(SocketEvent.UNBAN_STAFFS, onUnBanStaff)
//     }
//   }, [queryClient, rolesSocket])
//   /* ------------------ END STAFF EVENT ------------------ */

//   /* ------------------ START USER EVENT ------------------ */
//   useEffect(() => {
//     const onCreateUser = () => {
//       queryClient.invalidateQueries({ queryKey: [API_URL.USER.GET_ALL] })
//     }

//     rolesSocket?.on(SocketEvent.CREATE_USERS, onCreateUser)

//     return () => {
//       rolesSocket?.off(SocketEvent.CREATE_USERS, onCreateUser)
//     }
//   }, [queryClient, rolesSocket])

//   useEffect(() => {
//     const onUpdateUser = (data: IMessageResponse) => {
//       queryClient.invalidateQueries({ queryKey: [API_URL.USER.GET_ALL] })
//       addToast({
//         color: 'primary',
//         description: data.message
//       })
//     }

//     rolesSocket?.on(SocketEvent.USER_INFO_UPDATED, onUpdateUser)

//     return () => {
//       rolesSocket?.off(SocketEvent.USER_INFO_UPDATED, onUpdateUser)
//     }
//   }, [queryClient, rolesSocket])

//   useEffect(() => {
//     const onRemoveUser = (data: IMessageResponse) => {
//       queryClient.invalidateQueries({ queryKey: [API_URL.USER.GET_ALL] })
//       addToast({
//         color: 'primary',
//         description: data.message
//       })
//     }

//     rolesSocket?.on(SocketEvent.REMOVE_USERS, onRemoveUser)

//     return () => {
//       rolesSocket?.off(SocketEvent.REMOVE_USERS, onRemoveUser)
//     }
//   }, [queryClient, rolesSocket])

//   useEffect(() => {
//     const onBanUser = (data: IMessageResponse) => {
//       queryClient.invalidateQueries({ queryKey: [API_URL.USER.GET_ALL] })
//       addToast({
//         color: 'primary',
//         description: data.message
//       })
//     }

//     rolesSocket?.on(SocketEvent.BAN_USERS, onBanUser)

//     return () => {
//       rolesSocket?.off(SocketEvent.BAN_USERS, onBanUser)
//     }
//   }, [queryClient, rolesSocket])

//   useEffect(() => {
//     const onUnBanUser = (data: IMessageResponse) => {
//       queryClient.invalidateQueries({ queryKey: [API_URL.USER.GET_ALL] })
//       addToast({
//         color: 'primary',
//         description: data.message
//       })
//     }

//     rolesSocket?.on(SocketEvent.UNBAN_USERS, onUnBanUser)

//     return () => {
//       rolesSocket?.off(SocketEvent.UNBAN_USERS, onUnBanUser)
//     }
//   }, [queryClient, rolesSocket])
//   /* ------------------ END USER EVENT ------------------ */

//   /* ------------------ START DEPOSIT-WITHDRAW EVENT ------------------ */
//   useEffect(() => {
//     const onRejectDepositWithdrawal = () => {
//       queryClient.invalidateQueries({ queryKey: [API_URL.TRANSACTION.GET_ALL] })
//       addToast({
//         color: 'success',
//         title: t('success'),
//         description: t('transactionCanceledSuccessfully')
//       })
//     }

//     rolesSocket?.on(SocketEvent.REJECT_DEPOSIT_WITHDRAWAL, onRejectDepositWithdrawal)

//     return () => {
//       rolesSocket?.off(SocketEvent.REJECT_DEPOSIT_WITHDRAWAL, onRejectDepositWithdrawal)
//     }
//   }, [queryClient, rolesSocket, t])

//   useEffect(() => {
//     const onProcessingDepositWithdrawal = () => {
//       queryClient.invalidateQueries({ queryKey: [API_URL.TRANSACTION.GET_ALL] })
//       addToast({
//         color: 'success',
//         title: t('success'),
//         description: t('requestProcessing')
//       })
//     }

//     rolesSocket?.on(SocketEvent.PROCESSING_DEPOSIT_WITHDRAWAL, onProcessingDepositWithdrawal)

//     return () => {
//       rolesSocket?.off(SocketEvent.PROCESSING_DEPOSIT_WITHDRAWAL, onProcessingDepositWithdrawal)
//     }
//   }, [queryClient, rolesSocket, t])

//   useEffect(() => {
//     const onUpdateDepositWithdrawal = () => {
//       queryClient.invalidateQueries({ queryKey: [API_URL.TRANSACTION.GET_ALL] })
//       addToast({
//         color: 'success',
//         title: t('success'),
//         description: t('depositRequestSuccessful')
//       })
//     }

//     rolesSocket?.on(SocketEvent.UPDATE_DEPOSIT_WITHDRAWAL, onUpdateDepositWithdrawal)

//     return () => {
//       rolesSocket?.off(SocketEvent.UPDATE_DEPOSIT_WITHDRAWAL, onUpdateDepositWithdrawal)
//     }
//   }, [queryClient, rolesSocket, t])

//   useEffect(() => {
//     const onSuccessDepositWithdrawal = () => {
//       queryClient.invalidateQueries({ queryKey: [API_URL.TRANSACTION.GET_ALL] })
//       addToast({
//         color: 'success',
//         title: t('success'),
//         description: t('depositRequestSuccessful')
//       })
//     }

//     rolesSocket?.on(SocketEvent.SUCCESS_DEPOSIT_WITHDRAWAL, onSuccessDepositWithdrawal)

//     return () => {
//       rolesSocket?.off(SocketEvent.SUCCESS_DEPOSIT_WITHDRAWAL, onSuccessDepositWithdrawal)
//     }
//   }, [queryClient, rolesSocket, t])

//   useEffect(() => {
//     const onSuccessDepositWithdrawal = () => {
//       queryClient.invalidateQueries({ queryKey: [API_URL.TRANSACTION.GET_ALL] })
//       addToast({
//         color: 'success',
//         title: t('success'),
//         description: t('createDepositWithdrawalSuccess')
//       })
//     }

//     rolesSocket?.on(SocketEvent.REQUEST_DEPOSIT_WITHDRAWAL, onSuccessDepositWithdrawal)

//     return () => {
//       rolesSocket?.off(SocketEvent.REQUEST_DEPOSIT_WITHDRAWAL, onSuccessDepositWithdrawal)
//     }
//   }, [queryClient, rolesSocket, t])
//   /* ------------------ END DEPOSIT-WITHDRAW EVENT ------------------ */

//   return null
// }

// export default RoleSocket
