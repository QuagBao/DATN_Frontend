import { addToast } from '@heroui/react'
import axios, { type AxiosError, type AxiosInstance, type AxiosResponse, type InternalAxiosRequestConfig } from 'axios'
import Cookies from 'js-cookie'

import { authApiRequest } from '~/api-requests'
import envConfig from '~/config/env'
import { APP_ROUTES, NEXT_API_URL } from '~/config/routes'
import { useCookieStore, useLanguageStore } from '~/shared/hooks'
import {
  isExpiredAccessTokenError,
  isExpiredRefreshTokenError,
  isInValidAccessTokenError,
  isInValidRefreshTokenError,
  isUnprocessableEntityError
} from '~/shared/utils/axios.util'
import { isClient } from '~/shared/utils/common.util'
import type { EntityErrorSchema, TApiError, TApiResponse } from '~/shared/validators'

import { REFRESH_TOKEN_EVENT } from '../utils'

const resolveBaseURL = (baseURL?: string): string => {
  if (baseURL === undefined) {
    return envConfig.NEXT_PUBLIC_API_ENDPOINT
  } else if (baseURL === '') {
    return envConfig.NEXT_PUBLIC_URL
  }
  return baseURL
}

export function createHttp(baseURL?: string): AxiosInstance {
  const resolvedBaseURL = resolveBaseURL(baseURL)
  const instance = axios.create({
    baseURL: resolvedBaseURL,
    timeout: 20000,
    headers: {
      'Content-Type': 'application/json',
      'Accept-Language': useLanguageStore.getState().language || 'en',
      'Accept-Time-Zone': Intl.DateTimeFormat().resolvedOptions().timeZone
    }
  })

  // Các biến trạng thái được lưu trong closure
  let refreshAccessTokenRequest: Promise<void> | null = null
  let deviceIP: string | null = null

  async function getDeviceIp(): Promise<string | null> {
    if (deviceIP) return deviceIP
    try {
      const response = await axios.get<{ ip: string }>('https://api.ipify.org?format=json')
      deviceIP = response.data.ip
      return deviceIP
    } catch (error) {
      return null
    }
  }

  async function handleRequest(config: InternalAxiosRequestConfig) {
    if (isClient()) {
      const ip = await getDeviceIp()
      if (ip) {
        config.headers.set('Accept-IP-Address', ip)
      }

      const accessToken = useCookieStore.getCookie('accessToken')
      if (accessToken) {
        config.headers.set('Authorization', `Bearer ${accessToken}`)
      }
      config.headers.set('Accept-Language', useLanguageStore.getState().language)
      config.headers.set('Accept-Time-Zone', Intl.DateTimeFormat().resolvedOptions().timeZone)
    }
    return config
  }

  function handleRequestError(error: AxiosError<TApiError>) {
    return Promise.reject(error)
  }

  function handleResponse(response: AxiosResponse): AxiosResponse {
    if (
      response.config.responseType === 'arraybuffer' &&
      typeof response.headers['content-type'] === 'string' &&
      response.headers['content-type'].includes('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
    ) {
      const blob = new Blob([response.data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      })
      return { ...response, data: blob }
    }
    return response
  }

  function parseArrayBufferErrorResponse(response: AxiosResponse): TApiError | null {
    if (response.status === 401 && response.data instanceof ArrayBuffer) {
      const errorText = new TextDecoder().decode(response.data)
      const errorData = JSON.parse(errorText) as TApiError
      return errorData
    }
    return null
  }

  function shouldRefreshToken(error: AxiosError<TApiError>) {
    return (
      isClient() &&
      error.config?.url &&
      (isExpiredAccessTokenError(error) || isInValidAccessTokenError(error)) &&
      error.config.url !== NEXT_API_URL.AUTH.REFRESH_ACCESS_TOKEN
    )
  }

  async function handleRefreshAccessToken(): Promise<void> {
    if (isClient()) {
      await instance.post<TApiResponse>(NEXT_API_URL.AUTH.REFRESH_ACCESS_TOKEN, {}, { baseURL: '' })
    }
  }

  async function refreshTokenAndRetry(config: InternalAxiosRequestConfig | undefined) {
    if (isClient()) {
      refreshAccessTokenRequest = refreshAccessTokenRequest || handleRefreshAccessToken()
      try {
        await refreshAccessTokenRequest
        const newAccessToken = Cookies.get('accessToken')
        if (newAccessToken && config) {
          const refreshTokenEvent = new CustomEvent(REFRESH_TOKEN_EVENT, {
            detail: newAccessToken,
            bubbles: true,
            cancelable: true
          })
          document.dispatchEvent(refreshTokenEvent)
          config.headers.set('Authorization', `Bearer ${newAccessToken}`)
          return await instance(config)
        }
      } catch (err) {
        const resourcePermissionCookie = Cookies.get('resourcePermissions')
        const resourcePermissions = resourcePermissionCookie ? (JSON.parse(resourcePermissionCookie) as string[]) : []
        await authApiRequest.logoutNextServer(true)
        if (resourcePermissions.length) {
          window.location.href = APP_ROUTES.AUTH.LOGIN_ADMIN
        } else {
          window.location.href = APP_ROUTES.AUTH.LOGIN
        }
      } finally {
        refreshAccessTokenRequest = null
      }
    }
    return Promise.reject(new Error('Failed to refresh access token and retry the request.'))
  }

  function handleErrorDisplay(error: AxiosError<TApiError>) {
    if (!isClient()) return

    const apiErr = error.response?.data
    const errorMessage = apiErr?.detail?.toString() ?? apiErr?.message ?? error.message

    // if (error.response?.data instanceof ArrayBuffer) {
    //   const errorText = new TextDecoder().decode(new Uint8Array(error.response.data))
    //   const errorData = JSON.parse(errorText) as TApiError
    //   errorMessage = errorData.message
    // }

    if (!isUnprocessableEntityError<TApiError<typeof EntityErrorSchema>>(error) && errorMessage) {
      addToast({
        color: 'danger',
        description: errorMessage
      })
    }
  }

  function isRefreshTokenError(error: AxiosError<TApiError>) {
    return (
      isClient() &&
      (isExpiredRefreshTokenError<TApiError>(error) ||
        isInValidRefreshTokenError<TApiError>(error) ||
        isInValidAccessTokenError<TApiError>(error))
    )
  }

  async function handleLogout() {
    if (isClient()) {
      await instance.post(NEXT_API_URL.AUTH.LOGOUT, { force: true }, { baseURL: '' })
      window.location.href = APP_ROUTES.AUTH.LOGIN
    }
  }

  async function handleResponseError(error: AxiosError<TApiError>) {
    if (isClient()) {
      const { config, response } = error

      const errorData = response ? parseArrayBufferErrorResponse(response) : null

      if (errorData && error.response) {
        // eslint-disable-next-line no-param-reassign
        error.response.data = errorData
      }

      if (shouldRefreshToken(error)) {
        return refreshTokenAndRetry(config)
      }

      handleErrorDisplay(error)

      if (isRefreshTokenError(error)) {
        await handleLogout()
      }
    }
    return Promise.reject(error)
  }

  instance.interceptors.request.use(handleRequest, handleRequestError)
  instance.interceptors.response.use(handleResponse, handleResponseError)

  return instance
}

export const axiosHttp = createHttp()
