import { NextResponse } from 'next/server'
import { HTTPStatus } from '@/lib/http'
import type { User } from '@/lib/types/users'
import { userUpdateSchema } from '@/lib/validations/user'

export const runtime = 'nodejs'

type Params = { params: { id: string } }

export async function GET(_req: Request, { params }: Params) {
  const { id } = params
  if (!id) return NextResponse.json({ error: 'ID obrigatório' }, { status: HTTPStatus.UNPROCESSABLE_ENTITY })
  
  // Mock data para demonstração
  const mockUser: User = {
    id,
    name: "Usuário Exemplo",
    email: "usuario@exemplo.com",
    systemRole: "ADMIN",
    status: "ACTIVE",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
  
  return NextResponse.json(mockUser, { status: HTTPStatus.OK })
}

export async function PATCH(req: Request, { params }: Params) {
  const { id } = params
  if (!id) return NextResponse.json({ error: 'ID obrigatório' }, { status: HTTPStatus.UNPROCESSABLE_ENTITY })
  let body: unknown
  try { body = await req.json() } catch { return NextResponse.json({ error: 'Payload inválido' }, { status: HTTPStatus.UNPROCESSABLE_ENTITY }) }
  const parsed = userUpdateSchema.safeParse({ ...(body as object), id })
  if (!parsed.success) return NextResponse.json({ error: 'Dados inválidos' }, { status: HTTPStatus.UNPROCESSABLE_ENTITY }) 
  
  // Mock response para demonstração
  const mockUser: User = {
    id,
    name: parsed.data.name || "Usuário Atualizado",
    email: parsed.data.email || "usuario@exemplo.com",
    systemRole: parsed.data.systemRole || "ADMIN",
    status: parsed.data.status || "ACTIVE",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
  
  return NextResponse.json(mockUser, { status: HTTPStatus.OK })
}

export async function DELETE(_req: Request, { params }: Params) {
  const { id } = params
  if (!id) return NextResponse.json({ error: 'ID obrigatório' }, { status: HTTPStatus.UNPROCESSABLE_ENTITY })
  
  // Mock response para demonstração
  return new NextResponse(null, { status: HTTPStatus.OK })
}


