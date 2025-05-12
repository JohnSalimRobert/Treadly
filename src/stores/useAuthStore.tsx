// stores/useAuthStore.js
import { create } from 'zustand'

type User = {
    name: string
    // Add more user fields if needed
  }

interface AuthState {
    user: User | null
    token: string | null
    login: (token: string, user?: User) => void
    logout: () => void
    isAuthenticated: () => boolean
  }

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: localStorage.getItem('token') || null,

  login: (token, user = { name: 'user'}) => {
    localStorage.setItem('token', token)
    set({ token, user })
  },

  logout: () => {
    localStorage.removeItem('token')
    set({ token: null, user: null })
  },

  isAuthenticated: () => !!localStorage.getItem('token'),
}))
