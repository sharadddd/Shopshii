export class ApiError extends Error {
  status: number
  data?: unknown

  constructor(message: string, status: number, data?: unknown) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.data = data
  }
}

export const TOKEN_STORAGE_KEY = 'green_basket_token'

export function getAuthToken(): string | null {
  return (
    localStorage.getItem(TOKEN_STORAGE_KEY) ||
    localStorage.getItem('slipcart_token')
  )
}

export function setAuthToken(token: string): void {
  localStorage.setItem(TOKEN_STORAGE_KEY, token)
  localStorage.setItem('slipcart_token', token)
}

export function clearAuthToken(): void {
  localStorage.removeItem(TOKEN_STORAGE_KEY)
  localStorage.removeItem('slipcart_token')
}

// In Vite development, route through '/api-proxy' to avoid browser CORS blocks.
// In production builds, target the deployed backend directly.
const envBase = import.meta.env.VITE_API_BASE_URL
const defaultBackendUrl = 'https://slipcartbackend.onrender.com'

const rawBaseUrl = import.meta.env.PROD
  ? (!envBase || envBase === '/api-proxy' ? defaultBackendUrl : envBase)
  : (envBase || '/api-proxy')

export const API_BASE_URL = rawBaseUrl.replace(/\/+$/, '')

interface RequestOptions extends RequestInit {
  requireAuth?: boolean
  fallbackEndpoint?: string
  params?: Record<string, string | number | boolean | undefined>
}

async function parseResponseBody(response: Response): Promise<unknown> {
  const contentType = response.headers.get('content-type') || ''
  if (contentType.includes('application/json')) {
    try {
      return await response.json()
    } catch {
      return null
    }
  }
  return await response.text()
}

/**
 * Core HTTP client wrapping native fetch with:
 * - Automatic base URL prepending
 * - Automatic Bearer token header attachment
 * - Standard JSON headers
 * - Normalized error handling
 * - Fallback endpoint retry for API route compatibility
 * - Automatic proxy fallback in development when CORS is not configured on backend
 */
export async function apiRequest<T>(
  endpoint: string,
  options: RequestOptions = {},
): Promise<T> {
  const {
    requireAuth = false,
    fallbackEndpoint,
    params,
    headers: customHeaders = {},
    ...customOptions
  } = options

  // Normalize path
  const normalizedPath = endpoint.startsWith('/') ? endpoint : `/${endpoint}`
  let url = `${API_BASE_URL}${normalizedPath}`

  // Append query params if present
  let queryString = ''
  if (params) {
    const searchParams = new URLSearchParams()
    Object.entries(params).forEach(([key, val]) => {
      if (val !== undefined && val !== null) {
        searchParams.append(key, String(val))
      }
    })
    queryString = searchParams.toString()
    if (queryString) {
      url += (url.includes('?') ? '&' : '?') + queryString
    }
  }

  const headers = new Headers(customHeaders)

  // Default to application/json for requests with a body
  if (
    !headers.has('Content-Type') &&
    customOptions.body &&
    typeof customOptions.body === 'string'
  ) {
    headers.set('Content-Type', 'application/json')
  }

  if (!headers.has('Accept')) {
    headers.set('Accept', 'application/json')
  }

  // Attach Authorization header if token exists
  const token = getAuthToken()
  if (token && !headers.has('Authorization')) {
    headers.set('Authorization', `Bearer ${token}`)
  } else if (requireAuth && !token) {
    throw new ApiError('Authentication required. Please log in.', 401)
  }

  let response: Response
  try {
    response = await fetch(url, {
      ...customOptions,
      headers,
    })
  } catch (networkError) {
    // If in Vite dev mode and direct call failed (e.g. browser blocked CORS preflight),
    // automatically retry via the Vite dev reverse proxy '/api-proxy'.
    if (import.meta.env.DEV && !url.startsWith('/api-proxy')) {
      try {
        let proxyUrl = `/api-proxy${normalizedPath}`
        if (queryString) {
          proxyUrl += (proxyUrl.includes('?') ? '&' : '?') + queryString
        }
        response = await fetch(proxyUrl, {
          ...customOptions,
          headers,
        })
      } catch {
        const message =
          networkError instanceof Error
            ? networkError.message
            : 'Network connection failed'
        throw new ApiError(
          `Unable to connect to backend (${API_BASE_URL}): ${message}. If running in browser, please ensure CORS is enabled on the backend.`,
          0,
        )
      }
    } else {
      const message =
        networkError instanceof Error
          ? networkError.message
          : 'Network connection failed'
      throw new ApiError(
        `Unable to connect to backend (${API_BASE_URL}): ${message}. If running in browser, please ensure CORS is enabled on the backend.`,
        0,
      )
    }
  }

  // Handle 404 with optional fallback endpoint
  if (response.status === 404 && fallbackEndpoint) {
    return apiRequest<T>(fallbackEndpoint, {
      ...options,
      fallbackEndpoint: undefined, // Prevent infinite retry loops
    })
  }

  const data = await parseResponseBody(response)

  if (!response.ok) {
    let errorMessage = `HTTP Error ${response.status}`

    if (data && typeof data === 'object') {
      const errObj = data as Record<string, unknown>
      if (typeof errObj.error === 'string') {
        errorMessage = errObj.error
      } else if (typeof errObj.message === 'string') {
        errorMessage = errObj.message
      }
    } else if (typeof data === 'string' && data.trim()) {
      errorMessage = data
    }

    throw new ApiError(errorMessage, response.status, data)
  }

  return data as T
}

export const apiClient = {
  get<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    return apiRequest<T>(endpoint, { ...options, method: 'GET' })
  },

  post<T>(
    endpoint: string,
    body?: unknown,
    options?: RequestOptions,
  ): Promise<T> {
    return apiRequest<T>(endpoint, {
      ...options,
      method: 'POST',
      body: body !== undefined ? JSON.stringify(body) : undefined,
    })
  },

  put<T>(
    endpoint: string,
    body?: unknown,
    options?: RequestOptions,
  ): Promise<T> {
    return apiRequest<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: body !== undefined ? JSON.stringify(body) : undefined,
    })
  },

  delete<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    return apiRequest<T>(endpoint, { ...options, method: 'DELETE' })
  },
}
