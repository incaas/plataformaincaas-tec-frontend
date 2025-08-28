import { NextResponse } from 'next/server'
import { HTTPStatus } from '@/lib/http'
import { serverFetchJSON } from '@/lib/server-fetch'
import { setSessionCookies } from '@/lib/auth/cookies'
import { decodeJwtWithoutVerify } from '@/lib/auth/jwt'

export const runtime = 'nodejs'

type ExchangeBody = { code?: string; fingerprint?: string }

export async function POST(req: Request) {
  let body: ExchangeBody
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Payload inválido' }, { status: HTTPStatus.UNPROCESSABLE_ENTITY })
  }
  if (!body?.code) return NextResponse.json({ error: 'Code obrigatório' }, { status: HTTPStatus.UNPROCESSABLE_ENTITY })

  const resp = await serverFetchJSON<{ accessToken: string; refreshToken: string; error?: string }>({
    pathname: '/auth/exchange',
    method: 'POST',
    body: { code: body.code, fingerprint: body.fingerprint }
  })
  if (resp.error || !resp.data) return NextResponse.json({ error: resp.error ?? 'Falha na troca' }, { status: resp.status })

  const claims = decodeJwtWithoutVerify<{ systemRole?: string }>(resp.data.accessToken)
  if (!claims || claims.systemRole !== 'MASTER') {
    return NextResponse.json({ error: 'Perfil sem acesso ao gateway' }, { status: HTTPStatus.FORBIDDEN })
  }

  await setSessionCookies(resp.data.accessToken, resp.data.refreshToken)
  return new NextResponse(null, { status: HTTPStatus.NO_CONTENT })
}


