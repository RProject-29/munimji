import React, { useState } from 'react'
import {
  Mail,
  Lock,
  User as UserIcon,
  LogOut,
  Globe2,
  Sparkles,
  ArrowRight,
  AlertCircle,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { useLanguage, LANGUAGES } from '../context/LanguageContext.jsx'
import PassbookCard from '../components/PassbookCard.jsx'

export default function Profile() {
  const { user, isGuest, displayName, displayEmail, loginWithEmail, signupWithEmail, loginWithGoogle, logout } = useAuth()
  const { language, setLanguage, t } = useLanguage()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleEmailAuth(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      if (isSignUp) {
        if (!name.trim()) return setError('Please enter your name')
        await signupWithEmail(name.trim(), email.trim(), password)
      } else {
        await loginWithEmail(email.trim(), password)
      }
    } catch (err) {
      setError(
        err.code === 'auth/user-not-found' ? 'No account found with this email' :
        err.code === 'auth/wrong-password' ? 'Incorrect password' :
        err.code === 'auth/email-already-in-use' ? 'Email already registered — sign in instead' :
        err.code === 'auth/weak-password' ? 'Password must be at least 6 characters' :
        err.message
      )
    } finally {
      setLoading(false)
    }
  }

  async function handleGoogle() {
    setError('')
    setLoading(true)
    try {
      await loginWithGoogle()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-5 md:max-w-2xl">
      <h1 className="font-display text-xl md:text-2xl font-semibold text-navy">
        {t('profile_title')}
      </h1>

      {isGuest ? (
        <PassbookCard eyebrow="Guest mode" title={isSignUp ? 'Create your account' : t('profile_guest_title')}>
          <p className="text-sm text-ink-light leading-relaxed mb-4">
            {t('profile_guest_desc')}
          </p>

          {error && (
            <div className="flex items-start gap-2 bg-red-50 border border-red-100 rounded-lg px-3 py-2 mb-3">
              <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-red-700">{error}</p>
            </div>
          )}

          <form onSubmit={handleEmailAuth} className="space-y-3 max-w-sm">
            {isSignUp && (
              <FieldInput
                icon={UserIcon}
                type="text"
                placeholder="Your name"
                value={name}
                onChange={setName}
              />
            )}
            <FieldInput
              icon={Mail}
              type="email"
              placeholder={t('profile_email_placeholder')}
              value={email}
              onChange={setEmail}
            />
            <FieldInput
              icon={Lock}
              type="password"
              placeholder={t('profile_password_placeholder')}
              value={password}
              onChange={setPassword}
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-saffron text-white font-semibold text-sm rounded-xl py-2.5 disabled:opacity-50"
            >
              {loading ? 'Please wait...' : isSignUp ? 'Create account' : t('profile_signin_btn')}
            </button>
            <button
              type="button"
              onClick={handleGoogle}
              disabled={loading}
              className="w-full bg-white border border-navy-100 text-navy font-semibold text-sm rounded-xl py-2.5 disabled:opacity-50"
            >
              {t('profile_google_btn')}
            </button>
          </form>

          <button
            onClick={() => { setIsSignUp(!isSignUp); setError('') }}
            className="text-xs text-saffron font-semibold mt-3"
          >
            {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
          </button>
        </PassbookCard>
      ) : (
        <div className="space-y-3">
          <Link
            to="/dashboard"
            className="flex items-center gap-3 bg-saffron rounded-xl px-4 py-3 active:scale-[0.98] transition-transform"
          >
            <Sparkles className="w-5 h-5 text-white flex-shrink-0" />
            <div className="flex-1">
              <p className="text-white font-semibold text-sm">Go to my Dashboard</p>
              <p className="text-white/70 text-xs">Goals, progress, daily advice</p>
            </div>
            <ArrowRight className="w-4 h-4 text-white flex-shrink-0" />
          </Link>

          <PassbookCard eyebrow={t('profile_signed_in')}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-full bg-navy flex items-center justify-center text-white font-semibold text-lg">
                {displayName.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-display font-semibold text-navy text-base">{displayName}</p>
                <p className="text-xs text-ink-faint">{displayEmail}</p>
              </div>
            </div>
            <button
              onClick={logout}
              className="flex items-center gap-1.5 text-sm font-semibold text-red-600"
            >
              <LogOut className="w-4 h-4" />
              {t('profile_signout')}
            </button>
          </PassbookCard>
        </div>
      )}

      <div>
        <div className="flex items-center gap-1.5 mb-2">
          <Globe2 className="w-4 h-4 text-ink-faint" />
          <p className="text-xs font-semibold text-ink-faint uppercase tracking-wide">
            {t('profile_language')}
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => setLanguage(lang.code)}
              className={`text-left px-3 py-2.5 rounded-xl border text-sm ${
                language === lang.code
                  ? 'bg-navy text-white border-navy'
                  : 'bg-white border-saffron-100 text-ink'
              }`}
            >
              <p className="font-semibold">{lang.native}</p>
              <p className={`text-[11px] ${language === lang.code ? 'text-white/60' : 'text-ink-faint'}`}>
                {lang.label}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

function FieldInput({ icon: Icon, onChange, value, ...props }) {
  return (
    <div className="relative">
      <Icon className="w-4 h-4 text-ink-faint absolute left-3 top-1/2 -translate-y-1/2" />
      <input
        {...props}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="w-full bg-white border border-saffron-100 rounded-xl pl-9 pr-3 py-2.5 text-sm text-navy placeholder:text-ink-faint focus:outline-none focus:border-saffron"
      />
    </div>
  )
}