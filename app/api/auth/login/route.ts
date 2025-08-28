import { NextResponse } from 'next/server'
import { HTTPStatus } from '@/lib/http'
import { serverFetchJSON } from '@/lib/server-fetch'

export const runtime = 'nodejs'

type LoginBody = { identifier?: string; password?: string }

export async function POST(req: Request) {
  let body: LoginBody
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Payload inválido' }, { status: HTTPStatus.UNPROCESSABLE_ENTITY })
  }
  if (!body?.identifier || !body?.password) {
    return NextResponse.json({ error: 'Credenciais obrigatórias' }, { status: HTTPStatus.UNPROCESSABLE_ENTITY })
  }

  const resp = await serverFetchJSON<{ redirectUrl?: string; requireSelection?: boolean; options?: unknown; selectionId?: string; error?: string; remaining?: string }>({
    pathname: '/auth/login',
    method: 'POST',
    body
  })

  if (resp.error) return NextResponse.json({ error: resp.error, remaining: (resp as any)?.data?.remaining }, { status: resp.status })
  return NextResponse.json(resp.data ?? {}, { status: resp.status })
}


