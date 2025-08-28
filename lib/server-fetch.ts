import 'server-only'

import { env } from './config'
import { headers as nextHeaders } from 'next/headers'
import { randomUUID } from 'node:crypto'
import { HTTPStatus } from './http'

type FetchJSONOptions = Omit<RequestInit, 'body' | 'method'> & {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  body?: unknown
  pathname: string
  searchParams?: Record<string, string | number | boolean | undefined>
  timeoutMs?: number
}

const buildURL = (
  pathname: string,
  searchParams?: Record<string, string | number | boolean | undefined>
) => {
  const url = new URL(pathname, env.AUTH_API_BASE_URL)
  if (searchParams) {
    for (const [key, value] of Object.entries(searchParams)) {
      if (value !== undefined && value !== null) url.searchParams.set(key, String(value))
    }
  }
  return url.toString()
}

export const serverFetch = async (
  pathname: string,
  init?: RequestInit & { timeoutMs?: number }
) => {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), init?.['timeoutMs'] ?? 15000)
  const reqHeaders = new Headers(init?.headers)
  const h = await nextHeaders()
  const xrid = h.get('x-request-id') ?? randomUUID()
  reqHeaders.set('x-request-id', xrid)
  if (!reqHeaders.has('accept')) reqHeaders.set('accept', 'application/json')
  const res = await fetch(new URL(pathname, env.AUTH_API_BASE_URL), {
    ...init,
    headers: reqHeaders,
    signal: controller.signal
  })
  clearTimeout(timeout)
  return res
}

export const serverFetchJSON = async <T>(
  opts: FetchJSONOptions
): Promise<{ status: number; data?: T; error?: string }> => {
  const { pathname, method = 'GET', body, searchParams, timeoutMs, ...rest } = opts
  const headers = new Headers(rest.headers)
  if (body !== undefined && !headers.has('content-type')) headers.set('content-type', 'application/json')
  const url = buildURL(pathname, searchParams)
  const res = await serverFetch(url, {
    ...rest,
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
    timeoutMs
  })
  if (res.status === HTTPStatus.NO_CONTENT) return { status: res.status }
  const text = await res.text()
  try {
    const json = text ? JSON.parse(text) : undefined
    if (res.ok) return { status: res.status, data: json as T }
    return { status: res.status, error: (json?.error as string) ?? 'Erro' }
  } catch {
    return res.ok ? { status: res.status, data: undefined } : { status: res.status, error: text || 'Erro' }
  }
}


