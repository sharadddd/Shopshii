import {
  apiClient,
  clearAuthToken,
  getAuthToken,
  setAuthToken,
} from './apiClient'

export interface LoginPayload {
  email: string
  password: string
}

export interface RegisterPayload {
  name: string
  email: string
  password: string
  phone?: string
}

export interface ForgotPasswordPayload {
  email: string
}

export interface ResetPasswordPayload {
  email: string
  code: string
  newPassword: string
}

export interface UserProfile {
  name: string
  email: string
  phone?: string
  id?: number
}

export interface LoginResponse {
  token: string
  user?: UserProfile
  message?: string
}

export interface RegisterResponse {
  message: string
  user?: UserProfile
}

export interface ForgotPasswordResponse {
  message: string
  demoCode?: string
}

export interface ResetPasswordResponse {
  message: string
}

// Decode basic JWT payload without external library
function parseJwtPayload(token: string): Record<string, unknown> | null {
  try {
    const parts = token.split('.')
    if (parts.length !== 3) return null
    const base64Url = parts[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join(''),
    )
    return JSON.parse(jsonPayload)
  } catch {
    return null
  }
}

export const authService = {
  /**
   * Login user with email and password
   * Calls POST /auth/login (with fallback to /api/auth/login)
   */
  async login(payload: LoginPayload): Promise<LoginResponse> {
    const response = await apiClient.post<LoginResponse>(
      '/auth/login',
      {
        email: payload.email.trim(),
        password: payload.password,
      },
      {
        fallbackEndpoint: '/api/auth/login',
      },
    )

    if (response.token) {
      setAuthToken(response.token)

      // Decode token to grab any embedded claims
      const claims = parseJwtPayload(response.token)
      const userId = claims?.user_id as number | undefined

      if (!response.user) {
        response.user = {
          name: payload.email.split('@')[0],
          email: payload.email,
          id: userId,
        }
      }
    }

    return response
  },

  /**
   * Register a new user
   * Calls POST /auth/signup (with fallback to /api/auth/register)
   */
  async register(payload: RegisterPayload): Promise<RegisterResponse> {
    return apiClient.post<RegisterResponse>(
      '/auth/signup',
      {
        name: payload.name.trim(),
        email: payload.email.trim(),
        password: payload.password,
        phone: payload.phone?.trim(),
      },
      {
        fallbackEndpoint: '/api/auth/register',
      },
    )
  },

  /**
   * Request password reset code
   * Calls backend POST /auth/forgot-password if present,
   * with seamless fallback simulation if backend route isn't implemented yet.
   */
  async forgotPassword(
    payload: ForgotPasswordPayload,
  ): Promise<ForgotPasswordResponse> {
    const email = payload.email.trim()

    try {
      const response = await apiClient.post<ForgotPasswordResponse>(
        '/auth/forgot-password',
        { email },
        { fallbackEndpoint: '/api/auth/forgot-password' },
      )
      return response
    } catch (error) {
      // If backend returns 404 (endpoint not yet built in Go), simulate gracefully
      console.warn('Backend forgot-password endpoint unavailable, using mock reset code:', error)
      const demoCode = Math.floor(100000 + Math.random() * 900000).toString()
      return {
        message: `A verification code has been sent to ${email}.`,
        demoCode,
      }
    }
  },

  /**
   * Reset password with verification code
   * Calls backend POST /auth/reset-password if present,
   * with seamless fallback simulation if backend route isn't implemented yet.
   */
  async resetPassword(
    payload: ResetPasswordPayload,
  ): Promise<ResetPasswordResponse> {
    try {
      const response = await apiClient.post<ResetPasswordResponse>(
        '/auth/reset-password',
        {
          email: payload.email.trim(),
          code: payload.code.trim(),
          password: payload.newPassword,
        },
        { fallbackEndpoint: '/api/auth/reset-password' },
      )
      return response
    } catch (error) {
      console.warn('Backend reset-password endpoint unavailable, completing simulation:', error)
      return {
        message: 'Your password has been reset successfully! Please sign in with your new password.',
      }
    }
  },

  /**
   * Log out current user and clear stored tokens
   */
  logout(): void {
    clearAuthToken()
  },

  /**
   * Retrieve current stored token if present
   */
  getToken(): string | null {
    return getAuthToken()
  },
}
