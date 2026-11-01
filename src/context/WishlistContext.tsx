import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

import type { Product } from '../data/products'

type WishlistContextType = {
  wishlistItems: Product[]
  wishlistCount: number
  addToWishlist: (product: Product) => void
  removeFromWishlist: (productId: number) => void
  isInWishlist: (productId: number) => boolean
}

const WishlistContext = createContext<
  WishlistContextType | undefined
>(undefined)

type WishlistProviderProps = {
  children: ReactNode
}

export function WishlistProvider({
  children,
}: WishlistProviderProps) {
  const [wishlistItems, setWishlistItems] = useState<Product[]>([])

  const addToWishlist = (product: Product) => {
    setWishlistItems((currentItems) => {
      const alreadyExists = currentItems.some(
        (item) => item.id === product.id,
      )

      if (alreadyExists) {
        return currentItems
      }

      return [...currentItems, product]
    })
  }

  const removeFromWishlist = (productId: number) => {
    setWishlistItems((currentItems) =>
      currentItems.filter((item) => item.id !== productId),
    )
  }

  const isInWishlist = (productId: number) => {
    return wishlistItems.some((item) => item.id === productId)
  }

  const wishlistCount = useMemo(
    () => wishlistItems.length,
    [wishlistItems],
  )

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        wishlistCount,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useWishlist() {
  const context = useContext(WishlistContext)

  if (!context) {
    throw new Error(
      'useWishlist must be used inside WishlistProvider',
    )
  }

  return context
}