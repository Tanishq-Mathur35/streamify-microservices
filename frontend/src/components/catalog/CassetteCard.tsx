import { Link } from 'react-router-dom'
import { Play } from 'lucide-react'
import type { Album } from '@/types'
import { catalogCode, cx } from '@/lib/utils'

interface CassetteCardProps {
  album: Album
  spinning?: boolean
}

export default function CassetteCard({ album, spinning }: CassetteCardProps) {
  return (
    <Link
      to={`/album/${album.id}`}
      className="group block rounded-deck border border-line bg-ink-3 p-4 transition-colors hover:border-amber/60"
    >
      <div className="relative overflow-hidden rounded-xl bg-ink-2">
        <div
          className="aspect-[4/3] w-full bg-cover bg-center"
          style={{ backgroundImage: `url(${album.thumbnail})` }}
        />

        <div className="pointer-events-none absolute inset-x-3 top-3 flex items-center justify-between">
          <span className="rounded-full bg-ink/70 px-2 py-1 font-mono text-[10px] tracking-widest text-mint backdrop-blur">
            {catalogCode('TAPE', album.id)}
          </span>
        </div>

        <div className="absolute inset-x-3 bottom-3 flex items-center justify-between rounded-lg bg-ink/70 px-3 py-2 backdrop-blur">
          <div className="flex items-center gap-2">
            <ReelIcon spinning={spinning} />
            <ReelIcon spinning={spinning} />
          </div>
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-amber text-ink opacity-0 transition-opacity group-hover:opacity-100">
            <Play size={14} fill="currentColor" />
          </span>
        </div>
      </div>

      <div className="mt-3">
        <h3 className="truncate font-display text-lg font-medium text-paper">{album.title}</h3>
        <p className="mt-0.5 line-clamp-1 text-sm text-paperdim">{album.description}</p>
      </div>
    </Link>
  )
}

function ReelIcon({ spinning }: { spinning?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cx('h-4 w-4 text-paperdim', spinning && 'animate-reel')}
      fill="none"
    >
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="12" cy="12" r="2.4" fill="currentColor" />
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  )
}
