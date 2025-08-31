# Componentes Custom do Sistema IncaaS

## Select Custom

O componente `Select` customizado inclui funcionalidade de limpar (clean) e é baseado no Radix UI.

### SelectField (com label e validação)

```tsx
import { SelectField } from "@/components/custom/select"

// Uso básico
<SelectField
  name="categoria"
  label="Categoria"
  placeholder="Selecione uma categoria"
  options={[
    { value: "tech", label: "Tecnologia" },
    { value: "design", label: "Design" },
    { value: "marketing", label: "Marketing" }
  ]}
  required
/>

// Com callback de mudança
<SelectField
  name="status"
  label="Status"
  options={statusOptions}
  onValueChange={(value) => console.log('Status mudou:', value)}
  allowClear={true} // Padrão: true
/>

// Desabilitar limpeza
<SelectField
  name="tipo"
  label="Tipo"
  options={tipoOptions}
  allowClear={false}
/>
```

### SimpleSelect (sem label)

```tsx
import { SimpleSelect } from "@/components/custom/select"

// Uso básico
<SimpleSelect
  value={selectedValue}
  onValueChange={setSelectedValue}
  placeholder="Selecione..."
  options={[
    { value: "opcao1", label: "Opção 1" },
    { value: "opcao2", label: "Opção 2" }
  ]}
/>

// Com classe customizada
<SimpleSelect
  value={filters.client}
  onValueChange={(value) => setFilters(prev => ({ ...prev, client: value }))}
  placeholder="Cliente"
  options={clientOptions}
  className="w-40"
  allowClear={true} // Padrão: true
/>
```

### Funcionalidades

#### Botão de Limpar (Clean)
- **Aparece automaticamente** quando há um valor selecionado
- **Posicionado à direita** do select
- **Ícone X** do Lucide React
- **Hover effect** com fundo cinza claro
- **Acessível** com `sr-only` para leitores de tela

#### Valor Vazio
- **Não use valores vazios** (`""`) nas opções do select
- **Use o placeholder** para indicar a opção padrão
- **O botão de limpar** define o valor como `""` internamente
- **Filtros automáticos** removem opções com valor vazio

#### Props Disponíveis

**SelectField:**
- `name`: Nome do campo (obrigatório)
- `label`: Label do campo (opcional)
- `placeholder`: Texto placeholder (padrão: "Selecione")
- `defaultValue`: Valor inicial
- `options`: Array de opções `{value: string, label: string}`
- `required`: Campo obrigatório
- `errorMsg`: Mensagem de erro
- `onValueChange`: Callback quando valor muda
- `allowClear`: Habilita botão de limpar (padrão: true)

**SimpleSelect:**
- `value`: Valor atual
- `onValueChange`: Callback quando valor muda
- `placeholder`: Texto placeholder
- `options`: Array de opções
- `className`: Classes CSS customizadas
- `allowClear`: Habilita botão de limpar (padrão: true)

### Exemplo de Uso em Filtros

```tsx
const [filters, setFilters] = useState({
  client: "",
  sector: "",
  status: ""
})

return (
  <div className="flex gap-3">
         <SimpleSelect
       value={filters.client}
       onValueChange={(value) => setFilters(prev => ({ ...prev, client: value }))}
       placeholder="Cliente"
       options={[
         { value: "cliente1", label: "Cliente 1" },
         { value: "cliente2", label: "Cliente 2" }
       ]}
       className="w-40"
     />
    
    <SimpleSelect
      value={filters.sector}
      onValueChange={(value) => setFilters(prev => ({ ...prev, sector: value }))}
      placeholder="Setor"
      options={sectorOptions}
      className="w-40"
    />
  </div>
)
```

### Estilização

O componente usa as classes do Tailwind CSS e pode ser customizado:

```tsx
// Select customizado
<SimpleSelect
  className="w-full bg-white border-2 border-incaas focus:border-incaas-600"
  // ... outras props
/>

// Botão de limpar customizado (via CSS)
.select-clear-button {
  @apply hover:bg-incaas-50 hover:text-incaas;
}
```

### Acessibilidade

- **ARIA labels** apropriados
- **Keyboard navigation** suportada
- **Screen reader** friendly
- **Focus management** automático
- **Error states** com `aria-invalid` e `aria-describedby`
