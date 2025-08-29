import { NextResponse } from 'next/server'
import { HTTPStatus } from '@/lib/http'
import { userCreateSchema, userFiltersSchema } from '@/lib/validations/user'
import type { PaginatedResponse, User } from '@/lib/types/users'

export const runtime = 'nodejs'

export async function GET(req: Request) {
  const url = new URL(req.url)
  const params = Object.fromEntries(url.searchParams.entries())
  const parsed = userFiltersSchema.safeParse(params)
  if (!parsed.success) return NextResponse.json({ error: 'Parâmetros inválidos' }, { status: HTTPStatus.UNPROCESSABLE_ENTITY })

  // Mock data para demonstração
  const mockData: PaginatedResponse<User> = {
    items: [
      {
        id: "1",
        name: "Usuário Exemplo",
        email: "usuario@exemplo.com",
        systemRole: "ADMIN",
        status: "ACTIVE",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ],
    total: 1,
    page: 1,
    pageSize: 10
  }

  return NextResponse.json(mockData, { status: HTTPStatus.OK })
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

  // Mock response para demonstração
  const mockUser: User = {
    id: Date.now().toString(),
    name: parsed.data.name,
    email: parsed.data.email,
    systemRole: parsed.data.systemRole,
    status: "ACTIVE",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }

  return NextResponse.json(mockUser, { status: HTTPStatus.OK })
}


