import { adminApi } from '@/lib/api'
import type { Album, ApiMessage, Song } from '@/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'

interface AddAlbumInput {
    title: string
    description: string
    file: File
}

interface AddSongInput {
    title: string
    description: string
    album: number
    file: File
}

interface AddThumbnailInput {
    songId: number
    file: File
}

export function useAddAlbum() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ title, description, file }: AddAlbumInput) => {
            const form = new FormData()
            form.append('title', title)
            form.append('description', description)
            form.append('file', file)
            const { data } = await adminApi.post<{ message: string; album: Album }>(
                '/album/new',
                form
            )
            return data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['albums'] })
        }
    })
}

export function useAddSong() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ title, description, album, file }: AddSongInput) => {
            const form = new FormData()
            form.append('title', title)
            form.append('description', description)
            form.append('album', String(album))
            form.append('file', file)
            const { data } = await adminApi.post<ApiMessage>('/song/new', form)
            return data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['songs'] })
            queryClient.invalidateQueries({ queryKey: ['album'] })
        }
    })
}

export function useAddThumbnail() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ songId, file }: AddThumbnailInput) => {
            const form = new FormData()
            form.append('file', file)
            const { data } = await adminApi.post<{ message: string; song: Song }>(
                `/song/${songId}`,
                form
            )
            return data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['songs'] })
            queryClient.invalidateQueries({ queryKey: ['album'] })
        }
    })
}

export function useDeleteAlbum() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (id: number) => {
            const { data } = await adminApi.delete<ApiMessage>(`/album/${id}`)
            return data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['albums'] })
            queryClient.invalidateQueries({ queryKey: ['songs'] })
        }
    })
}

export function useDeleteSong() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (id: number) => {
            const { data } = await adminApi.delete<ApiMessage>(`/song/${id}`)
            return data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['songs'] })
            queryClient.invalidateQueries({ queryKey: ['album'] })
        }
    })
}
