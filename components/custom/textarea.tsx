"use client"

import { Label } from "@/components/ui/label"
import { Textarea as BaseTextarea } from "@/components/ui/textarea"

type Props = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  name: string
  label?: string
  errorMsg?: string
}

export const Textarea: React.FC<Props> = ({ name, label, errorMsg, ...props }) => {
  const id = name
  const hasError = Boolean(errorMsg)
  return (
    <div className="space-y-2">
      {label && <Label htmlFor={id}>{label}</Label>}
      <BaseTextarea id={id} name={name} aria-invalid={hasError} aria-describedby={hasError ? `${id}-error` : undefined} {...props} />
      {hasError && <p id={`${id}-error`} className="text-xs text-destructive">{errorMsg}</p>}
    </div>
  )
}


