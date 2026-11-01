import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

import type { Product } from '../data/products'
import { cartService } from '../services/cartService'
import { getAuthToken } from '../services/apiClient'

type CartItem = Product & {
  cartQuantity: number
}

type CartContextType = {
  cartItems: CartItem[]
  cartCount: number
  cartTotal: number
  isSyncing: boolean
  addToCart: (product: Product, quantity?: number) => Promise<void>
  increaseQuantity: (productId: number) => void
  decreaseQuantity: (productId: number) => void
  removeFromCart: (productId: number) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

type CartProviderProps = {
  children: ReactNode
}

const CART_STORAGE_KEY = 'green_basket_cart'

export function CartProvider({ children }: CartProviderProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY)
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })
  const [isSyncing, setIsSyncing] = useState(false)

  // Persist cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems))
    } catch {
      // Storage full or private mode
    }
  }, [cartItems])

  const addToCart = async (product: Product, quantity: number = 1) => {
    // 1. Optimistic local update
    setCartItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) => item.id === product.id,
      )

      if (existingItem) {
        return currentItems.map((item) =>
          item.id === product.id
            ? {
                ...item,
                cartQuantity: item.cartQuantity + quantity,
              }
            : item,
        )
      }

      return [
        ...currentItems,
        {
          ...product,
          cartQuantity: quantity,
        },
      ]
    })

    // 2. Synchronize with backend if user has an auth token
    const token = getAuthToken()
    if (token) {
      try {
        setIsSyncing(true)
        await cartService.addToCart(product.id, quantity)
      } catch (err) {
        console.warn('Backend cart sync note:', err)
      } finally {
        setIsSyncing(false)
      }
    }
  }

  const increaseQuantity = (productId: number) => {
    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.id === productId
          ? {
              ...item,
              cartQuantity: item.cartQuantity + 1,
            }
          : item,
      ),
    )

    const token = getAuthToken()
    if (token) {
      cartService.addToCart(productId, 1).catch(() => {})
    }
  }

  const decreaseQuantity = (productId: number) => {
    setCartItems((currentItems) =>
      currentItems
        .map((item) =>
          item.id === productId
            ? {
                ...item,
                cartQuantity: item.cartQuantity - 1,
              }
            : item,
        )
        .filter((item) => item.cartQuantity > 0),
    )
  }

  const removeFromCart = (productId: number) => {
    setCartItems((currentItems) =>
      currentItems.filter((item) => item.id !== productId),
    )
  }

  const clearCart = () => {
    setCartItems([])
    localStorage.removeItem(CART_STORAGE_KEY)
  }

  const cartCount = useMemo(() => {
    return cartItems.reduce(
      (total, item) => total + item.cartQuantity,
      0,
    )
  }, [cartItems])

  const cartTotal = useMemo(() => {
    return cartItems.reduce((total, item) => {
      const price = Number(
        item.price.replace(/[^0-9.]/g, ''),
      )

      return total + price * item.cartQuantity
    }, 0)
  }, [cartItems])

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        cartTotal,
        isSyncing,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCart() {
  const context = useContext(CartContext)

  if (!context) {
    throw new Error('useCart must be used inside CartProvider')
  }

  return context
}
