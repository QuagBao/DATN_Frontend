import { HttpStatusCode } from 'axios'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

const deleteAuthCookies = async () => {
  const cookieStore = cookies()
  cookieStore.delete('accessToken')
  cookieStore.delete('accountType')
  cookieStore.delete('accountId')
  cookieStore.delete('resourcePermissions')
  cookieStore.delete('actionPermissions')
}

export async function POST(): Promise<NextResponse> {
  try {
    await deleteAuthCookies()

    return NextResponse.json({
      statusCode: HttpStatusCode.Ok,
      message: 'Đăng xuất thành công'
    })
  } catch (error) {
    return NextResponse.json({
      message: 'Internal Server Error',
      statusCode: HttpStatusCode.InternalServerError,
      data: null
    })
  }
}
