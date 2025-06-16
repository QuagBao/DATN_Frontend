// 'use client'

// import { useEffect } from 'react'

// import { useAuth } from '~/config/providers/auth.provider'
// import { EAccountType } from '~/shared/enums/common.enum'
// import { SocketNamespace } from '~/shared/enums/socket.enum'
// import { useCookieStore, useSocketStore } from '~/shared/hooks'
// import { REFRESH_TOKEN_EVENT } from '~/shared/utils'

// import RoleSocket from './role-socket'
// import StaffSocket from './staff-socket'
// import UserSocket from './user-socket'

// const SocketHandler = () => {
//   const { userInfo } = useAuth()
//   const accessToken = useCookieStore.getCookie('accessToken')
//   const setSocket = useSocketStore((state) => state.setSocket)
//   const disconnectSocket = useSocketStore((state) => state.disconnectSocket)

//   useEffect(() => {
//     if (accessToken && userInfo?.accountType === EAccountType.user) {
//       setSocket(SocketNamespace.USERS, accessToken)
//       setSocket(SocketNamespace.STOCKS, accessToken)
//     }

//     if (accessToken && userInfo?.accountType === EAccountType.staff) {
//       setSocket(SocketNamespace.STAFFS, accessToken)
//       setSocket(SocketNamespace.ROLES, accessToken)
//     }

//     return () => {
//       disconnectSocket()
//     }
//   }, [accessToken, disconnectSocket, setSocket, userInfo?.accountType])

//   useEffect(() => {
//     const onReconnect = (event: Event) => {
//       const newAccessToken = (event as CustomEvent<string>).detail
//       if (userInfo?.accountType === EAccountType.user) {
//         setSocket(SocketNamespace.USERS, newAccessToken)
//         setSocket(SocketNamespace.STOCKS, newAccessToken)
//       }

//       if (userInfo?.accountType === EAccountType.staff) {
//         setSocket(SocketNamespace.STAFFS, newAccessToken)
//         setSocket(SocketNamespace.ROLES, newAccessToken)
//       }
//     }

//     document.addEventListener(REFRESH_TOKEN_EVENT, onReconnect)
//     return () => {
//       document.removeEventListener(REFRESH_TOKEN_EVENT, onReconnect)
//     }
//   }, [disconnectSocket, setSocket, userInfo?.accountType])

//   if (userInfo?.accountType === EAccountType.user) return <UserSocket />

//   if (userInfo?.accountType === EAccountType.staff) {
//     return (
//       <>
//         <StaffSocket />
//         <RoleSocket />
//       </>
//     )
//   }

//   return null
// }

// export default SocketHandler
