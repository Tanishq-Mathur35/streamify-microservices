export interface User {
  _id: string
  name: string
  email: string
  role: string
  playlist: string[]
  createdAt?: string
  updatedAt?: string
}

export interface Album {
  id: number
  title: string
  description: string
  thumbnail: string
  created_at: string
}

export interface Song {
  id: number
  title: string
  description: string
  thumbnail: string | null
  audio: string
  album_id: number
  created_at: string
}

export interface AlbumWithSongs {
  album: Album
  songs: Song[]
}

export interface ApiMessage {
  message: string
}
