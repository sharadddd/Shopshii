import { useState, type FormEvent } from 'react'
import {
  ArrowLeft,
  CreditCard,
  MapPin,
  ShoppingBag,
} from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'

import { useCart } from '../../context/CartContext'

function Checkout() {
  const navigate = useNavigate()

  const {
    cartItems,
    cartTotal,
    clearCart,
  } = useCart()

  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [pincode, setPincode] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('cod')
  const [error, setError] = useState('')

  if (cartItems.length === 0) {
    return (
      <main className="min-h-screen bg-cream px-6 py-20">
        <div className="mx-auto max-w-2xl rounded-3xl border border-border bg-white px-6 py-16 text-center">

          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-cream-dark">
            <ShoppingBag
              size={36}
              className="text-moss"
            />
          </div>

          <h1 className="mt-6 font-display text-3xl font-semibold text-bark">
            Your cart is empty
          </h1>

          <p className="mt-3 text-bark-light">
            Add some groceries before proceeding to checkout.
          </p>

          <Link
            to="/products"
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-moss px-6 py-3 font-semibold text-white transition hover:bg-bark"
          >
            <ShoppingBag size={18} />
            Start Shopping
          </Link>

        </div>
      </main>
    )
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setError('')

    if (
      !fullName.trim() ||
      !email.trim() ||
      !phone.trim() ||
      !address.trim() ||
      !city.trim() ||
      !pincode.trim()
    ) {
      setError('Please fill in all delivery details.')
      return
    }

    if (!email.includes('@')) {
      setError('Please enter a valid email address.')
      return
    }

    if (phone.replace(/\D/g, '').length < 10) {
      setError('Please enter a valid phone number.')
      return
    }

    if (pincode.replace(/\D/g, '').length !== 6) {
      setError('Please enter a valid 6-digit pincode.')
      return
    }

    const orderId = `GB-${Date.now()
      .toString()
      .slice(-6)}`

    const itemCount = cartItems.reduce(
      (total, item) => total + item.cartQuantity,
      0,
    )

    clearCart()

    navigate('/order-success', {
      state: {
        orderId,
        total: cartTotal,
        itemCount,
      },
    })
  }

  return (
    <main className="min-h-screen bg-cream">

      {/* Header */}
      <section className="border-b border-border bg-cream-dark">
        <div className="mx-auto max-w-7xl px-6 py-12">

          <Link
            to="/cart"
            className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-bark-light transition hover:text-moss"
          >
            <ArrowLeft size={17} />
            Back to Cart
          </Link>

          <h1 className="font-display text-4xl font-semibold text-bark md:text-5xl">
            Checkout
          </h1>

          <p className="mt-3 text-bark-light">
            Complete your details and place your order.
          </p>

        </div>
      </section>

      {/* Checkout */}
      <section className="mx-auto max-w-7xl px-6 py-12">

        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">

          {/* =========================
              Delivery Details
          ========================= */}
          <div className="rounded-3xl border border-border bg-white p-6 md:p-8">

            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-moss-light">
                <MapPin
                  size={21}
                  className="text-moss"
                />
              </div>

              <div>
                <h2 className="font-display text-2xl font-semibold text-bark">
                  Delivery Details
                </h2>

                <p className="text-sm text-bark-light">
                  Where should we deliver your groceries?
                </p>
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="mt-8 space-y-5"
            >

              {/* Name + Email */}
              <div className="grid gap-5 md:grid-cols-2">

                <div>
                  <label
                    htmlFor="fullName"
                    className="mb-2 block text-sm font-semibold text-bark"
                  >
                    Full Name
                  </label>

                  <input
                    id="fullName"
                    type="text"
                    value={fullName}
                    onChange={(e) =>
                      setFullName(e.target.value)
                    }
                    placeholder="Enter your full name"
                    className="w-full rounded-xl border border-border bg-cream px-4 py-3 text-sm text-bark outline-none transition placeholder:text-bark-light/50 focus:border-moss"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-semibold text-bark"
                  >
                    Email Address
                  </label>

                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-border bg-cream px-4 py-3 text-sm text-bark outline-none transition placeholder:text-bark-light/50 focus:border-moss"
                  />
                </div>

              </div>

              {/* Phone */}
              <div>
                <label
                  htmlFor="phone"
                  className="mb-2 block text-sm font-semibold text-bark"
                >
                  Phone Number
                </label>

                <input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) =>
                    setPhone(e.target.value)
                  }
                  placeholder="Enter your phone number"
                  className="w-full rounded-xl border border-border bg-cream px-4 py-3 text-sm text-bark outline-none transition placeholder:text-bark-light/50 focus:border-moss"
                />
              </div>

              {/* Address */}
              <div>
                <label
                  htmlFor="address"
                  className="mb-2 block text-sm font-semibold text-bark"
                >
                  Address
                </label>

                <textarea
                  id="address"
                  value={address}
                  onChange={(e) =>
                    setAddress(e.target.value)
                  }
                  placeholder="House no., street, area"
                  rows={3}
                  className="w-full resize-none rounded-xl border border-border bg-cream px-4 py-3 text-sm text-bark outline-none transition placeholder:text-bark-light/50 focus:border-moss"
                />
              </div>

              {/* City + Pincode */}
              <div className="grid gap-5 md:grid-cols-2">

                <div>
                  <label
                    htmlFor="city"
                    className="mb-2 block text-sm font-semibold text-bark"
                  >
                    City
                  </label>

                  <input
                    id="city"
                    type="text"
                    value={city}
                    onChange={(e) =>
                      setCity(e.target.value)
                    }
                    placeholder="Enter your city"
                    className="w-full rounded-xl border border-border bg-cream px-4 py-3 text-sm text-bark outline-none transition placeholder:text-bark-light/50 focus:border-moss"
                  />
                </div>

                <div>
                  <label
                    htmlFor="pincode"
                    className="mb-2 block text-sm font-semibold text-bark"
                  >
                    Pincode
                  </label>

                  <input
                    id="pincode"
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    value={pincode}
                    onChange={(e) =>
                      setPincode(
                        e.target.value.replace(/\D/g, ''),
                      )
                    }
                    placeholder="6-digit pincode"
                    className="w-full rounded-xl border border-border bg-cream px-4 py-3 text-sm text-bark outline-none transition placeholder:text-bark-light/50 focus:border-moss"
                  />
                </div>

              </div>

              {/* Payment */}
              <div className="pt-3">

                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-moss-light">
                    <CreditCard
                      size={21}
                      className="text-moss"
                    />
                  </div>

                  <div>
                    <h2 className="font-display text-2xl font-semibold text-bark">
                      Payment
                    </h2>

                    <p className="text-sm text-bark-light">
                      Choose your payment method.
                    </p>
                  </div>
                </div>

                <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-moss bg-moss-light/40 p-4">
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={paymentMethod === 'cod'}
                    onChange={(e) =>
                      setPaymentMethod(e.target.value)
                    }
                    className="h-4 w-4 accent-moss"
                  />

                  <div>
                    <p className="font-semibold text-bark">
                      Cash on Delivery
                    </p>

                    <p className="text-sm text-bark-light">
                      Pay when your groceries arrive.
                    </p>
                  </div>
                </label>

              </div>

              {/* Error */}
              {error && (
                <div className="rounded-xl border border-rust/20 bg-rust-light px-4 py-3 text-sm font-medium text-rust">
                  {error}
                </div>
              )}

              {/* Mobile Place Order */}
              <button
                type="submit"
                className="w-full cursor-pointer rounded-xl bg-moss px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-bark lg:hidden"
              >
                Place Order
              </button>

            </form>

          </div>

          {/* =========================
              Order Summary
          ========================= */}
          <aside className="h-fit rounded-3xl border border-border bg-white p-6 lg:sticky lg:top-28">

            <h2 className="font-display text-2xl font-semibold text-bark">
              Order Summary
            </h2>

            <div className="mt-6 space-y-4">

              {cartItems.map((item) => (

                <div
                  key={item.id}
                  className="flex items-center gap-3"
                >

                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-14 w-14 rounded-xl object-cover"
                  />

                  <div className="min-w-0 flex-1">

                    <p className="truncate text-sm font-semibold text-bark">
                      {item.name}
                    </p>

                    <p className="text-xs text-bark-light">
                      Qty: {item.cartQuantity}
                    </p>

                  </div>

                  <span className="text-sm font-semibold text-bark">
                    $
                    {(
                      Number(
                        item.price.replace(
                          /[^0-9.]/g,
                          '',
                        ),
                      ) * item.cartQuantity
                    ).toFixed(2)}
                  </span>

                </div>

              ))}

            </div>

            <div className="my-6 border-t border-border" />

            <div className="space-y-3 text-sm">

              <div className="flex justify-between text-bark-light">
                <span>Subtotal</span>
                <span>
                  ${cartTotal.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between text-bark-light">
                <span>Delivery</span>
                <span className="font-semibold text-moss">
                  Free
                </span>
              </div>

            </div>

            <div className="my-6 border-t border-border" />

            <div className="flex items-center justify-between">
              <span className="font-semibold text-bark">
                Total
              </span>

              <span className="text-2xl font-semibold text-rust">
                ${cartTotal.toFixed(2)}
              </span>
            </div>

            {/* Desktop Place Order */}
            <button
              type="button"
              onClick={() => {
                document
                  .querySelector('form')
                  ?.requestSubmit()
              }}
              className="mt-7 hidden w-full cursor-pointer rounded-xl bg-moss px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-bark lg:block"
            >
              Place Order
            </button>

            <p className="mt-4 text-center text-xs leading-5 text-bark-light">
              Your order is currently frontend-only. Backend
              order processing will be connected later.
            </p>

          </aside>

        </div>

      </section>

    </main>
  )
}

export default Checkout