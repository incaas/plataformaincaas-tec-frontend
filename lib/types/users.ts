export type SystemRole = 'MASTER' | 'USER'
export type UserStatus = 'ACTIVE' | 'INACTIVE'

export type User = {
  id: string
  name: string
  email: string
  systemRole: SystemRole
  status: UserStatus
  createdAt: string
  updatedAt?: string
}

export type PaginatedResponse<T> = {
  items: T[]
  total: number
  page: number
  pageSize: number
}

export type UsersListParams = {
  q?: string
  email?: string
  role?: SystemRole
  status?: UserStatus
  page?: number
  pageSize?: number
  sortBy?: 'name' | 'email' | 'createdAt' | 'status' | 'systemRole'
  sortDir?: 'asc' | 'desc'
}


