import { z } from 'zod'
import type { SystemRole, UserStatus } from '../types/users'

export const userCreateSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  systemRole: z.enum(['MASTER', 'USER'] satisfies readonly SystemRole[] as unknown as [SystemRole, ...SystemRole[]]),
  status: z.enum(['ACTIVE', 'INACTIVE'] satisfies readonly UserStatus[] as unknown as [UserStatus, ...UserStatus[]])
})

export const userUpdateSchema = userCreateSchema.partial().extend({
  id: z.string().min(1)
})

export const userFiltersSchema = z.object({
  q: z.string().optional(),
  email: z.string().email().optional(),
  role: z.enum(['MASTER', 'USER']).optional(),
  status: z.enum(['ACTIVE', 'INACTIVE']).optional(),
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(10),
  sortBy: z.enum(['name', 'email', 'createdAt', 'status', 'systemRole']).optional(),
  sortDir: z.enum(['asc', 'desc']).optional()
})

export type UserCreateData = z.infer<typeof userCreateSchema>
export type UserUpdateData = z.infer<typeof userUpdateSchema>
export type UserFilters = z.infer<typeof userFiltersSchema>


