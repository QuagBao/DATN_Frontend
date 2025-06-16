import { type AxiosError } from 'axios'
import { NextResponse } from 'next/server'
import { type z } from 'zod'

import { type TApiError } from '~/shared/validators'

export class NextApiError<T extends z.ZodTypeAny = z.ZodTypeAny> extends NextResponse {
  constructor(axiosError: AxiosError<TApiError<T>>) {
    const { statusCode, message, data } = axiosError.response?.data || {
      statusCode: 500,
      message: 'Unknown error occurred',
      data: {}
    }

    const errorData = {
      statusCode,
      message,
      ...(data ? { data } : {})
    }

    super(JSON.stringify(errorData), { status: statusCode })
  }

  json() {
    return super.json() as Promise<{ statusCode: number; message: string; data?: z.infer<T> }>
  }
}
