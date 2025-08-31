"use client"

import { Button as BaseButton, type ButtonProps } from "../ui/button"
import { cn } from "@/lib/utils"

export interface CustomButtonProps extends Omit<ButtonProps, 'variant'> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
}

/**
 * Botão customizado com cor padrão IncaaS (#1A73E8)
 * 
 * Variantes disponíveis:
 * - default: bg-incaas (cor padrão #1A73E8)
 * - destructive: vermelho para ações destrutivas
 * - outline: borda com fundo transparente
 * - secondary: cinza secundário
 * - ghost: transparente com hover
 * - link: estilo de link
 * 
 * Exemplo de uso:
 * <Button>Criar Projeto</Button> // Usa cor padrão IncaaS
 * <Button variant="destructive">Excluir</Button> // Vermelho
 * <Button variant="ghost">Cancelar</Button> // Transparente
 */
export const Button = ({ className, variant = "default", ...props }: CustomButtonProps) => {
  const customStyles = "bg-incaas text-white hover:bg-incaas/90 focus-visible:ring-incaas"
  
  // Se for uma variante especial (não default), usar o estilo original
  const shouldUseCustomStyle = variant === "default"
  
  return (
    <BaseButton 
      {...props} 
      className={cn(
        shouldUseCustomStyle && customStyles,
        className
      )}
      variant={shouldUseCustomStyle ? undefined : variant}
    />
  )
}


