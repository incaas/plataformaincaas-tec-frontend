import { NextResponse } from 'next/server'
import { HTTPStatus } from '@/lib/http'
import { serverFetchJSON } from '@/lib/server-fetch'
import type { User } from '@/lib/types/users'
import { userUpdateSchema } from '@/lib/validations/user'
import { attachAuthHeader } from '@/lib/auth/session'

export const runtime = 'nodejs'

type Params = { params: { id: string } }

export async function GET(_req: Request, { params }: Params) {
  const { id } = params
  if (!id) return NextResponse.json({ error: 'ID obrigatório' }, { status: HTTPStatus.UNPROCESSABLE_ENTITY })
  const resp = await serverFetchJSON<User>({
    pathname: `/admin/users/${id}`,
    method: 'GET',
    headers: { ...(await attachAuthHeader()) }
  })
  if (resp.error) return NextResponse.json({ error: resp.error }, { status: resp.status })
  return NextResponse.json(resp.data ?? {}, { status: resp.status })
}

export async function PATCH(req: Request, { params }: Params) {
  const { id } = params
  if (!id) return NextResponse.json({ error: 'ID obrigatório' }, { status: HTTPStatus.UNPROCESSABLE_ENTITY })
  let body: unknown
  try { body = await req.json() } catch { return NextResponse.json({ error: 'Payload inválido' }, { status: HTTPStatus.UNPROCESSABLE_ENTITY }) }
  const parsed = userUpdateSchema.safeParse({ ...(body as object), id })
  if (!parsed.success) return NextResponse.json({ error: 'Dados inválidos' }, { status: HTTPStatus.UNPROCESSABLE_ENTITY })
  const { id: _, ...payload } = parsed.data
  const resp = await serverFetchJSON<User>({
    pathname: `/admin/users/${id}`,
    method: 'PATCH',
    headers: { ...(await attachAuthHeader()) },
    body: payload
  })
  if (resp.error) return NextResponse.json({ error: resp.error }, { status: resp.status })
  return NextResponse.json(resp.data ?? {}, { status: resp.status })
}

export async function DELETE(_req: Request, { params }: Params) {
  const { id } = params
  if (!id) return NextResponse.json({ error: 'ID obrigatório' }, { status: HTTPStatus.UNPROCESSABLE_ENTITY })
  const resp = await serverFetchJSON({
    pathname: `/admin/users/${id}`,
    method: 'DELETE',
    headers: { ...(await attachAuthHeader()) }
  })
  if (resp.error) return NextResponse.json({ error: resp.error }, { status: resp.status })
  return new NextResponse(null, { status: resp.status })
}


