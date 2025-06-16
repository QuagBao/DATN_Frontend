// 'use client'

// import { useEffect } from 'react'
// import { addToast } from '@heroui/react'
// import { useQueryClient } from '@tanstack/react-query'

// import { NEXT_API_URL } from '~/config/routes'
// import { SocketEvent } from '~/shared/enums/socket.enum'
// import { useSocketStore } from '~/shared/hooks'
// import type { IMessageResponse } from '~/shared/hooks/use-socket-store'

// const StaffSocket = () => {
//   const queryClient = useQueryClient()
//   const staffsSocket = useSocketStore((state) => state.staffsSocket)

//   useEffect(() => {
//     const onAssignAccount = async (data: IMessageResponse) => {
//       await Promise.all([
//         queryClient.invalidateQueries({ queryKey: [NEXT_API_URL.RESOURCES.PERMISSIONS.GET_RESOURCE_PERMISSIONS] }),
//         queryClient.invalidateQueries({ queryKey: [NEXT_API_URL.RESOURCES.PERMISSIONS.GET_ACTION_PERMISSIONS] })
//       ])
//       addToast({
//         color: 'primary',
//         description: data.message
//       })
//     }

//     staffsSocket?.on(SocketEvent.ASSIGN_ACCOUNTS, onAssignAccount)

//     return () => {
//       staffsSocket?.off(SocketEvent.ASSIGN_ACCOUNTS, onAssignAccount)
//     }
//   }, [queryClient, staffsSocket])

//   useEffect(() => {
//     const onRemoveRole = async (data: IMessageResponse) => {
//       await Promise.all([
//         queryClient.invalidateQueries({ queryKey: [NEXT_API_URL.RESOURCES.PERMISSIONS.GET_RESOURCE_PERMISSIONS] }),
//         queryClient.invalidateQueries({ queryKey: [NEXT_API_URL.RESOURCES.PERMISSIONS.GET_ACTION_PERMISSIONS] })
//       ])

//       addToast({
//         color: 'primary',
//         description: data.message
//       })
//     }

//     staffsSocket?.on(SocketEvent.REMOVE_ROLE_STAFFS, onRemoveRole)

//     return () => {
//       staffsSocket?.off(SocketEvent.REMOVE_ROLE_STAFFS, onRemoveRole)
//     }
//   }, [queryClient, staffsSocket])

//   return null
// }

// export default StaffSocket
