// API service — connects frontend to the MunimJi Express backend.
// All requests include the Firebase auth token so the backend
// can verify who is making the request.

import { auth } from '../config/firebase.js'

const BASE_URL = import.meta.env.VITE_API_URL || 'https://munimji-backend.onrender.com'

async function getAuthHeader() {
  const user = auth.currentUser
  if (!user) return {}
  const token = await user.getIdToken()
  return { Authorization: `Bearer ${token}` }
}

async function request(method, path, body = null) {
  const headers = {
    'Content-Type': 'application/json',
    ...(await getAuthHeader()),
  }

  const config = {
    method,
    headers,
    ...(body ? { body: JSON.stringify(body) } : {}),
  }

  const response = await fetch(`${BASE_URL}${path}`, config)
  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.error || 'API request failed')
  }

  return data
}

// User
export const api = {
  getMe: () => request('GET', '/api/user/me'),
  updateLanguage: (language) => request('PUT', '/api/user/language', { language }),
  updateProfile: (name) => request('PUT', '/api/user/profile', { name }),

  // Goals
  getGoals: () => request('GET', '/api/goals'),
  createGoal: (goal) => request('POST', '/api/goals', goal),
  updateGoal: (id, data) => request('PUT', `/api/goals/${id}`, data),
  deleteGoal: (id) => request('DELETE', `/api/goals/${id}`),

  // Calculations
  getCalculations: () => request('GET', '/api/calculations'),
  saveCalculation: (calc) => request('POST', '/api/calculations', calc),
  deleteCalculation: (id) => request('DELETE', `/api/calculations/${id}`),
}