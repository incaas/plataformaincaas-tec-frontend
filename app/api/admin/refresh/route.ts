import { NextResponse } from 'next/server'
import { HTTPStatus } from '@/lib/http'
import { serverFetchJSON } from '@/lib/server-fetch'
import { readSessionCookies, setSessionCookies, clearSessionCookies } from '@/lib/auth/cookies'

export const runtime = 'nodejs'

export async function POST() {
  const { refreshToken } = await readSessionCookies()
  if (!refreshToken) return NextResponse.json({ error: 'Sessão inválida' }, { status: HTTPStatus.UNAUTHORIZED })

  const resp = await serverFetchJSON<{ accessToken: string; refreshToken: string; error?: string }>({
    pathname: '/auth/refresh',
    method: 'POST',
    body: { refreshToken }
  })
  if (resp.error || !resp.data) {
    await clearSessionCookies()
    return NextResponse.json({ error: resp.error ?? 'Falha ao renovar sessão' }, { status: resp.status })
  }
  await setSessionCookies(resp.data.accessToken, resp.data.refreshToken)
  return new NextResponse(null, { status: HTTPStatus.NO_CONTENT })
}


