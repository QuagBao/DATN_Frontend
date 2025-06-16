import { z } from 'zod'

import { EMAIL_REGEX } from '~/shared/constants/common.constant'

import { RoleBaseSchema } from '../role/role.schema'

// ===== USER BASE SCHEMA =====
export const UserBaseSchema = z.object({
  id_account: z.string(),
  email: z
    .string()
    .trim()
    .refine((val) => val === '' || EMAIL_REGEX.test(val), {
      message: 'Không đúng định dạng email'
    }),
  full_name: z.union([
    z.literal(''),
    z.string().min(1, { message: 'fullNameMinimumRequire' }).max(40, { message: 'fullNameMaxRequire' }).trim()
  ]),
  phone: z.string().regex(/^\d{10}$/, { message: 'phoneNumberInvalid' }),
  password: z.string().min(8, { message: 'passwordMinimumRequire' }),
  status: z.union([z.number(), z.string()]),
  isSuperAdmin: z.boolean().optional(),
  role: RoleBaseSchema,
  deletedAt: z.string().nullable(),
  created_at: z.string(),
  updated_at: z.string()
})

// ===== USER EXTENSIONS =====
export const UserManagementBaseSchema = UserBaseSchema.extend({
  role: RoleBaseSchema.pick({
    id: true,
    name: true
  })
})

export type TUserManagementRes = z.infer<typeof UserManagementBaseSchema>

// ===== API RESPONSE SCHEMA =====
export const UsersManagementResSchema = z.array(UserManagementBaseSchema)
export type TUsersManagementRes = z.infer<typeof UsersManagementResSchema>

export const UsersManagementApiResponseSchema = z.object({
  page: z.number(),
  limit: z.number(),
  total_items: z.number(),
  total_pages: z.number(),
  data: UsersManagementResSchema
})

export type TUsersManagementApiResponse = z.infer<typeof UsersManagementApiResponseSchema>

// ===== OTHER SCHEMAS =====
export const CreateUserResSchema = z.object({
  userName: z.string().optional(),
  email: z.string(),
  fullName: z.string(),
  phone: z.string(),
  password: z.string()
})

export const UpdateUserProfileSchema = UserBaseSchema.pick({
  full_name: true,
  phone: true
})

export const CreateUserReqSchema = UserManagementBaseSchema.pick({
  email: true,
  full_name: true,
  phone: true,
  password: true
}).extend({
  notes: z.string().optional()
})

export const UpdateUserReqSchema = CreateUserReqSchema.omit({
  password: true
})

export const approversSchema = z.array(
  UserManagementBaseSchema.pick({
    email: true,
    full_name: true
  }).extend({
    role: RoleBaseSchema.pick({
      name: true
    })
  })
)

export const requestersSchema = z.array(
  UserManagementBaseSchema.pick({
    email: true,
    full_name: true
  }).extend({
    role: RoleBaseSchema.pick({
      name: true
    })
  })
)

export const userDetailSchema = UserBaseSchema.pick({
  full_name: true,
  email: true,
  phone: true,
  status: true
}).partial()

//* ===== REQUEST TYPES =====
export type TCreateUserReq = z.infer<typeof CreateUserReqSchema>
export type TUpdateUserReq = z.infer<typeof UpdateUserReqSchema>

//* ===== RESPONSE TYPES =====
export type TUserProfileRes = z.infer<typeof UserBaseSchema>
export type TUpdateUserProfileReq = z.infer<typeof UpdateUserProfileSchema>
export type TUserDetailRes = z.infer<typeof userDetailSchema>
