import { useParams } from 'react-router-dom'
import { Play } from 'lucide-react'
import { useAlbumDetail } from '@/hooks/useCatalog'
import SongRow from '@/components/catalog/SongRow'
import Loader from '@/components/ui/Loader'
import EmptyState from '@/components/ui/EmptyState'
import Button from '@/components/ui/Button'
import { usePlayerStore } from '@/store/playerStore'
import { catalogCode } from '@/lib/utils'

export default function AlbumPage() {
  const { id } = useParams()
  const { data, isLoading, isError } = useAlbumDetail(id)
  const queue = usePlayerStore((state) => state.queue)
  const currentIndex = usePlayerStore((state) => state.currentIndex)
  const isPlaying = usePlayerStore((state) => state.isPlaying)
  const playQueue = usePlayerStore((state) => state.playQueue)
  const playPause = usePlayerStore((state) => state.playPause)

  if (isLoading) return <Loader label="Rewinding" />

  if (isError || !data) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-16">
        <EmptyState title="This tape isn't in the rack" description="It may have been removed from the library." />
      </div>
    )
  }

  const { album, songs } = data
  const currentSongId = queue[currentIndex]?.id
  const activeHere = songs.some((song) => song.id === currentSongId)

  function handleSelect(index: number) {
    const activeIndex = queue.findIndex((song) => song.id === songs[index].id)
    if (activeIndex === currentIndex && activeHere) {
      playPause()
      return
    }
    playQueue(songs, index, album)
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end">
        <div
          className="h-40 w-40 shrink-0 rounded-deck bg-cover bg-center shadow-deck"
          style={{ backgroundImage: `url(${album.thumbnail})` }}
        />
        <div className="min-w-0">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-mint">
            {catalogCode('TAPE', album.id)} · {songs.length} track{songs.length === 1 ? '' : 's'}
          </span>
          <h1 className="mt-2 font-display text-3xl font-semibold text-paper">{album.title}</h1>
          <p className="mt-2 max-w-lg text-sm text-paperdim">{album.description}</p>

          {songs.length > 0 && (
            <Button
              className="mt-5"
              icon={<Play size={14} fill="currentColor" />}
              onClick={() => (activeHere ? playPause() : playQueue(songs, 0, album))}
            >
              {activeHere && isPlaying ? 'Pause' : 'Play tape'}
            </Button>
          )}
        </div>
      </div>

      <div className="mt-10">
        {songs.length === 0 ? (
          <EmptyState title="No tracks yet" description="Songs added to this album will show up here." />
        ) : (
          <div className="space-y-1">
            {songs.map((song, index) => (
              <SongRow
                key={song.id}
                song={song}
                index={index}
                active={song.id === currentSongId}
                playing={song.id === currentSongId && isPlaying}
                onSelect={() => handleSelect(index)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
