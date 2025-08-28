"use client"

import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/custom/button"

type Props = {
  title: string
  description?: string
  confirmText?: string
  variant?: 'default' | 'destructive' | 'secondary'
  onConfirm: () => Promise<void> | void
  trigger: React.ReactNode
}

export const ConfirmDialog: React.FC<Props> = ({ title, description, confirmText = 'Confirmar', variant = 'default', onConfirm, trigger }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
        <DialogFooter>
          <Button variant={variant} onClick={async () => { await onConfirm() }}>{confirmText}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}


