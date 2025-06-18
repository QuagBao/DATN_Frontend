import { z } from 'zod'

export const ProjectBaseSchema = z.object({
  id_project: z.string().uuid(),
  name_project: z.string(),
  content: z.string().optional(),
  description: z.string().optional(),
  start_date: z.string(),
  end_date: z.string(),
  images: z.array(
    z.object({
      id_image: z.string().uuid(),
      url: z.string()
    })
  ),
  total_donors: z.number().optional(),
  total_collaborator: z.number().optional(),
  current_numeric: z.number().optional(),
  total_numeric: z.union([z.number(), z.string()]),
  status: z.string().optional(),
  id_owner: z.string().uuid().optional(),
  created_at: z.string().optional(),
  update_at: z.string().optional(),
  deleted_at: z.string().optional()
})

export const TPagination = z.object({
  total_items: z.number(),
  limit: z.number(),
  total_pages: z.number(),
  page: z.number()
})

export const TProjectDetailData = z.object({
  page: z.number(),
  limit: z.number(),
  total_items: z.number(),
  total_pages: z.number(),
  data: z.array(ProjectBaseSchema)
})

const imagesSchema = z
  .custom<FileList | File[] | undefined>(
    (val) => {
      if (val === undefined) return true
      if (val instanceof FileList) return true
      if (Array.isArray(val) && val.every((f) => f instanceof File)) return true
      return false
    },
    {
      message: 'Invalid file list'
    }
  )
  .optional()

export const CreateProjectReqSchema = ProjectBaseSchema.pick({
  name_project: true,
  description: true,
  content: true,
  start_date: true,
  end_date: true,
  total_numeric: true
}).extend({
  images: imagesSchema
})

export const EditProjectReqSchema = ProjectBaseSchema.pick({
  name_project: true,
  description: true,
  content: true,
  start_date: true,
  end_date: true,
  total_numeric: true
}).extend({
  images: imagesSchema
})

export const ProjectsSchema = z.array(ProjectBaseSchema)

//* ===== RESPONSE TYPES =====
export type TProjectBaseSchema = z.infer<typeof ProjectBaseSchema>
export type TProjectsData = z.infer<typeof TProjectDetailData>
export type TProjectsManagementRes = z.infer<typeof ProjectsSchema>

//* ===== REQUEST TYPES =====
export type TCreateProjectReq = z.infer<typeof CreateProjectReqSchema>
export type TEditProjectReq = z.infer<typeof EditProjectReqSchema>
