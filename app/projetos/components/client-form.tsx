"use client"

import { useState, useEffect, useRef } from "react"
import { Building2, Users, Globe } from "lucide-react"
import { Button } from "@/components/custom/button"
import { Input } from "@/components/custom/input"
import { SelectField } from "@/components/custom/select"
import { Textarea } from "@/components/custom/textarea"

import { Client } from "@/lib/types/projects"

interface ClientFormProps {
  mode: 'create' | 'edit'
  initialData?: Client
  onSubmit: (client: Client) => void
  isLoading?: boolean
}

const defaultClient: Omit<Client, 'id' | 'lastUpdated'> = {
  name: "",
  logo: "",
  secretariat: "",
  secretariatAcronym: "",
  sector: "",
  sectorAcronym: "",
  description: "",
  website: ""
}

export function ClientForm({ 
  mode, 
  initialData, 
  onSubmit, 
  isLoading = false 
}: ClientFormProps) {
  const [clientData, setClientData] = useState<Omit<Client, 'id' | 'lastUpdated'>>(defaultClient)
  const initialized = useRef(false)

  // Inicializar com dados existentes ou valores padrão
  useEffect(() => {
    if (!initialized.current) {
      if (initialData) {
        const { id, lastUpdated, ...data } = initialData
        setClientData(data)
      }
      initialized.current = true
    }
  }, [initialData])

  const handleInputChange = (field: string, value: string) => {
    setClientData(prev => ({
      ...prev,
      [field]: value
    }))
  }



  const isFormValid = 
    clientData.name.trim() && 
    clientData.secretariat.trim() && 
    clientData.sector.trim() && 
    clientData.description.trim()

  return (
    <div className="space-y-6">
      {/* Logo e Nome */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <Input
           label="Logo marca"
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
           icon={<Building2 className="h-4 w-4 text-gray-400" />}
           disabled={isLoading}
         />
        
        <Input
          label="Nome"
          name="name"
          value={clientData.name}
          onChange={(e) => handleInputChange("name", e.target.value)}
          placeholder="Nome completo"
          required
          icon={<Building2 className="h-4 w-4 text-gray-400" />}
          disabled={isLoading}
        />
      </div>

      {/* Secretaria e Setor */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SelectField
          name="secretariat"
          label="Secretaria"
          value={clientData.secretariat}
          onValueChange={(value) => handleInputChange("secretariat", value)}
          placeholder="Selecione a secretaria"
          options={[
            { value: "administracao", label: "Administração" },
            { value: "educacao", label: "Educação" },
            { value: "saude", label: "Saúde" },
            { value: "seguranca", label: "Segurança Pública" },
            { value: "infraestrutura", label: "Infraestrutura" },
            { value: "meio_ambiente", label: "Meio Ambiente" },
            { value: "cultura", label: "Cultura" },
            { value: "esporte", label: "Esporte e Lazer" },
            { value: "assistencia_social", label: "Assistência Social" },
            { value: "desenvolvimento", label: "Desenvolvimento Econômico" },
            { value: "planejamento", label: "Planejamento" },
            { value: "financas", label: "Finanças" },
            { value: "transporte", label: "Transporte" },
            { value: "habitacao", label: "Habitação" },
            { value: "trabalho", label: "Trabalho e Emprego" },
            { value: "agricultura", label: "Agricultura" },
            { value: "turismo", label: "Turismo" },
            { value: "comunicacao", label: "Comunicação" },
            { value: "tecnologia", label: "Tecnologia da Informação" },
            { value: "outros", label: "Outros" }
          ]}
          required
        />
        
        <SelectField
          name="sector"
          label="Setor"
          value={clientData.sector}
          onValueChange={(value) => handleInputChange("sector", value)}
          placeholder="Selecione o setor"
          options={[
            { value: "administrativo", label: "Administrativo" },
            { value: "financeiro", label: "Financeiro" },
            { value: "recursos_humanos", label: "Recursos Humanos" },
            { value: "tecnologia", label: "Tecnologia da Informação" },
            { value: "marketing", label: "Marketing" },
            { value: "vendas", label: "Vendas" },
            { value: "operacoes", label: "Operações" },
            { value: "juridico", label: "Jurídico" },
            { value: "compras", label: "Compras" },
            { value: "logistica", label: "Logística" },
            { value: "producao", label: "Produção" },
            { value: "qualidade", label: "Qualidade" },
            { value: "manutencao", label: "Manutenção" },
            { value: "seguranca", label: "Segurança" },
            { value: "comunicacao", label: "Comunicação" },
            { value: "planejamento", label: "Planejamento" },
            { value: "controle", label: "Controle" },
            { value: "auditoria", label: "Auditoria" },
            { value: "treinamento", label: "Treinamento" },
            { value: "outros", label: "Outros" }
          ]}
          required
        />
      </div>

      {/* Descrição */}
      <Textarea
        label="Descrição breve: (até 1000 caracteres)"
        name="description"
        value={clientData.description}
        onChange={(e) => handleInputChange("description", e.target.value)}
        placeholder="Descreva as principais características..."
        required
        maxLength={1000}
        className="min-h-[100px]"
        disabled={isLoading}
      />

      {/* Website */}
      <Input
        label="Website"
        name="website"
        value={clientData.website}
        onChange={(e) => handleInputChange("website", e.target.value)}
        placeholder="https://www.exemplo.com"
        type="url"
        icon={<Globe className="h-4 w-4 text-gray-400" />}
        disabled={isLoading}
      />
    </div>
  )
}
