import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyC5OvSfnULfAZKykgJpXYDy0PNSiCKSbd4",
  authDomain: "munimji-3e29b.firebaseapp.com",
  projectId: "munimji-3e29b",
  storageBucket: "munimji-3e29b.firebasestorage.app",
  messagingSenderId: "751603364476",
  appId: "1:751603364476:web:bbccf16140c355b9868ff9"
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()