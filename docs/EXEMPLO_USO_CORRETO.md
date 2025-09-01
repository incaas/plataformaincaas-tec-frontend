# Exemplo de Uso Correto dos Formulários Reutilizáveis

Este documento mostra como usar os formulários reutilizáveis sem causar erros de hidratação.

## 🎯 Cenário: Página de Criação de Projeto

Vamos criar uma página que precisa salvar:
1. Informações básicas do projeto
2. Responsáveis
3. Informações do cliente

## ✅ Solução Correta

```tsx
"use client"

import { useState } from "react"
import { ResponsibleForm } from "@/components/projetos/responsible-form"
import { ClientForm } from "@/components/projetos/client-form"
import { Button } from "@/components/custom/button"
import { Input } from "@/components/custom/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/custom/tabs"

export default function CriarProjetoPage() {
  const [activeTab, setActiveTab] = useState("sobre")
  
  // Estados para cada seção
  const [projectData, setProjectData] = useState({
    name: "",
    description: "",
    status: ""
  })
  
  const [responsibles, setResponsibles] = useState([])
  const [clientData, setClientData] = useState(null)

  // Handlers para cada formulário
  const handleResponsiblesSubmit = (data) => {
    setResponsibles(data)
    console.log("Responsáveis atualizados:", data)
  }

  const handleClientSubmit = (data) => {
    setClientData(data)
    console.log("Cliente atualizado:", data)
  }

  // Handler final para salvar tudo
  const handleSaveAll = () => {
    const finalData = {
      project: projectData,
      responsibles,
      client: clientData
    }
    
    console.log("Dados completos para salvar:", finalData)
    // Aqui você faria a chamada para a API
  }

  return (
    <div className="space-y-6">
      <h1>Criar Novo Projeto</h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="sobre">Sobre</TabsTrigger>
          <TabsTrigger value="responsaveis">Responsáveis</TabsTrigger>
          <TabsTrigger value="cliente">Cliente</TabsTrigger>
        </TabsList>

        <TabsContent value="sobre">
          <div className="space-y-4">
            <Input
              label="Nome do Projeto"
              value={projectData.name}
              onChange={(e) => setProjectData(prev => ({ ...prev, name: e.target.value }))}
            />
            <Input
              label="Descrição"
              value={projectData.description}
              onChange={(e) => setProjectData(prev => ({ ...prev, description: e.target.value }))}
            />
          </div>
        </TabsContent>

        <TabsContent value="responsaveis">
          <ResponsibleForm
            mode="create"
            onSubmit={handleResponsiblesSubmit}
          />
        </TabsContent>

        <TabsContent value="cliente">
          <ClientForm
            mode="create"
            onSubmit={handleClientSubmit}
          />
        </TabsContent>
      </Tabs>

      {/* Botão final para salvar tudo */}
      <div className="flex justify-end">
        <Button onClick={handleSaveAll}>
          Criar Projeto
        </Button>
      </div>
    </div>
  )
}
```

## 🔄 Alternativa com Validação

```tsx
"use client"

import { useState } from "react"
import { ResponsibleForm } from "@/components/projetos/responsible-form"
import { ClientForm } from "@/components/projetos/client-form"
import { Button } from "@/components/custom/button"
import { useToast } from "@/components/ui/use-toast"

export default function CriarProjetoPage() {
  const [projectData, setProjectData] = useState({ name: "", description: "" })
  const [responsibles, setResponsibles] = useState([])
  const [clientData, setClientData] = useState(null)
  const { toast } = useToast()

  const handleResponsiblesSubmit = (data) => {
    setResponsibles(data)
    toast({ title: "Responsáveis salvos!", description: "Dados dos responsáveis foram atualizados." })
  }

  const handleClientSubmit = (data) => {
    setClientData(data)
    toast({ title: "Cliente salvo!", description: "Dados do cliente foram atualizados." })
  }

  const handleSaveAll = () => {
    // Validação
    if (!projectData.name.trim()) {
      toast({ title: "Erro", description: "Nome do projeto é obrigatório", variant: "destructive" })
      return
    }

    if (responsibles.length === 0) {
      toast({ title: "Erro", description: "Adicione pelo menos um responsável", variant: "destructive" })
      return
    }

    if (!clientData) {
      toast({ title: "Erro", description: "Informações do cliente são obrigatórias", variant: "destructive" })
      return
    }

    // Salvar tudo
    const finalData = { project: projectData, responsibles, client: clientData }
    console.log("Salvando projeto:", finalData)
    
    toast({ title: "Sucesso!", description: "Projeto criado com sucesso!" })
  }

  return (
    <div className="space-y-6">
      <h1>Criar Novo Projeto</h1>
      
      <ResponsibleForm
        mode="create"
        onSubmit={handleResponsiblesSubmit}
      />
      
      <ClientForm
        mode="create"
        onSubmit={handleClientSubmit}
      />
      
      <Button onClick={handleSaveAll}>
        Criar Projeto
      </Button>
    </div>
  )
}
```

## 🎨 Exemplo com Tabs e Estados Separados

```tsx
"use client"

import { useState } from "react"
import { ResponsibleForm } from "@/components/projetos/responsible-form"
import { ClientForm } from "@/components/projetos/client-form"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/custom/tabs"

export default function CriarProjetoPage() {
  const [activeTab, setActiveTab] = useState("sobre")
  const [formData, setFormData] = useState({
    project: { name: "", description: "" },
    responsibles: [],
    client: null
  })

  const handleResponsiblesSubmit = (responsibles) => {
    setFormData(prev => ({ ...prev, responsibles }))
  }

  const handleClientSubmit = (client) => {
    setFormData(prev => ({ ...prev, client }))
  }

  const handleProjectChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      project: { ...prev.project, [field]: value }
    }))
  }

  const handleSaveAll = () => {
    console.log("Dados completos:", formData)
  }

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="sobre">Sobre</TabsTrigger>
          <TabsTrigger value="responsaveis">Responsáveis</TabsTrigger>
          <TabsTrigger value="cliente">Cliente</TabsTrigger>
        </TabsList>

        <TabsContent value="sobre">
          <div className="space-y-4">
            <Input
              label="Nome"
              value={formData.project.name}
              onChange={(e) => handleProjectChange("name", e.target.value)}
            />
            <Input
              label="Descrição"
              value={formData.project.description}
              onChange={(e) => handleProjectChange("description", e.target.value)}
            />
          </div>
        </TabsContent>

        <TabsContent value="responsaveis">
          <ResponsibleForm
            mode="create"
            onSubmit={handleResponsiblesSubmit}
          />
        </TabsContent>

        <TabsContent value="cliente">
          <ClientForm
            mode="create"
            onSubmit={handleClientSubmit}
          />
        </TabsContent>
      </Tabs>

      <Button onClick={handleSaveAll}>
        Salvar Projeto
      </Button>
    </div>
  )
}
```

## 🚫 O que NÃO fazer

```tsx
// ❌ ERRADO - Formulários aninhados
<form onSubmit={handleSubmit}>
  <ResponsibleForm onSubmit={handleResponsiblesSubmit} />
  <ClientForm onSubmit={handleClientSubmit} />
  <Button type="submit">Salvar</Button>
</form>

// ❌ ERRADO - Múltiplos formulários sem controle
<ResponsibleForm onSubmit={handleResponsiblesSubmit} />
<ClientForm onSubmit={handleClientSubmit} />
<form onSubmit={handleSubmit}>
  <Button type="submit">Salvar</Button>
</form>
```

## ✅ Padrões Recomendados

1. **Use estados separados** para cada seção
2. **Use callbacks** para capturar dados dos formulários
3. **Valide no final** antes de salvar
4. **Use botões com onClick** em vez de formulários aninhados
5. **Mantenha a responsabilidade** de cada formulário separada
