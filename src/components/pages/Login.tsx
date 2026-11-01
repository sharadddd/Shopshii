import { useState, type FormEvent } from 'react'
import { Eye, EyeOff, ArrowLeft, Loader2 } from 'lucide-react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  // Success message passed from signup page redirect
  const successMessage = (location.state as { message?: string })?.message

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setError('')

    if (!email.trim() || !password.trim()) {
      setError('Please enter your email and password.')
      return
    }

    if (!email.includes('@')) {
      setError('Please enter a valid email address.')
      return
    }

    try {
      setIsLoading(true)
      await login({
        email: email.trim(),
        password,
      })
      navigate('/')
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('Login failed. Please check your credentials.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-cream px-6 py-12 md:py-16">
      <div className="mx-auto flex min-h-[calc(100vh-6rem)] max-w-6xl items-center justify-center">
        <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl border border-border bg-white shadow-sm md:grid-cols-2">

          {/* Left Side */}
          <div className="hidden bg-moss p-10 text-white md:flex md:flex-col md:justify-between lg:p-14">
            <div>
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-sm font-medium text-white/80 transition hover:text-white"
              >
                <ArrowLeft size={17} />
                Back to Home
              </Link>
            </div>

            <div>
              <img
                src="/logo.svg"
                alt="Green Basket Grocery"
                className="mb-6 h-14 w-14 rounded-2xl shadow-lg ring-2 ring-white/20"
              />

              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-moss-light">
                Green Basket Grocery
              </p>

              <h1 className="font-display text-4xl font-semibold leading-tight lg:text-5xl">
                Fresh food,
                <br />
                close to home.
              </h1>

              <p className="mt-6 max-w-md leading-7 text-white/75">
                Sign in to continue shopping your everyday groceries with
                Green Basket.
              </p>
            </div>

            <p className="text-sm text-white/60">
              Fresh. Local. Always.
            </p>
          </div>

          {/* Right Side */}
          <div className="p-7 sm:p-10 lg:p-14">
            <div className="mb-8 md:hidden">
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-sm font-medium text-bark-light transition hover:text-moss"
              >
                <ArrowLeft size={17} />
                Back to Home
              </Link>
            </div>

            <div className="mb-8">
              <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-moss">
                Welcome back
              </p>

              <h2 className="font-display text-4xl font-semibold text-bark">
                Sign in
              </h2>

              <p className="mt-3 text-sm leading-6 text-bark-light">
                Enter your details to access your Green Basket account.
              </p>
            </div>

            {/* Success message banner */}
            {successMessage && !error && (
              <div className="mb-5 rounded-xl border border-moss/30 bg-moss-light/40 px-4 py-3 text-sm font-medium text-moss">
                {successMessage}
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              {/* Email */}
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
                  disabled={isLoading}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-border bg-cream px-4 py-3 text-sm text-bark outline-none transition placeholder:text-bark-light/50 focus:border-moss focus:ring-2 focus:ring-moss/10 disabled:opacity-60"
                />
              </div>

              {/* Password */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-semibold text-bark"
                  >
                    Password
                  </label>

                  <Link
                    to="/forgot-password"
                    className="text-xs font-semibold text-moss transition hover:text-bark"
                  >
                    Forgot password?
                  </Link>
                </div>

                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    disabled={isLoading}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full rounded-xl border border-border bg-cream px-4 py-3 pr-12 text-sm text-bark outline-none transition placeholder:text-bark-light/50 focus:border-moss focus:ring-2 focus:ring-moss/10 disabled:opacity-60"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword((current) => !current)
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-bark-light transition hover:text-moss"
                    aria-label={
                      showPassword
                        ? 'Hide password'
                        : 'Show password'
                    }
                  >
                    {showPassword ? (
                      <EyeOff size={19} />
                    ) : (
                      <Eye size={19} />
                    )}
                  </button>
                </div>
              </div>

              {/* Error */}
              {error && (
                <div className="rounded-xl border border-rust/20 bg-rust-light px-4 py-3 text-sm font-medium text-rust">
                  {error}
                </div>
              )}

              {/* Login */}
              <button
                type="submit"
                disabled={isLoading}
                className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-moss px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-bark disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isLoading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Signing in...
                  </>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>

            {/* Signup */}
            <p className="mt-7 text-center text-sm text-bark-light">
              Don't have an account?{' '}
              <Link
                to="/signup"
                className="font-semibold text-moss transition hover:text-bark"
              >
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Login
