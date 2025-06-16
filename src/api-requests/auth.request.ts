import { type AxiosRequestConfig } from 'axios'

import envConfig from '~/config/env'
import { API_URL, NEXT_API_URL } from '~/config/routes'
import { EBroadcastAuthAction } from '~/shared/enums/broadcast.enum'
import { useCookieStore } from '~/shared/hooks'
import { axiosHttp } from '~/shared/http/axios'
import type { ISuccessResponse } from '~/shared/types'
import { emitAuthBroadcast } from '~/shared/utils/broadcast.util'
import { getLoginStatusAndCookies } from '~/shared/utils/client-auth.util'
import type {
  ILoginRes,
  TApiResponse,
  TChangePasswordReq,
  TForgotPasswordReq,
  TLoginReq,
  TOtpReq,
  TRegisterReq,
  TResetPasswordReq,
  TUser
} from '~/shared/validators'

const authApiRequest = {
  loginToApiServer: async (body: TLoginReq, config: AxiosRequestConfig) => {
    const response = await axiosHttp.post<{ access_token: string; user: TUser }>(API_URL.AUTH.LOGIN, body, config)
    return response
  },
  loginToNextServer: async (body: TLoginReq) => {
    const { isLoggedIn, accessToken, accountType, resourcePermissions, actionPermissions } =
      await getLoginStatusAndCookies()
    if (isLoggedIn) {
      emitAuthBroadcast(EBroadcastAuthAction.LoggedIn)
      return Promise.reject(new Error('User is already logged in'))
    }

    if (accessToken || accountType || resourcePermissions || actionPermissions) {
      await Promise.all([
        useCookieStore.removeCookie('accessToken'),
        useCookieStore.removeCookie('accountType'),
        useCookieStore.removeCookie('resourcePermissions'),
        useCookieStore.removeCookie('actionPermissions')
      ])
    }

    const response = await axiosHttp.post<ISuccessResponse<ILoginRes>>(NEXT_API_URL.AUTH.LOGIN, body, {
      baseURL: ''
    })

    return response
  },
  loginToStaffNextServer: async (body: TLoginReq) => {
    const { isLoggedIn, accessToken, accountType, resourcePermissions, actionPermissions } =
      await getLoginStatusAndCookies()

    if (isLoggedIn) {
      emitAuthBroadcast(EBroadcastAuthAction.LoggedIn)
      return Promise.reject(new Error('User is already logged in'))
    }

    if (accessToken || accountType || resourcePermissions || actionPermissions) {
      await Promise.all([
        useCookieStore.removeCookie('accessToken'),
        useCookieStore.removeCookie('accountType'),
        useCookieStore.removeCookie('resourcePermissions'),
        useCookieStore.removeCookie('actionPermissions')
      ])
    }

    const response = await axiosHttp.post<ISuccessResponse<ILoginRes>>(NEXT_API_URL.AUTH.LOGIN_STAFF, body, {
      baseURL: ''
    })

    return response
  },
  staffLoginToApiServer: async (body: TLoginReq, config: AxiosRequestConfig) => {
    const response = await axiosHttp.post<{ access_token: string; user: TUser }>(API_URL.AUTH.LOGIN, body, config)
    return response
  },

  register: async (data: TRegisterReq) =>
    axiosHttp.post<ISuccessResponse<{ token: string }>>(API_URL.AUTH.REGISTER, data),
  verifyAccount: async ({ email, otp }: TOtpReq & { email: string }) => {
    return axiosHttp.post<TApiResponse>(API_URL.AUTH.VERIFY_ACCOUNT, {
      email,
      otp
    })
  },
  resendOtp: ({ email }: { email: string }) => {
    return axiosHttp.post<ISuccessResponse<{ token: string }>>(API_URL.AUTH.RESEND_OTP, {
      email
    })
  },

  logoutNextServer: async (force?: boolean, signal?: AbortSignal | undefined) => {
    const response = await axiosHttp.post<TApiResponse>(
      NEXT_API_URL.AUTH.LOGOUT,
      { force },
      {
        baseURL: envConfig.NEXT_PUBLIC_URL,
        signal
      }
    )
    if (response.status === 200) {
      emitAuthBroadcast(EBroadcastAuthAction.LoggedOut)
    }
    return response
  },
  forgotPassword: async ({ email }: TForgotPasswordReq) =>
    axiosHttp.post<ISuccessResponse<{ token: string }>>(API_URL.AUTH.FORGOT_PASSWORD, { email }),
  resetPassword: async ({ email, otp, new_password }: Omit<TResetPasswordReq, 'confirmPassword'>) =>
    axiosHttp.post<TApiResponse>(API_URL.AUTH.RESET_PASSWORD, {
      email,
      otp,
      new_password
    }),
  verifyAccountResetPassword: async ({ email, otp }: TOtpReq & { email: string }) => {
    return axiosHttp.post<TApiResponse>(API_URL.AUTH.RESEND_VERIFY_ACCOUNT, {
      email,
      otp
    })
  },
  forgotResendOtp: ({ email }: { email: string }) => {
    return axiosHttp.post<ISuccessResponse<{ token: string }>>(API_URL.AUTH.FORGOT_PASSWORD_RESEND_OTP, {
      email
    })
  },

  changePassword: async ({ token, old_password, new_password }: TChangePasswordReq) =>
    axiosHttp.post<TApiResponse>(API_URL.AUTH.CHANGE_PASSWORD, {
      token,
      old_password,
      new_password
    })
}

export default authApiRequest
