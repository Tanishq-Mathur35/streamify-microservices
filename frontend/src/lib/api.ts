import axios from 'axios'
import { useAuthStore } from '@/store/authStore'

function attachToken(client: ReturnType<typeof axios.create>) {
  client.interceptors.request.use((config) => {
    const token = useAuthStore.getState().token
    if (token) {
      config.headers.token = token
    }
    return config
  })
  return client
}

export const userApi = attachToken(
  axios.create({ baseURL: import.meta.env.VITE_USER_SERVICE_URL })
)

export const adminApi = attachToken(
  axios.create({ baseURL: import.meta.env.VITE_ADMIN_SERVICE_URL })
)

export const songApi = attachToken(
  axios.create({ baseURL: import.meta.env.VITE_SONG_SERVICE_URL })
)

export function extractErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as { message?: string } | undefined
    if (data?.message) return data.message
    if (error.message) return error.message
  }
  if (error instanceof Error) return error.message
  return 'Something went wrong. Try again.'
}
