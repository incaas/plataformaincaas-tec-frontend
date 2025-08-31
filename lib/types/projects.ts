export interface Project {
  id: string
  name: string
  description: string
  status: "ativo" | "desenvolvimento" | "inativo"
  client: string
  sector: string
  requester: string
  devs: number
  team: number
  logo?: string
  createdAt?: Date
  updatedAt?: Date
}

export interface ProjectFilters {
  client: string
  sector: string
  requester: string
  devs: string
}

export interface ProjectStatus {
  id: string
  label: string
  count: number
}
