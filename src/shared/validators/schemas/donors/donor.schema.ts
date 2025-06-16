import { z } from 'zod'

export const DonorBaseSchema = z.object({
  id_donation: z.string().uuid(),
  project_id: z.string(),
  project_name: z.string(),
  transaction_id: z.string(),
  account_id: z.string(),
  account_name: z.string(),
  amount: z.string(),
  paytime: z.string()
})

export const DonorsSchema = z.array(DonorBaseSchema)

export const DonorsData = z.object({
  page: z.number(),
  limit: z.number(),
  total_items: z.number(),
  total_pages: z.number(),
  data: DonorsSchema
})

export type TDonorBaseSchema = z.infer<typeof DonorBaseSchema>
export type TDonorsSchema = z.infer<typeof DonorsSchema>
export type TDonorsData = z.infer<typeof DonorsData>
