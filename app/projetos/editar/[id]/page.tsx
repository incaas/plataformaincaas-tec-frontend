"use client"

import { useState, use } from "react"
import { Check } from "lucide-react"
import Link from "next/link"
import { ProjectForm } from "../../components/project-form"
import { ProjectNavigation } from "../../components/project-navigation"
import { mockProjects, clientData, responsibles } from "../../projects-data"
import { useToast } from "@/components/ui/use-toast"

export default function EditarProjetoPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  
  const resolvedParams = use(params)
  
  // Dados do projeto
  const baseProject = mockProjects.find(p => p.id === resolvedParams.id)
  const projectResponsibles = responsibles[resolvedParams.id as keyof typeof responsibles] || []
  const projectClient = clientData[resolvedParams.id as keyof typeof clientData] as any || null
  
  if (!baseProject) {
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

  const handleSubmit = async (data: {
    formData: any
    responsibles: any[]
    client: any
    documentation: { manual: string; visualIdentity: string }
  }) => {
    setIsLoading(true)
    try {
      // Simular uma chamada de API
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      console.log("Dados do projeto:", data.formData)
      console.log("Responsáveis:", data.responsibles)
      console.log("Cliente:", data.client)
      console.log("Documentação:", data.documentation)
      
      toast({
        title: "Sucesso!",
        description: "Projeto atualizado com sucesso!",
        action: <Check className="h-4 w-4 text-green-600" />
      })
      
      // Redirecionar para a página do projeto
      window.location.href = `/projetos/${resolvedParams.id}`
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao atualizar projeto. Tente novamente.",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    window.history.back()
  }

  // Preparar dados iniciais para o formulário
  const initialFormData = {
    name: baseProject.name || "",
    description: baseProject.description || "",
    status: baseProject.status || "",
    client: baseProject.client || "",
    sector: baseProject.sector || "",
    requester: baseProject.requester || "",
    devs: baseProject.devs?.toString() || "",
    team: baseProject.team?.toString() || "",
    logo: baseProject.logo || ""
  }

  return (
    <div className="space-y-6">
      {/* Navigation */}
      <ProjectNavigation 
        projectName={baseProject.name}
        currentPage="Editar"
        projectId={resolvedParams.id}
      />
      
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#1e3a8a]">
          Editar Projeto
        </h1>
        <p className="text-gray-600">
          Atualize as informações do projeto {baseProject.name}
        </p>
      </div>

      {/* Form Component */}
      <ProjectForm
        mode="edit"
        initialData={initialFormData}
        initialResponsibles={projectResponsibles}
        initialClient={projectClient}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isLoading={isLoading}
      />
    </div>
  )
}
