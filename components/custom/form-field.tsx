"use client"

import { Input } from "./input"

type Props = {
  name: string
  label: string
  type?: string
  defaultValue?: string
  placeholder?: string
  required?: boolean
  errorMsg?: string
}

export const FormField = ({ name, label, type = 'text', defaultValue, placeholder, required, errorMsg }: Props) => {
  return (
    <Input name={name} label={label} type={type} defaultValue={defaultValue} placeholder={placeholder} required={required} errorMsg={errorMsg} />
  )
}


