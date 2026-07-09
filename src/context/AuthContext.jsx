import React, { createContext, useContext, useState, useEffect } from 'react'
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from 'firebase/auth'
import { auth, googleProvider } from '../config/firebase.js'
import { api } from '../utils/api.js'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [backendUser, setBackendUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser)
        // Wait for token to be fully ready before calling backend
        await firebaseUser.getIdToken(true)
        try {
          const data = await api.getMe()
          setBackendUser(data.user)
        } catch (err) {
          console.error('Backend not available:', err.message)
          // App still works without backend — graceful degradation
        }
      } else {
        setUser(null)
        setBackendUser(null)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  async function loginWithEmail(email, password) {
    const result = await signInWithEmailAndPassword(auth, email, password)
    return result.user
  }

  async function signupWithEmail(name, email, password) {
    const result = await createUserWithEmailAndPassword(auth, email, password)
    await updateProfile(result.user, { displayName: name })
    return result.user
  }

  async function loginWithGoogle() {
    const result = await signInWithPopup(auth, googleProvider)
    return result.user
  }

  async function logout() {
    await signOut(auth)
    setUser(null)
    setBackendUser(null)
  }

  const isGuest = !user
  const displayName = 
    (backendUser?.name && backendUser.name !== 'MunimJi User' && backendUser.name !== 'Google User')
      ? backendUser.name
      : user?.displayName || user?.email?.split('@')[0] || 'Friend'
  const displayEmail = backendUser?.email || user?.email || ''

  return (
    <AuthContext.Provider
      value={{
        user,
        backendUser,
        loading,
        isGuest,
        displayName,
        displayEmail,
        loginWithEmail,
        signupWithEmail,
        loginWithGoogle,
        logout,
        // Keep these for backward compatibility with existing pages
        login: signupWithEmail,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}