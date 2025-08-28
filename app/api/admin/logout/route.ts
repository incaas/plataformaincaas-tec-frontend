import { NextResponse } from 'next/server'
import { HTTPStatus } from '@/lib/http'
import { serverFetchJSON } from '@/lib/server-fetch'
import { readSessionCookies, clearSessionCookies } from '@/lib/auth/cookies'

export const runtime = 'nodejs'

export async function POST() {
  const { refreshToken } = await readSessionCookies()
  if (refreshToken) {
    await serverFetchJSON<{ success?: boolean; error?: string }>({
      pathname: '/auth/logout',
      method: 'POST',
      body: { refreshToken }
    })
  }
  await clearSessionCookies()
  return new NextResponse(null, { status: HTTPStatus.NO_CONTENT })
}


