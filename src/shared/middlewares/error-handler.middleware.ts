import { type AxiosError } from 'axios'
import type { NextRequest, NextResponse } from 'next/server'

import { NextServerResponse } from '~/shared/classes/next-server-response.class'
import { type TApiError } from '~/shared/validators'

type Handler = (req: NextRequest) => Promise<NextResponse>

export function apiHandler(handler: Handler): Handler {
  return async (req: NextRequest): Promise<NextResponse> => {
    try {
      return await handler(req)
    } catch (error: unknown) {
      const apiError = error as AxiosError<TApiError>
      return new NextServerResponse({
        statusCode: apiError.response?.data.statusCode || 500,
        message: apiError.response?.data.message || 'Internal Server Error',
        data: (apiError.response?.data.data as unknown) || null
      })
    }
  }
}
