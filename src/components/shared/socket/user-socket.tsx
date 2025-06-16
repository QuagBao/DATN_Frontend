// 'use client'

// import { useEffect } from 'react'
// import { addToast } from '@heroui/react'
// import { useQueryClient } from '@tanstack/react-query'

// import { API_URL } from '~/config/routes/api.route'
// import { SocketEvent } from '~/shared/enums/socket.enum'
// import { useSocketStore } from '~/shared/hooks'
// import type { IMessageResponse } from '~/shared/hooks/use-socket-store'

// const UserSocket = () => {
//   const queryClient = useQueryClient()
//   const usersSocket = useSocketStore((state) => state.usersSocket)

//   useEffect(() => {
//     const onUpdateBalance = (data: IMessageResponse) => {
//       queryClient.invalidateQueries({ queryKey: [API_URL.WALLETS.USER] })
//       queryClient.invalidateQueries({ queryKey: [API_URL.WALLET_TRANSACTIONS.GET_TRANSACTION_CONTACTS] })
//       addToast({
//         color: 'primary',
//         description: data.message
//       })
//     }
//     usersSocket?.on(SocketEvent.UPDATE_BALANCE, onUpdateBalance)

//     return () => {
//       usersSocket?.off(SocketEvent.UPDATE_BALANCE, onUpdateBalance)
//     }
//   }, [queryClient, usersSocket])

//   useEffect(() => {
//     const onRejectDepositWithdrawal = (data: IMessageResponse) => {
//       addToast({
//         color: 'primary',
//         description: data.message
//       })
//     }
//     usersSocket?.on(SocketEvent.REJECT_DEPOSIT_WITHDRAWAL, onRejectDepositWithdrawal)

//     return () => {
//       usersSocket?.off(SocketEvent.REJECT_DEPOSIT_WITHDRAWAL, onRejectDepositWithdrawal)
//     }
//   }, [usersSocket])

//   useEffect(() => {
//     const onSuccessDepositWithdrawal = (data: IMessageResponse) => {
//       addToast({
//         color: 'primary',
//         description: data.message
//       })
//     }
//     usersSocket?.on(SocketEvent.SUCCESS_DEPOSIT_WITHDRAWAL, onSuccessDepositWithdrawal)

//     return () => {
//       usersSocket?.off(SocketEvent.SUCCESS_DEPOSIT_WITHDRAWAL, onSuccessDepositWithdrawal)
//     }
//   }, [usersSocket])

//   return null
// }

// export default UserSocket
