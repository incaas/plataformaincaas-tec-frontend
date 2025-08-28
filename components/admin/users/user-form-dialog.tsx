"use client"

import { useActionState } from "react"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/custom/button"
import { Input } from "@/components/custom/input"
import { SelectField } from "@/components/custom/select"
import { SwitchField } from "@/components/custom/switch"
import { createUserAction, updateUserAction, type ActionState } from "@/app/admin/users/actions"
import { useToast } from "@/components/ui/use-toast"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

type Props = {
  mode: 'create' | 'edit'
  defaultValues?: { id?: string; name?: string; email?: string; systemRole?: string; status?: string }
  trigger?: React.ReactNode
}

export const UserFormDialog: React.FC<Props> = ({ mode, defaultValues, trigger }) => {
  const router = useRouter()
  const { toast } = useToast()
  const [open, setOpen] = useState(false)
  const [state, formAction, isPending] = useActionState<ActionState, FormData>(
    async (_prev, fd) => {
      if (mode === 'create') return createUserAction(_prev, fd)
      if (!defaultValues?.id) return { success: false, message: 'ID ausente' }
      return updateUserAction(defaultValues.id, _prev, fd)
    },
    { success: false }
  )

  useEffect(() => {
    if (state.success) {
      setOpen(false)
      toast({ title: mode === 'create' ? 'Usuário criado' : 'Usuário atualizado' })
      router.refresh()
    } else if (state.message) {
      toast({ title: 'Erro', description: state.message })
    }
  }, [state])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{mode === 'create' ? 'Novo usuário' : 'Editar usuário'}</DialogTitle>
        </DialogHeader>
        {state.message && !state.success && (
          <p className="text-sm text-destructive">{state.message}</p>
        )}
        <form action={formAction} className="space-y-3">
          <Input name="name" label="Nome" defaultValue={defaultValues?.name} required errorMsg={state.fieldErrors?.name?.[0]} />
          <Input name="email" label="E-mail" type="email" defaultValue={defaultValues?.email} required errorMsg={state.fieldErrors?.email?.[0]} />
          <SelectField name="systemRole" label="Perfil" defaultValue={defaultValues?.systemRole || 'USER'} required errorMsg={state.fieldErrors?.systemRole?.[0]}
            options={[{ value: 'MASTER', label: 'MASTER' }, { value: 'USER', label: 'USER' }]} />
          <SwitchField name="status" label="Ativo" defaultChecked={(defaultValues?.status || 'ACTIVE') === 'ACTIVE'} trueValue="ACTIVE" falseValue="INACTIVE" errorMsg={state.fieldErrors?.status?.[0]} />
          <DialogFooter>
            <Button type="submit" disabled={isPending}>{isPending ? 'Salvando...' : 'Salvar'}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}


