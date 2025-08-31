# Cores do Sistema IncaaS

## Paleta de Cores Principal

### Cor IncaaS (#1A73E8)
A cor principal do sistema IncaaS está disponível como variável do Tailwind CSS.

#### Classes disponíveis:
- `bg-incaas` - Background principal
- `text-incaas` - Texto na cor principal
- `border-incaas` - Borda na cor principal
- `ring-incaas` - Ring/focus na cor principal

#### Variações de tonalidade:
- `bg-incaas-50` - Muito claro (#E8F2FF)
- `bg-incaas-100` - Claro (#D1E5FF)
- `bg-incaas-200` - Médio claro (#A3CBFF)
- `bg-incaas-300` - Médio (#75B1FF)
- `bg-incaas-400` - Médio escuro (#4797FF)
- `bg-incaas-500` - Principal (#1A73E8)
- `bg-incaas-600` - Escuro (#0056CC)
- `bg-incaas-700` - Muito escuro (#004499)
- `bg-incaas-800` - Extra escuro (#003366)
- `bg-incaas-900` - Mais escuro (#002233)

## Uso em Componentes

### Botão Custom
O componente `Button` customizado usa a cor IncaaS como padrão:

```tsx
import { Button } from "@/components/custom/button"

// Cor padrão IncaaS
<Button>Criar Projeto</Button>

// Outras variantes
<Button variant="destructive">Excluir</Button>
<Button variant="ghost">Cancelar</Button>
<Button variant="outline">Editar</Button>
```

### Exemplos de Uso

#### Backgrounds
```tsx
<div className="bg-incaas">Fundo principal</div>
<div className="bg-incaas-50">Fundo claro</div>
<div className="bg-incaas-100">Fundo suave</div>
```

#### Textos
```tsx
<h1 className="text-incaas">Título principal</h1>
<p className="text-incaas-600">Texto escuro</p>
<span className="text-incaas-400">Destaque</span>
```

#### Bordas
```tsx
<div className="border border-incaas">Borda principal</div>
<div className="border-2 border-incaas-200">Borda clara</div>
```

#### Estados de Hover
```tsx
<button className="bg-incaas hover:bg-incaas-600">
  Botão com hover
</button>
```

## Configuração no Tailwind

As cores estão definidas no arquivo `tailwind.config.ts`:

```ts
colors: {
  incaas: {
    DEFAULT: '#1A73E8',
    '50': '#E8F2FF',
    '100': '#D1E5FF',
    '200': '#A3CBFF',
    '300': '#75B1FF',
    '400': '#4797FF',
    '500': '#1A73E8',
    '600': '#0056CC',
    '700': '#004499',
    '800': '#003366',
    '900': '#002233'
  }
}
```

## Migração de Cores Antigas

Substitua as referências diretas à cor `#1A73E8` pelas classes do Tailwind:

```tsx
// Antes
<div className="bg-[#1A73E8]">Conteúdo</div>

// Depois
<div className="bg-incaas">Conteúdo</div>
```

Isso garante consistência e facilita futuras mudanças de cor no sistema.
