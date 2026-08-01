import { songApi } from '@/lib/api'
import type { Album, AlbumWithSongs, Song } from '@/types'
import { useQuery } from '@tanstack/react-query'

export function useAlbums() {
    return useQuery({
        queryKey: ['albums'],
        queryFn: async () => {
            const { data } = await songApi.get<Album[]>('/album/all')
            return data
        }
    })
}

export function useAllSongs() {
    return useQuery({
        queryKey: ['songs'],
        queryFn: async () => {
            const { data } = await songApi.get<Song[]>('/song/all')
            return data
        }
    })
}

export function useAlbumDetail(id: string | undefined) {
    return useQuery({
        queryKey: ['album', id],
        queryFn: async () => {
            const { data } = await songApi.get<AlbumWithSongs>(`/album/${id}`)
            return data
        },
        enabled: Boolean(id)
    })
}
