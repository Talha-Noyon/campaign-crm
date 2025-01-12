import {localAuth} from '@/store/LocalAuth'

import {API_URL} from '@/utils/Common'

export interface JsonInit extends RequestInit {
  headers?: Record<string, string>
  json?: unknown
}

export async function fetcher<T>(input: string, jsonInit?: JsonInit) {
  jsonInit ??= {}
  const {json, ...init} = jsonInit
  init.headers ??= {}

  if (json) {
    init.headers['Content-Type'] ??= 'application/json'
    init.body = JSON.stringify(json)
  }

  const auth = localAuth.get()

  if (auth) {
    init.headers.Authorization ??= `Bearer ${auth.token}`
  }

  const response = await fetch(new URL(input, API_URL), init)

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }

  const data = await response.json()

  return data as T
}
