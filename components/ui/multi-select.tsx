"use client"

import { useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { cn } from '@/lib/utils'

type Option = { label: string; value: string }

type MultiSelectProps = {
  options: Option[]
  value: string[]
  onChange: (next: string[]) => void
  placeholder?: string
  className?: string
  minWidthClassName?: string
}

export function MultiSelect({
  options,
  value,
  onChange,
  placeholder,
  className,
  minWidthClassName,
}: MultiSelectProps) {
  const [open, setOpen] = useState(false)

  const label = useMemo(() => {
    if (!value || value.length === 0) return placeholder ?? 'Selecionar'
    if (value.length === 1) return options.find(o => o.value === value[0])?.label ?? placeholder ?? 'Selecionar'
    return `${value.length} selecionados`
  }, [value, options, placeholder])

  const handleToggle = (val: string) => {
    if (value.includes(val)) onChange(value.filter(v => v !== val))
    else onChange([...(value ?? []), val])
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className={cn('justify-between', minWidthClassName, className)}
        >
          <span className="truncate max-w-[220px]">{label}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className={cn('p-0 w-[--radix-popover-trigger-width] min-w-[260px]')} align="start">
        <Command>
          <CommandInput placeholder="Filtrar..." />
          <CommandList>
            <CommandEmpty>Nenhuma opção encontrada</CommandEmpty>
            <CommandGroup>
              {options.map((opt) => {
                const checked = value?.includes(opt.value) ?? false
                return (
                  <CommandItem key={opt.value} onSelect={() => handleToggle(opt.value)}>
                    <div className="mr-2">
                      <Checkbox checked={checked} onCheckedChange={() => handleToggle(opt.value)} />
                    </div>
                    <span className="truncate">{opt.label}</span>
                  </CommandItem>
                )
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}


