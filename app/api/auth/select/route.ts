import { NextResponse } from 'next/server'
import { HTTPStatus } from '@/lib/http'
import { serverFetchJSON } from '@/lib/server-fetch'

export const runtime = 'nodejs'

type SelectBody = { turmaId?: string; selectionId?: string }

export async function POST(req: Request) {
  let body: SelectBody
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Payload inválido' }, { status: HTTPStatus.UNPROCESSABLE_ENTITY })
  }
  if (!body?.turmaId || !body?.selectionId) {
    return NextResponse.json({ error: 'Parâmetros obrigatórios' }, { status: HTTPStatus.UNPROCESSABLE_ENTITY })
  }

  const resp = await serverFetchJSON<{ redirectUrl?: string; error?: string }>({
    pathname: '/auth/login/select',
    method: 'POST',
    body
  })
  if (resp.error) return NextResponse.json({ error: resp.error }, { status: resp.status })
  return NextResponse.json(resp.data ?? {}, { status: resp.status })
}


