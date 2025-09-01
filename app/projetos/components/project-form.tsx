"use client"

import { useState } from "react"
import { Save, Check } from "lucide-react"
import { Button } from "@/components/custom/button"
import { Input } from "@/components/custom/input"
import { SelectField } from "@/components/custom/select"
import { Textarea } from "@/components/custom/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/custom/tabs"
import { ResponsibleForm } from "./responsible-form"
import { ClientForm } from "./client-form"
import { DocumentationForm } from "./documentation-form"
import { ProjectResponsible, Client } from "@/lib/types/projects"
import { filterOptions } from "../projects-data"
import { useToast } from "@/components/ui/use-toast"

interface ProjectFormData {
  name: string
  description: string
  status: string
  client: string
  sector: string
  requester: string
  devs: string
  team: string
  logo: string
}

interface ProjectFormProps {
  mode: "create" | "edit"
  initialData?: ProjectFormData
  initialResponsibles?: ProjectResponsible[]
  initialClient?: Client | null
  initialDocumentation?: Array<{
    name: string
    type: "link" | "pdf"
    value: string
    description: string
  }>
  onSubmit: (data: {
    formData: ProjectFormData
    responsibles: ProjectResponsible[]
    client: Client | null
    documentation: Array<{
      name: string
      type: "link" | "pdf"
      value: string
      description: string
    }>
  }) => Promise<void>
  onCancel: () => void
  isLoading?: boolean
}

export function ProjectForm({
  mode,
  initialData,
  initialResponsibles = [],
  initialClient = null,
  initialDocumentation = [],
  onSubmit,
  onCancel,
  isLoading = false
}: ProjectFormProps) {
  const [activeTab, setActiveTab] = useState("sobre")
  const { toast } = useToast()

  // Estado do formulário
  const [formData, setFormData] = useState<ProjectFormData>({
    name: initialData?.name || "",
    description: initialData?.description || "",
    status: initialData?.status || "",
    client: initialData?.client || "",
    sector: initialData?.sector || "",
    requester: initialData?.requester || "",
    devs: initialData?.devs || "",
    team: initialData?.team || "",
    logo: initialData?.logo || ""
  })

  const [responsiblesData, setResponsiblesData] = useState<ProjectResponsible[]>(initialResponsibles)
  const [clientData, setClientData] = useState<Client | null>(initialClient)
  const [documentationData, setDocumentationData] = useState(initialDocumentation)

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleResponsiblesSubmit = async (responsibles: ProjectResponsible[]) => {
    try {
      setResponsiblesData(responsibles)
      console.log("Responsáveis:", responsibles)
      
      toast({
        title: "Sucesso!",
        description: mode === "edit" ? "Responsáveis atualizados com sucesso." : "Responsáveis adicionados com sucesso.",
        action: <Check className="h-4 w-4 text-green-600" />
      })
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao salvar responsáveis. Tente novamente.",
        variant: "destructive"
      })
    }
  }

  const handleClientSubmit = async (client: Client) => {
    try {
      setClientData(client)
      console.log("Cliente:", client)
      
      toast({
        title: "Sucesso!",
        description: mode === "edit" ? "Cliente atualizado com sucesso." : "Cliente adicionado com sucesso.",
        action: <Check className="h-4 w-4 text-green-600" />
      })
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao salvar cliente. Tente novamente.",
        variant: "destructive"
      })
    }
  }

  const handleDocumentationSubmit = async (documentation: Array<{
    name: string
    type: "link" | "pdf"
    value: string
    description: string
  }>) => {
    try {
      setDocumentationData(documentation)
      console.log("Documentação:", documentation)
      
      toast({
        title: "Sucesso!",
        description: mode === "edit" ? "Documentação atualizada com sucesso." : "Documentação adicionada com sucesso.",
        action: <Check className="h-4 w-4 text-green-600" />
      })
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao salvar documentação. Tente novamente.",
        variant: "destructive"
      })
    }
  }

  const handleSubmit = async () => {
    try {
      await onSubmit({
        formData,
        responsibles: responsiblesData,
        client: clientData,
        documentation: documentationData
      })
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao salvar projeto. Tente novamente.",
        variant: "destructive"
      })
    }
  }

  return (
    <div className="space-y-6">
      {/* Tabs Navigation */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="sobre">
            Sobre
          </TabsTrigger>
          <TabsTrigger value="responsaveis">
            Responsáveis
          </TabsTrigger>
          <TabsTrigger value="cliente">
            Cliente
          </TabsTrigger>
          <TabsTrigger value="documentacao">
            Documentação
          </TabsTrigger>
        </TabsList>

        <TabsContent value="sobre">
          <div className="pt-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Nome do Projeto"
                name="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Ex: SIGPRE"
                required
              />
              
              <SelectField
                name="status"
                label="Status"
                value={formData.status}
                onValueChange={(value) => handleInputChange("status", value)}
                placeholder="Selecione o status"
                options={[
                  { value: "ativo", label: "Ativo" },
                  { value: "desenvolvimento", label: "Desenvolvimento" },
                  { value: "inativo", label: "Inativo" }
                ]}
                required
              />
            </div>

            <Textarea
              label="Descrição"
              name="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Descreva o projeto..."
              required
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <SelectField
                name="client"
                label="Cliente"
                value={formData.client}
                onValueChange={(value) => handleInputChange("client", value)}
                placeholder="Selecione o cliente"
                options={filterOptions.client.map(client => ({ value: client, label: client }))}
                required
              />
              
              <SelectField
                name="sector"
                label="Setor"
                value={formData.sector}
                onValueChange={(value) => handleInputChange("sector", value)}
                placeholder="Selecione o setor"
                options={filterOptions.sector.map(sector => ({ value: sector, label: sector }))}
                required
              />
              
              <SelectField
                name="requester"
                label="Demandante"
                value={formData.requester}
                onValueChange={(value) => handleInputChange("requester", value)}
                placeholder="Selecione o demandante"
                options={filterOptions.requester.map(req => ({ value: req, label: req }))}
                required
              />
            </div>

                         <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
               <Input
                 label="Logo do Projeto"
                 name="logo"
                 type="file"
                 accept="image/*"
                 onChange={(e) => {
                   const file = e.target.files?.[0]
                   if (file) {
                     // Aqui você pode processar o arquivo (upload, preview, etc.)
                     handleInputChange("logo", file.name)
                   }
                 }}
                 placeholder="Selecione uma imagem"
               />
             </div>
          </div>
        </TabsContent>

        <TabsContent value="responsaveis">
          <div className="pt-6">
            <ResponsibleForm
              mode={mode}
              initialData={initialResponsibles}
              onSubmit={handleResponsiblesSubmit}
              onCancel={onCancel}
              isLoading={isLoading}
            />
          </div>
        </TabsContent>

        <TabsContent value="cliente">
          <div className="pt-6">
            <ClientForm
              mode={mode}
              initialData={initialClient || undefined}
              onSubmit={handleClientSubmit}
              onCancel={onCancel}
              isLoading={isLoading}
            />
          </div>
        </TabsContent>

        <TabsContent value="documentacao">
          <div className="pt-6">
            <DocumentationForm
              mode={mode}
              initialData={initialDocumentation}
              onSubmit={handleDocumentationSubmit}
              isLoading={isLoading}
            />
          </div>
        </TabsContent>
      </Tabs>

      {/* Botões de Ação */}
      <div className="flex items-center justify-end gap-4">
        <Button 
          type="button" 
          variant="outline"
          onClick={onCancel}
          disabled={isLoading}
        >
          Cancelar
        </Button>
        <Button 
          type="button" 
          className="flex items-center gap-2"
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              Salvando...
            </>
          ) : (
            <>
              <Save className="h-4 w-4" />
              {mode === "edit" ? "Salvar Alterações" : "Criar Projeto"}
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
