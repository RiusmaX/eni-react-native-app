import React, { useEffect, useReducer } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { showMessage } from 'react-native-flash-message'
import { register, login } from '../Services/StrapiApi'

const AuthContext = React.createContext()

const actions = {
  LOGIN: 'login',
  REGISTER: 'register',
  LOADING: 'loading',
  LOGOUT: 'logout'
}

const initalState = {
  user: null,
  jwt: null,
  loading: false,
  error: false
}

const getStoredState = async () => {
  try {
    const storedState = await AsyncStorage.getItem('AUTH_CONTEXT:STATE')
    return storedState ? JSON.parse(storedState) : {}
  } catch (e) {
    console.error(e)
  }
}

const authReducer = (state, action) => {
  switch (action.type) {
    case actions.LOGIN: {
      const { loginData } = action
      return ({ user: loginData.user, jwt: loginData.jwt, loading: loginData.loading })
    }
    case actions.REGISTER: {
      const { registerData } = action
      return ({ user: registerData.user, jwt: registerData.jwt, loading: registerData.loading })
    }
    case actions.LOADING: {
      const { loading } = action
      return ({ ...state, loading: loading })
    }
    case actions.LOGOUT:
      return initalState
    default:
      throw new Error(`Unhandled action type : ${action.type}`)
  }
}

const loginUser = async (dispatch, credentials) => {
  try {
    const { user, jwt } = await login(credentials)
    dispatch({ type: actions.LOGIN, loginData: { user, jwt } })
  } catch (e) {
    console.error(e)
  }
}

const registerUser = async (dispatch, userData) => {
  try {
    const { user, jwt } = await register(userData)
    dispatch({ type: actions.REGISTER, registerData: { user, jwt } })
  } catch (error) {
    console.error(error)
  }
}

const logout = async (dispatch) => {
  dispatch({ type: actions.LOGOUT })
}

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initalState)

  // Load initial state
  useEffect(() => {
    const loadStoredState = async () => {
      dispatch({ type: actions.LOADING, loading: true })
      const storedState = await getStoredState()
      console.tron.log('LOAD STORED STATE', storedState)
      dispatch({ type: actions.LOGIN, loginData: storedState, loading: false })
      showMessage({
        type: 'info',
        message: 'Vous êtes connecté !'
      })
    }
    loadStoredState()
  }, [])

  // Save current state
  useEffect(() => {
    if (state) {
      console.tron.log('STORE CURRENT STATE', state)
      AsyncStorage.setItem('AUTH_CONTEXT:STATE', JSON.stringify({ ...state, loading: false }))
    }
  }, [state])

  const value = { state, dispatch }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

const useAuth = () => {
  const context = React.useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider')
  }
  return context
}

export {
  AuthProvider,
  useAuth,
  loginUser,
  registerUser,
  logout
}
