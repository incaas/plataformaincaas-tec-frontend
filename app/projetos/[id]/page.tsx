"use client"

import { useState, use } from "react"
import { ArrowLeft, ArrowRight, Settings, Phone, FileText, Palette, ChevronRight, Edit } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/custom/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/custom/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { mockProjects as baseProjects } from "../projects-data"

// Mock data - em produção viria da API
const mockProjects = {
  "1": {
    ...baseProjects[0],
    fullName: "SIGPRE • Sistema de Gerenciamento de Precatórios",
    description: "O SIGPRE - Sistema de Gerenciamento de Precatórios do Tribunal de Justiça do Rio Grande do Norte – é uma ferramenta digital desenvolvida para garantir maior transparência, agilidade e controle no processamento e pagamento de precatórios e requisições de pequeno valor.",
    client: {
      name: "TRIBUNAL DE JUSTIÇA RIO GRANDE DO NORTE",
      sector: "SETIC > DPS"
    },
         manager: {
       name: "Jandson Silva",
       phone: "(84) 9 9878 8122"
     },
     developer: {
       name: "Carlos Mendes",
       phone: "(84) 9 9878 8126"
     }
  },
  "2": {
    ...baseProjects[1],
    fullName: "CERTIDÕES • Sistema Unificado de Certidões",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    client: {
      name: "TRIBUNAL DE JUSTIÇA RIO GRANDE DO NORTE",
      sector: "SETIC > DPS"
    },
         manager: {
       name: "Maria Santos",
       phone: "(84) 9 9878 8123"
     },
     developer: {
       name: "Ana Paula Costa",
       phone: "(84) 9 9878 8127"
     }
  },
  "3": {
    ...baseProjects[2],
    fullName: "SIGAJUS • Sistema Integrado de Gestão Administrativa do Judiciário",
    description: "Sistema Integrado de Gestão Administrativa do Judiciário do Tribunal de Justiça do Rio Grande do Norte.",
    client: {
      name: "TRIBUNAL DE JUSTIÇA RIO GRANDE DO NORTE",
      sector: "SETIC > DPS"
    },
         manager: {
       name: "João Silva",
       phone: "(84) 9 9878 8124"
     },
     developer: {
       name: "Roberto Almeida",
       phone: "(84) 9 9878 8128"
     }
  },
  "4": {
    ...baseProjects[3],
    fullName: "NUPEJ • Núcleo de Perícias Judiciais",
    description: "Núcleo de Perícias Judiciais do Tribunal de Justiça do Rio Grande do Norte.",
    client: {
      name: "TRIBUNAL DE JUSTIÇA RIO GRANDE DO NORTE",
      sector: "SETIC > DPS"
    },
         manager: {
       name: "Ana Costa",
       phone: "(84) 9 9878 8125"
     },
     developer: {
       name: "Fernando Lima",
       phone: "(84) 9 9878 8129"
     }
  }
}

export default function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const [activeTab, setActiveTab] = useState("sobre")
  
  const resolvedParams = use(params)
  const project = mockProjects[resolvedParams.id as keyof typeof mockProjects]
  
  if (!project) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Projeto não encontrado</h2>
          <p className="text-gray-600 mb-4">O projeto solicitado não foi encontrado.</p>
          <Link href="/projetos" className="text-[#1A73E8] hover:underline">
            Voltar para projetos
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <Link href="/projetos" className="hover:text-gray-900 transition-colors">
          Projetos
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-gray-900 font-medium">{project.name}</span>
      </div>

             {/* Hero Section */}
       <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 p-8">
         <div className="flex-1">
                       <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {project.fullName}
            </h1>
            <p className="text-gray-600 text-lg leading-relaxed mb-6 max-w-4xl">
              {project.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-[#1A73E8] hover:bg-[#1557B0] text-white px-10 py-6 text-base rounded-full">
                Acessar Sistema
              </Button>
              <Button className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 px-6 py-6 text-base rounded-full">
                <Edit className="h-4 w-4 mr-2" />
                Ajustar Projeto
              </Button>
            </div>
         </div>
         <div className="flex-shrink-0">
           <div className="w-32 h-32 bg-gray-100 rounded-2xl flex items-center justify-center">
             <Image 
               src="/placeholder-logo.svg" 
               alt="SIGPRE Logo" 
               width={128} 
               height={128}
               className="w-32 h-32 object-contain"
             />
           </div>
         </div>
       </div>

             {/* Tabs Navigation */}
       <Tabs value={activeTab} onValueChange={setActiveTab}>
         <TabsList>
           <TabsTrigger value="sobre">
             Sobre
           </TabsTrigger>
           <TabsTrigger value="responsaveis">
             Responsáveis
           </TabsTrigger>
           <TabsTrigger value="documentacao">
             Documentação
           </TabsTrigger>
         </TabsList>

         <TabsContent value="sobre">
           <div className="pt-6">
             {/* <h2 className="text-2xl font-bold text-gray-900 mb-2">Sobre o projeto</h2> */}
             {/* <p className="text-gray-600 mb-6">
               Abaixo, você confere uma visão geral do sistema e suas principais funcionalidades.
             </p> */}
            
                                                   <Card className="border border-gray-200 rounded-2xl group hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Apresentação do Sistema
                    </h3>
                    <p className="text-gray-600">
                      Descubra o impacto positivo deste projeto na sociedade.
                    </p>
                  </div>
                  <div className="flex justify-end mt-4">
                    <ArrowRight className="h-6 w-6 text-[#1A73E8] transition-all duration-200 group-hover:scale-110 group-hover:translate-x-1 group-hover:text-[#1557B0] group-active:text-[#0D47A1]" />
                  </div>
               </CardContent>
             </Card>
          </div>
        </TabsContent>

         <TabsContent value="responsaveis" >
           <div className="pt-6">
             {/* <h2 className="text-2xl font-bold text-gray-900 mb-2">Responsáveis</h2> */}
             {/* <p className="text-gray-600 mb-6">
               Informações sobre os responsáveis pelo sistema
             </p> */}
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                                                           <Card className="border border-gray-200 rounded-2xl group hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">{project.client.name}</h3>
                        <span className="px-3 py-1 bg-[#1A73E8] text-white text-xs font-semibold rounded-full">
                          Cliente
                        </span>
                      </div>
                                             <div className="space-y-4">
                         <div className="flex items-center gap-3">
                           <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                             <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                               <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
                             </svg>
                           </div>
                           <span className="text-sm text-gray-600">{project.client.sector}</span>
                         </div>
                       </div>
                    </div>
                    <div className="flex justify-end mt-4">
                      <ArrowRight className="h-6 w-6 text-[#1A73E8] transition-all duration-200 group-hover:scale-110 group-hover:translate-x-1 group-hover:text-[#1557B0] group-active:text-[#0D47A1]" />
                    </div>
                  </CardContent>
                </Card>

                                                           <Card className="border border-gray-200 rounded-2xl group hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="flex-1">
                                                 <div className="flex items-center gap-3 mb-4">
                           <h3 className="text-lg font-semibold text-gray-900">{project.manager.name}</h3>
                                                       <span className="px-3 py-1 bg-green-600 text-white text-xs font-semibold rounded-full">
                              Gerente do projeto
                            </span>
                         </div>
                         <div className="space-y-4">
                        
                           <div className="flex items-center gap-3">
                             <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                               <Image 
                                 src="/whatsapp-icon.svg" 
                                 alt="WhatsApp" 
                                 width={16} 
                                 height={16}
                                 className="w-4 h-4"
                               />
                             </div>
                             <span className="text-sm text-gray-600">{project.manager.phone}</span>
                           </div>
                         </div>
                    </div>
                    <div className="flex justify-end mt-4">
                      <ArrowRight className="h-6 w-6 text-[#1A73E8] transition-all duration-200 group-hover:scale-110 group-hover:translate-x-1 group-hover:text-[#1557B0] group-active:text-[#0D47A1]" />
                    </div>
                 </CardContent>
               </Card>

                                                           <Card className="border border-gray-200 rounded-2xl group hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="flex-1">
                                                 <div className="flex items-center gap-3 mb-4">
                           <h3 className="text-lg font-semibold text-gray-900">{project.developer.name}</h3>
                                                       <span className="px-3 py-1 bg-purple-600 text-white text-xs font-semibold rounded-full">
                              Desenvolvedor
                            </span>
                         </div>
                         <div className="space-y-4">
                        
                           <div className="flex items-center gap-3">
                             <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                               <Image 
                                 src="/whatsapp-icon.svg" 
                                 alt="WhatsApp" 
                                 width={16} 
                                 height={16}
                                 className="w-4 h-4"
                               />
                             </div>
                             <span className="text-sm text-gray-600">{project.developer.phone}</span>
                           </div>
                         </div>
                    </div>
                    <div className="flex justify-end mt-4">
                      <ArrowRight className="h-6 w-6 text-[#1A73E8] transition-all duration-200 group-hover:scale-110 group-hover:translate-x-1 group-hover:text-[#1557B0] group-active:text-[#0D47A1]" />
                    </div>
                 </CardContent>
               </Card>
            </div>
          </div>
        </TabsContent>

         <TabsContent value="documentacao">
           <div className="pt-6">
             {/* <h2 className="text-2xl font-bold text-gray-900 mb-2">Documentos</h2> */}
             {/* <p className="text-gray-600 mb-6">
               Documentos sobre o sistema
             </p>
             */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <Card className="border border-gray-200 rounded-2xl group hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-4">
                        <FileText className="h-6 w-6 text-gray-400" />
                        <h3 className="text-lg font-semibold text-gray-900">Manual do sistema</h3>
                      </div>
                      <p className="text-sm text-gray-600">
                        Encontre orientações detalhadas, para aproveitar os recursos disponíveis
                      </p>
                    </div>
                    <div className="flex justify-end mt-4">
                      <ArrowRight className="h-6 w-6 text-[#1A73E8] transition-all duration-200 group-hover:scale-110 group-hover:translate-x-1 group-hover:text-[#1557B0] group-active:text-[#0D47A1]" />
                    </div>
                 </CardContent>
               </Card>

                                                           {/* Identidade Visual Card */}
                                                               <Card className="border border-gray-200 rounded-2xl group hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="p-6 flex flex-col h-full">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-4">
                          <Palette className="h-6 w-6 text-gray-400" />
                          <h3 className="text-lg font-semibold text-gray-900">Identidade visual</h3>
                        </div>
                        <p className="text-sm text-gray-600">
                          Arquivos de mídia do projeto em vários formatos
                        </p>
                      </div>
                      <div className="flex justify-end mt-4">
                        <ArrowRight className="h-6 w-6 text-[#1A73E8] transition-all duration-200 group-hover:scale-110 group-hover:translate-x-1 group-hover:text-[#1557B0] group-active:text-[#0D47A1]" />
                      </div>
                   </CardContent>
                 </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      
    </div>
  )
}
