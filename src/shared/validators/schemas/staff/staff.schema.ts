import { z } from 'zod'

import { EMAIL_REGEX } from '~/shared/constants/common.constant'
import { EGender, EStaffStatus } from '~/shared/enums'
import { isClient } from '~/shared/utils'

import { RoleBaseSchema } from '../role/role.schema'

export const StaffBaseSchema = z.object({
  id: z.string(),
  userName: z.string().min(1, { message: 'userNameMinimumRequire' }).max(40, { message: 'userNameMaxRequire' }).trim(),
  email: z
    .string()
    .trim()
    .refine((val) => val === '' || EMAIL_REGEX.test(val), {
      message: 'Không đúng định dạng email'
    }),
  fullName: z.union([
    z.literal(''),
    z.string().min(1, { message: 'fullNameMinimumRequire' }).max(40, { message: 'fullNameMaxRequire' }).trim()
  ]),
  avatar: isClient() ? z.union([z.string(), z.instanceof(File)]).optional() : z.string().optional(),
  gender: z.union([z.string(), z.nativeEnum(EGender)]),
  phone: z.string().regex(/^\d{10}$/, { message: 'phoneNumberInvalid' }),
  password: z.string().min(8, { message: 'passwordMinimumRequire' }),
  address: z.string().min(1, 'Address is required.'),
  district: z.string().min(1, 'District is required.'),
  city: z.string().min(1, 'City is required.'),
  country: z.string().min(1, 'Country is required.'),
  position: z.string().min(1, 'Position is required.'),
  isSuperAdmin: z.boolean().optional(),
  historyQueryLimit: z.number().optional(),
  notificationEnabled: z.boolean().optional(),
  companyId: z.union([z.string(), z.number()]),
  status: z.union([z.number(), z.nativeEnum(EStaffStatus)]),
  roleId: z.union([z.string(), z.number()]),
  role: RoleBaseSchema,
  roles: z
    .array(
      z.object({
        id: z.number(),
        name: z.string(),
        priority: z.number()
      })
    )
    .optional(),
  joinDate: z.union([
    z.date(),
    z.string(),
    z.object({ day: z.number(), month: z.number(), year: z.number() }),
    z.object({})
  ]),
  deletedAt: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
  isSecPassword: z.boolean()
})

export const StaffManagementBaseSchema = StaffBaseSchema.extend({
  roleIds: z.array(z.number()).optional(),
  role: RoleBaseSchema.pick({
    id: true,
    name: true
  })
})

export const StaffManagementResSchema = StaffManagementBaseSchema.omit({
  roleId: true
})

export const StaffsManagementResSchema = z.array(
  StaffManagementBaseSchema.omit({
    roleId: true
  })
)

export const UpdateStaffProfileSchema = StaffBaseSchema.omit({
  id: true,
  email: true,
  password: true,
  status: true,
  roleId: true,
  companyId: true,
  position: true,
  joinDate: true,

  role: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true
})

export const CreateStaffReqSchema = StaffManagementBaseSchema.pick({
  email: true
})

export const UpdateStaffReqSchema = StaffManagementBaseSchema.pick({
  email: true,
  fullName: true,
  phone: true,
  password: true
}).extend({
  roleIds: z.array(z.string()).min(1, { message: 'roleMinimumRequire' }),
  notes: z.string().optional()
})

export const approversSchemaStaff = z.array(
  StaffManagementBaseSchema.pick({
    id: true,
    email: true,
    fullName: true
  }).extend({
    role: RoleBaseSchema.pick({
      name: true
    })
  })
)
export const requestersSchemaStaff = z.array(
  StaffManagementBaseSchema.pick({
    id: true,
    email: true,
    fullName: true
  }).extend({
    role: RoleBaseSchema.pick({
      name: true
    })
  })
)

export const staffDetailSchema = StaffBaseSchema.pick({
  id: true,
  userName: true,
  fullName: true,
  email: true,
  phone: true,
  status: true
}).partial()

//* ---------------------------------- REQUEST TYPES ----------------------------------
export type TCreateStaffReq = z.infer<typeof CreateStaffReqSchema>
export type TUpdateStaffReq = z.infer<typeof UpdateStaffReqSchema>

//* ---------------------------------- RESPONSE TYPES ----------------------------------
export type TStaffManagementRes = z.infer<typeof StaffManagementResSchema>
export type TStaffProfileRes = z.infer<typeof StaffBaseSchema>
export type TUpdateStaffProfileReq = z.infer<typeof UpdateStaffProfileSchema>
export type TStaffDetailRes = z.infer<typeof staffDetailSchema>
