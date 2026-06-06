import React, { createContext, useContext, useEffect, useState } from 'react'
import api from '../services/api'
import { setToken } from '../services/tokenStore'

type Role = 'ADMIN' | 'PROFESSOR' | 'STUDENT'

interface AuthState {
  token: string | null
  role: Role | null
  userId: string | null
  loading: boolean
}

interface AuthContextData extends AuthState {
  signIn: (email: string, password: string) => Promise<Role>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

// Decodifica o payload JWT sem atob() (não disponível no React Native)
function decodeJwtPayload(token: string): Record<string, any> {
  try {
    const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')
    const json = Buffer.from(base64, 'base64').toString('utf8')
    return JSON.parse(json)
  } catch {
    return {}
  }
}

// Tenta salvar/ler do AsyncStorage sem crashar se o native module falhar
async function storageSave(key: string, value: string) {
  try {
    const AS = await import('@react-native-async-storage/async-storage')
    await AS.default.setItem(key, value)
  } catch { /* silencioso — não bloqueia o fluxo */ }
}

async function storageGet(key: string): Promise<string | null> {
  try {
    const AS = await import('@react-native-async-storage/async-storage')
    return await AS.default.getItem(key)
  } catch { return null }
}

async function storageRemove(key: string) {
  try {
    const AS = await import('@react-native-async-storage/async-storage')
    await AS.default.removeItem(key)
  } catch { /* silencioso */ }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    token: null,
    role: null,
    userId: null,
    loading: true,
  })

  // Restaura sessão persistida ao iniciar o app
  useEffect(() => {
    Promise.all([
      storageGet('@token'),
      storageGet('@role'),
      storageGet('@userId'),
    ]).then(([token, role, userId]) => {
      if (token) setToken(token)  // repõe token na memória
      setState({ token, role: role as Role | null, userId, loading: false })
    }).catch(() => {
      setState({ token: null, role: null, userId: null, loading: false })
    })
  }, [])

  async function signIn(email: string, password: string): Promise<Role> {
    console.log('[AuthContext] POST /api/auth/login — baseURL:', api.defaults.baseURL)
    const { data } = await api.post('/api/auth/login', { email, password })
    console.log('[AuthContext] Resposta:', JSON.stringify(data))

    const payload = decodeJwtPayload(data.token)
    console.log('[AuthContext] JWT payload:', JSON.stringify(payload))

    const role = data.role as Role

    // 1. Coloca token na memória imediatamente (interceptor usa isso)
    setToken(data.token)

    // 2. Persiste em background (falha silenciosamente se AsyncStorage indisponível)
    storageSave('@token', data.token)
    storageSave('@role', role)
    storageSave('@userId', payload.userId ?? '')

    setState({
      token: data.token,
      role,
      userId: payload.userId ?? null,
      loading: false,
    })

    return role
  }

  async function signOut() {
    setToken(null)
    storageRemove('@token')
    storageRemove('@role')
    storageRemove('@userId')
    setState({ token: null, role: null, userId: null, loading: false })
  }

  return (
    <AuthContext.Provider value={{ ...state, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
