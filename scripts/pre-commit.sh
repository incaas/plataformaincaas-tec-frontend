#!/bin/bash

# Hook de Pre-commit
# Executa validações automáticas antes de cada commit

set -e

echo "🔍 Executando validações de pre-commit..."

# Verificar se o commit message segue o padrão
commit_msg_file="$1"
commit_msg=$(cat "$commit_msg_file")

# Padrão regex para commit message
pattern="^(feat|fix|refact|style|test|docs|build|ci|perf)\([a-z-]+\): .+"

if ! echo "$commit_msg" | grep -qE "$pattern"; then
    echo "❌ Commit message não segue o padrão esperado."
    echo "Formato esperado: <type>(<scope>): <subject>"
    echo "Exemplo: feat(auth): implementa sistema de login"
    echo ""
    echo "Commit message atual:"
    echo "$commit_msg"
    exit 1
fi

# Executar lint apenas nos arquivos modificados
echo "📝 Executando lint nos arquivos modificados..."
staged_files=$(git diff --cached --name-only --diff-filter=ACM | grep -E '\.(ts|tsx|js|jsx)$' || true)

if [ -n "$staged_files" ]; then
    echo "$staged_files" | xargs npx eslint --fix
fi

# Verificar TypeScript nos arquivos modificados
echo "🔍 Verificando TypeScript..."
if [ -n "$staged_files" ]; then
    echo "$staged_files" | xargs npx tsc --noEmit
fi

echo "✅ Pre-commit validado com sucesso!"
