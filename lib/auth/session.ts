import 'server-only'

import { readSessionCookies, setSessionCookies, clearSessionCookies } from './cookies'
import { decodeJwtWithoutVerify, getJwtExpiryDate } from './jwt'
import { HTTPStatus } from '../http'
import { redirect } from 'next/navigation'

export type SessionClaims = {
  sub?: string
  email?: string
  systemRole?: string
  exp?: number
  [k: string]: unknown
}

export type Session = {
  accessToken?: string
  refreshToken?: string
  claims?: SessionClaims | null
}

const isExpiringSoon = (token?: string | null, thresholdSeconds = 60 * 2) => {
  if (!token) return true
  const expDate = getJwtExpiryDate(token)
  if (!expDate) return true
  const diff = expDate.getTime() - Date.now()
  return diff <= thresholdSeconds * 1000
}

export const getSession = async (): Promise<Session | null> => {
  const { accessToken, refreshToken } = await readSessionCookies()
  if (!accessToken) return null
  const claims = decodeJwtWithoutVerify<SessionClaims>(accessToken)
  return { accessToken, refreshToken, claims }
}

export const refreshIfNeeded = async () => {
  const { accessToken } = await readSessionCookies()
  if (!accessToken || !isExpiringSoon(accessToken)) return
  const res = await fetch('/api/admin/refresh', { method: 'POST' })
  if (!res.ok) {
    await clearSessionCookies()
  }
}

export const requireMaster = async (): Promise<Session> => {
  const session = await getSession()
  if (!session?.claims?.systemRole || session.claims.systemRole !== 'MASTER') redirect('/login')
  await refreshIfNeeded()
  return session
}

export const attachAuthHeader = async (): Promise<HeadersInit> => {
  const { accessToken } = await readSessionCookies()
  if (!accessToken) return {}
  return { Authorization: `Bearer ${accessToken}` }
}


