# Formulários Reutilizáveis

Este documento descreve os componentes de formulário reutilizáveis criados para o sistema de projetos.

## Componentes Disponíveis

### 1. ResponsibleForm

Formulário para gerenciar responsáveis de projetos. Pode ser usado tanto para criação quanto para edição.

**Localização:** `components/projetos/responsible-form.tsx`

**Props:**
- `mode`: 'create' | 'edit' - Define o modo do formulário
- `initialData?`: ProjectResponsible[] - Dados iniciais para edição
- `onSubmit`: (responsibles: ProjectResponsible[]) => void - Callback executado ao submeter
- `onCancel?`: () => void - Callback executado ao cancelar
- `isLoading?`: boolean - Estado de carregamento

**Exemplo de uso:**

```tsx
import { ResponsibleForm } from "@/components/projetos/responsible-form"

// Modo criação
<ResponsibleForm
  mode="create"
  onSubmit={(responsibles) => {
    console.log("Novos responsáveis:", responsibles)
  }}
/>

// Modo edição
<ResponsibleForm
  mode="edit"
  initialData={existingResponsibles}
  onSubmit={(responsibles) => {
    console.log("Responsáveis atualizados:", responsibles)
  }}
  onCancel={() => {
    // Lógica de cancelamento
  }}
  isLoading={isSubmitting}
/>
```

### 2. ClientForm

Formulário para gerenciar informações do cliente. Pode ser usado tanto para criação quanto para edição.

**Localização:** `components/projetos/client-form.tsx`

**Props:**
- `mode`: 'create' | 'edit' - Define o modo do formulário
- `initialData?`: Client - Dados iniciais para edição
- `onSubmit`: (client: Client) => void - Callback executado ao submeter
- `onCancel?`: () => void - Callback executado ao cancelar
- `isLoading?`: boolean - Estado de carregamento

**Exemplo de uso:**

```tsx
import { ClientForm } from "@/components/projetos/client-form"

// Modo criação
<ClientForm
  mode="create"
  onSubmit={(client) => {
    console.log("Novo cliente:", client)
  }}
/>

// Modo edição
<ClientForm
  mode="edit"
  initialData={existingClient}
  onSubmit={(client) => {
    console.log("Cliente atualizado:", client)
  }}
  onCancel={() => {
    // Lógica de cancelamento
  }}
  isLoading={isSubmitting}
/>
```

### 3. ResponsibleDialog

Dialog que encapsula o ResponsibleForm para uso em modais.

**Localização:** `components/projetos/responsible-dialog.tsx`

**Props:**
- `mode`: 'create' | 'edit' - Define o modo do formulário
- `initialData?`: ProjectResponsible[] - Dados iniciais para edição
- `trigger?`: React.ReactNode - Elemento que dispara o dialog
- `onSuccess?`: (responsibles: ProjectResponsible[]) => void - Callback executado após sucesso

**Exemplo de uso:**

```tsx
import { ResponsibleDialog } from "@/components/projetos/responsible-dialog"
import { Button } from "@/components/custom/button"

<ResponsibleDialog
  mode="edit"
  initialData={existingResponsibles}
  trigger={<Button>Editar Responsáveis</Button>}
  onSuccess={(responsibles) => {
    console.log("Responsáveis atualizados:", responsibles)
  }}
/>
```

## Páginas de Exemplo

### 1. Página de Criação de Projeto

**Localização:** `app/projetos/criar/page.tsx`

Demonstra como usar os formulários em uma página com abas:

```tsx
<Tabs value={activeTab} onValueChange={setActiveTab}>
  <TabsList>
    <TabsTrigger value="sobre">Sobre</TabsTrigger>
    <TabsTrigger value="responsaveis">Responsáveis</TabsTrigger>
    <TabsTrigger value="cliente">Cliente</TabsTrigger>
    <TabsTrigger value="documentacao">Documentação</TabsTrigger>
  </TabsList>

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
```

### 2. Página de Edição de Projeto

**Localização:** `app/projetos/[id]/editar/page.tsx`

Demonstra como usar os formulários para edição com dados existentes:

```tsx
<Tabs value={activeTab} onValueChange={setActiveTab}>
  <TabsList>
    <TabsTrigger value="responsaveis">Responsáveis</TabsTrigger>
    <TabsTrigger value="cliente">Cliente</TabsTrigger>
  </TabsList>

  <TabsContent value="responsaveis">
    <ResponsibleForm
      mode="edit"
      initialData={projectResponsibles}
      onSubmit={handleResponsiblesSubmit}
      onCancel={handleCancel}
      isLoading={isLoading}
    />
  </TabsContent>

  <TabsContent value="cliente">
    <ClientForm
      mode="edit"
      initialData={clientData}
      onSubmit={handleClientSubmit}
      onCancel={handleCancel}
      isLoading={isLoading}
    />
  </TabsContent>
</Tabs>
```

## Características dos Formulários

### Validação
- Validação de campos obrigatórios
- Validação de formato de email
- Limite de caracteres para descrições (1000 caracteres)
- Validação de URL para website do cliente

### Estados
- Estado de carregamento com spinner
- Estados de erro com mensagens
- Estados de sucesso com notificações toast

### Responsividade
- Layout responsivo com grid adaptativo
- Campos organizados em colunas para desktop e mobile
- Ícones para melhor identificação visual

### Acessibilidade
- Labels apropriados para todos os campos
- Mensagens de erro associadas aos campos
- Suporte a navegação por teclado
- ARIA attributes para screen readers

## Integração com API

Os formulários são agnósticos em relação à API. Você deve implementar a lógica de submissão no callback `onSubmit`:

```tsx
const handleSubmit = async (responsibles: ProjectResponsible[]) => {
  setIsLoading(true)
  try {
    // Chamada para sua API
    const response = await fetch('/api/responsibles', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(responsibles)
    })
    
    if (!response.ok) throw new Error('Erro na API')
    
    // Sucesso
    toast({ title: "Sucesso!", description: "Responsáveis salvos." })
  } catch (error) {
    // Erro
    toast({ 
      title: "Erro", 
      description: "Erro ao salvar responsáveis.", 
      variant: "destructive" 
    })
  } finally {
    setIsLoading(false)
  }
}
```

## Personalização

Os formulários usam os componentes customizados do projeto:
- `Input` - Para campos de texto
- `Textarea` - Para campos de texto longo
- `SelectField` - Para campos de seleção
- `Button` - Para botões
- `Card` - Para containers

Você pode personalizar a aparência modificando esses componentes ou passando classes CSS customizadas.

## ⚠️ Importante: Evite Formulários Aninhados

**NUNCA** coloque um `<form>` dentro de outro `<form>`. Isso causa erros de hidratação no React/Next.js.

### ❌ Incorreto:
```tsx
<form onSubmit={handleSubmit}>
  <ResponsibleForm onSubmit={handleResponsiblesSubmit} />
</form>
```

### ✅ Correto:
```tsx
<div>
  <ResponsibleForm onSubmit={handleResponsiblesSubmit} />
  <Button onClick={handleSubmit}>Salvar Tudo</Button>
</div>
```

### ✅ Alternativa com Callbacks:
```tsx
const [responsibles, setResponsibles] = useState([])

const handleResponsiblesSubmit = (data) => {
  setResponsibles(data)
}

const handleFinalSubmit = () => {
  // Salvar responsáveis + outros dados
  console.log({ responsibles, otherData })
}

return (
  <div>
    <ResponsibleForm onSubmit={handleResponsiblesSubmit} />
    <Button onClick={handleFinalSubmit}>Salvar Tudo</Button>
  </div>
)
```
