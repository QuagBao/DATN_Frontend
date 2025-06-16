// import { io, type Socket } from 'socket.io-client'
// import { create } from 'zustand'

// import envConfig from '~/config/env'

// import { type SocketEvent, SocketNamespace } from '../enums/socket.enum'
// import { type IProfile } from '../types/account.type'

// export interface IMessageResponse {
//   message: string
// }

// /* type for staffs namespace */
// interface IStaffsServerToClientEvents {
//   [SocketEvent.ASSIGN_ACCOUNTS]: (data: IMessageResponse) => void
//   [SocketEvent.REMOVE_ROLE_STAFFS]: (data: IMessageResponse) => void
// }

// /* type for users namespace */
// interface IUsersServerToClientEvents {
//   [SocketEvent.UPDATE_BALANCE]: (data: IMessageResponse) => void
//   [SocketEvent.REJECT_DEPOSIT_WITHDRAWAL]: (data: IMessageResponse) => void
//   [SocketEvent.SUCCESS_DEPOSIT_WITHDRAWAL]: (data: IMessageResponse) => void
// }

// /* type for roles namespace */

// export interface ICreateUsersData {
//   payload: IProfile
// }

// interface IRolesServerToClientEvents {
//   [SocketEvent.ROLE_CREATED]: (data: IMessageResponse) => void
//   [SocketEvent.ROLE_UPDATED]: (data: IMessageResponse) => void
//   [SocketEvent.ROLE_DELETED]: (data: IMessageResponse) => void
//   [SocketEvent.ASSIGN_PERMISSION]: (data: IMessageResponse) => void

//   [SocketEvent.CREATE_STAFFS]: (data: IMessageResponse) => void
//   [SocketEvent.UPDATE_STAFFS]: (data: IMessageResponse) => void
//   [SocketEvent.REMOVE_STAFFS]: (data: IMessageResponse) => void
//   [SocketEvent.BAN_STAFFS]: (data: IMessageResponse) => void
//   [SocketEvent.UNBAN_STAFFS]: (data: IMessageResponse) => void

//   [SocketEvent.CREATE_USERS]: (data: ICreateUsersData) => void
//   [SocketEvent.USER_INFO_UPDATED]: (data: IMessageResponse) => void
//   [SocketEvent.REMOVE_USERS]: (data: IMessageResponse) => void
//   [SocketEvent.BAN_USERS]: (data: IMessageResponse) => void
//   [SocketEvent.UNBAN_USERS]: (data: IMessageResponse) => void

//   [SocketEvent.UPDATE_DEPOSIT_WITHDRAWAL]: (data: { transactionId: string; status: string }) => void
//   [SocketEvent.REJECT_DEPOSIT_WITHDRAWAL]: (data: { transactionId: string }) => void
//   [SocketEvent.SUCCESS_DEPOSIT_WITHDRAWAL]: (data: { transactionId: string }) => void
//   [SocketEvent.PROCESSING_DEPOSIT_WITHDRAWAL]: (data: { transactionId: string }) => void
//   [SocketEvent.REQUEST_DEPOSIT_WITHDRAWAL]: (data: { transactionId: string }) => void
// }

// type TStaffsSocket = Socket<IStaffsServerToClientEvents>
// type TUsersSocket = Socket<IUsersServerToClientEvents>
// type TRolesSocket = Socket<IRolesServerToClientEvents>

// const generateSocketInstance = <T>(namespace: SocketNamespace, accessToken: string): T => {
//   return io(`${envConfig.NEXT_PUBLIC_SOCKET_URL}/${namespace}`, {
//     transports: ['websocket'],
//     reconnectionAttempts: Infinity,
//     reconnectionDelay: 5000,
//     query: { token: accessToken }
//   }) as T
// }

// interface ISocketStore {
//   staffsSocket?: TStaffsSocket
//   usersSocket?: TUsersSocket
//   rolesSocket?: TRolesSocket
//   setSocket: (namespace: SocketNamespace, accessToken: string) => void
//   disconnectSocket: () => void
// }

// const useSocketStore = create<ISocketStore>((set) => ({
//   staffsSocket: undefined,
//   usersSocket: undefined,
//   rolesSocket: undefined,
//   stocksSocket: undefined,

//   setSocket: (namespace: SocketNamespace, accessToken: string) => {
//     set((state) => {
//       if (namespace === SocketNamespace.STAFFS) {
//         return { ...state, staffsSocket: generateSocketInstance<TStaffsSocket>(namespace, accessToken) }
//       }
//       if (namespace === SocketNamespace.USERS) {
//         return { ...state, usersSocket: generateSocketInstance<TUsersSocket>(namespace, accessToken) }
//       }
//       if (namespace === SocketNamespace.ROLES) {
//         return { ...state, rolesSocket: generateSocketInstance<TRolesSocket>(namespace, accessToken) }
//       }

//       return state
//     })
//   },

//   disconnectSocket: () =>
//     set((state) => {
//       state.staffsSocket?.disconnect()
//       state.usersSocket?.disconnect()
//       state.rolesSocket?.disconnect()
//       return { staffsSocket: undefined, usersSocket: undefined, rolesSocket: undefined, stocksSocket: undefined }
//     })
// }))

// export default useSocketStore
