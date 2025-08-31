import { Project, Client, ProjectResponsible } from "@/lib/types/projects"

// Dados do cliente baseados no formulário de cadastro
export const clientData: Client = {
  id: "1",
  name: "TRIBUNAL DE JUSTIÇA DO RIO GRANDE DO NORTE",
  logo: "/logo-incaas.svg",
  secretariat: "Secretaria de Tecnologia da Informação e Comunicação",
  secretariatAcronym: "SETIC",
  sector: "Departamento de Projetos e Sistemas",
  sectorAcronym: "DPS",
  description: "O Tribunal de Justiça do Rio Grande do Norte (TJRN) é o órgão máximo do poder judiciário no estado do Rio Grande do Norte. Ele é responsável por julgar causas de natureza cível, criminal, fazendária e outras, garantindo que a justiça seja aplicada conforme as leis.",
  website: "https://www.tjrn.jus.br/",
  lastUpdated: new Date("2025-07-13T14:01:00")
}

// Dados dos responsáveis por projeto
export const responsibles: Record<string, ProjectResponsible[]> = {
  "1": [
    {
      name: "JANDSON SILVA",
      role: "Gerente de Projeto",
      description: "Janderson é o cliente responsável pela solicitação e acompanhamento da implementação do sistema, atuando como ponto de contato principal para alinhamento de requisitos e validação das entregas.",
      email: "janjantech@tjrn.jus.br",
      phone: "(84) 9 9878 8122",
      posicao: "manager",
      discord: "@janjantech"
    },
    {
      name: "CARLOS MENDES",
      role: "Desenvolvedor",
      description: "Carlos é responsável pelo desenvolvimento técnico do sistema, implementando as funcionalidades e garantindo a qualidade do código.",
      email: "carlos.mendes@incaas.com",
      phone: "(84) 9 9878 8126",
      posicao: "developer",
      discord: "@carlosdev"
    }
  ],
  "2": [
    {
      name: "MARIA SANTOS",
      role: "Gerente de Projeto",
      description: "Maria é responsável pela coordenação e acompanhamento do projeto de certificações, garantindo o alinhamento com as necessidades do tribunal.",
      email: "maria.santos@tjrn.jus.br",
      phone: "(84) 9 9878 8123",
      posicao: "manager",
      discord: "@mariasantos"
    },
    {
      name: "ANA PAULA COSTA",
      role: "Desenvolvedor Backend",
      description: "Ana Paula é especialista em desenvolvimento backend e arquitetura de sistemas, responsável pela implementação das APIs e integrações.",
      email: "ana.costa@incaas.com",
      phone: "(84) 9 9878 8127",
      posicao: "developer",
      discord: "@anapaula"
    }
  ],
  "3": [
    {
      name: "JOÃO SILVA",
      role: "Gerente de Projeto",
      description: "João é responsável pela gestão administrativa do projeto SIGAJUS, coordenando as atividades e garantindo a entrega dentro dos prazos estabelecidos.",
      email: "joao.silva@tjrn.jus.br",
      phone: "(84) 9 9878 8124",
      posicao: "manager",
      discord: "@joaosilva"
    },
    {
      name: "ROBERTO ALMEIDA",
      role: "Desenvolvedor Frontend",
      description: "Roberto é especialista em desenvolvimento frontend e experiência do usuário, responsável pela interface e interações do sistema.",
      email: "roberto.almeida@incaas.com",
      phone: "(84) 9 9878 8128",
      posicao: "developer",
      discord: "@robertoalmeida"
    }
  ],
  "4": [
    {
      name: "ANA COSTA",
      role: "Gerente de Projeto",
      description: "Ana é responsável pela coordenação do projeto NUPEJ, garantindo a integração entre as áreas técnicas e administrativas do tribunal.",
      email: "ana.costa@tjrn.jus.br",
      phone: "(84) 9 9878 8125",
      posicao: "manager",
      discord: "@anacosta"
    },
    {
      name: "FERNANDO LIMA",
      role: "Desenvolvedor Full Stack",
      description: "Fernando é responsável pelo desenvolvimento completo do sistema NUPEJ, desde o backend até a interface do usuário.",
      email: "fernando.lima@incaas.com",
      phone: "(84) 9 9878 8129",
      posicao: "developer",
      discord: "@fernandolima"
    }
  ]
}

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
