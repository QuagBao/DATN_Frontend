import { NextResponse } from 'next/server'
import { type z } from 'zod'

import { type TApiResponse } from '~/shared/validators'

export class NextServerResponse<T extends z.ZodTypeAny> extends NextResponse {
  constructor(response: TApiResponse<T>) {
    const { statusCode, message, data } = response
    const body: { statusCode: number; message: string; data?: z.infer<T> } = { statusCode, message }

    if (data !== undefined) {
      body.data = data
    }

    super(JSON.stringify(body), { status: statusCode })
  }

  json() {
    return super.json() as Promise<{ statusCode: number; message: string; data?: z.infer<T> }>
  }
}
