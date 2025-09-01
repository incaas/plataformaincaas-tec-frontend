# Navegação de Projetos

## Visão Geral

O componente `ProjectNavigation` fornece uma navegação breadcrumb consistente em todas as páginas relacionadas a projetos.

## Componente

```tsx
import { ProjectNavigation } from "@/components/projetos/project-navigation"
```

## Props

| Prop | Tipo | Obrigatório | Descrição |
|------|------|-------------|-----------|
| `currentPage` | `string` | ✅ | Nome da página atual |
| `projectName` | `string` | ❌ | Nome do projeto (quando aplicável) |
| `projectId` | `string` | ❌ | ID do projeto (quando aplicável) |

## Exemplos de Uso

### 1. Página Principal de Projetos
```tsx
// Não precisa de navegação - é a página raiz
```

### 2. Gerenciar Projeto (Criar/Editar)
```tsx
<ProjectNavigation 
  projectName={project?.name}
  currentPage={isEditMode ? "Editar" : "Criar Novo Projeto"}
  projectId={project?.id}
/>
```

### 3. Detalhes do Projeto
```tsx
<ProjectNavigation 
  projectName={project.name}
  currentPage=""
  projectId={project.id}
/>
```

### 5. Outras Páginas de Projeto
```tsx
<ProjectNavigation 
  projectName={project.name}
  currentPage="Configurações"
  projectId={project.id}
/>
```

## Estrutura da Navegação

A navegação segue este padrão:

```
Projetos > [Nome do Projeto] > [Página Atual]
```

- **Projetos**: Sempre presente, link para a página principal
- **Nome do Projeto**: Aparece quando `projectName` e `projectId` são fornecidos
- **Página Atual**: Nome da página atual (quando `currentPage` não está vazio)

## Implementação Atual

### Páginas que já usam o componente:
- ✅ `/projetos/criar` - Criar Novo Projeto (página estática)
- ✅ `/projetos/editar/[id]` - Editar Projeto (página dinâmica)
- ✅ `/projetos/[id]` - Detalhes do Projeto

### Páginas que não precisam:
- ✅ `/projetos` - Página principal (raiz)

## Estilo

O componente usa:
- Texto cinza para links
- Texto cinza escuro para a página atual
- Ícones ChevronRight para separadores
- Hover effects nos links
- Espaçamento consistente
