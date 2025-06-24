'use client'

import type React from 'react'
import { createContext, useContext, useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import { userApiRequest } from '~/api-requests'
import { useCookieStore } from '~/shared/hooks'
import type { IProfile } from '~/shared/types'
import { type TActionPermissions } from '~/shared/validators/schemas/permission/permission.schema'

import { API_URL } from '../routes'

interface AuthContextType {
  isLoggedIn: boolean
  setIsLoggedIn: (isLoggedIn: boolean) => void
  userInfo: IProfile | null
  role: string
  resourcePermissions: string[]
  actionPermissions: TActionPermissions
  isLoadingPermission?: boolean
  setRole: React.Dispatch<React.SetStateAction<string>>
  setUserInfo: (userInfo: IProfile | null) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  userInfo: null,
  role: '',
  setRole: () => {},
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
  const [role, setRole] = useState<string>('')
  const [resourcePermissions, setResourcePermissions] = useState<string[]>([])
  const [actionPermissions, setActionPermissions] = useState<TActionPermissions>({})
  const accountType = useCookieStore.getCookie('accountType')

  useQuery({
    queryKey: [API_URL.USER.GET_PROFILE, accountType],
    queryFn: async () => {
      const res = await userApiRequest.getMe()
      setUserInfo(res.data)
      setRole(accountType ?? '')
      return res
    },
    enabled: isLoggedIn
  })

  const logout = () => {
    setIsLoggedIn(false)
    setUserInfo(null)
    setRole('')
    setResourcePermissions([])
    setActionPermissions({})
  }

  const contextValue = useMemo(
    () => ({
      isLoggedIn,
      setIsLoggedIn,
      userInfo,
      role,
      resourcePermissions,
      actionPermissions,
      setUserInfo,
      setRole,
      // isLoadingPermission,
      logout
    }),
    [
      isLoggedIn,
      userInfo,
      role,
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
