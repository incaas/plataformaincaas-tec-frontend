import 'server-only'

export const env = {
  AUTH_API_BASE_URL: process.env.AUTH_API_BASE_URL ?? '',
  NEXT_PUBLIC_ENV: process.env.NEXT_PUBLIC_ENV ?? 'dev',
  NEXT_PUBLIC_TIME_ZONE: process.env.NEXT_PUBLIC_TIME_ZONE ?? 'America/Sao_Paulo',
  SESSION_COOKIE_DOMAIN: process.env.SESSION_COOKIE_DOMAIN || undefined,
  SESSION_SECURE_COOKIES: String(process.env.SESSION_SECURE_COOKIES ?? 'false') === 'true'
}

export const assertEnv = () => {
  if (!env.AUTH_API_BASE_URL) throw new Error('AUTH_API_BASE_URL não configurado')
}


