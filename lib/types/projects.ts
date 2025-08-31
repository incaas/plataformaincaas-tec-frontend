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

export interface Client {
  id: string
  name: string
  logo?: string
  secretariat: string
  secretariatAcronym: string
  sector: string
  sectorAcronym: string
  description: string
  website: string
  lastUpdated?: Date
}

export interface ProjectResponsible {
  name: string
  role: string
  description: string
  email: string
  phone: string
  posicao: "manager" | "developer"
  discord?: string
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
