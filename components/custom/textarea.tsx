"use client"

import * as React from 'react'
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

type Props = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  name: string
  label?: string
  errorMsg?: string
  required?: boolean
}

export const Textarea: React.FC<Props> = ({ name, label, errorMsg, required, className, ...props }) => {
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
      <textarea 
        id={id} 
        name={name} 
        aria-invalid={hasError} 
        aria-describedby={hasError ? `${id}-error` : undefined}
        className={cn(
          "flex min-h-[80px] w-full rounded-md border border-gray-300 bg-background px-3 py-2 text-sm",
          "placeholder:text-muted-foreground",
          "focus:outline-none focus:ring-2 focus:ring-blue-500",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "resize-vertical",
          hasError 
            ? "border-red-300 focus:border-red-500 focus:ring-red-500" 
            : "",
          className
        )}
        {...props} 
      />
      {hasError && <p id={`${id}-error`} className="text-xs text-destructive">{errorMsg}</p>}
    </div>
  )
}


