"use client"

import { useState, useEffect, useRef } from "react"
import { Plus, FileText, Link, Upload, Edit, Trash2 } from "lucide-react"
import { Button } from "@/components/custom/button"
import { Input } from "@/components/custom/input"
import { SelectField } from "@/components/custom/select"
import { Textarea } from "@/components/custom/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface ProjectDocumentation {
  name: string
  type: "link" | "pdf"
  value: string // link ou nome do arquivo
  description: string
}

interface DocumentationFormProps {
  mode: 'create' | 'edit'
  initialData?: ProjectDocumentation[]
  onSubmit: (documentation: ProjectDocumentation[]) => void
  isLoading?: boolean
}

const defaultDocumentation: ProjectDocumentation = {
  name: "",
  type: "link",
  value: "",
  description: ""
}

export function DocumentationForm({ 
  mode, 
  initialData = [], 
  onSubmit, 
  isLoading = false 
}: DocumentationFormProps) {
  const [documentation, setDocumentation] = useState<ProjectDocumentation[]>([])
  const [isAdding, setIsAdding] = useState(false)
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const initialized = useRef(false)

  // Inicializar com dados existentes
  useEffect(() => {
    if (!initialized.current) {
      if (initialData.length > 0) {
        setDocumentation(initialData)
      }
      initialized.current = true
    }
  }, [initialData])

  // Estado do formulário de adição/edição
  const [formData, setFormData] = useState<ProjectDocumentation>(defaultDocumentation)

  const resetForm = () => {
    setFormData(defaultDocumentation)
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
    formData.value.trim() && 
    formData.description.trim()

  const handleAddDocumentation = () => {
    if (isFormValid) {
      setDocumentation([...documentation, formData])
      resetForm()
    }
  }

  const handleEditDocumentation = () => {
    if (isFormValid && editingIndex !== null) {
      const updatedDocumentation = [...documentation]
      updatedDocumentation[editingIndex] = formData
      setDocumentation(updatedDocumentation)
      resetForm()
    }
  }

  const handleRemoveDocumentation = (index: number) => {
    setDocumentation(documentation.filter((_, i) => i !== index))
  }

  const handleEditClick = (index: number) => {
    setFormData(documentation[index])
    setEditingIndex(index)
    setIsAdding(true)
  }

  const handleCancelEdit = () => {
    resetForm()
  }

  const getTypeLabel = (type: string) => {
    return type === "link" ? "Link" : "PDF"
  }

  const getTypeIcon = (type: string) => {
    return type === "link" ? <Link className="h-4 w-4" /> : <FileText className="h-4 w-4" />
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
          Adicionar Documento
        </Button>
      </div>

      {/* Formulário de Adição/Edição */}
      {isAdding && (
        <Card className="border-2 border-blue-200 bg-blue-50/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              {editingIndex !== null ? 'Editar Documento' : 'Adicionar Novo Documento'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Nome do Documento"
                name="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Ex: Manual do Usuário"
                required
                icon={<FileText className="h-4 w-4 text-gray-400" />}
                disabled={isLoading}
              />
              
              <SelectField
                name="type"
                label="Tipo"
                value={formData.type}
                onValueChange={(value) => handleInputChange("type", value)}
                options={[
                  { value: "link", label: "Link" },
                  { value: "pdf", label: "PDF" }
                ]}
                required
              />
            </div>

            <Input
              label={formData.type === "link" ? "Link" : "Arquivo"}
              name="value"
              type={formData.type === "link" ? "url" : "file"}
              accept={formData.type === "pdf" ? ".pdf" : undefined}
              value={formData.type === "link" ? formData.value : undefined}
              onChange={(e) => {
                if (formData.type === "link") {
                  handleInputChange("value", e.target.value)
                } else {
                  const file = e.target.files?.[0]
                  if (file) {
                    handleInputChange("value", file.name)
                  }
                }
              }}
              placeholder={formData.type === "link" ? "https://exemplo.com/documento" : "Selecione um arquivo PDF"}
              required
              icon={formData.type === "link" ? <Link className="h-4 w-4 text-gray-400" /> : <Upload className="h-4 w-4 text-gray-400" />}
              disabled={isLoading}
            />

            <Textarea
              label="Descrição: (até 500 caracteres)"
              name="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Descreva o conteúdo e propósito do documento..."
              required
              maxLength={500}
              className="min-h-[80px]"
              disabled={isLoading}
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
                onClick={editingIndex !== null ? handleEditDocumentation : handleAddDocumentation}
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
                    {editingIndex !== null ? 'Salvar Alterações' : 'Adicionar Documento'}
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Grid de Cards da Documentação */}
      <div>
        {documentation.length === 0 ? (
          <Card className="border-2 border-dashed border-gray-300">
            <CardContent className="p-8 text-center">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h4 className="text-lg font-medium text-gray-900 mb-2">Nenhum documento adicionado</h4>
              <p className="text-gray-600">Clique em "Adicionar Documento" para começar</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {documentation.map((doc, index) => (
              <Card key={index} className="border border-gray-200 hover:border-gray-300 transition-colors">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getTypeIcon(doc.type)}
                      <CardTitle className="text-base font-semibold">{doc.name}</CardTitle>
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
                        onClick={() => handleRemoveDocumentation(index)}
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
                    <p className="text-xs text-gray-500">{getTypeLabel(doc.type)}</p>
                  </div>
                  
                  <p className="text-sm text-gray-600 line-clamp-3">
                    {doc.description}
                  </p>
                  
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      {getTypeIcon(doc.type)}
                      <span className="truncate">{doc.value}</span>
                    </div>
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
