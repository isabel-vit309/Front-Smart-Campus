import axios from 'axios'
import { BASE_URL } from '../config'
import { getToken } from './tokenStore'

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
})

// Interceptor síncrono — lê token da memória, sem chamar AsyncStorage
api.interceptors.request.use((config) => {
  const token = getToken()
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export default api
