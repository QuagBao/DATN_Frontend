import { AxiosError, HttpStatusCode } from 'axios'
import { cookies } from 'next/headers'
import type { NextRequest, NextResponse } from 'next/server'

import { authApiRequest } from '~/api-requests'
import { NextServerResponse } from '~/shared/classes/next-server-response.class'
import { calculateTokenTimeConstants } from '~/shared/constants'
import { jwtExpireTimes } from '~/shared/utils'
import type { TApiError, TLoginReq } from '~/shared/validators'

async function loginHandler(req: NextRequest): Promise<NextResponse> {
  const body = (await req.json()) as TLoginReq
  const cookieStore = cookies()

  try {
    const tokensRes = await authApiRequest.staffLoginToApiServer(body, {
      headers: {
        'accept-language': req.headers.get('accept-language'),
        'accept-time-zone': req.headers.get('accept-time-zone'),
        'user-agent': req.headers.get('user-agent'),
        'ip-address': req.headers.get('accept-ip-address')
      }
    })

    const { access_token: accessToken, user } = tokensRes.data

    if (!accessToken) {
      throw new Error('Không thể lấy access token')
    }

    const decodedAccessToken = jwtExpireTimes(accessToken)
    const { ACCESS_TOKEN } = calculateTokenTimeConstants(decodedAccessToken)

    cookieStore.set('accessToken', accessToken, {
      secure: process.env.NODE_ENV !== 'development',
      maxAge: decodedAccessToken.exp - decodedAccessToken.iat + ACCESS_TOKEN.EXTENDED_COOKIE_LIFE_TIME,
      path: '/',
      sameSite: 'lax'
    })

    cookieStore.set('accountType', String(user.role.id_role), {
      secure: process.env.NODE_ENV !== 'development',
      maxAge: decodedAccessToken.exp - decodedAccessToken.iat,
      path: '/',
      sameSite: 'lax'
    })

    return new NextServerResponse({
      statusCode: tokensRes.status,
      message: 'Đăng nhập thành công',
      data: { user }
    })
  } catch (err) {
    if (err instanceof AxiosError) {
      const apiError = err as AxiosError<TApiError>
      if (apiError.response) {
        return new NextServerResponse({
          message: apiError.response.data.message || apiError.response.data.detail || 'Lỗi không xác định',
          statusCode: apiError.response.status
        })
      }
    }
    return new NextServerResponse({
      message: 'Internal Server Error',
      statusCode: HttpStatusCode.InternalServerError,
      data: null
    })
  }
}

export const POST = loginHandler
