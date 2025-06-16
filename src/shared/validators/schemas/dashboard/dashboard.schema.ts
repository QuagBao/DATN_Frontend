import { z } from 'zod'

const DashboardSchema = z.object({
  total_projects: z.union([z.number(), z.string()]),
  total_collaborators: z.union([z.number(), z.string()]),
  total_donors: z.union([z.number(), z.string()])
})

export type TDashboardSchema = z.infer<typeof DashboardSchema>
