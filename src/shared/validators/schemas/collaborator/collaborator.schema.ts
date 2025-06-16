import { z } from 'zod'

import { EMAIL_REGEX } from '~/shared/constants/common.constant'

export const CollaboratorBaseSchema = z.object({
  id: z.string().uuid(),
  project_id: z.string(),
  project_name: z.string(),
  id_collaborator: z.string(),
  account_name: z.union([
    z.literal(''),
    z.string().min(1, { message: 'fullNameMinimumRequire' }).max(40, { message: 'fullNameMaxRequire' }).trim()
  ]),
  email: z
    .string()
    .trim()
    .refine((val) => val === '' || EMAIL_REGEX.test(val), {
      message: 'Không đúng định dạng email'
    }),
  phone: z.string(),
  status: z.string(),
  approved_at: z.string().optional(),
  applied_at: z.string()
})

export const CollaboratorsDataSchema = z.object({
  page: z.number(),
  limit: z.number(),
  total_items: z.number(),
  total_pages: z.number(),
  data: z.array(CollaboratorBaseSchema)
})

export const CollaboratorsSchema = z.array(CollaboratorBaseSchema)

export type TCollaboratorBaseSchema = z.infer<typeof CollaboratorBaseSchema>
export type TCollaboratorsSchema = z.infer<typeof CollaboratorsSchema>
export type TCollaboratorsData = z.infer<typeof CollaboratorsDataSchema>
