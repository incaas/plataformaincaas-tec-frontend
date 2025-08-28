# Documentação de Módulos - Plataforma Incaas Auth Frontend

## Visão Geral dos Módulos

Este documento define os módulos da aplicação e suas responsabilidades para orientar a estruturação de commits modulares.

## Módulos de Infraestrutura

### 1. `env` - Variáveis de Ambiente
**Localização**: `src/lib/env.ts`
**Responsabilidades**:
- Configuração de variáveis de ambiente
- Validação de configurações obrigatórias
- Tipos para configurações

**Commits relacionados**:
- `build(env): configuração de variáveis de ambiente`
- `fix(env): correção na validação de configurações`

### 2. `types` - Tipos Base
**Localização**: `src/lib/types.ts`
**Responsabilidades**:
- Tipos compartilhados entre módulos
- Interfaces de API
- Tipos de dados de negócio

**Commits relacionados**:
- `refact(types): padronização de tipos em toda aplicação`
- `feat(types): adição de novos tipos para módulo X`

### 3. `utils` - Utilitários
**Localização**: `src/lib/utils.ts`
**Responsabilidades**:
- Funções utilitárias compartilhadas
- Helpers de formatação
- Funções auxiliares

**Commits relacionados**:
- `feat(utils): adição de funções utilitárias`
- `refact(utils): otimização de funções existentes`

### 4. `logger` - Sistema de Logs
**Localização**: `src/lib/logger.ts`
**Responsabilidades**:
- Configuração de logging
- Níveis de log
- Formatação de mensagens

**Commits relacionados**:
- `feat(logger): implementa sistema de logging`
- `perf(logger): otimização de performance`

## Módulos Core

### 5. `http` - Cliente HTTP
**Localização**: `src/lib/http/`
**Responsabilidades**:
- Cliente HTTP para APIs
- Interceptors de requisição
- Tratamento de erros

**Commits relacionados**:
- `feat(http): implementa cliente HTTP com interceptors`
- `fix(http): correção no tratamento de erros`

### 6. `session` - Gerenciamento de Sessão
**Localização**: `src/lib/session/`
**Responsabilidades**:
- Gerenciamento de cookies
- Claims de usuário
- Autenticação de sessão

**Commits relacionados**:
- `feat(session): implementa gerenciamento de sessão`
- `fix(session): correção na validação de claims`

### 7. `auth` - Autenticação
**Localização**: `src/app/(public)/login/`, `src/app/api/auth/`
**Responsabilidades**:
- Formulário de login
- Rotas de autenticação
- Fluxo de login/logout

**Commits relacionados**:
- `feat(auth): sistema completo de autenticação`
- `fix(auth): correção no fluxo de login`

### 8. `i18n` - Internacionalização
**Localização**: `src/i18n/`
**Responsabilidades**:
- Configuração de idiomas
- Mensagens traduzidas
- Provider de internacionalização

**Commits relacionados**:
- `feat(i18n): implementa sistema de internacionalização`
- `feat(i18n): adição de novas mensagens`

## Módulos de Interface

### 9. `ui` - Componentes de Interface
**Localização**: `src/components/ui/`
**Responsabilidades**:
- Componentes reutilizáveis
- Design system
- Componentes de formulário

**Commits relacionados**:
- `feat(ui): implementa componentes base`
- `refact(ui): refatoração de componentes`

### 10. `validations` - Validações
**Localização**: `src/lib/validations/`
**Responsabilidades**:
- Schemas de validação Zod
- Validações de formulário
- Validações de API

**Commits relacionados**:
- `feat(validations): implementa schemas de validação`
- `fix(validations): correção em validação específica`

## Módulos de Negócio

### 11. `admin` - Painel Administrativo
**Localização**: `src/app/admin/`
**Responsabilidades**:
- Layout administrativo
- Navegação entre módulos
- Dashboard principal

**Commits relacionados**:
- `feat(admin): implementa painel administrativo`
- `refact(admin): melhoria na navegação`

### 12. `users` - Gestão de Usuários
**Localização**: `src/app/admin/users/`
**Responsabilidades**:
- CRUD de usuários
- Formulários de usuário
- Listagem e filtros

**Commits relacionados**:
- `feat(users): implementa gestão completa de usuários`
- `fix(users): correção na validação de dados`

### 13. `turmas` - Gestão de Turmas
**Localização**: `src/app/admin/turmas/`
**Responsabilidades**:
- CRUD de turmas
- Formulários de turma
- Gestão de cursos

**Commits relacionados**:
- `feat(turmas): implementa gestão de turmas`
- `feat(turmas): adiciona gestão de cursos`

### 14. `memberships` - Gestão de Membros
**Localização**: `src/app/admin/memberships/`
**Responsabilidades**:
- Gestão de membros
- Associação usuário-turma
- Permissões

**Commits relacionados**:
- `feat(memberships): implementa gestão de membros`
- `fix(memberships): correção na associação`

### 15. `audit` - Sistema de Auditoria
**Localização**: `src/app/admin/audit/`
**Responsabilidades**:
- Logs de auditoria
- Histórico de ações
- Relatórios

**Commits relacionados**:
- `feat(audit): implementa sistema de auditoria`
- `feat(audit): adiciona relatórios`

### 16. `metrics` - Métricas
**Localização**: `src/app/api/metrics/`
**Responsabilidades**:
- Coleta de métricas
- Endpoints de monitoramento
- Dashboards

**Commits relacionados**:
- `feat(metrics): implementa sistema de métricas`
- `perf(metrics): otimização de coleta`

## Dependências entre Módulos

### Dependências Diretas
```
env ← types ← utils ← logger
                ↓
http ← session ← auth
                ↓
i18n ← ui ← validations
                ↓
admin ← users
    ↓
turmas ← memberships
    ↓
audit ← metrics
```

### Regras de Commit
1. **Módulos base primeiro**: Sempre commitar módulos de infraestrutura antes dos que dependem deles
2. **Contexto único**: Todos os arquivos de um módulo no mesmo commit
3. **Testes incluídos**: Testes do módulo no mesmo commit
4. **Dependências**: Instalar dependências no mesmo commit da funcionalidade

## Exemplos de Commits por Módulo

### Commit de Módulo Completo
```
feat(users): implementa gestão completa de usuários

- CRUD completo com formulários de criação e edição
- Validações com Zod para todos os campos
- Integração com API REST
- Testes E2E para fluxo completo
- Componentes de tabela e paginação
- Instala dependências necessárias

refs #25
```

### Commit de Correção em Módulo
```
fix(validations): correção na validação de email único

- Corrige validação que permitia emails duplicados
- Adiciona teste para cenário de email duplicado
- Atualiza schema de validação de usuário
- Mantém compatibilidade com implementações existentes

refs #30
```

### Commit de Refatoração
```
refact(ui): refatoração dos componentes de formulário

- Extrai componentes reutilizáveis de input
- Melhora tipagem dos props
- Mantém compatibilidade com implementações existentes
- Adiciona testes para novos componentes
- Atualiza documentação dos componentes

refs #35
```
