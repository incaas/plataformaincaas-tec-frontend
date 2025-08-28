"use server"

import { revalidatePath } from "next/cache"
import { HTTPStatus } from "@/lib/http"
import { userCreateSchema, userUpdateSchema } from "@/lib/validations/user"

export type ActionState<TField extends string = string> = {
  success: boolean
  message?: string
  fieldErrors?: Partial<Record<TField, string[]>>
}

export const createUserAction = async (_prev: ActionState, formData: FormData): Promise<ActionState<'name' | 'email' | 'systemRole' | 'status'>> => {
  const payload = {
    name: String(formData.get('name') || ''),
    email: String(formData.get('email') || ''),
    systemRole: String(formData.get('systemRole') || ''),
    status: String(formData.get('status') || '')
  }
  const parsed = userCreateSchema.safeParse(payload)
  if (!parsed.success) {
    const f = parsed.error.flatten().fieldErrors
    return { success: false, fieldErrors: f as any, message: 'Dados inválidos' }
  }

  const res = await fetch('/api/admin/users', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(parsed.data)
  })

  if (res.status === HTTPStatus.CREATED || res.status === HTTPStatus.OK) {
    revalidatePath('/admin/users')
    return { success: true }
  }

  if (res.status === HTTPStatus.CONFLICT) {
    return { success: false, fieldErrors: { email: ['Email já em uso'] } }
  }

  const err = await res.json().catch(() => ({}))
  return { success: false, message: err?.error || 'Erro ao criar usuário' }
}

export const updateUserAction = async (userId: string, _prev: ActionState, formData: FormData): Promise<ActionState<'name' | 'email' | 'systemRole' | 'status'>> => {
  const payload = {
    id: userId,
    name: formData.get('name')?.toString(),
    email: formData.get('email')?.toString(),
    systemRole: formData.get('systemRole')?.toString(),
    status: formData.get('status')?.toString()
  }
  const parsed = userUpdateSchema.safeParse(payload)
  if (!parsed.success) {
    const f = parsed.error.flatten().fieldErrors
    return { success: false, fieldErrors: f as any, message: 'Dados inválidos' }
  }

  const { id, ...body } = parsed.data
  const res = await fetch(`/api/admin/users/${userId}`, {
    method: 'PATCH',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body)
  })

  if (res.ok) {
    revalidatePath('/admin/users')
    return { success: true }
  }

  if (res.status === HTTPStatus.CONFLICT) {
    return { success: false, fieldErrors: { email: ['Email já em uso'] } }
  }

  const err = await res.json().catch(() => ({}))
  return { success: false, message: err?.error || 'Erro ao atualizar usuário' }
}

export const deleteUserAction = async (userId: string): Promise<{ success: boolean; message?: string }> => {
  const res = await fetch(`/api/admin/users/${userId}`, { method: 'DELETE' })
  if (res.ok) {
    revalidatePath('/admin/users')
    return { success: true }
  }
  const err = await res.json().catch(() => ({}))
  return { success: false, message: err?.error || 'Erro ao excluir usuário' }
}


