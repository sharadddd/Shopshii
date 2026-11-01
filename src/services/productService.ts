import { apiClient } from './apiClient'
import { products as fallbackProducts, type Product } from '../data/products'

export interface BackendProduct {
  id?: number | string
  name?: string
  title?: string
  category?: string
  price?: number | string
  inStock?: boolean
  in_stock?: boolean
  quantity?: string | number
  image?: string
  image_url?: string
  imageUrl?: string
  description?: string
}

function normalizeProduct(raw: BackendProduct, index: number): Product {
  const rawPrice = raw.price
  let priceStr = '$0.00'
  if (typeof rawPrice === 'number') {
    priceStr = `$${rawPrice.toFixed(2)}`
  } else if (typeof rawPrice === 'string') {
    priceStr = rawPrice.startsWith('$') ? rawPrice : `$${rawPrice}`
  }

  const inStock =
    raw.inStock !== undefined
      ? Boolean(raw.inStock)
      : raw.in_stock !== undefined
        ? Boolean(raw.in_stock)
        : true

  return {
    id: Number(raw.id || index + 1),
    name: String(raw.name || raw.title || `Product #${index + 1}`),
    category: String(raw.category || 'Grocery'),
    price: priceStr,
    inStock,
    quantity: String(raw.quantity || (inStock ? 'In stock' : 'Out of stock')),
    image: String(
      raw.image ||
        raw.image_url ||
        raw.imageUrl ||
        'https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&h=500&fit=crop&auto=format',
    ),
  }
}

export const productService = {
  /**
   * Fetch all products from backend GET /products (fallback GET /api/products).
   * Gracefully returns local catalog if backend database has no products yet.
   */
  async getProducts(): Promise<{ products: Product[]; isLive: boolean }> {
    try {
      const response = await apiClient.get<BackendProduct[] | { products?: BackendProduct[] }>(
        '/products',
        {
          fallbackEndpoint: '/api/products',
        },
      )

      let rawList: BackendProduct[] = []
      if (Array.isArray(response)) {
        rawList = response
      } else if (response && Array.isArray(response.products)) {
        rawList = response.products
      }

      if (rawList.length > 0) {
        return {
          products: rawList.map((p, idx) => normalizeProduct(p, idx)),
          isLive: true,
        }
      }

      // If backend returns empty list (no products populated in database yet),
      // provide the default fallback products so storefront remains populated.
      return {
        products: fallbackProducts,
        isLive: true,
      }
    } catch (error) {
      console.warn('Backend product fetch failed, using local product catalog:', error)
      return {
        products: fallbackProducts,
        isLive: false,
      }
    }
  },

  /**
   * Fetch a single product by ID
   */
  async getProductById(id: number): Promise<Product | null> {
    try {
      const response = await apiClient.get<BackendProduct>(
        `/products/${id}`,
        {
          fallbackEndpoint: `/api/products/${id}`,
        },
      )
      if (response && response.name) {
        return normalizeProduct(response, 0)
      }
    } catch {
      // Fall through to fallback
    }

    const localMatch = fallbackProducts.find((p) => p.id === id)
    return localMatch || null
  },
}
