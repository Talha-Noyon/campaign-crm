import axios, {type InternalAxiosRequestConfig} from 'axios'

import {localAuth} from '@/store/LocalAuth'

import {API_URL} from '@/utils/Common'

function onRequest(config: InternalAxiosRequestConfig) {
  const auth = localAuth.get()

  config.headers['Content-Type'] ??= 'application/json'

  if (auth) {
    config.headers.Authorization ??= `Bearer ${auth.token}`
  }

  return config
}

export const api = axios.create({
  baseURL: API_URL
})

api.interceptors.request.use(onRequest)
