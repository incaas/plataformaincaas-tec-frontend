# Setup da Estrutura de Commits Modulares

## Configuração Inicial

### 1. Instalação de Dependências
```bash
pnpm install
```

### 2. Configuração do Git
```bash
# Configurar template de commit
git config commit.template .gitmessage

# Configurar hooks do Husky (já configurado automaticamente)
npx husky install
```

### 3. Verificar Permissões dos Scripts
```bash
# No Windows (Git Bash)
chmod +x scripts/validate-commit.sh
chmod +x scripts/pre-commit.sh

# No Linux/Mac
chmod +x scripts/validate-commit.sh scripts/pre-commit.sh
```

## Como Usar

### 1. Fazer um Commit
```bash
# O template será carregado automaticamente
git commit

# Ou usar o script de validação
npm run validate:commit
```

### 2. Estrutura de Commit Esperada
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

### 3. Validações Automáticas
- **Pre-commit**: Executado automaticamente antes de cada commit
- **Lint**: Verifica formatação e regras de código
- **TypeScript**: Verifica tipos
- **Template**: Valida formato da mensagem

### 4. Validação Manual
```bash
# Executar todas as validações
npm run validate:commit

# Verificar tipos
npm run type-check

# Executar lint
npm run lint

# Executar testes
npm run test:e2e
```

## Troubleshooting

### Erro de Permissão nos Scripts
```bash
# No Windows, se chmod não funcionar
git update-index --chmod=+x scripts/validate-commit.sh
git update-index --chmod=+x scripts/pre-commit.sh
```

### Husky não Executando
```bash
# Reinstalar hooks
npx husky install

# Verificar se o hook existe
ls -la .husky/
```

### Template não Carregando
```bash
# Verificar configuração
git config --get commit.template

# Reconfigurar se necessário
git config commit.template .gitmessage
```

## Fluxo de Trabalho Recomendado

### 1. Desenvolvimento
```bash
# Fazer alterações no código
# Adicionar arquivos ao staging
git add .

# Fazer commit (template será carregado)
git commit
```

### 2. Validação
```bash
# Executar validações completas
npm run validate:commit

# Se houver erros, corrigir e commitar novamente
```

### 3. Push
```bash
# Após validação bem-sucedida
git push
```

## Comandos Úteis

### Scripts Disponíveis
```bash
npm run dev              # Desenvolvimento
npm run build            # Build de produção
npm run lint             # Lint
npm run lint:fix         # Lint com correção automática
npm run test:e2e         # Testes E2E
npm run type-check       # Verificação de tipos
npm run validate:commit  # Validação completa
```

### Git Hooks
- **Pre-commit**: Validação automática antes do commit
- **Commit-msg**: Validação do formato da mensagem

## Documentação Relacionada

- [Guia de Commits](./COMMIT_GUIDE.md)
- [Documentação de Módulos](./MODULES.md)
- [Guia de Testes](../TESTING_GUIDE.md)
