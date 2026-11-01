import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from 'react'
import {
  authService,
  type LoginPayload,
  type RegisterPayload,
} from '../services/authService'
import {
  clearAuthToken,
  getAuthToken,
} from '../services/apiClient'

export type User = {
  name: string
  email: string
  phone?: string
  id?: number
}

type AuthContextType = {
  user: User | null
  token: string | null
  isLoggedIn: boolean
  isLoading: boolean
  login: (
    emailOrPayload: string | LoginPayload | User,
    password?: string,
  ) => Promise<void>
  register: (data: RegisterPayload) => Promise<{ message: string }>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

type AuthProviderProps = {
  children: ReactNode
}

const AUTH_STORAGE_KEY = 'green_basket_user'

export function AuthProvider({ children }: AuthProviderProps) {
  const [token, setToken] = useState<string | null>(() => getAuthToken())
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem(AUTH_STORAGE_KEY)
    if (saved) {
      try {
        return JSON.parse(saved) as User
      } catch {
        localStorage.removeItem(AUTH_STORAGE_KEY)
      }
    }
    const savedToken = getAuthToken()
    if (savedToken) {
      return { name: 'Account', email: '' }
    }
    return null
  })
  const [isLoading] = useState(false)

  const login = async (
    emailOrPayload: string | LoginPayload | User,
    password?: string,
  ): Promise<void> => {
    let email: string
    let pass: string

    if (typeof emailOrPayload === 'string') {
      email = emailOrPayload
      pass = password || ''
    } else if ('password' in emailOrPayload && emailOrPayload.password) {
      email = emailOrPayload.email
      pass = emailOrPayload.password
    } else {
      // Backward compatibility if direct user object was passed
      const directUser = emailOrPayload as User
      setUser(directUser)
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(directUser))
      return
    }

    // Call live backend login
    const result = await authService.login({
      email,
      password: pass,
    })

    const authenticatedUser: User = result.user || {
      name: email.split('@')[0],
      email,
    }

    setToken(result.token)
    setUser(authenticatedUser)
    localStorage.setItem(
      AUTH_STORAGE_KEY,
      JSON.stringify(authenticatedUser),
    )
  }

  const register = async (
    data: RegisterPayload,
  ): Promise<{ message: string }> => {
    return authService.register(data)
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem(AUTH_STORAGE_KEY)
    clearAuthToken()
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoggedIn: user !== null || token !== null,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider')
  }

  return context
}
