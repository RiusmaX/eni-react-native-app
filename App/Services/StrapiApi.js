import axios from 'axios'

const api = axios.create({
    baseURL: 'https://strapi.myidea.fr/',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
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

export {
    register
}