import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Pause, Play, SkipBack, SkipForward, Volume1, Volume2 } from 'lucide-react'
import { usePlayerStore } from '@/store/playerStore'
import { formatDuration } from '@/lib/utils'
import VUMeter from '@/components/player/VUMeter'

export default function PlayerConsole() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const queue = usePlayerStore((state) => state.queue)
  const currentIndex = usePlayerStore((state) => state.currentIndex)
  const isPlaying = usePlayerStore((state) => state.isPlaying)
  const queueAlbum = usePlayerStore((state) => state.queueAlbum)
  const playPause = usePlayerStore((state) => state.playPause)
  const next = usePlayerStore((state) => state.next)
  const prev = usePlayerStore((state) => state.prev)
  const setPlaying = usePlayerStore((state) => state.setPlaying)

  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(0.8)

  const song = currentIndex >= 0 ? queue[currentIndex] : null

  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !song) return
    audio.src = song.audio
    audio.currentTime = 0
    setCurrentTime(0)
    if (isPlaying) {
      void audio.play()
    }
  }, [song?.id])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !song) return
    if (isPlaying) {
      void audio.play()
    } else {
      audio.pause()
    }
  }, [isPlaying, song])

  useEffect(() => {
    const audio = audioRef.current
    if (audio) audio.volume = volume
  }, [volume])

  if (!song) return null

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-ink-2/95 backdrop-blur">
      <audio
        ref={audioRef}
        onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
        onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
        onEnded={() => next()}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />

      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-3 sm:flex-row sm:items-center sm:gap-6">
        <div className="flex min-w-0 items-center gap-3 sm:w-64">
          <div
            className="h-11 w-11 shrink-0 rounded-lg bg-cover bg-center"
            style={{ backgroundImage: `url(${song.thumbnail ?? queueAlbum?.thumbnail ?? ''})` }}
          />
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-paper">{song.title}</p>
            {queueAlbum && (
              <Link
                to={`/album/${queueAlbum.id}`}
                className="truncate text-xs text-paperdim hover:text-mint"
              >
                {queueAlbum.title}
              </Link>
            )}
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-1.5">
          <div className="flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={prev}
              className="text-paperdim transition-colors hover:text-paper"
              aria-label="Previous track"
            >
              <SkipBack size={18} />
            </button>

            <button
              type="button"
              onClick={playPause}
              aria-label={isPlaying ? 'Pause' : 'Play'}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-amber text-ink shadow-knob transition-transform hover:scale-105 active:scale-95"
            >
              {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" className="ml-0.5" />}
            </button>

            <button
              type="button"
              onClick={next}
              className="text-paperdim transition-colors hover:text-paper"
              aria-label="Next track"
            >
              <SkipForward size={18} />
            </button>

            <VUMeter active={isPlaying} />
          </div>

          <div className="flex items-center gap-2">
            <span className="w-9 text-right font-mono text-[11px] text-paperdim">
              {formatDuration(currentTime)}
            </span>
            <input
              type="range"
              min={0}
              max={duration || 0}
              step={0.1}
              value={currentTime}
              onChange={(event) => {
                const value = Number(event.target.value)
                if (audioRef.current) audioRef.current.currentTime = value
                setCurrentTime(value)
              }}
              className="h-1 flex-1 cursor-pointer accent-amber"
            />
            <span className="w-9 font-mono text-[11px] text-paperdim">{formatDuration(duration)}</span>
          </div>
        </div>

        <div className="hidden items-center gap-2 sm:flex sm:w-32">
          {volume > 0.5 ? <Volume2 size={16} className="text-paperdim" /> : <Volume1 size={16} className="text-paperdim" />}
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChange={(event) => setVolume(Number(event.target.value))}
            className="h-1 flex-1 cursor-pointer accent-mint"
          />
        </div>
      </div>
    </div>
  )
}
