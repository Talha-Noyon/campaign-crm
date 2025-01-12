import {type JsonInit, fetcher} from '@/api/fetcher'

const requestCache = new Map<string, Promise<unknown>>()

export function dedupeFetcher<T>(url: string, jsonInit?: JsonInit) {
  if (requestCache.has(url)) {
    return requestCache.get(url) as Promise<T>
  }

  const promise = fetcher<T>(url, jsonInit)

  promise.finally(() => {
    requestCache.delete(url)
  })

  requestCache.set(url, promise)

  return promise
}
