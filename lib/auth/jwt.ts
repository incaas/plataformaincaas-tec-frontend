import 'server-only'

type JWTPayload = { exp?: number; [k: string]: unknown }

const base64UrlDecode = (s: string) => {
  s = s.replace(/-/g, '+').replace(/_/g, '/')
  const pad = s.length % 4
  if (pad) s += '='.repeat(4 - pad)
  return Buffer.from(s, 'base64').toString('utf8')
}

export const decodeJwtWithoutVerify = <T extends JWTPayload = JWTPayload>(
  token: string | undefined | null
): T | null => {
  if (!token) return null
  const parts = token.split('.')
  if (parts.length < 2) return null
  try {
    const json = base64UrlDecode(parts[1])
    return JSON.parse(json) as T
  } catch {
    return null
  }
}

export const getJwtExpiryDate = (token: string | undefined | null): Date | null => {
  const payload = decodeJwtWithoutVerify(token)
  if (!payload?.exp) return null
  return new Date(payload.exp * 1000)
}


