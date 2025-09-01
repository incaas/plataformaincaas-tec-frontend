"use client"

import { useState, useEffect, useRef } from "react"
import { Plus, X, User, Briefcase, Mail, Phone, MessageSquare, Edit, Trash2 } from "lucide-react"
import { Button } from "@/components/custom/button"
import { Input } from "@/components/custom/input"
import { SelectField } from "@/components/custom/select"
import { Textarea } from "@/components/custom/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ProjectResponsible } from "@/lib/types/projects"

interface ResponsibleFormProps {
  mode: 'create' | 'edit'
  initialData?: ProjectResponsible[]
  onSubmit: (responsibles: ProjectResponsible[]) => void
  isLoading?: boolean
}

const defaultResponsible: Omit<ProjectResponsible, 'posicao'> & { posicao: "manager" | "developer" } = {
  name: "",
  role: "",
  description: "",
  email: "",
  phone: "",
  posicao: "manager",
  discord: ""
}

export function ResponsibleForm({ 
  mode, 
  initialData = [], 
  onSubmit, 
  isLoading = false 
}: ResponsibleFormProps) {
  const [responsibles, setResponsibles] = useState<ProjectResponsible[]>([])
  const [isAdding, setIsAdding] = useState(false)
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const initialized = useRef(false)

  // Inicializar com dados existentes
  useEffect(() => {
    if (!initialized.current) {
      if (initialData.length > 0) {
        setResponsibles(initialData)
      }
      initialized.current = true
    }
  }, [initialData])

  // Estado do formulário de adição/edição
  const [formData, setFormData] = useState<Omit<ProjectResponsible, 'posicao'> & { posicao: "manager" | "developer" }>(defaultResponsible)

  const resetForm = () => {
    setFormData(defaultResponsible)
    setIsAdding(false)
    setEditingIndex(null)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const isFormValid = 
    formData.name.trim() && 
    formData.role.trim() && 
    formData.description.trim() && 
    formData.email.trim() && 
    formData.phone.trim()

  const handleAddResponsible = () => {
    if (isFormValid) {
      setResponsibles([...responsibles, formData])
      resetForm()
    }
  }

  const handleEditResponsible = () => {
    if (isFormValid && editingIndex !== null) {
      const updatedResponsibles = [...responsibles]
      updatedResponsibles[editingIndex] = formData
      setResponsibles(updatedResponsibles)
      resetForm()
    }
  }

  const handleRemoveResponsible = (index: number) => {
    setResponsibles(responsibles.filter((_, i) => i !== index))
  }

  const handleEditClick = (index: number) => {
    setFormData(responsibles[index])
    setEditingIndex(index)
    setIsAdding(true)
  }

  const handleCancelEdit = () => {
    resetForm()
  }

  const getPositionLabel = (posicao: string) => {
    return posicao === "manager" ? "Gerente" : "Desenvolvedor"
  }

  return (
    <div className="space-y-6">
      {/* Cabeçalho */}
      <div className="flex items-center justify-between">
        <Button
          type="button"
          onClick={() => setIsAdding(true)}
          className="flex items-center gap-2"
          variant="outline"
          disabled={isLoading || isAdding}
        >
          <Plus className="h-4 w-4" />
          Adicionar Responsável
        </Button>
      </div>

      {/* Formulário de Adição/Edição */}
      {isAdding && (
        <Card className="border-2 border-blue-200 bg-blue-50/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              {editingIndex !== null ? 'Editar Responsável' : 'Adicionar Novo Responsável'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Nome do Responsável"
                name="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Nome completo"
                required
                icon={<User className="h-4 w-4 text-gray-400" />}
                disabled={isLoading}
              />
              
              <Input
                label="Função"
                name="role"
                value={formData.role}
                onChange={(e) => handleInputChange("role", e.target.value)}
                placeholder="Ex: Gerente de Projeto"
                required
                icon={<Briefcase className="h-4 w-4 text-gray-400" />}
                disabled={isLoading}
              />
            </div>

            <Textarea
              label="Descrição breve do responsável: (até 1000 caracteres)"
              name="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Descreva as responsabilidades e atribuições..."
              required
              maxLength={1000}
              className="min-h-[100px]"
              disabled={isLoading}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="email@exemplo.com"
                required
                icon={<Mail className="h-4 w-4 text-gray-400" />}
                disabled={isLoading}
              />
              
              <Input
                label="Telefone/WhatsApp"
                name="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                placeholder="(84) 9 9878 8122"
                required
                icon={<Phone className="h-4 w-4 text-gray-400" />}
                disabled={isLoading}
              />
              
              <Input
                label="Discord"
                name="discord"
                value={formData.discord}
                onChange={(e) => handleInputChange("discord", e.target.value)}
                placeholder="@usuario"
                icon={<MessageSquare className="h-4 w-4 text-gray-400" />}
                disabled={isLoading}
              />
            </div>

            <SelectField
              name="posicao"
              label="Posição"
              value={formData.posicao}
              onValueChange={(value) => handleInputChange("posicao", value)}
              options={[
                { value: "manager", label: "Gerente" },
                { value: "developer", label: "Desenvolvedor" }
              ]}
              required
            />

            <div className="flex items-center justify-end gap-3 pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={handleCancelEdit}
                disabled={isLoading}
              >
                Cancelar
              </Button>
              <Button 
                type="button" 
                className="flex items-center gap-2"
                onClick={editingIndex !== null ? handleEditResponsible : handleAddResponsible}
                disabled={!isFormValid || isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Salvando...
                  </>
                ) : (
                  <>
                    <Plus className="h-4 w-4" />
                    {editingIndex !== null ? 'Salvar Alterações' : 'Adicionar Responsável'}
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Grid de Cards dos Responsáveis */}
      <div>
                 {responsibles.length === 0 ? (
           <Card className="border-2 border-dashed border-gray-300">
             <CardContent className="p-8 text-center">
               <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
               <h4 className="text-lg font-medium text-gray-900 mb-2">Nenhum responsável adicionado</h4>
               <p className="text-gray-600">Clique em "Adicionar Responsável" para começar</p>
             </CardContent>
           </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {responsibles.map((responsible, index) => (
              <Card key={index} className="border border-gray-200 hover:border-gray-300 transition-colors">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <User className="h-5 w-5 text-gray-600" />
                      <CardTitle className="text-base font-semibold">{responsible.name}</CardTitle>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button
                        type="button"
                        onClick={() => handleEditClick(index)}
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        disabled={isLoading}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        type="button"
                        onClick={() => handleRemoveResponsible(index)}
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                        disabled={isLoading}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{responsible.role}</p>
                    <p className="text-xs text-gray-500">{getPositionLabel(responsible.posicao)}</p>
                  </div>
                  
                  <p className="text-sm text-gray-600 line-clamp-3">
                    {responsible.description}
                  </p>
                  
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <Mail className="h-3 w-3" />
                      <span>{responsible.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <Phone className="h-3 w-3" />
                      <span>{responsible.phone}</span>
                    </div>
                    {responsible.discord && (
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <MessageSquare className="h-3 w-3" />
                        <span>{responsible.discord}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      
    </div>
  )
}
