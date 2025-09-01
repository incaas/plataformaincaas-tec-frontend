# Componentização do Formulário de Projetos

## Visão Geral

O formulário de projetos foi componentizado para reutilização entre as telas de criação e edição, mantendo a separação das páginas e evitando conflitos de nomes.

## Estrutura

### Componente Principal
- **`app/projetos/components/project-form.tsx`** - Formulário reutilizável

### Páginas
- **`app/projetos/criar/page.tsx`** - Página de criação
- **`app/projetos/editar/[id]/page.tsx`** - Página de edição

## Componente ProjectForm

### Props

```tsx
interface ProjectFormProps {
  mode: "create" | "edit"                    // Modo de operação
  initialData?: ProjectFormData              // Dados iniciais do projeto
  initialResponsibles?: ProjectResponsible[]  // Responsáveis iniciais
  initialClient?: Client | null              // Cliente inicial
  onSubmit: (data: FormData) => Promise<void> // Handler de submissão
  onCancel: () => void                       // Handler de cancelamento
  isLoading?: boolean                        // Estado de loading
}
```

### Interface de Dados

```tsx
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

interface FormData {
  formData: ProjectFormData
  responsibles: ProjectResponsible[]
  client: Client | null
  documentation: { manual: string; visualIdentity: string }
}
```

## Uso nas Páginas

### Página de Criação

```tsx
export default function CriarProjetoPage() {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (data: FormData) => {
    setIsLoading(true)
    try {
      // Lógica de criação
      console.log("Dados do projeto:", data.formData)
      console.log("Responsáveis:", data.responsibles)
      console.log("Cliente:", data.client)
      console.log("Documentação:", data.documentation)
      
      toast({
        title: "Sucesso!",
        description: "Projeto criado com sucesso!",
        action: <Check className="h-4 w-4 text-green-600" />
      })
      
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
      <ProjectNavigation currentPage="Criar Novo Projeto" />
      
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#1e3a8a]">
          Criar Novo Projeto
        </h1>
        <p className="text-gray-600">
          Preencha as informações do projeto
        </p>
      </div>

      <ProjectForm
        mode="create"
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isLoading={isLoading}
      />
    </div>
  )
}
```

### Página de Edição

```tsx
export default function EditarProjetoPage({ params }: { params: Promise<{ id: string }> }) {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  
  const resolvedParams = use(params)
  
  // Dados do projeto
  const baseProject = mockProjects.find(p => p.id === resolvedParams.id)
  const projectResponsibles = responsibles[resolvedParams.id] || []
  const projectClient = clientData[resolvedParams.id] || null
  
  if (!baseProject) {
    return <ProjectNotFound />
  }

  const handleSubmit = async (data: FormData) => {
    setIsLoading(true)
    try {
      // Lógica de atualização
      console.log("Dados do projeto:", data.formData)
      console.log("Responsáveis:", data.responsibles)
      console.log("Cliente:", data.client)
      console.log("Documentação:", data.documentation)
      
      toast({
        title: "Sucesso!",
        description: "Projeto atualizado com sucesso!",
        action: <Check className="h-4 w-4 text-green-600" />
      })
      
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

  // Preparar dados iniciais
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
      <ProjectNavigation 
        projectName={baseProject.name}
        currentPage="Editar"
        projectId={resolvedParams.id}
      />
      
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#1e3a8a]">
          Editar Projeto
        </h1>
        <p className="text-gray-600">
          Atualize as informações do projeto {baseProject.name}
        </p>
      </div>

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
```

## Funcionalidades do Componente

### 1. Tabs Organizadas
- **Sobre**: Informações básicas do projeto
- **Responsáveis**: Gerenciamento de responsáveis
- **Cliente**: Informações do cliente
- **Documentação**: Manual e identidade visual

### 2. Formulários Reutilizáveis
- `ResponsibleForm` integrado
- `ClientForm` integrado
- Campos de documentação

### 3. Estados Internos
- Gerenciamento de dados do formulário
- Estados de responsáveis e cliente
- Documentação

### 4. Feedback ao Usuário
- Toasts de sucesso/erro
- Loading states
- Validações

## Vantagens da Componentização

### 1. Reutilização de Código
- Mesmo formulário para criação e edição
- Lógica centralizada
- Manutenção simplificada

### 2. Separação de Responsabilidades
- Páginas focadas na navegação e contexto
- Componente focado na lógica do formulário
- Handlers específicos para cada operação

### 3. Flexibilidade
- Props configuráveis
- Dados iniciais opcionais
- Modo de operação dinâmico

### 4. Manutenibilidade
- Mudanças aplicadas automaticamente
- Testes simplificados
- Código mais limpo

## Estrutura de Arquivos

```
app/projetos/components/
├── project-form.tsx          # Formulário reutilizável
├── responsible-form.tsx      # Formulário de responsáveis
├── client-form.tsx          # Formulário de cliente
├── project-navigation.tsx   # Navegação breadcrumb
└── responsible-dialog.tsx   # Dialog de responsáveis

app/projetos/
├── criar/
│   └── page.tsx           # Página de criação
└── editar/
    └── [id]/
        └── page.tsx       # Página de edição
```

## Fluxo de Dados

### Criação
1. Usuário acessa `/projetos/criar`
2. `ProjectForm` é renderizado em modo "create"
3. Dados são coletados e enviados via `onSubmit`
4. Página processa e redireciona

### Edição
1. Usuário acessa `/projetos/editar/[id]`
2. Dados do projeto são carregados
3. `ProjectForm` é renderizado em modo "edit" com dados iniciais
4. Dados são coletados e enviados via `onSubmit`
5. Página processa e redireciona

## Considerações Técnicas

### 1. Tipagem
- Interfaces TypeScript bem definidas
- Props tipadas para segurança
- Dados estruturados

### 2. Performance
- Estados locais no componente
- Re-renderizações otimizadas
- Loading states gerenciados

### 3. UX
- Feedback visual consistente
- Navegação intuitiva
- Estados de loading claros
