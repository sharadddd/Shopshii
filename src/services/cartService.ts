import { apiClient } from './apiClient'

export interface AddToCartPayload {
  product_id: number
  quantity: number
}

export interface BackendCartItem {
  id?: number
  product_id?: number
  productId?: number
  quantity: number
  name?: string
  price?: number | string
  image?: string
}

export const cartService = {
  /**
   * Fetch current user's cart from backend GET /cart
   */
  async getCart(): Promise<BackendCartItem[]> {
    try {
      const response = await apiClient.get<BackendCartItem[] | { items?: BackendCartItem[] }>(
        '/cart',
        {
          requireAuth: true,
          fallbackEndpoint: '/api/cart',
        },
      )
      if (Array.isArray(response)) {
        return response
      }
      if (response && Array.isArray(response.items)) {
        return response.items
      }
      return []
    } catch (error) {
      console.warn('Backend getCart warning:', error)
      return []
    }
  },

  /**
   * Add product to cart on backend POST /cart/add
   */
  async addToCart(productId: number, quantity: number = 1): Promise<{ success: boolean; message?: string }> {
    try {
      const result = await apiClient.post<{ message?: string }>(
        '/cart/add',
        {
          product_id: productId,
          quantity,
        },
        {
          requireAuth: true,
          fallbackEndpoint: '/api/cart/add',
        },
      )
      return { success: true, message: result.message || 'Added to cart' }
    } catch (error) {
      // If backend returns relation does not exist or unauthenticated, handle safely
      console.warn('Backend addToCart sync note:', error)
      return { success: false, message: error instanceof Error ? error.message : 'Cart sync failed' }
    }
  },
}
