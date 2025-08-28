"use server"

import { HTTPStatus } from "@/lib/http"
import { serverFetchJSON } from "@/lib/server-fetch"
import { redirect } from "next/navigation"

export type LoginState = {
  success: boolean
  message?: string
  selection?: {
    requireSelection: boolean
    options: Array<{ id: string; name?: string; slug?: string; platform?: string; [k: string]: unknown }>
    selectionId: string
  }
}

export const loginAction = async (_prev: LoginState, formData: FormData): Promise<LoginState> => {
  const identifier = String(formData.get("identifier") || "").trim()
  const password = String(formData.get("password") || "").trim()
  if (!identifier || !password) return { success: false, message: "Credenciais obrigatórias" }

  const resp = await serverFetchJSON<{ redirectUrl?: string; requireSelection?: boolean; options?: unknown; selectionId?: string; error?: string }>({
    pathname: '/auth/login',
    method: 'POST',
    body: { identifier, password }
  })

  if (resp.status === HTTPStatus.OK) {
    const { redirectUrl } = resp.data ?? {}
    if (redirectUrl) return { success: true, message: redirectUrl }
    return { success: false, message: "Resposta inválida" }
  }

  if (resp.status === HTTPStatus.UNAUTHORIZED) {
    redirect('/blocked?reason=unauthorized')
  }

  if (resp.status === HTTPStatus.TOO_MANY_REQUESTS) {
    redirect('/blocked?reason=rate_limit')
  }

  if (resp.status === HTTPStatus.CONFLICT) {
    const data = resp.data ?? {}
    if (data?.requireSelection && data?.options && data?.selectionId) {
      return { success: false, selection: { requireSelection: true, options: data.options as Array<{ id: string; name?: string; slug?: string; platform?: string; [k: string]: unknown }>, selectionId: data.selectionId } }
    }
    return { success: false, message: "Seleção necessária" }
  }

  return { success: false, message: resp.error || "Falha no login" }
}


