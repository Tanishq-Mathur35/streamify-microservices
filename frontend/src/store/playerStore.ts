import type { Album, Song } from '@/types'
import { create } from 'zustand'

interface PlayerState {
    queue: Song[]
    queueAlbum: Album | null
    currentIndex: number
    isPlaying: boolean
    playQueue: (songs: Song[], startIndex: number, album: Album | null) => void
    playPause: () => void
    next: () => void
    prev: () => void
    setPlaying: (playing: boolean) => void
}

export const usePlayerStore = create<PlayerState>((set, get) => ({
    queue: [],
    queueAlbum: null,
    currentIndex: -1,
    isPlaying: false,

    playQueue: (songs, startIndex, album) => {
        set({ queue: songs, currentIndex: startIndex, queueAlbum: album, isPlaying: true })
    },

    playPause: () => {
        const { currentIndex, isPlaying } = get()
        if (currentIndex === -1) return
        set({ isPlaying: !isPlaying })
    },

    next: () => {
        const { queue, currentIndex } = get()
        if (queue.length === 0) return
        const nextIndex = (currentIndex + 1) % queue.length
        set({ currentIndex: nextIndex, isPlaying: true })
    },

    prev: () => {
        const { queue, currentIndex } = get()
        if (queue.length === 0) return
        const prevIndex = (currentIndex - 1 + queue.length) % queue.length
        set({ currentIndex: prevIndex, isPlaying: true })
    },

    setPlaying: (playing) => set({ isPlaying: playing })
}))
