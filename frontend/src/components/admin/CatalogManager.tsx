import AdminPanel from '@/components/admin/AdminPanel'
import Loader from '@/components/ui/Loader'
import { useDeleteAlbum, useDeleteSong } from '@/hooks/useAdmin'
import { useAlbums, useAllSongs } from '@/hooks/useCatalog'
import { catalogCode } from '@/lib/utils'
import { Trash2 } from 'lucide-react'

export default function CatalogManager() {
    const { data: albums, isLoading: albumsLoading } = useAlbums()
    const { data: songs, isLoading: songsLoading } = useAllSongs()
    const deleteAlbum = useDeleteAlbum()
    const deleteSong = useDeleteSong()

    return (
        <AdminPanel
            eyebrow="Catalog · 04"
            title="Strike from the archive"
            description="Removing an album also removes every track filed under it."
        >
            <div className="grid gap-6 sm:grid-cols-2">
                <div>
                    <h3 className="mb-2 font-mono text-[11px] uppercase tracking-[0.18em] text-paperdim">Albums</h3>
                    {albumsLoading ? (
                        <Loader label="Loading" />
                    ) : (
                        <ul className="space-y-1.5">
                            {albums?.map((album) => (
                                <li
                                    key={album.id}
                                    className="flex items-center justify-between gap-3 rounded-lg border border-line bg-ink-2 px-3 py-2"
                                >
                                    <div className="min-w-0">
                                        <p className="truncate text-sm text-paper">{album.title}</p>
                                        <p className="font-mono text-[10px] text-paperdim">{catalogCode('TAPE', album.id)}</p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => deleteAlbum.mutate(album.id)}
                                        disabled={deleteAlbum.isPending}
                                        className="shrink-0 rounded-full p-2 text-paperdim transition-colors hover:bg-coral/10 hover:text-coral disabled:opacity-40"
                                        aria-label={`Delete ${album.title}`}
                                    >
                                        <Trash2 size={15} />
                                    </button>
                                </li>
                            ))}
                            {albums?.length === 0 && <p className="text-sm text-paperdim">No albums yet.</p>}
                        </ul>
                    )}
                </div>

                <div>
                    <h3 className="mb-2 font-mono text-[11px] uppercase tracking-[0.18em] text-paperdim">Tracks</h3>
                    {songsLoading ? (
                        <Loader label="Loading" />
                    ) : (
                        <ul className="space-y-1.5">
                            {songs?.map((song) => (
                                <li
                                    key={song.id}
                                    className="flex items-center justify-between gap-3 rounded-lg border border-line bg-ink-2 px-3 py-2"
                                >
                                    <div className="min-w-0">
                                        <p className="truncate text-sm text-paper">{song.title}</p>
                                        <p className="font-mono text-[10px] text-paperdim">{catalogCode('TRK', song.id)}</p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => deleteSong.mutate(song.id)}
                                        disabled={deleteSong.isPending}
                                        className="shrink-0 rounded-full p-2 text-paperdim transition-colors hover:bg-coral/10 hover:text-coral disabled:opacity-40"
                                        aria-label={`Delete ${song.title}`}
                                    >
                                        <Trash2 size={15} />
                                    </button>
                                </li>
                            ))}
                            {songs?.length === 0 && <p className="text-sm text-paperdim">No tracks yet.</p>}
                        </ul>
                    )}
                </div>
            </div>
        </AdminPanel>
    )
}
