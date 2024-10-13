import axios from 'axios'

const createAxios = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 10000,
  withCredentials: true
})

createAxios.interceptors.response.use(
  (response) => {
    console.debug('cookies: ', response)
    return response.data
  },
  (error) => Promise.reject(error)
)

export default createAxios
