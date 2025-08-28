"use client"

import * as React from 'react'
import { Label } from "../ui/label"
import { Input as BaseInput } from "../ui/input"
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
    <div className={cn("space-y-3", className)}>
      {label && (
        <Label htmlFor={inputId} className="flex items-center gap-1 text-sm font-medium text-gray-700 dark:text-gray-200">
          {label}
          {required && <span className="text-red-500 font-semibold">*</span>}
        </Label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            {icon}
          </div>
        )}
        <BaseInput 
          id={inputId} 
          aria-invalid={hasError} 
          aria-describedby={hasError ? `${inputId}-error` : description ? `${inputId}-desc` : undefined} 
          required={required} 
          className={cn(
            "h-12 w-full rounded-lg border-2 bg-white dark:bg-gray-800 pl-10 pr-4 py-3 text-base font-normal",
            "placeholder:text-gray-400 dark:placeholder:text-gray-500",
            "transition-all duration-200 ease-in-out",
            "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 focus:border-blue-500",
            "hover:border-gray-300 dark:hover:border-gray-600",
            "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-50 dark:disabled:bg-gray-700",
            "focus-visible:ring-0 focus-visible:ring-offset-0", // Remove apenas os rings conflitantes do componente base
            hasError 
              ? "border-red-300 focus:border-red-500 focus:ring-red-500 focus:ring-opacity-50" 
              : "border-gray-200 dark:border-gray-600",
            !icon && "pl-4", // Remove padding left se não houver ícone
            className
          )}
          {...props} 
        />
        {hasError && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
        )}
      </div>
      {description && !hasError && (
        <p id={`${inputId}-desc`} className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
          {description}
        </p>
      )}
      {hasError && (
        <p id={`${inputId}-error`} className="text-sm text-red-600 dark:text-red-400 font-medium leading-relaxed flex items-center gap-2">
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {errorMsg}
        </p>
      )}
    </div>
  )
}


