"use client"

import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/custom/button"
import { X } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

type Option = { value: string; label: string }

type Props = {
  name: string
  label?: string
  placeholder?: string
  defaultValue?: string
  value?: string
  options: Option[]
  required?: boolean
  errorMsg?: string
  onValueChange?: (value: string) => void
  allowClear?: boolean
}

export const SelectField = ({ 
  name, 
  label, 
  placeholder = 'Selecione', 
  defaultValue, 
  value,
  options, 
  required, 
  errorMsg,
  onValueChange,
  allowClear = true
}: Props) => {
  const id = name
  const hasError = Boolean(errorMsg)
  
  // Usar value da prop se fornecido, senão usar defaultValue
  const currentValue = value !== undefined ? value : (defaultValue || "")

  const handleValueChange = (newValue: string) => {
    onValueChange?.(newValue)
  }

  const handleClear = () => {
    onValueChange?.("")
  }

  // Filtrar opções vazias para o SelectItem
  const validOptions = options.filter(opt => opt.value !== "")

  return (
    <div className="space-y-2">
      {label && (
        <Label htmlFor={id} className="flex items-center gap-1">
          {label}
          {required && <span className="text-destructive">*</span>}
        </Label>
      )}
      <div className="relative">
        <Select 
          name={name} 
          value={currentValue} 
          onValueChange={handleValueChange}
          required={required}
        >
          <SelectTrigger 
            id={id} 
            aria-invalid={hasError} 
            aria-describedby={hasError ? `${id}-error` : undefined}
                         className={cn(
               "border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500",
               hasError 
                 ? "border-red-300 focus:border-red-500 focus:ring-red-500" 
                 : ""
             )}
          >
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {validOptions.map(opt => (
              <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        {allowClear && currentValue && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleClear}
            className="absolute right-10 top-1/2 -translate-y-1/2 h-5 w-5 p-0 hover:bg-gray-100 z-10"
          >
            <X className="h-3 w-3" />
            <span className="sr-only">Limpar seleção</span>
          </Button>
        )}
      </div>
      {hasError && (
        <p id={`${id}-error`} className="text-xs text-destructive">{errorMsg}</p>
      )}
    </div>
  )
}

// Componente Select simples para uso direto em páginas
type SimpleSelectProps = {
  value?: string
  onValueChange?: (value: string) => void
  placeholder?: string
  options: Option[]
  className?: string
  allowClear?: boolean
}

export const SimpleSelect = ({ 
  value, 
  onValueChange, 
  placeholder = 'Selecione', 
  options, 
  className,
  allowClear = true
}: SimpleSelectProps) => {
  const handleValueChange = (newValue: string) => {
    onValueChange?.(newValue)
  }

  const handleClear = () => {
    onValueChange?.("")
  }

  // Filtrar opções vazias para o SelectItem
  const validOptions = options.filter(opt => opt.value !== "")

  return (
    <div className="relative">
      <Select value={value || ""} onValueChange={handleValueChange}>
        <SelectTrigger 
          className={cn(
            "border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500",
            className
          )}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {validOptions.map(opt => (
            <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      {allowClear && value && (
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={handleClear}
          className="absolute right-10 top-1/2 -translate-y-1/2 h-5 w-5 p-0 hover:bg-gray-100 z-10"
        >
          <X className="h-3 w-3" />
          <span className="sr-only">Limpar seleção</span>
        </Button>
      )}
    </div>
  )
}


