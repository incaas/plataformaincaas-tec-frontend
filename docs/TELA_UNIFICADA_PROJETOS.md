# Tela Unificada de Gerenciamento de Projetos

## Visão Geral

A tela de gerenciamento de projetos foi unificada para funcionar tanto para criação quanto para edição, reutilizando o mesmo componente e interface.

## Estrutura de Rotas

### Nova Estrutura
- **Criar Projeto**: `/projetos/criar` (página estática)
- **Editar Projeto**: `/projetos/editar/[id]` (página dinâmica)

### Estrutura Anterior (Removida)
- ~~`/projetos/criar`~~ - Removido
- ~~`/projetos/[id]/editar`~~ - Removido

## Funcionalidades

### Modo de Operação
As páginas são separadas por rota:
- **Criar**: `/projetos/criar` - Página estática para criação
- **Editar**: `/projetos/editar/[id]` - Página dinâmica para edição

A página de edição sempre está em modo de edição:
```tsx
const isEditMode = true // Sempre true na página de edição
```

### Comportamento Dinâmico

#### 1. Títulos e Descrições
- **Criar**: "Criar Novo Projeto" + "Preencha as informações do projeto"
- **Editar**: "Editar Projeto" + "Atualize as informações do projeto [nome]"

#### 2. Navegação
- **Criar**: `Projetos > Criar Novo Projeto`
- **Editar**: `Projetos > [Nome do Projeto] > Editar`

#### 3. Botões de Ação
- **Criar**: "Criar Projeto"
- **Editar**: "Salvar Alterações"

#### 4. Redirecionamento
- **Criar**: Após salvar → `/projetos` (lista de projetos)
- **Editar**: Após salvar → `/projetos/[id]` (detalhes do projeto)

### Formulários Reutilizáveis

#### 1. ResponsibleForm
```tsx
<ResponsibleForm
  mode={isEditMode ? "edit" : "create"}
  initialData={projectResponsibles || []}
  onSubmit={handleResponsiblesSubmit}
  onCancel={handleCancel}
  isLoading={isLoading}
/>
```

#### 2. ClientForm
```tsx
<ClientForm
  mode={isEditMode ? "edit" : "create"}
  initialData={projectClient || undefined}
  onSubmit={handleClientSubmit}
  onCancel={handleCancel}
  isLoading={isLoading}
/>
```

## Estados e Dados

### Inicialização de Dados
```tsx
// Dados do projeto (se estiver editando)
const baseProject = isEditMode ? mockProjects.find(p => p.id === resolvedParams.id) : null
const projectResponsibles = isEditMode ? responsibles[resolvedParams.id] : []
const projectClient = isEditMode ? clientData[resolvedParams.id] : null

// Estado do formulário com dados iniciais
const [formData, setFormData] = useState({
  name: baseProject?.name || "",
  description: baseProject?.description || "",
  // ... outros campos
})
```

### Estados de Loading
- Loading global durante operações
- Estados individuais para cada formulário
- Feedback visual com spinners e toasts

## Feedback ao Usuário

### Toasts de Sucesso
- **Criar**: "Projeto criado com sucesso!"
- **Editar**: "Projeto atualizado com sucesso!"

### Toasts de Erro
- Mensagens específicas para cada tipo de operação
- Variante "destructive" para erros

## Navegação e Cancelamento

### Botão Cancelar
- **Criar**: Volta para `/projetos`
- **Editar**: Usa `window.history.back()`

### Navegação Breadcrumb
- Sempre presente e contextual
- Links funcionais para navegação

## Vantagens da Unificação

### 1. Reutilização de Código
- Mesmo componente para criação e edição
- Menos duplicação de código
- Manutenção simplificada

### 2. Consistência de UX
- Interface idêntica para ambas as operações
- Comportamento previsível
- Padrões consistentes

### 3. Manutenibilidade
- Uma única fonte de verdade
- Mudanças aplicadas automaticamente
- Testes simplificados

### 4. Escalabilidade
- Fácil adicionar novos campos
- Modificações centralizadas
- Evolução consistente

## Implementação Técnica

### Detecção de Modo
```tsx
export default function GerenciarProjetoPage({ 
  params 
}: { 
  params: Promise<{ id?: string }> 
}) {
  const resolvedParams = use(params)
  const isEditMode = Boolean(resolvedParams.id)
  // ...
}
```

### Renderização Condicional
```tsx
<h1 className="text-2xl sm:text-3xl font-bold text-[#1e3a8a]">
  {isEditMode ? "Editar Projeto" : "Criar Novo Projeto"}
</h1>
```

### Handlers Unificados
```tsx
const handleSubmit = async () => {
  // Lógica comum para ambos os modos
  // Redirecionamento baseado no modo
  if (isEditMode) {
    window.location.href = `/projetos/${resolvedParams.id}`
  } else {
    window.location.href = "/projetos"
  }
}
```

