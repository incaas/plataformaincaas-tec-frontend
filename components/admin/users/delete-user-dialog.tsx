"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/custom/button"
import { deleteUserAction } from "@/app/admin/users/actions"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"

type Props = { userId: string; trigger?: React.ReactNode }

export const DeleteUserDialog: React.FC<Props> = ({ userId, trigger }) => {
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const { toast } = useToast()
  const router = useRouter()
  const handleDelete = async () => {
    setLoading(true)
    const r = await deleteUserAction(userId)
    setLoading(false)
    if (r.success) {
      setOpen(false)
      toast({ title: 'Usuário excluído' })
      router.refresh()
    } else if (r.message) {
      toast({ title: 'Erro', description: r.message })
    }
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Excluir usuário</DialogTitle>
        </DialogHeader>
        <p className="text-sm text-muted-foreground">Esta ação não pode ser desfeita.</p>
        <DialogFooter>
          <Button variant="destructive" onClick={handleDelete} disabled={loading}>{loading ? 'Excluindo...' : 'Excluir'}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}


