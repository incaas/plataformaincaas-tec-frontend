"use client"

import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type Option = { value: string; label: string }

type Props = {
  name: string
  label?: string
  placeholder?: string
  defaultValue?: string
  options: Option[]
  required?: boolean
  errorMsg?: string
}

export const SelectField = ({ name, label, placeholder = 'Selecione', defaultValue, options, required, errorMsg }: Props) => {
  const id = name
  const hasError = Boolean(errorMsg)
  return (
    <div className="space-y-2">
      {label && (
        <Label htmlFor={id} className="flex items-center gap-1">
          {label}
          {required && <span className="text-destructive">*</span>}
        </Label>
      )}
      <Select name={name} defaultValue={defaultValue} required={required}>
        <SelectTrigger id={id} aria-invalid={hasError} aria-describedby={hasError ? `${id}-error` : undefined}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map(opt => (
            <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      {hasError && (
        <p id={`${id}-error`} className="text-xs text-destructive">{errorMsg}</p>
      )}
    </div>
  )
}


