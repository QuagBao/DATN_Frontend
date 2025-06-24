import { z } from 'zod'

const configSchema = z.object({
  NEXT_PUBLIC_API_ENDPOINT: z.string(),
  NEXT_PUBLIC_URL: z.string(),
  NEXT_PUBLIC_BANK_ID: z.string(),
  NEXT_PUBLIC_ACCOUNT_NO: z.string(),
  NEXT_PUBLIC_ACCOUNT_NAME: z.string(),
  ENCRYPTION_SECRET: z.string(),
  NEXT_PUBLIC_RESPOND_GG_SHEET: z.string()
})

const configProject = configSchema.safeParse({
  // phải khai báo cụ thể tên biến môi trường để check lỗi được chính xác thay vì chỉ check process.env
  NEXT_PUBLIC_API_ENDPOINT: process.env.NEXT_PUBLIC_API_ENDPOINT,
  NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
  NEXT_PUBLIC_BANK_ID: process.env.NEXT_PUBLIC_BANK_ID,
  NEXT_PUBLIC_ACCOUNT_NO: process.env.NEXT_PUBLIC_ACCOUNT_NO,
  NEXT_PUBLIC_ACCOUNT_NAME: process.env.NEXT_PUBLIC_ACCOUNT_NAME,
  ENCRYPTION_SECRET: process.env.ENCRYPTION_SECRET,
  NEXT_PUBLIC_RESPOND_GG_SHEET: process.env.NEXT_PUBLIC_RESPOND_GG_SHEET
})

if (!configProject.success) {
  throw new Error(
    'Please provide the correct environment variables. Refer to the .env.example file for more information'
  )
}

const envConfig = configProject.data
export default envConfig
