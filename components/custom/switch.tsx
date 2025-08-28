"use client"

import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

type Props = {
  name: string
  label?: string
  defaultChecked?: boolean
  trueValue?: string
  falseValue?: string
  errorMsg?: string
}

export const SwitchField = ({ name, label, defaultChecked, trueValue = 'true', falseValue = 'false', errorMsg }: Props) => {
  const id = name
  const hasError = Boolean(errorMsg)
  return (
    <div className="space-y-2">
      {label && <Label htmlFor={id}>{label}</Label>}
      <div className="flex items-center gap-2">
        <Switch id={id} defaultChecked={defaultChecked} onCheckedChange={(checked) => {
          const input = document.querySelector<HTMLInputElement>(`input[type=hidden][name='${name}']`)
          if (input) input.value = checked ? trueValue : falseValue
        }} />
        <input type="hidden" name={name} defaultValue={defaultChecked ? trueValue : falseValue} />
      </div>
      {hasError && <p className="text-xs text-destructive">{errorMsg}</p>}
    </div>
  )}


