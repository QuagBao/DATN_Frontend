'use client'

import type React from 'react'
import { createContext, useContext, useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import { userApiRequest } from '~/api-requests'
import { EAccountType } from '~/shared/enums/common.enum'
import { useCookieStore } from '~/shared/hooks'
import type { IProfile } from '~/shared/types'
import { type TActionPermissions } from '~/shared/validators/schemas/permission/permission.schema'

import { API_URL } from '../routes'

interface AuthContextType {
  isLoggedIn: boolean
  setIsLoggedIn: (isLoggedIn: boolean) => void
  userInfo: IProfile | null
  resourcePermissions: string[]
  actionPermissions: TActionPermissions
  isLoadingPermission?: boolean
  setUserInfo: (userInfo: IProfile | null) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  userInfo: null,
  resourcePermissions: [],
  actionPermissions: {},
  isLoadingPermission: false,
  setUserInfo: () => {},
  logout: () => {}
})

interface AuthProviderProps {
  children: React.ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(Boolean(useCookieStore.getCookie('accountType')))
  const [userInfo, setUserInfo] = useState<IProfile | null>(null)
  const [resourcePermissions, setResourcePermissions] = useState<string[]>([])
  const [actionPermissions, setActionPermissions] = useState<TActionPermissions>({})
  const accountTypeCookie = useCookieStore.getCookie('accountType')
  const accountType = Number(accountTypeCookie) as EAccountType
  const isAdmin = accountType === EAccountType.admin
  const isStaff = accountType === EAccountType.staff
  const isUser = accountType === EAccountType.user

  useQuery({
    queryKey: [API_URL.USER.GET_PROFILE, userInfo],
    queryFn: async () => {
      const res = await userApiRequest.getMe()
      setUserInfo(res.data)
      return res
    },
    enabled: isLoggedIn && isUser
  })

  useQuery({
    queryKey: [API_URL.USER.GET_PROFILE, userInfo],
    queryFn: async () => {
      const res = await userApiRequest.getMe()
      setUserInfo(res.data)
      return res
    },
    enabled: isLoggedIn && isStaff
  })

  useQuery({
    queryKey: [API_URL.USER.GET_PROFILE, userInfo],
    queryFn: async () => {
      const res = await userApiRequest.getMe()
      setUserInfo(res.data)
      return res
    },
    enabled: isLoggedIn && isAdmin
  })

  const logout = () => {
    setIsLoggedIn(false)
    setUserInfo(null)
    setResourcePermissions([])
    setActionPermissions({})
  }

  const contextValue = useMemo(
    () => ({
      isLoggedIn,
      setIsLoggedIn,
      userInfo,
      resourcePermissions,
      actionPermissions,
      setUserInfo,
      // isLoadingPermission,
      logout
    }),
    [
      isLoggedIn,
      userInfo,
      resourcePermissions,
      actionPermissions
      //  isLoadingPermission
    ]
  )

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  return useContext(AuthContext)
}
