import { z } from 'zod'

export const DonationBaseSchema = z.object({
  id: z.string(),
  donator: z.string().min(1, { message: 'donatorMiniumRequire' }).trim(),
  name_project: z.string().min(1, { message: 'nameProjectMiniumRequire' }).trim(),
  donationDate: z.union([
    z.date(),
    z.string(),
    z.object({ day: z.number(), month: z.number(), year: z.number() }),
    z.object({})
  ]),
  money: z.string()
})

export const DonationPostSchema = z.object({
  account_id: z.string().optional(),
  full_name: z.string().trim().optional(),
  email: z.string().trim().optional(),
  phone: z.string().trim().optional(),
  project_id: z.string(),
  amount: z.number(),
  paytime: z.string(),
  transaction_id: z.string()
})

export const TransactionResSchema = z.object({
  id: z.string(),
  description: z.string(),
  amount: z.string(),
  payTime: z.string()
})

export type TDonationReq = z.infer<typeof DonationPostSchema>
export type TDonationRes = z.infer<typeof DonationBaseSchema>
export type TTransactionRes = z.infer<typeof TransactionResSchema>
