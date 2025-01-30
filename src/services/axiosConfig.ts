import axios from 'axios'
import type { AxiosError } from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    Accept: '*/*',
    'Content-Type': 'application/json',
  },
})

export const handleAxiosError = (error: AxiosError) => {
  console.error('Response error:', error)
  if (error.response) {
    console.error('Response error:', error.response.status, error.response.data)
  } else if (error.request) {
    console.error('Request error:', error.request)
  } else {
    console.error('Error:', error.message)
  }
  throw error
}

export default api
