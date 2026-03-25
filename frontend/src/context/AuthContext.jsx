import { useCallback, useMemo, useState, useEffect } from 'react'
import { AuthContext } from './authContext.js'
import * as authService from '../services/authService.js'

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [initialLoad, setInitialLoad] = useState(true)

  useEffect(() => {
    // Check if token exists on mount
    authService.getMe().then((user) => {
      if (user) {
        setCurrentUser(user)
        setIsLoggedIn(true)
      }
    }).catch(() => {
    }).finally(() => {
      setInitialLoad(false)
    })
  }, [])

  const login = useCallback(async (email, password) => {
    const user = await authService.login(email, password)
    setCurrentUser(user)
    setIsLoggedIn(true)
    return true
  }, [])

  const signup = useCallback(async (userData) => {
    const user = await authService.signup(userData)
    setCurrentUser(user)
    setIsLoggedIn(true)
    return true
  }, [])

  const logout = useCallback(() => {
    authService.logout()
    setCurrentUser(null)
    setIsLoggedIn(false)
  }, [])

  const updateProfile = useCallback(async (updates) => {
    const user = await authService.updateProfile(updates)
    setCurrentUser(user)
  }, [])

  const value = useMemo(
    () => ({
      currentUser,
      isLoggedIn,
      login,
      signup,
      logout,
      updateProfile,
    }),
    [currentUser, isLoggedIn, login, signup, logout, updateProfile],
  )

  if (initialLoad) return null; // Don't render until we check log in status

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
