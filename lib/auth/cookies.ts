import 'server-only'

import { cookies } from 'next/headers'
import { env } from '../config'
import { getJwtExpiryDate } from './jwt'

export const ACCESS_COOKIE = 'gw_access_token'
export const REFRESH_COOKIE = 'gw_refresh_token'

const baseCookieOptions = {
  httpOnly: true as const,
  secure: env.SESSION_SECURE_COOKIES,
  sameSite: 'lax' as const,
  path: '/'
}

export const setSessionCookies = async (accessToken: string, refreshToken: string) => {
  const c = await cookies()
  const accessExpires = getJwtExpiryDate(accessToken) ?? new Date(Date.now() + 15 * 60 * 1000)
  const refreshExpires = getJwtExpiryDate(refreshToken) ?? new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  const domain = env.SESSION_COOKIE_DOMAIN || undefined
  c.set(ACCESS_COOKIE, accessToken, { ...baseCookieOptions, expires: accessExpires, domain })
  c.set(REFRESH_COOKIE, refreshToken, { ...baseCookieOptions, expires: refreshExpires, domain })
}

export const clearSessionCookies = async () => {
  const c = await cookies()
  const domain = env.SESSION_COOKIE_DOMAIN || undefined
  c.set(ACCESS_COOKIE, '', { ...baseCookieOptions, expires: new Date(0), domain })
  c.set(REFRESH_COOKIE, '', { ...baseCookieOptions, expires: new Date(0), domain })
}

export const readSessionCookies = async () => {
  const c = await cookies()
  return {
    accessToken: c.get(ACCESS_COOKIE)?.value,
    refreshToken: c.get(REFRESH_COOKIE)?.value
  }
}


