import { z } from 'zod'

import { EUserRequestStatus, EUserRequestType } from '~/shared/enums'

import { UserBaseSchema } from '../user/user.schema'

export const BaseUserRequestSchema = z.object({
  id: z.string(),
  userId: z.string(),
  startTime: z.string().min(1, 'Start time is required.'),
  endTime: z.string().min(1, 'End time is required.'),
  reason: z.string().min(1, 'Reason is required.'),
  status: z.union([z.string(), z.nativeEnum(EUserRequestStatus)]),
  typeId: z.union([z.string().min(1, 'Request type is required.'), z.nativeEnum(EUserRequestType)]),
  companyIds: z.array(z.number()),
  user: UserBaseSchema,
  requesterId: z.string(),
  approverId: z.string().min(1, 'Approver is required.'),
  requesterName: z.string(),
  approverName: z.string(),
  totalRequestHours: z.number(),
  deletedAt: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string()
})

export const CreateUserRequestSchema = BaseUserRequestSchema.pick({
  approverId: true,
  typeId: true,
  startTime: true,
  endTime: true,
  reason: true
})

export const CreateHolidayRequestSchema = BaseUserRequestSchema.pick({
  typeId: true,
  startTime: true,
  endTime: true,
  reason: true
}).extend({
  companyIds: z.array(z.number()).nonempty({ message: 'At least one company is required.' })
})

export const UserRequestResSchema = BaseUserRequestSchema.pick({
  id: true,
  requesterId: true,
  startTime: true,
  endTime: true,
  reason: true,
  status: true,
  typeId: true,
  approverId: true,
  requesterName: true,
  approverName: true,
  totalRequestHours: true
})

export const UserRequestsResSchema = z.array(UserRequestResSchema)

export const EditUserRequestSchema = BaseUserRequestSchema.omit({ deletedAt: true, createdAt: true, updatedAt: true })

export type TUserRequestRes = z.infer<typeof UserRequestResSchema>
export type TEditUserRequestReq = z.infer<typeof EditUserRequestSchema>
export type TCreateUserRequestReq = z.infer<typeof CreateUserRequestSchema>
export type TCreateHolidayRequestReq = z.infer<typeof CreateHolidayRequestSchema>
