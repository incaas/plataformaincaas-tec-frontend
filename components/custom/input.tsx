"use client"

import * as React from 'react'
import { Label } from "../ui/label"
import { cn } from "@/lib/utils"

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string
  errorMsg?: string
  description?: string
  required?: boolean
  icon?: React.ReactNode
}

export const Input: React.FC<Props> = ({ id, label, errorMsg, description, className, required, icon, ...props }) => {
  const inputId = id || props.name || undefined
  const hasError = Boolean(errorMsg)

  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <Label htmlFor={inputId} className="flex items-center gap-1">
          {label}
          {required && <span className="text-destructive">*</span>}
        </Label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            {icon}
          </div>
        )}
        <input 
          id={inputId} 
          aria-invalid={hasError} 
          aria-describedby={hasError ? `${inputId}-error` : description ? `${inputId}-desc` : undefined} 
          required={required} 
          className={cn(
            "h-10 w-full rounded-md border border-gray-300 bg-background px-3 py-2 text-sm",
            "placeholder:text-muted-foreground",
            "focus:outline-none focus:ring-2 focus:ring-blue-500",
            "disabled:cursor-not-allowed disabled:opacity-50",
            "file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground",
            hasError 
              ? "border-red-300 focus:border-red-500 focus:ring-red-500" 
              : "",
            !icon && "pl-3", // Remove padding left se não houver ícone
            icon && "pl-10", // Adiciona padding left se houver ícone
            className
          )}
          {...props} 
        />

      </div>
      {description && !hasError && (
        <p id={`${inputId}-desc`} className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
          {description}
        </p>
      )}
      {hasError && (
        <p id={`${inputId}-error`} className="text-xs text-destructive">{errorMsg}</p>
      )}
    </div>
  )
}


