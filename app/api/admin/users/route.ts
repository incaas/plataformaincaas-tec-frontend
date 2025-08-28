import { NextResponse } from 'next/server'
import { HTTPStatus } from '@/lib/http'
import { serverFetchJSON } from '@/lib/server-fetch'
import { userCreateSchema, userFiltersSchema } from '@/lib/validations/user'
import type { PaginatedResponse, User } from '@/lib/types/users'
import { attachAuthHeader } from '@/lib/auth/session'

export const runtime = 'nodejs'

export async function GET(req: Request) {
  const url = new URL(req.url)
  const params = Object.fromEntries(url.searchParams.entries())
  const parsed = userFiltersSchema.safeParse(params)
  if (!parsed.success) return NextResponse.json({ error: 'Parâmetros inválidos' }, { status: HTTPStatus.UNPROCESSABLE_ENTITY })

  const resp = await serverFetchJSON<PaginatedResponse<User>>({
    pathname: '/admin/users',
    method: 'GET',
    headers: { ...(await attachAuthHeader()) },
    searchParams: parsed.data
  })
  if (resp.error) return NextResponse.json({ error: resp.error }, { status: resp.status })
  return NextResponse.json(resp.data ?? { items: [], total: 0, page: 1, pageSize: 10 }, { status: resp.status })
}

export async function POST(req: Request) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Payload inválido' }, { status: HTTPStatus.UNPROCESSABLE_ENTITY })
  }
  const parsed = userCreateSchema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: 'Dados inválidos' }, { status: HTTPStatus.UNPROCESSABLE_ENTITY })

  const resp = await serverFetchJSON<User>({
    pathname: '/admin/users',
    method: 'POST',
    headers: { ...(await attachAuthHeader()) },
    body: parsed.data
  })
  if (resp.error) return NextResponse.json({ error: resp.error }, { status: resp.status })
  return NextResponse.json(resp.data ?? {}, { status: resp.status })
}


