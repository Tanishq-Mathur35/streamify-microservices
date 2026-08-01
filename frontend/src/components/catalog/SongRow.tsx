import { Pause, Play } from 'lucide-react'
import type { Song } from '@/types'
import { cx } from '@/lib/utils'

interface SongRowProps {
  song: Song
  index: number
  active: boolean
  playing: boolean
  onSelect: () => void
}

export default function SongRow({ song, index, active, playing, onSelect }: SongRowProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cx(
        'flex w-full items-center gap-4 rounded-lg border border-transparent px-3 py-3 text-left transition-colors hover:border-line hover:bg-white/[0.03]',
        active && 'border-amber/40 bg-amber/[0.06]'
      )}
    >
      <span
        className={cx(
          'flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-mono text-xs',
          active ? 'bg-amber text-ink' : 'bg-ink-2 text-paperdim'
        )}
      >
        {active ? (
          playing ? <Pause size={14} fill="currentColor" /> : <Play size={14} fill="currentColor" />
        ) : (
          String(index + 1).padStart(2, '0')
        )}
      </span>

      <div className="min-w-0 flex-1">
        <p className={cx('truncate text-sm font-medium', active ? 'text-amber' : 'text-paper')}>
          {song.title}
        </p>
        <p className="truncate text-xs text-paperdim">{song.description}</p>
      </div>

      {active && playing && (
        <span className="flex items-end gap-0.5">
          {[0, 1, 2].map((bar) => (
            <span
              key={bar}
              className="w-0.5 animate-vu rounded-full bg-mint"
              style={{ height: '14px', animationDelay: `${bar * 0.15}s` }}
            />
          ))}
        </span>
      )}
    </button>
  )
}
