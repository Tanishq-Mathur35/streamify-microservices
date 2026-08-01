import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { userApi } from '@/lib/api'
import { useAuthStore } from '@/store/authStore'
import type { User } from '@/types'

interface AuthPayload {
  message: string
  user: User
  token: string
}

export function useCurrentUser() {
  const token = useAuthStore((state) => state.token)
  const setUser = useAuthStore((state) => state.setUser)
  const clearSession = useAuthStore((state) => state.clearSession)

  return useQuery({
    queryKey: ['me'],
    queryFn: async () => {
      const { data } = await userApi.get<User>('/user/me')
      setUser(data)
      return data
    },
    enabled: Boolean(token),
    retry: false,
    throwOnError: (error) => {
      clearSession()
      void error
      return false
    }
  })
}

export function useLogin() {
  const setSession = useAuthStore((state) => state.setSession)
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (payload: { email: string; password: string }) => {
      const { data } = await userApi.post<AuthPayload>('/user/login', payload)
      return data
    },
    onSuccess: (data) => {
      setSession(data.token, data.user)
      queryClient.setQueryData(['me'], data.user)
    }
  })
}

export function useRegister() {
  const setSession = useAuthStore((state) => state.setSession)
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (payload: { name: string; email: string; password: string }) => {
      const { data } = await userApi.post<AuthPayload>('/user/register', payload)
      return data
    },
    onSuccess: (data) => {
      setSession(data.token, data.user)
      queryClient.setQueryData(['me'], data.user)
    }
  })
}
