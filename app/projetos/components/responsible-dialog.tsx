"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/custom/button"
import { ResponsibleForm } from "./responsible-form"
import { ProjectResponsible } from "@/lib/types/projects"
import { useToast } from "@/components/ui/use-toast"
import { Check } from "lucide-react"

interface ResponsibleDialogProps {
  mode: 'create' | 'edit'
  initialData?: ProjectResponsible[]
  trigger?: React.ReactNode
  onSuccess?: (responsibles: ProjectResponsible[]) => void
}

export function ResponsibleDialog({ 
  mode, 
  initialData = [], 
  trigger, 
  onSuccess 
}: ResponsibleDialogProps) {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (responsibles: ProjectResponsible[]) => {
    setIsLoading(true)
    try {
      // Simular uma chamada de API
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      console.log("Responsáveis:", responsibles)
      
      toast({
        title: "Sucesso!",
        description: mode === 'create' 
          ? "Responsáveis adicionados com sucesso." 
          : "Responsáveis atualizados com sucesso.",
        action: <Check className="h-4 w-4 text-green-600" />
      })
      
      onSuccess?.(responsibles)
      setOpen(false)
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao salvar responsáveis. Tente novamente.",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {mode === 'create' ? 'Adicionar Responsáveis' : 'Editar Responsáveis'}
          </DialogTitle>
        </DialogHeader>
        <ResponsibleForm
          mode={mode}
          initialData={initialData}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isLoading={isLoading}
        />
      </DialogContent>
    </Dialog>
  )
}
