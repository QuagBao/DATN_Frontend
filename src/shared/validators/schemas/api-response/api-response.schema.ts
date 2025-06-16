import { HttpStatusCode } from 'axios'
import { z } from 'zod'

//* ---------------------------------- SCHEMAS ----------------------------------

export const MessageOnlySchema = z.object({
  statusCode: z.nativeEnum(HttpStatusCode),
  message: z.string(),
  detail: z.string().optional()
})

export const PaginationResponseSchema = z.object({
  page: z.number(),
  limit: z.number(),
  total_items: z.number(),
  total_pages: z.number()
})

export const UnauthorizedCauseSchema = z.object({
  cause: z.string()
})

export const EntityErrorSchema = z.object({
  errors: z.array(
    z.object({
      field: z.string(),
      message: z.string()
    })
  )
})

export const ApiResponseSchema = <T extends z.ZodTypeAny = z.ZodTypeAny>(dataSchema: T) =>
  MessageOnlySchema.merge(
    z.object({
      data: dataSchema.optional(),
      pagination: PaginationResponseSchema.optional()
    })
  )

export const ApiErrorSchema = <T extends z.ZodTypeAny = z.ZodTypeAny>(dataSchema: T) =>
  MessageOnlySchema.merge(
    z.object({
      data: dataSchema.optional()
    })
  )

//* ---------------------------------- REQUEST TYPES ----------------------------------

//* ---------------------------------- RESPONSE TYPES ----------------------------------

export type TApiResponse<T extends z.ZodTypeAny = z.ZodTypeAny> = z.infer<ReturnType<typeof ApiResponseSchema<T>>>
export type TApiError<T extends z.ZodTypeAny = z.ZodTypeAny> = z.infer<ReturnType<typeof ApiErrorSchema<T>>>
export type TEntityErrorRes = z.infer<typeof EntityErrorSchema>
export type TUnauthorizedCauseRes = z.infer<typeof UnauthorizedCauseSchema>
export type TPaginationResponse = z.infer<typeof PaginationResponseSchema>
