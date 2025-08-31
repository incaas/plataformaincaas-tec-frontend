"use client"

import { useState, use } from "react"
import { ArrowLeft, ArrowRight, Settings, Phone, FileText, Palette, ChevronRight, Edit } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/custom/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/custom/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { ProjectResponsibleCard } from "../project-responsible-card"
import { ClientInfoCard } from "../client-info-card"
import { mockProjects as baseProjects, clientData, responsibles } from "../projects-data"

export default function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const [activeTab, setActiveTab] = useState("sobre")
  
  const resolvedParams = use(params)
  const baseProject = baseProjects.find(p => p.id === resolvedParams.id)
  const projectResponsibles = responsibles[resolvedParams.id as keyof typeof responsibles]
  
  if (!baseProject || !projectResponsibles) {
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
         <span className="text-gray-900 font-medium">{baseProject.name}</span>
      </div>

             {/* Hero Section */}
       <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 p-8">
         <div className="flex-1">
                                    <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
               {baseProject.name}
             </h1>
             <p className="text-gray-600 text-lg leading-relaxed mb-6 max-w-4xl">
               {baseProject.description}
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
                             {/* Card do Cliente */}
               <ClientInfoCard client={clientData} />

                               {/* Cards dos Responsáveis */}
                {projectResponsibles.map((responsible) => (
                  <ProjectResponsibleCard
                    key={responsible.posicao}
                    responsible={responsible}
                    roleColor={responsible.posicao === "manager" ? "bg-green-600" : "bg-purple-600"}
                    roleLabel={responsible.posicao === "manager" ? "Gerente" : "Desenvolvedor"}
                  />
                ))}
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
