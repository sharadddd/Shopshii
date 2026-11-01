import { BrowserRouter, Route, Routes } from 'react-router-dom'

import ScrollToTop from './components/ScrollToTop'
import ErrorBoundary from './components/ErrorBoundary'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import Categories from './components/Categories'
import FeaturedProducts from './components/FeaturedProducts'
import AboutSection from './components/AboutSection'
import Newsletter from './components/Newsletter'
import Footer from './components/Footer'

import Products from './components/pages/Products'
import ProductDetails from './components/pages/ProductDetails'
import Cart from './components/pages/Cart'
import Checkout from './components/pages/Checkout'
import Login from './components/pages/Login'
import Signup from './components/pages/Signup'
import ForgotPassword from './components/pages/ForgotPassword'
import Wishlist from './components/pages/Wishlist'
import OrderSuccess from './components/pages/OrderSuccess'
import MyOrders from './components/pages/MyOrders'
import Account from './components/pages/Account'
import NotFound from './components/pages/NotFound'

import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import { WishlistProvider } from './context/WishlistContext'

function Home() {
  return (
    <>
      <Hero />
      <Features />
      <Categories />
      <FeaturedProducts />
      <AboutSection />
      <Newsletter />
    </>
  )
}

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <ScrollToTop />
        <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <div className="min-h-screen bg-cream">
              <Navbar />

              <Routes>
                {/* Home */}
                <Route
                  path="/"
                  element={<Home />}
                />

                {/* Products */}
                <Route
                  path="/products"
                  element={<Products />}
                />

                {/* Product Details */}
                <Route
                  path="/products/:id"
                  element={<ProductDetails />}
                />

                {/* Cart */}
                <Route
                  path="/cart"
                  element={<Cart />}
                />

                {/* Checkout */}
                <Route
                  path="/checkout"
                  element={<Checkout />}
                />

                {/* Authentication */}
                <Route
                  path="/login"
                  element={<Login />}
                />

                <Route
                  path="/signup"
                  element={<Signup />}
                />

                <Route
                  path="/forgot-password"
                  element={<ForgotPassword />}
                />

                {/* Wishlist */}
                <Route
                  path="/wishlist"
                  element={<Wishlist />}
                />

                {/* Orders */}
                <Route
                  path="/orders"
                  element={<MyOrders />}
                />

                {/* Order Success */}
                <Route
                  path="/order-success"
                  element={<OrderSuccess />}
                />

                {/* Account */}
                <Route
                  path="/account"
                  element={<Account />}
                />

                {/* 404 Fallback */}
                <Route
                  path="*"
                  element={<NotFound />}
                />
              </Routes>

              <Footer />
            </div>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  </ErrorBoundary>
  )
}

export default App