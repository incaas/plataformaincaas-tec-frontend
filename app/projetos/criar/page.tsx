"use client"

import { useState } from "react"
import { Check } from "lucide-react"
import { ProjectForm } from "../components/project-form"
import { ProjectNavigation } from "../components/project-navigation"
import { useToast } from "@/components/ui/use-toast"

export default function CriarProjetoPage() {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

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
        description: "Projeto criado com sucesso!",
        action: <Check className="h-4 w-4 text-green-600" />
      })
      
      // Redirecionar para a lista de projetos
      window.location.href = "/projetos"
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao criar projeto. Tente novamente.",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    window.location.href = "/projetos"
  }

  return (
    <div className="space-y-6">
      {/* Navigation */}
      <ProjectNavigation 
        currentPage="Criar Novo Projeto"
      />
      
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#1e3a8a]">
          Criar Novo Projeto
        </h1>
        <p className="text-gray-600">
          Preencha as informações do projeto
        </p>
      </div>

      {/* Form Component */}
      <ProjectForm
        mode="create"
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isLoading={isLoading}
      />
    </div>
  )
}
