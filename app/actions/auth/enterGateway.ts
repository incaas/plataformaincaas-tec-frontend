"use server"

import { HTTPStatus } from "@/lib/http"
import { serverFetchJSON } from "@/lib/server-fetch"

type EnterGatewayArgs = { selectionId: string; turmaId: string }

const extractCode = (redirectUrl: string) => {
  try {
    const u = new URL(redirectUrl)
    return u.searchParams.get('code')
  } catch {
    return null
  }
}

export const enterGatewayAction = async ({ selectionId, turmaId }: EnterGatewayArgs) => {
  const sel = await serverFetchJSON<{ redirectUrl?: string; error?: string }>({
    pathname: '/auth/login/select',
    method: 'POST',
    body: { selectionId, turmaId }
  })
  if (!sel.data?.redirectUrl) return { success: false, message: 'Falha ao selecionar turma' }
  
  const code = extractCode(sel.data.redirectUrl)
  if (!code) return { success: false, message: 'Código inválido' }
  
  const ex = await serverFetchJSON<{ accessToken?: string; refreshToken?: string; error?: string }>({
    pathname: '/auth/exchange',
    method: 'POST',
    body: { code }
  })
  
  if (ex.status !== HTTPStatus.OK || !ex.data) {
    return { success: false, message: ex.error || 'Falha ao entrar no gateway' }
  }
  
  return { success: true }
}


