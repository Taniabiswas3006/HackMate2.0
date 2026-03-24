import { useCallback, useMemo, useState } from 'react'
import { AuthContext } from './authContext.js'
import usersData from '../data/users.json'

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(usersData.currentUser)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const login = useCallback((email, password) => {
    // Mock login — accept any valid email/password combo
    if (email && password) {
      setCurrentUser((prev) => ({ ...prev, email }))
      setIsLoggedIn(true)
      return true
    }
    return false
  }, [])

  const signup = useCallback((userData) => {
    setCurrentUser({
      id: 'u1',
      ...userData,
      level: 'Beginner',
    })
    setIsLoggedIn(true)
    return true
  }, [])

  const logout = useCallback(() => {
    setCurrentUser(usersData.currentUser)
    setIsLoggedIn(false)
  }, [])

  const updateProfile = useCallback((updates) => {
    setCurrentUser((prev) => ({ ...prev, ...updates }))
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

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
