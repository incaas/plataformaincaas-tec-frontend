import { Project } from "@/lib/types/projects"

export const mockProjects: Project[] = [
  {
    id: "1",
    name: "SIGPRE",
    description: "O Sistema de Gerenciamento de Precatórios (SIGPRE)",
    status: "ativo",
    client: "Tribunal de Justiça",
    sector: "Judiciário",
    requester: "Secretaria de Administração",
    devs: 5,
    team: 12,
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-12-01")
  },
  {
    id: "2",
    name: "CERTIDÕES",
    description: "Sistema Unificado de Certidões",
    status: "ativo",
    client: "Tribunal de Justiça",
    sector: "Judiciário",
    requester: "Secretaria de Administração",
    devs: 2,
    team: 3,
    createdAt: new Date("2024-03-20"),
    updatedAt: new Date("2024-11-15")
  },
  {
    id: "3",
    name: "SIGAJUS",
    description: "Sistema Integrado de Gestão Administrativa do Judiciário",
    status: "desenvolvimento",
    client: "Tribunal de Justiça",
    sector: "Judiciário",
    requester: "Secretaria de Administração",
    devs: 1,
    team: 2,
    createdAt: new Date("2024-06-10"),
    updatedAt: new Date("2024-12-01")
  },
  {
    id: "4",
    name: "NUPEJ",
    description: "Núcleo de Perícias Judiciais",
    status: "inativo",
    client: "Tribunal de Justiça",
    sector: "Judiciário",
    requester: "Secretaria de Administração",
    devs: 0,
    team: 0,
    createdAt: new Date("2023-09-05"),
    updatedAt: new Date("2024-08-20")
  }
]

export const filterOptions = {
  client: ["Tribunal de Justiça", "Ministério Público", "Defensoria Pública"],
  sector: ["Judiciário", "Administrativo", "Financeiro", "Recursos Humanos"],
  requester: ["Secretaria de Administração", "Secretaria de Tecnologia", "Diretoria de Sistemas"],
  devs: ["Todos", "1-3", "4-6", "7+"]
}
