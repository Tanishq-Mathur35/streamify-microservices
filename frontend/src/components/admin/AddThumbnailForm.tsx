import AdminPanel from '@/components/admin/AdminPanel'
import Button from '@/components/ui/Button'
import FileDrop from '@/components/ui/FileDrop'
import { useAddThumbnail } from '@/hooks/useAdmin'
import { useAllSongs } from '@/hooks/useCatalog'
import { extractErrorMessage } from '@/lib/api'
import type { FormEvent } from 'react'
import { useState } from 'react'

export default function AddThumbnailForm() {
    const { data: songs } = useAllSongs()
    const addThumbnail = useAddThumbnail()
    const [songId, setSongId] = useState('')
    const [file, setFile] = useState<File | null>(null)

    function handleSubmit(event: FormEvent) {
        event.preventDefault()
        if (!file || !songId) return
        addThumbnail.mutate(
            { songId: Number(songId), file },
            { onSuccess: () => setFile(null) }
        )
    }

    return (
        <AdminPanel
            eyebrow="Catalog · 03"
            title="Label the sleeve"
            description="Attach artwork to a track that doesn't have one yet."
        >
            <form onSubmit={handleSubmit} className="space-y-4">
                <label className="block">
                    <span className="mb-1.5 block font-mono text-[11px] uppercase tracking-[0.18em] text-paperdim">
                        Track
                    </span>
                    <select
                        required
                        value={songId}
                        onChange={(event) => setSongId(event.target.value)}
                        className="w-full rounded-lg border border-line bg-ink-2 px-3.5 py-2.5 text-sm text-paper focus:border-amber"
                    >
                        <option value="" disabled>
                            Choose a track
                        </option>
                        {songs?.map((song) => (
                            <option key={song.id} value={song.id}>
                                {song.title}
                            </option>
                        ))}
                    </select>
                </label>

                <FileDrop label="Artwork" accept="image/*" onChange={setFile} hint="PNG or JPG artwork" />

                {addThumbnail.isError && (
                    <p className="rounded-lg bg-coral/10 px-3 py-2 text-sm text-coral">
                        {extractErrorMessage(addThumbnail.error)}
                    </p>
                )}
                {addThumbnail.isSuccess && (
                    <p className="rounded-lg bg-mint/10 px-3 py-2 text-sm text-mint">Artwork attached.</p>
                )}

                <Button type="submit" loading={addThumbnail.isPending} disabled={!file || !songId}>
                    Attach artwork
                </Button>
            </form>
        </AdminPanel>
    )
}
