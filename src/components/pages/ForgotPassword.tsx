import { useState, type FormEvent } from 'react'
import {
  ArrowLeft,
  CheckCircle2,
  Eye,
  EyeOff,
  KeyRound,
  Leaf,
  Loader2,
  Mail,
  ShieldCheck,
} from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { authService } from '../../services/authService'

type Step = 'REQUEST' | 'VERIFY' | 'SUCCESS'

function ForgotPassword() {
  const navigate = useNavigate()

  const [step, setStep] = useState<Step>('REQUEST')
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [demoCode, setDemoCode] = useState<string | null>(null)

  // Step 1: Request reset code
  const handleRequestCode = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')

    const trimmedEmail = email.trim()
    if (!trimmedEmail) {
      setError('Please enter your email address.')
      return
    }

    if (!trimmedEmail.includes('@') || !trimmedEmail.includes('.')) {
      setError('Please enter a valid email address.')
      return
    }

    try {
      setIsLoading(true)
      const res = await authService.forgotPassword({ email: trimmedEmail })
      if (res.demoCode) {
        setDemoCode(res.demoCode)
        setCode(res.demoCode) // Pre-fill for convenience
      }
      setStep('VERIFY')
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to request reset code. Please try again.',
      )
    } finally {
      setIsLoading(false)
    }
  }

  // Step 2: Verify code & set new password
  const handleResetPassword = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')

    if (!code.trim()) {
      setError('Please enter the verification code.')
      return
    }

    if (!newPassword || newPassword.length < 6) {
      setError('New password must be at least 6 characters.')
      return
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    try {
      setIsLoading(true)
      await authService.resetPassword({
        email: email.trim(),
        code: code.trim(),
        newPassword,
      })
      setStep('SUCCESS')
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to reset password. Please check your verification code.',
      )
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
                to="/login"
                className="inline-flex items-center gap-2 text-sm font-medium text-white/80 transition hover:text-white"
              >
                <ArrowLeft size={17} />
                Back to Sign In
              </Link>
            </div>

            <div>
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15">
                <Leaf size={28} />
              </div>

              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-moss-light">
                Green Basket Grocery
              </p>

              <h1 className="font-display text-4xl font-semibold leading-tight lg:text-5xl">
                Account
                <br />
                Recovery
              </h1>

              <p className="mt-6 max-w-md leading-7 text-white/75">
                Don't worry! It happens. Follow the simple steps to regain
                access to your Green Basket account and continue your grocery shopping.
              </p>
            </div>

            <p className="text-sm text-white/60">
              Safe. Secure. Always here.
            </p>
          </div>

          {/* Right Side */}
          <div className="p-7 sm:p-10 lg:p-14">
            <div className="mb-8 md:hidden">
              <Link
                to="/login"
                className="inline-flex items-center gap-2 text-sm font-medium text-bark-light transition hover:text-moss"
              >
                <ArrowLeft size={17} />
                Back to Sign In
              </Link>
            </div>

            {/* ==================================================== */}
            {/* STEP 1: Request Code Form                            */}
            {/* ==================================================== */}
            {step === 'REQUEST' && (
              <div>
                <div className="mb-8">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-moss-light text-moss">
                    <KeyRound size={22} />
                  </div>

                  <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-moss">
                    Trouble signing in?
                  </p>

                  <h2 className="font-display text-3xl font-semibold text-bark sm:text-4xl">
                    Forgot Password
                  </h2>

                  <p className="mt-3 text-sm leading-6 text-bark-light">
                    Enter the email associated with your account and we'll send you
                    a verification code to reset your password.
                  </p>
                </div>

                <form onSubmit={handleRequestCode} className="space-y-5">
                  <div>
                    <label
                      htmlFor="reset-email"
                      className="mb-2 block text-sm font-semibold text-bark"
                    >
                      Email Address
                    </label>

                    <div className="relative">
                      <input
                        id="reset-email"
                        type="email"
                        disabled={isLoading}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full rounded-xl border border-border bg-cream px-4 py-3 pl-11 text-sm text-bark outline-none transition placeholder:text-bark-light/50 focus:border-moss focus:ring-2 focus:ring-moss/10 disabled:opacity-60"
                      />
                      <Mail
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-bark-light/60"
                      />
                    </div>
                  </div>

                  {error && (
                    <div className="rounded-xl border border-rust/20 bg-rust-light px-4 py-3 text-sm font-medium text-rust">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-moss px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-bark disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        Sending verification code...
                      </>
                    ) : (
                      'Send Verification Code'
                    )}
                  </button>
                </form>

                <p className="mt-7 text-center text-sm text-bark-light">
                  Remember your password?{' '}
                  <Link
                    to="/login"
                    className="font-semibold text-moss transition hover:text-bark"
                  >
                    Sign in
                  </Link>
                </p>
              </div>
            )}

            {/* ==================================================== */}
            {/* STEP 2: Verify Code & Set New Password               */}
            {/* ==================================================== */}
            {step === 'VERIFY' && (
              <div>
                <div className="mb-6">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-moss-light text-moss">
                    <ShieldCheck size={22} />
                  </div>

                  <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-moss">
                    Step 2 of 2
                  </p>

                  <h2 className="font-display text-3xl font-semibold text-bark sm:text-4xl">
                    Set New Password
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-bark-light">
                    We sent a verification code to{' '}
                    <span className="font-semibold text-bark">{email}</span>.
                  </p>
                </div>

                {/* Demo Hint Banner */}
                {demoCode && (
                  <div className="mb-5 rounded-xl border border-moss/20 bg-moss-light/50 p-4 text-sm text-moss">
                    <p className="font-semibold">Demo Verification Code: {demoCode}</p>
                    <p className="mt-1 text-xs text-bark-light">
                      (Code has been automatically entered below for testing)
                    </p>
                  </div>
                )}

                <form onSubmit={handleResetPassword} className="space-y-4">
                  {/* Verification Code */}
                  <div>
                    <label
                      htmlFor="code"
                      className="mb-2 block text-sm font-semibold text-bark"
                    >
                      6-Digit Code
                    </label>

                    <input
                      id="code"
                      type="text"
                      maxLength={6}
                      disabled={isLoading}
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      placeholder="e.g. 849201"
                      className="w-full tracking-widest text-center rounded-xl border border-border bg-cream px-4 py-3 font-mono text-base font-semibold text-bark outline-none transition placeholder:text-bark-light/50 focus:border-moss focus:ring-2 focus:ring-moss/10 disabled:opacity-60"
                    />
                  </div>

                  {/* New Password */}
                  <div>
                    <label
                      htmlFor="new-password"
                      className="mb-2 block text-sm font-semibold text-bark"
                    >
                      New Password
                    </label>

                    <div className="relative">
                      <input
                        id="new-password"
                        type={showPassword ? 'text' : 'password'}
                        disabled={isLoading}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="At least 6 characters"
                        className="w-full rounded-xl border border-border bg-cream px-4 py-3 pr-12 text-sm text-bark outline-none transition placeholder:text-bark-light/50 focus:border-moss focus:ring-2 focus:ring-moss/10 disabled:opacity-60"
                      />

                      <button
                        type="button"
                        onClick={() => setShowPassword((c) => !c)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-bark-light transition hover:text-moss"
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                      >
                        {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                      </button>
                    </div>
                  </div>

                  {/* Confirm New Password */}
                  <div>
                    <label
                      htmlFor="confirm-new-password"
                      className="mb-2 block text-sm font-semibold text-bark"
                    >
                      Confirm New Password
                    </label>

                    <div className="relative">
                      <input
                        id="confirm-new-password"
                        type={showConfirmPassword ? 'text' : 'password'}
                        disabled={isLoading}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Re-enter your new password"
                        className="w-full rounded-xl border border-border bg-cream px-4 py-3 pr-12 text-sm text-bark outline-none transition placeholder:text-bark-light/50 focus:border-moss focus:ring-2 focus:ring-moss/10 disabled:opacity-60"
                      />

                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword((c) => !c)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-bark-light transition hover:text-moss"
                        aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                      >
                        {showConfirmPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                      </button>
                    </div>
                  </div>

                  {error && (
                    <div className="rounded-xl border border-rust/20 bg-rust-light px-4 py-3 text-sm font-medium text-rust">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-moss px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-bark disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        Updating password...
                      </>
                    ) : (
                      'Reset Password'
                    )}
                  </button>
                </form>

                <div className="mt-6 flex items-center justify-between text-xs text-bark-light">
                  <button
                    type="button"
                    onClick={() => {
                      setStep('REQUEST')
                      setError('')
                    }}
                    className="font-medium text-moss hover:underline"
                  >
                    Change email
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      const newCode = Math.floor(100000 + Math.random() * 900000).toString()
                      setDemoCode(newCode)
                      setCode(newCode)
                    }}
                    className="font-medium text-moss hover:underline"
                  >
                    Resend code
                  </button>
                </div>
              </div>
            )}

            {/* ==================================================== */}
            {/* STEP 3: Success Screen                               */}
            {/* ==================================================== */}
            {step === 'SUCCESS' && (
              <div className="py-6 text-center">
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  <CheckCircle2 size={44} />
                </div>

                <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-moss">
                  Success
                </p>

                <h2 className="font-display text-3xl font-semibold text-bark sm:text-4xl">
                  Password Reset!
                </h2>

                <p className="mx-auto mt-4 max-w-sm text-sm leading-6 text-bark-light">
                  Your password has been updated successfully. You can now use your
                  new password to sign in to your Green Basket account.
                </p>

                <button
                  type="button"
                  onClick={() =>
                    navigate('/login', {
                      state: {
                        message:
                          'Password reset successfully! Please sign in with your new password.',
                      },
                    })
                  }
                  className="mt-8 inline-flex w-full items-center justify-center rounded-xl bg-moss px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-bark"
                >
                  Back to Sign In
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}

export default ForgotPassword
