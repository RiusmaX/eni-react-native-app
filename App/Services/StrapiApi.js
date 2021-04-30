import axios from 'axios'
import Config from 'react-native-config'

const api = axios.create({
  baseURL: Config.STRAPI_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
})

/**
 *
 * @param {*} user
 * @returns user
 */
const register = async (user) => {
  try {
    const response = await api.post('auth/local/register', JSON.stringify(user))
    return response.data
  } catch (e) {
    console.error(e)
    return null
  }
}

/**
 *
 * @param {*} credentials
 * @returns user
 */
const login = async (credentials) => {
  try {
    const response = await api.post('auth/local', JSON.stringify(credentials))
    return response.data
  } catch (error) {
    console.error(error)
    return null
  }
}

export {
  register,
  login
}
