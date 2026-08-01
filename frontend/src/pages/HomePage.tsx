import CassetteCard from '@/components/catalog/CassetteCard'
import EmptyState from '@/components/ui/EmptyState'
import Loader from '@/components/ui/Loader'
import { useAlbums } from '@/hooks/useCatalog'
import { usePlayerStore } from '@/store/playerStore'
import { Search } from 'lucide-react'
import { useMemo, useState } from 'react'

export default function HomePage() {
    const { data: albums, isLoading, isError, refetch } = useAlbums()
    const [query, setQuery] = useState('')
    const queueAlbum = usePlayerStore((state) => state.queueAlbum)
    const isPlaying = usePlayerStore((state) => state.isPlaying)

    const filtered = useMemo(() => {
        if (!albums) return []
        const term = query.trim().toLowerCase()
        if (!term) return albums
        return albums.filter((album) => album.title.toLowerCase().includes(term))
    }, [albums, query])

    return (
        <div className="mx-auto max-w-6xl px-4 py-10">
            <section className="mb-10 flex flex-col gap-6 rounded-deck border border-line bg-ink-3/60 p-8 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-mint">
                        Broadcasting now
                    </span>
                    <h1 className="mt-3 max-w-lg font-display text-4xl font-semibold leading-tight text-paper text-balance">
                        A tape deck for whatever you're into.
                    </h1>
                    <p className="mt-3 max-w-md text-sm text-paperdim">
                        Browse the library, press play on a tape, and it queues straight into the console below.
                    </p>
                </div>
                <div className="relative w-full sm:w-72">
                    <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-paperdim" />
                    <input
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        placeholder="Search the library"
                        className="w-full rounded-full border border-line bg-ink-2 py-2.5 pl-10 pr-4 text-sm text-paper placeholder:text-paperdim/60 focus:border-amber"
                    />
                </div>
            </section>

            {isLoading && <Loader label="Cueing up the library" />}

            {isError && (
                <EmptyState
                    title="Couldn't reach the song service"
                    description="Check that the song service is running on its configured port and try again."
                    action={
                        <button
                            type="button"
                            onClick={() => refetch()}
                            className="rounded-full border border-line px-4 py-2 text-sm text-paper hover:border-amber hover:text-amber"
                        >
                            Retry
                        </button>
                    }
                />
            )}

            {!isLoading && !isError && filtered.length === 0 && (
                <EmptyState
                    title="No tapes match that search"
                    description="Try a different title, or clear the search to see the full library."
                />
            )}

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map((album) => (
                    <CassetteCard
                        key={album.id}
                        album={album}
                        spinning={isPlaying && queueAlbum?.id === album.id}
                    />
                ))}
            </div>
        </div>
    )
}
