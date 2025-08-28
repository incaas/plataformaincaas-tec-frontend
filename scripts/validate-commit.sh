#!/bin/bash

# Script de Validação de Commits
# Garante que commits sejam modulares e não quebráveis

set -e

echo "🔍 Iniciando validação de commit..."

# Verificar se há mudanças não commitadas
if [ -n "$(git status --porcelain)" ]; then
    echo "❌ Existem mudanças não commitadas. Faça commit ou stash antes de continuar."
    exit 1
fi

# Executar lint
echo "📝 Executando lint..."
npm run lint

# Executar build
echo "🔨 Executando build..."
npm run build

# Executar testes E2E
echo "🧪 Executando testes E2E..."
npm run test:e2e

# Verificar se há erros de TypeScript
echo "🔍 Verificando TypeScript..."
npx tsc --noEmit

# Verificar dependências
echo "📦 Verificando dependências..."
if [ -f "pnpm-lock.yaml" ]; then
    pnpm install --frozen-lockfile
else
    echo "⚠️  pnpm-lock.yaml não encontrado. Execute 'pnpm install' primeiro."
fi

echo "✅ Validação concluída com sucesso!"
echo "🎉 Commit está pronto para ser enviado."
